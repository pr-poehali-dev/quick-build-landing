import json
import os
from datetime import datetime, timezone

import psycopg2

# Согласованные fieldId (от 3000) для полей формы склады
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


FORM_TYPE_LABELS = {
    "Обратный звонок": "Обратный звонок",
    "Квиз": "Квиз",
    "Контактная форма": "Отправка заявки в Контактах",
}

DEFAULT_CATEGORY = "Быстровозводимые здания"


def build_form_name(category: str, form_type: str) -> str:
    """Формирует каноничное имя формы вида 'Квиз - Категория - Тип',
    например 'Квиз - Склады - Обратный звонок' или
    'Квиз - Склады - Отправка заявки в Контактах'."""
    label = FORM_TYPE_LABELS.get(form_type, form_type)
    return f"Квиз - {category} - {label}"


def get_or_create_form_id(cur, category: str, form_type: str) -> int:
    """Возвращает form_id для пары (категория, тип формы). Если такой пары ещё
    нет — регистрирует её автоматически со следующим свободным form_id (это
    позволяет новым разделам сайта или новым формам попадать в UIS без ручной
    настройки)."""
    cur.execute(
        "SELECT form_id FROM uis_form_registry WHERE category = %s AND form_type = %s",
        (category, form_type),
    )
    row = cur.fetchone()
    if row:
        return row[0]

    cur.execute("SELECT COALESCE(MAX(form_id), 299) + 1 FROM uis_form_registry")
    new_form_id = cur.fetchone()[0]
    cur.execute(
        "INSERT INTO uis_form_registry (category, form_type, form_id) VALUES (%s, %s, %s) "
        "ON CONFLICT (category, form_type) DO UPDATE SET category = EXCLUDED.category "
        "RETURNING form_id",
        (category, form_type, new_form_id),
    )
    return cur.fetchone()[0]


def handler(event: dict, context) -> dict:
    """Принимает заявки со страниц сайта для интеграции с UIS (Comagic).
    POST — сохраняет заявку в БД и возвращает её ID.
    GET ?forms=1 — отдаёт список всех зарегистрированных форм (form_id + категория) для CRM.
    GET ?id=... — отдаёт заявку по ID (для обратной связи с CRM)."""
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if method == "GET":
        params = event.get("queryStringParameters") or {}

        if params.get("forms"):
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(
                "SELECT form_id, category, form_type FROM uis_form_registry ORDER BY form_id"
            )
            rows = cur.fetchall()
            cur.close()
            conn.close()
            forms = [
                {
                    "form_id": r[0],
                    "form_name": build_form_name(r[1], r[2]),
                }
                for r in rows
            ]
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
        category = body.get("category") or DEFAULT_CATEGORY
        source = body.get("source") or "Контактная форма"
        form_type = source if source in FORM_TYPE_LABELS else "Контактная форма"
        form_name = build_form_name(category, form_type)
        name = body.get("name", "")
        phone = body.get("phone", "")
        email = body.get("email", "")
        message = body.get("message", "")
        quiz_data = body.get("quiz")

        conn = get_conn()
        cur = conn.cursor()
        form_id = get_or_create_form_id(cur, category, form_type)
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