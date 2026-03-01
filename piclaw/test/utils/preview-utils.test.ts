import { describe, test, expect } from "bun:test";
import "../helpers.js";

import {
  splitLines,
  buildPreviewLines,
  truncateLine,
  countSoftLines,
  countSoftLine,
} from "../../src/utils/preview.js";

describe("preview utils", () => {
  test("splitLines normalizes and splits", () => {
    expect(splitLines("")).toEqual([]);
    expect(splitLines("one\ntwo")).toEqual(["one", "two"]);
    expect(splitLines("one\r\ntwo\rthree")).toEqual(["one", "two", "three"]);
    expect(splitLines("one\n")).toEqual(["one", ""]);
  });

  test("truncateLine respects max length", () => {
    expect(truncateLine("short", 10)).toBe("short");
    expect(truncateLine("longer", 3)).toBe("lon…");
    expect(truncateLine("same", 0)).toBe("same");
  });

  test("buildPreviewLines returns preview and omitted count", () => {
    const { preview, omittedLines } = buildPreviewLines("a\nb\nc", {
      maxLines: 2,
      includeOmittedLine: true,
    });
    expect(preview).toBe("a\nb\n… (1 more lines)");
    expect(omittedLines).toBe(1);
  });

  test("buildPreviewLines truncates long lines", () => {
    const { preview } = buildPreviewLines("abcdef", { maxLines: 1, maxLineLength: 3 });
    expect(preview).toBe("abc…");
  });

  test("countSoftLine and countSoftLines", () => {
    expect(countSoftLine("", 5)).toBe(1);
    expect(countSoftLine("12345", 2)).toBe(3);
    expect(countSoftLines(["12345", ""], 2)).toBe(4);
  });
});
