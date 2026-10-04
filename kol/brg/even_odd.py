#!/usr/bin/env python3
"""Sum the four seed letters in each cell and list the cells with an even (or odd) total.

Usage:  python seed_parity.py [even|odd] [output_file]
        python seed_parity.py            -> asks whether you want even or odd
        python seed_parity.py odd        -> writes highlights_odd.txt

Reads seed0.txt .. seed3.txt from the current folder (f0..f3). Each file is a block of
text: one line per row (y), one character per column (x), "?" = unknown.
Letters are scored A=1 .. Z=26 (case-insensitive). A cell is only scored when all four
files have a letter there; cells with any unknown (?, digit, space, missing) are skipped.
The output is one "x,y" per line, 0-based and sorted by row then column, and can be loaded
with the grid page's "Import highlights" button.
"""
import sys

SEED_FILES = [f"seed{f}.txt" for f in range(4)]


def read_grid(path):
    with open(path, encoding="utf-8") as fh:
        return [line.rstrip("\r\n") for line in fh if line.strip("\r\n")]


def value_at(grid, x, y):
    """A=1 .. Z=26, or None when the cell is unknown/blank/not a letter."""
    try:
        ch = grid[y][x]
    except IndexError:
        return None
    ch = ch.upper()
    return ord(ch) - 64 if "A" <= ch <= "Z" else None


def main():
    mode = sys.argv[1].lower() if len(sys.argv) > 1 else ""
    while mode not in ("even", "odd"):
        mode = input("Highlight cells whose sum is even or odd? [even/odd]: ").strip().lower()
    dst = sys.argv[2] if len(sys.argv) > 2 else f"highlights_{mode}.txt"
    want = 0 if mode == "even" else 1

    try:
        grids = [read_grid(p) for p in SEED_FILES]
    except FileNotFoundError as err:
        sys.exit(f"Missing seed file: {err.filename}")

    height = max(len(g) for g in grids)
    width = max((len(row) for g in grids for row in g), default=0)

    hits, skipped = [], 0
    for y in range(height):
        for x in range(width):
            vals = [value_at(g, x, y) for g in grids]
            if None in vals:
                skipped += 1
                continue
            if sum(vals) % 2 == want:
                hits.append((x, y))

    with open(dst, "w", encoding="utf-8") as out:
        out.write("".join(f"{x},{y}\n" for x, y in hits))

    print(f"Grid {width} x {height}: {len(hits)} cell(s) with an {mode} sum -> {dst}")
    print(f"{skipped} cell(s) skipped (at least one of the four seeds unknown)")


if __name__ == "__main__":
    main()
