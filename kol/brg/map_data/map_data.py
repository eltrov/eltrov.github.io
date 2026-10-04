#!/usr/bin/env python3
"""Find every cell containing a given digit in the grids of map_data.txt.

Usage:  python map_data.py [digit] [input_file] [output_file]
        python map_data.py            -> digit 5, map_data.txt, cells_5.txt

python map_data.py 0 map_data.txt 0-floor.txt
python map_data.py 1 map_data.txt 1-wall1.txt
python map_data.py 2 map_data.txt 2-rocks.txt
python map_data.py 3 map_data.txt 3-decor.txt
python map_data.py 4 map_data.txt 4-poi.txt
python map_data.py 5 map_data.txt 5-wall2.txt
python map_data.py 6 map_data.txt 6-wall3.txt
python map_data.py 7 map_data.txt 7-wall4.txt

Each input line looks like:  <name><TAB>{"w":31,"grid":"0101...","pos":{...},...}
Everything before the first "{" is ignored. The grid string is read left to right,
w characters per row; index 0 is x0,y0. Coordinates are 0-based, matching data.txt.
Results are de-duplicated across all lines and written as "x,y" lines
(importable with the grid page's "Import highlights" button).
"""
import json
import sys


def main():
    digit = sys.argv[1] if len(sys.argv) > 1 else "5"
    src = sys.argv[2] if len(sys.argv) > 2 else "map_data.txt"
    dst = sys.argv[3] if len(sys.argv) > 3 else f"cells_{digit}.txt"

    found = set()
    lines_ok = 0

    with open(src, encoding="utf-8") as fh:
        for n, line in enumerate(fh, 1):
            line = line.strip()
            if not line:
                continue
            start = line.find("{")
            if start < 0:
                print(f"line {n}: no JSON found, skipped")
                continue
            try:
                data = json.loads(line[start:])
                grid, w = data["grid"], int(data["w"])
            except (ValueError, KeyError, TypeError) as err:
                print(f"line {n}: could not parse ({err}), skipped")
                continue

            if len(grid) % w:
                print(f"line {n}: grid length {len(grid)} is not a multiple of w={w}")
            for i, ch in enumerate(grid):
                if ch == digit:
                    found.add((i % w, i // w))
            lines_ok += 1

    cells = sorted(found, key=lambda p: (p[1], p[0]))
    with open(dst, "w", encoding="utf-8") as out:
        out.write("".join(f"{x},{y}\n" for x, y in cells))

    print(f"{lines_ok} grid(s) read, {len(cells)} unique cell(s) with '{digit}' -> {dst}")
    for x, y in cells:
        print(f"{x},{y}")


if __name__ == "__main__":
    main()
