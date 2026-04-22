import os, json, smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

RECIPIENTS = ["Petr.Chayrev@evrazsteel.ru", "Igor.podurets@evraz.com"]

def handler(event: dict, context) -> dict:
    """Отправляет заявку с лендинга на почты менеджеров."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    source = body.get("source", "Форма")
    name   = body.get("name", "—")
    phone  = body.get("phone", "—")
    email  = body.get("email", "—")
    msg_text = body.get("message", "")
    quiz_data = body.get("quiz", {})

    # Формируем тело письма
    subject = f"Новая заявка с лендинга ({source})"
    lines = [
        f"<b>Источник:</b> {source}",
        f"<b>Имя:</b> {name}",
        f"<b>Телефон:</b> {phone}",
        f"<b>Email:</b> {email}",
    ]
    if msg_text:
        lines.append(f"<b>Сообщение:</b> {msg_text}")
    if quiz_data:
        lines.append("<br><b>Данные квиза:</b>")
        field_names = {
            "purpose": "Назначение",
            "city": "Город",
            "dims": "Размеры (Ш × Д × В)",
            "area": "Площадь",
            "cladding": "Тип стен/кровли",
            "crane": "Кран-балка",
            "extras": "Доп. услуги",
            "snow": "Снеговой район",
            "wind": "Ветровой район",
        }
        for key, label in field_names.items():
            val = quiz_data.get(key)
            if val:
                if isinstance(val, list):
                    val = ", ".join(val) if val else "—"
                lines.append(f"<b>{label}:</b> {val}")

    html_body = "<br>".join(lines)

    smtp_login = os.environ.get("SMTP_LOGIN", "")
    smtp_pass  = os.environ.get("SMTP_PASSWORD", "")

    if not smtp_login or not smtp_pass:
        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps({"ok": False, "error": "SMTP не настроен"}),
        }

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = smtp_login
    msg["To"]      = ", ".join(RECIPIENTS)
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(smtp_login, smtp_pass)
        server.sendmail(smtp_login, RECIPIENTS, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True}),
    }
