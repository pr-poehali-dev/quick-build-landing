#!/usr/bin/env python3
"""Fix smart/curly quotes in src/pages/Index.tsx"""
import sys

filepath = "src/pages/Index.tsx"

with open(filepath, "rb") as f:
    content = f.read()

# Smart quote Unicode characters encoded in UTF-8:
# U+201C LEFT DOUBLE QUOTATION MARK  -> UTF-8: 0xE2 0x80 0x9C
# U+201D RIGHT DOUBLE QUOTATION MARK -> UTF-8: 0xE2 0x80 0x9D
# U+2018 LEFT SINGLE QUOTATION MARK  -> UTF-8: 0xE2 0x80 0x98
# U+2019 RIGHT SINGLE QUOTATION MARK -> UTF-8: 0xE2 0x80 0x99

replacements = [
    (b'\xe2\x80\x9c', b'"'),  # U+201C -> ASCII "
    (b'\xe2\x80\x9d', b'"'),  # U+201D -> ASCII "
    (b'\xe2\x80\x98', b"'"),  # U+2018 -> ASCII '
    (b'\xe2\x80\x99', b"'"),  # U+2019 -> ASCII '
]

original = content
count_total = 0
for old_bytes, new_bytes in replacements:
    count = content.count(old_bytes)
    if count > 0:
        print(f"Replacing {count} occurrence(s) of {old_bytes!r} with {new_bytes!r}")
        content = content.replace(old_bytes, new_bytes)
        count_total += count

if count_total == 0:
    print("No smart quotes found in the file.")
    sys.exit(0)

with open(filepath, "wb") as f:
    f.write(content)

print(f"Done. Replaced {count_total} smart quote(s) total.")
print(f"File saved: {filepath}")
