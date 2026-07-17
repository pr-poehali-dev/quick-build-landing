import json
import os
import urllib.request
from datetime import datetime, timezone

import psycopg2

# Эндпоинт партнёра (CRM), куда дублируем каждую заявку.
# Формат запроса согласован с партнёром:
# {"name": "Igor", "phone": "9999999999", "email": "...", "message": "...", "form_id": 301}
PARTNER_ENDPOINT = "https://evrazsteelbox.ru/local/ajax/quiz_form.php"

# Единые form_id по типу формы — одинаковые для всех страниц/категорий сайта.
FORM_IDS = {
    "Обратный звонок": 300,
    "Квиз": 301,
    "Контактная форма": 302,
}

FORM_NAMES = {
    "Обратный звонок": "Обратный звонок",
    "Квиз": "Квиз",
    "Контактная форма": "Отправка заявки в Контактах",
}

# Согласованные fieldId (от 3000) для полей формы склады (используются в UIS ответе по id)
FIELD_IDS = {
    "name": 3001,
    "phone": 3002,
    "email": 3003,
    "message": 3004,
    "purpose": 3005,
    "city": 3006,
    "dims": 3007,
    "area": 3008,
    "cladding": 3009,
    "crane": 3010,
    "extras": 3011,
    "price": 3012,
}

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    dsn = os.environ["DATABASE_URL"]
    return psycopg2.connect(dsn)


def normalize_phone(phone: str) -> str:
    """Партнёр ожидает телефон 10 цифрами без кода страны, например '9999999999'."""
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) == 11 and digits[0] in ("7", "8"):
        digits = digits[1:]
    return digits


def send_to_partner(name: str, phone: str, email: str, message: str, form_id: int) -> None:
    """Дублирует заявку на эндпоинт партнёра (CRM). Ошибки не должны ронять
    основной поток сохранения заявки — только логируем в stdout."""
    payload = json.dumps(
        {
            "name": name,
            "phone": normalize_phone(phone),
            "email": email,
            "message": message,
            "form_id": form_id,
        },
        ensure_ascii=False,
    ).encode("utf-8")
    req = urllib.request.Request(
        PARTNER_ENDPOINT,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
    except Exception as err:
        print(f"[partner] Ошибка отправки заявки на {PARTNER_ENDPOINT}: {err}")


def handler(event: dict, context) -> dict:
    """Принимает заявки со страниц сайта, сохраняет в БД и дублирует на эндпоинт
    партнёра (CRM). form_id зависит только от типа формы и одинаков для всех
    страниц сайта: 300 — Обратный звонок, 301 — Квиз, 302 — Отправка заявки в Контактах.
    POST — сохраняет заявку и пересылает партнёру, возвращает её ID.
    GET ?forms=1 — отдаёт список форм (form_id + название) для CRM.
    GET ?id=... — отдаёт заявку по ID (для обратной связи с UIS)."""
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if method == "GET":
        params = event.get("queryStringParameters") or {}

        if params.get("forms"):
            forms = [
                {"form_id": FORM_IDS[t], "form_name": FORM_NAMES[t]} for t in FORM_IDS
            ]
            forms.sort(key=lambda f: f["form_id"])
            return {
                "statusCode": 200,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"forms": forms}, ensure_ascii=False),
            }

        request_id = params.get("RequestId") or params.get("id")
        if not request_id:
            return {
                "statusCode": 400,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "RequestId is required"}),
            }
        try:
            rid = int(request_id)
        except ValueError:
            return {
                "statusCode": 400,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "RequestId must be a number"}),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, form_id, form_name, source, name, phone, email, message, quiz_data, created_at "
            "FROM uis_leads WHERE id = %s" % rid
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return {
                "statusCode": 404,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Not found"}),
            }

        (
            lead_id,
            form_id,
            form_name,
            source,
            name,
            phone,
            email,
            message,
            quiz_data,
            created_at,
        ) = row

        fields = []
        for key, value in [
            ("name", name),
            ("phone", phone),
            ("email", email),
            ("message", message),
        ]:
            if value:
                field_type = "email" if key == "email" else "text"
                fields.append(
                    {
                        "fieldId": FIELD_IDS.get(key),
                        "name": key,
                        "type": field_type,
                        "value": value,
                    }
                )
        if quiz_data:
            for key, value in quiz_data.items():
                if value and key in FIELD_IDS:
                    val = ", ".join(value) if isinstance(value, list) else str(value)
                    fields.append(
                        {
                            "fieldId": FIELD_IDS.get(key),
                            "name": key,
                            "type": "text",
                            "value": val,
                        }
                    )

        result = {
            "id": lead_id,
            "form_id": form_id,
            "form_name": form_name,
            "source": source,
            "created_at": created_at.isoformat() if created_at else None,
            "fields": fields,
        }

        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps(result, ensure_ascii=False),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        category = body.get("category") or ""
        source = body.get("source") or "Контактная форма"
        form_type = source if source in FORM_IDS else "Контактная форма"
        form_id = FORM_IDS[form_type]
        form_name = FORM_NAMES[form_type]
        name = body.get("name", "")
        phone = body.get("phone", "")
        email = body.get("email", "")
        message = body.get("message", "")
        quiz_data = body.get("quiz")

        conn = get_conn()
        cur = conn.cursor()
        quiz_json = json.dumps(quiz_data, ensure_ascii=False) if quiz_data else None
        cur.execute(
            "INSERT INTO uis_leads (form_id, form_name, source, category, name, phone, email, message, quiz_data, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (
                form_id,
                form_name,
                source,
                category,
                name,
                phone,
                email,
                message,
                quiz_json,
                datetime.now(timezone.utc),
            ),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        send_to_partner(name, phone, email, message, form_id)

        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps(
                {"id": new_id, "form_id": form_id, "form_name": form_name},
                ensure_ascii=False,
            ),
        }

    return {
        "statusCode": 405,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"error": "Method not allowed"}),
    }