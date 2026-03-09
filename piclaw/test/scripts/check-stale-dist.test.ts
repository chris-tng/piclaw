import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { findStaleDistFiles } from "../../scripts/check-stale-dist.ts";

describe("check-stale-dist", () => {
  test("returns empty when dist is missing", () => {
    const dir = mkdtempSync(join(tmpdir(), "stale-dist-"));
    try {
      mkdirSync(join(dir, "src"), { recursive: true });
      writeFileSync(join(dir, "src", "index.ts"), "export {};\n");
      expect(findStaleDistFiles(dir)).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("detects stale dist files not present in src", () => {
    const dir = mkdtempSync(join(tmpdir(), "stale-dist-"));
    try {
      mkdirSync(join(dir, "src", "a"), { recursive: true });
      mkdirSync(join(dir, "dist", "a"), { recursive: true });
      writeFileSync(join(dir, "src", "a", "ok.ts"), "export {};\n");
      writeFileSync(join(dir, "dist", "a", "ok.js"), "\n");
      writeFileSync(join(dir, "dist", "legacy.js"), "\n");

      expect(findStaleDistFiles(dir)).toEqual(["dist/legacy.js"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("ignores dist files with matching source file", () => {
    const dir = mkdtempSync(join(tmpdir(), "stale-dist-"));
    try {
      mkdirSync(join(dir, "src", "nested"), { recursive: true });
      mkdirSync(join(dir, "dist", "nested"), { recursive: true });
      writeFileSync(join(dir, "src", "nested", "file.ts"), "export {};\n");
      writeFileSync(join(dir, "dist", "nested", "file.js"), "\n");

      expect(findStaleDistFiles(dir)).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
