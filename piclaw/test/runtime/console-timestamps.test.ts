/**
 * test/runtime/console-timestamps.test.ts – Verify console timestamp patching.
 */
import { describe, expect, test, afterEach } from "bun:test";
import { patchConsoleTimestamps } from "../../src/runtime/console-timestamps.js";

describe("patchConsoleTimestamps", () => {
  const origLog = console.log;
  const origWarn = console.warn;
  const origError = console.error;

  afterEach(() => {
    // Restore originals after each test
    console.log = origLog;
    console.warn = origWarn;
    console.error = origError;
  });

  test("prefixes console.log with ISO timestamp", () => {
    const captured: unknown[][] = [];
    console.log = (...args: unknown[]) => { captured.push(args); };
    patchConsoleTimestamps();

    console.log("hello world");

    expect(captured.length).toBe(1);
    const [prefix, ...rest] = captured[0];
    expect(typeof prefix).toBe("string");
    expect(prefix).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]$/);
    expect(rest).toEqual(["hello world"]);
  });

  test("prefixes console.warn with ISO timestamp", () => {
    const captured: unknown[][] = [];
    console.warn = (...args: unknown[]) => { captured.push(args); };
    patchConsoleTimestamps();

    console.warn("warning!");

    expect(captured.length).toBe(1);
    expect(captured[0][0]).toMatch(/^\[.*Z\]$/);
    expect(captured[0][1]).toBe("warning!");
  });

  test("prefixes console.error with ISO timestamp", () => {
    const captured: unknown[][] = [];
    console.error = (...args: unknown[]) => { captured.push(args); };
    patchConsoleTimestamps();

    console.error("error!", 42);

    expect(captured.length).toBe(1);
    expect(captured[0][0]).toMatch(/^\[.*Z\]$/);
    expect(captured[0][1]).toBe("error!");
    expect(captured[0][2]).toBe(42);
  });

  test("passes through multiple arguments", () => {
    const captured: unknown[][] = [];
    console.log = (...args: unknown[]) => { captured.push(args); };
    patchConsoleTimestamps();

    console.log("a", "b", 3, { x: 1 });

    expect(captured[0].length).toBe(5); // timestamp + 4 args
    expect(captured[0][1]).toBe("a");
    expect(captured[0][2]).toBe("b");
    expect(captured[0][3]).toBe(3);
    expect(captured[0][4]).toEqual({ x: 1 });
  });
});
