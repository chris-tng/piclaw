import { describe, expect, test } from "bun:test";
import { extractPackedFiles, findBlockedPackEntries } from "../../scripts/pack-hygiene.ts";

describe("pack-hygiene", () => {
  test("extractPackedFiles parses bun pack output", () => {
    const output = [
      "packed 2.96KB package.json",
      "packed 4.27KB docs/tool-context-optimizations.md",
      "packed 1.00KB src/index.ts",
      "",
    ].join("\n");

    expect(extractPackedFiles(output)).toEqual([
      "package.json",
      "docs/tool-context-optimizations.md",
      "src/index.ts",
    ]);
  });

  test("findBlockedPackEntries flags blocked prefixes", () => {
    const files = [
      "src/index.ts",
      "test/remote/ssrf.test.ts",
      "coverage/lcov.info",
      "dist/runtime.js",
    ];

    expect(findBlockedPackEntries(files)).toEqual([
      "test/remote/ssrf.test.ts",
      "coverage/lcov.info",
      "dist/runtime.js",
    ]);
  });

  test("findBlockedPackEntries allows runtime files", () => {
    const files = ["src/index.ts", "web/static/index.html", "docs/architecture.md"];
    expect(findBlockedPackEntries(files)).toEqual([]);
  });
});
