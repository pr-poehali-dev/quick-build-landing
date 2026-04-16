import csv
import io
import json
import re
import urllib.request

SHEET_URL = "https://docs.google.com/spreadsheets/d/1b5-gvNm08ZrYC_USf2pSWppSH1ZS3ALgfPKZmbH88OY/export?format=csv"

# Кеш: { (wall,roof,span,length,panels,snow,wind): (price_sandwich, price_profile) }
_CACHE: dict = {}


def parse_price(raw: str) -> float:
    cleaned = re.sub(r"[^\d,]", "", raw).replace(",", ".")
    try:
        return float(cleaned)
    except Exception:
        return 0.0


def _build_cache() -> dict:
    req = urllib.request.Request(SHEET_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
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
            )
            cache[key] = (
                parse_price(row["Результат Сэндвич"]),
                parse_price(row["Результат Профлист"]),
            )
        except (KeyError, ValueError):
            continue
    return cache


# Загружаем при старте контейнера — первый запрос уже мгновенный
try:
    _CACHE = _build_cache()
except Exception:
    _CACHE = {}


def get_prices(wall_mm, roof_mm, span, length, panels, snow, wind):
    key = (wall_mm, roof_mm, span, length, panels, snow, wind)
    prices = _CACHE.get(key)
    if prices:
        return prices

    # Фолбэк: перебираем ближайшие ветровые районы
    wind_order = ["I", "II", "III", "IV", "V", "VI", "VII"]
    for w in wind_order:
        prices = _CACHE.get((wall_mm, roof_mm, span, length, panels, snow, w))
        if prices:
            return prices

    # Фолбэк: перебираем снеговые районы
    snow_order = ["I", "II", "III", "IV", "V", "VI", "VII"]
    for s in snow_order:
        prices = _CACHE.get((wall_mm, roof_mm, span, length, panels, s, wind))
        if prices:
            return prices

    return None


def handler(event: dict, context) -> dict:
    """Возвращает цену здания (сэндвич и профлист) из таблицы, загруженной при старте контейнера."""

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
        wall_mm = int(params.get("wall_mm", 100))
        roof_mm = int(params.get("roof_mm", 100))
        span    = int(params.get("span", 12))
        length  = int(params.get("length", 24))
        panels  = int(params.get("panels", 4))
        snow    = params.get("snow", "III")
        wind    = params.get("wind", "II")
    except (ValueError, TypeError) as e:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": f"Bad params: {e}"}),
        }

    # Если кеш пустой (контейнер стартовал с ошибкой) — пробуем загрузить
    global _CACHE
    if not _CACHE:
        try:
            _CACHE = _build_cache()
        except Exception as e:
            return {
                "statusCode": 503,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": f"Cache unavailable: {e}"}),
            }

    prices = get_prices(wall_mm, roof_mm, span, length, panels, snow, wind)

    if prices is None:
        return {
            "statusCode": 404,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Price not found", "params": {
                "wall_mm": wall_mm, "roof_mm": roof_mm, "span": span,
                "length": length, "panels": panels, "snow": snow, "wind": wind,
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
            "price_profile":  price_profile,
            "params": {
                "wall_mm": wall_mm, "roof_mm": roof_mm,
                "span": span, "length": length, "panels": panels,
                "snow": snow, "wind": wind,
            },
        }),
    }
