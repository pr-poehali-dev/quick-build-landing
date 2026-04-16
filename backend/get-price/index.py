import csv
import io
import json
import re
import urllib.request

SHEET_URL = "https://docs.google.com/spreadsheets/d/1OSqWDcBINlfd25rLZB3GoKyJb995tunDeXunIzjxT5M/export?format=csv&gid=1655703593"

# Кеш: { (wall,roof,span,length,panels,snow,wind,loc): (price_sandwich, price_profile) }
_CACHE: dict | None = None


def parse_price(raw: str) -> float:
    cleaned = re.sub(r"[^\d,]", "", raw).replace(",", ".")
    try:
        return float(cleaned)
    except Exception:
        return 0.0


def load_cache() -> dict:
    global _CACHE
    if _CACHE is not None:
        return _CACHE

    req = urllib.request.Request(SHEET_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=8) as resp:
        content = resp.read().decode("utf-8")

    reader = csv.DictReader(io.StringIO(content))
    cache = {}
    for row in reader:
        try:
            key = (
                int(row["Толщина стеновых панелей (B5), мм"]),
                int(row["Толщина кровельных панелей (B6), мм"]),
                int(row["Номинальный пролёт (B8)"]),
                int(row["Длина в осях (B9)"]),
                int(row["Кол-во панелей по высоте (B10), шт"]),
                row["Снеговой район (B12)"].strip(),
                row["Ветровой район (B13)"].strip(),
                row["Тип местности (B14)"].strip(),
            )
            cache[key] = (
                parse_price(row["Результат Сэндвич"]),
                parse_price(row["Результат Профлист"]),
            )
        except (KeyError, ValueError):
            continue

    _CACHE = cache
    return _CACHE


def handler(event: dict, context) -> dict:
    """Возвращает цену здания (сэндвич и профлист) из кешированной таблицы Google Sheets."""

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
        wall_mm  = int(params.get("wall_mm", 100))
        roof_mm  = int(params.get("roof_mm", 100))
        span     = int(params.get("span", 12))
        length   = int(params.get("length", 24))
        panels   = int(params.get("panels", 4))
        snow     = params.get("snow", "III")
        wind     = params.get("wind", "II")
        locality = params.get("locality", "B")
    except (ValueError, TypeError) as e:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": f"Bad params: {e}"}),
        }

    cache = load_cache()

    key = (wall_mm, roof_mm, span, length, panels, snow, wind, locality)
    prices = cache.get(key)

    # Фолбэк: другой тип местности
    if prices is None:
        alt_loc = "А" if locality == "B" else "B"
        prices = cache.get((wall_mm, roof_mm, span, length, panels, snow, wind, alt_loc))

    # Фолбэк: ближайший ветровой район (I→II→III→...)
    if prices is None:
        wind_order = ["I", "II", "III", "IV", "V", "VI", "VII"]
        for w in wind_order:
            prices = cache.get((wall_mm, roof_mm, span, length, panels, snow, w, locality))
            if prices:
                break

    if prices is None:
        return {
            "statusCode": 404,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Price not found", "params": {
                "wall_mm": wall_mm, "roof_mm": roof_mm, "span": span,
                "length": length, "panels": panels, "snow": snow,
                "wind": wind, "locality": locality,
            }}),
        }

    price_sandwich, price_profile = prices

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        "body": json.dumps({
            "price_sandwich": price_sandwich,
            "price_profile": price_profile,
            "params": {
                "wall_mm": wall_mm, "roof_mm": roof_mm,
                "span": span, "length": length, "panels": panels,
                "snow": snow, "wind": wind, "locality": locality,
            },
        }),
    }
