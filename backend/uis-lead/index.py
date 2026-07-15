import json
import os
from datetime import datetime, timezone

import psycopg2

FORM_ID_SKLADY = 300

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


def handler(event: dict, context) -> dict:
    """Принимает заявки со страницы Склады для интеграции с UIS (Comagic).
    POST — сохраняет заявку в БД и возвращает её ID.
    GET  — отдаёт заявку по ID (для обратной связи с CRM)."""
    method = event.get("httpMethod", "GET")

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if method == "GET":
        params = event.get("queryStringParameters") or {}
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
        form_name = body.get("form_name", "Заявка со страницы Склады")
        source = body.get("source", "Склады")
        name = body.get("name", "")
        phone = body.get("phone", "")
        email = body.get("email", "")
        message = body.get("message", "")
        quiz_data = body.get("quiz")

        conn = get_conn()
        cur = conn.cursor()
        quiz_json = json.dumps(quiz_data, ensure_ascii=False) if quiz_data else None
        cur.execute(
            "INSERT INTO uis_leads (form_id, form_name, source, name, phone, email, message, quiz_data, created_at) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (
                FORM_ID_SKLADY,
                form_name,
                source,
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
            "body": str(new_id),
        }

    return {
        "statusCode": 405,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"error": "Method not allowed"}),
    }
