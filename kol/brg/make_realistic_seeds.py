#!/usr/bin/env python3
"""Build realistic_seed0.txt .. realistic_seed3.txt from seed0.txt .. seed3.txt.

Usage:  python make_realistic_seeds.py        (run in the folder that holds the seed files)

In the "realistic" view, a cell shows what you see standing in it and looking out each way,
so each f value comes from a neighbouring cell of the same seed file:

    realistic_seed0 (x, y) = seed0 (x,   y-1)     looking N
    realistic_seed1 (x, y) = seed1 (x+1, y  )     looking E
    realistic_seed2 (x, y) = seed2 (x,   y+1)     looking S
    realistic_seed3 (x, y) = seed3 (x-1, y  )     looking W

Only cells whose four neighbours all exist are kept, i.e. x and y from 1 to 29 on the
30-wide (0..30) grid, so each output is a 29 x 29 block. Output row 0 / column 0 is
the cell at x1,y1. Unknown placeholders ("?", digits) are copied through unchanged.
"""
LAST = 30            # grid runs 0..LAST in x and y
LO, HI = 1, LAST - 1  # kept range (inclusive): 1..29

# f -> (dx, dy) offset of the source cell relative to the output cell
OFFSET = {0: (0, -1), 1: (1, 0), 2: (0, 1), 3: (-1, 0)}


def read_grid(path):
    with open(path, encoding="utf-8") as fh:
        return [line.rstrip("\r\n") for line in fh if line.strip("\r\n")]


def char_at(grid, x, y):
    try:
        return grid[y][x] if x >= 0 and y >= 0 else "?"
    except IndexError:
        return "?"


def main():
    for f, (dx, dy) in OFFSET.items():
        src = f"seed{f}.txt"
        dst = f"realistic_seed{f}.txt"
        try:
            grid = read_grid(src)
        except FileNotFoundError:
            raise SystemExit(f"Missing {src}")

        rows = ["".join(char_at(grid, x + dx, y + dy) for x in range(LO, HI + 1))
                for y in range(LO, HI + 1)]

        with open(dst, "w", encoding="utf-8") as out:
            out.write("\n".join(rows) + "\n")
        print(f"{src} -> {dst}  ({len(rows[0])} x {len(rows)})")


if __name__ == "__main__":
    main()
