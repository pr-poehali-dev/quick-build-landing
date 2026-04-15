import csv
import io
import re
import urllib.request

SHEET_URL = "https://docs.google.com/spreadsheets/d/1OSqWDcBINlfd25rLZB3GoKyJb995tunDeXunIzjxT5M/export?format=csv&gid=1655703593"

# Карта: высота здания (м) → кол-во панелей по высоте
HEIGHT_TO_PANELS = {
    3.6: 4,
    4.8: 5,
    6.0: 6,
    7.2: 7,
    8.4: 8,
    9.6: 9,
    10.8: 10,
    12.0: 11,
}

# Карта: тип обшивки → толщина стен и кровли (мм)
CLADDING_TO_THICKNESS = {
    "Профилированный лист": (100, 100),
    "Сэндвич панели":       (150, 150),
}


def parse_price(raw: str) -> float:
    cleaned = re.sub(r"[^\d,]", "", raw).replace(",", ".")
    try:
        return float(cleaned)
    except Exception:
        return 0.0


def handler(event: dict, context) -> dict:
    """Ищет цену здания в таблице Google Sheets по параметрам квиза."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    params = event.get("queryStringParameters") or {}

    try:
        wall_mm   = int(params.get("wall_mm", 100))
        roof_mm   = int(params.get("roof_mm", 100))
        span      = int(params.get("span", 12))       # пролёт (ширина)
        length    = int(params.get("length", 24))      # длина в осях
        panels    = int(params.get("panels", 4))       # кол-во панелей по высоте
        snow      = params.get("snow", "III")          # снеговой район
        wind      = params.get("wind", "II")           # ветровой район
        locality  = params.get("locality", "B")        # тип местности (А или B)
    except (ValueError, TypeError) as e:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": f'{{"error": "Bad params: {e}"}}',
        }

    # Загружаем таблицу
    req = urllib.request.Request(SHEET_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode("utf-8")

    reader = csv.DictReader(io.StringIO(content))

    best_price = None
    fallback_price = None  # ближайшее совпадение без учёта типа местности

    for row in reader:
        try:
            r_wall   = int(row["Толщина стеновых панелей (B5), мм"])
            r_roof   = int(row["Толщина кровельных панелей (B6), мм"])
            r_span   = int(row["Номинальный пролёт (B8)"])
            r_length = int(row["Длина в осях (B9)"])
            r_panels = int(row["Кол-во панелей по высоте (B10), шт"])
            r_snow   = row["Снеговой район (B12)"].strip()
            r_wind   = row["Ветровой район (B13)"].strip()
            r_loc    = row["Тип местности (B14)"].strip()
            r_price  = parse_price(row["Результат (B33)"])
        except (KeyError, ValueError):
            continue

        if r_wall == wall_mm and r_roof == roof_mm and r_span == span and \
           r_length == length and r_panels == panels and \
           r_snow == snow and r_wind == wind:

            if r_loc == locality:
                best_price = r_price
                break
            else:
                fallback_price = r_price

    price = best_price if best_price is not None else fallback_price

    if price is None:
        return {
            "statusCode": 404,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": '{"error": "Price not found for given parameters"}',
        }

    import json
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        "body": json.dumps({
            "price": price,
            "params": {
                "wall_mm": wall_mm, "roof_mm": roof_mm,
                "span": span, "length": length, "panels": panels,
                "snow": snow, "wind": wind, "locality": locality,
            }
        }),
    }
