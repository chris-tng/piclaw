import { describe, test, expect } from "bun:test";
import "../helpers.js";

import { readEnvFile } from "../../src/env.js";
import { writeFileSync, mkdtempSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("readEnvFile", () => {
  const origCwd = process.cwd();
  let tmpDir: string;

  const setup = (content: string) => {
    tmpDir = mkdtempSync(join(tmpdir(), "env-test-"));
    writeFileSync(join(tmpDir, ".env"), content);
    process.chdir(tmpDir);
  };

  const cleanup = () => {
    process.chdir(origCwd);
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  };

  test("reads specified keys", () => {
    setup("FOO=bar\nBAZ=qux\nIGNORED=value");
    try {
      const result = readEnvFile(["FOO", "BAZ"]);
      expect(result.FOO).toBe("bar");
      expect(result.BAZ).toBe("qux");
      expect(result.IGNORED).toBeUndefined();
    } finally {
      cleanup();
    }
  });

  test("strips quotes", () => {
    setup('KEY1="hello"\nKEY2=\'world\'');
    try {
      const result = readEnvFile(["KEY1", "KEY2"]);
      expect(result.KEY1).toBe("hello");
      expect(result.KEY2).toBe("world");
    } finally {
      cleanup();
    }
  });

  test("skips comments and empty lines", () => {
    setup("# comment\n\nKEY=value\n  # another comment");
    try {
      const result = readEnvFile(["KEY"]);
      expect(result.KEY).toBe("value");
    } finally {
      cleanup();
    }
  });

  test("skips lines without =", () => {
    setup("NOEQUALS\nKEY=value");
    try {
      const result = readEnvFile(["NOEQUALS", "KEY"]);
      expect(result.NOEQUALS).toBeUndefined();
      expect(result.KEY).toBe("value");
    } finally {
      cleanup();
    }
  });

  test("returns empty when no .env file", () => {
    const tmp = mkdtempSync(join(tmpdir(), "env-nofile-"));
    process.chdir(tmp);
    try {
      const result = readEnvFile(["FOO"]);
      expect(result).toEqual({});
    } finally {
      process.chdir(origCwd);
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test("skips empty values", () => {
    setup("KEY=");
    try {
      const result = readEnvFile(["KEY"]);
      expect(result.KEY).toBeUndefined();
    } finally {
      cleanup();
    }
  });
});
