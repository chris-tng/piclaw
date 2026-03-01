import { describe, test, expect } from "bun:test";
import "../helpers.js";

import { parseToggle, parseQueueMode, splitArgs, parseTreeArgs, stripTrigger } from "../../src/agent-control/parser-utils.js";

describe("parseToggle", () => {
  test("returns true for on variants", () => {
    expect(parseToggle("on")).toBe(true);
    expect(parseToggle("true")).toBe(true);
    expect(parseToggle("yes")).toBe(true);
    expect(parseToggle("1")).toBe(true);
    expect(parseToggle("enable")).toBe(true);
    expect(parseToggle("enabled")).toBe(true);
  });

  test("returns false for off variants", () => {
    expect(parseToggle("off")).toBe(false);
    expect(parseToggle("false")).toBe(false);
    expect(parseToggle("no")).toBe(false);
    expect(parseToggle("0")).toBe(false);
    expect(parseToggle("disable")).toBe(false);
    expect(parseToggle("disabled")).toBe(false);
  });

  test("returns undefined for empty or unknown", () => {
    expect(parseToggle()).toBeUndefined();
    expect(parseToggle("")).toBeUndefined();
    expect(parseToggle("maybe")).toBeUndefined();
  });

  test("case insensitive", () => {
    expect(parseToggle("ON")).toBe(true);
    expect(parseToggle("OFF")).toBe(false);
    expect(parseToggle("True")).toBe(true);
  });
});

describe("parseQueueMode", () => {
  test("returns 'all'", () => {
    expect(parseQueueMode("all")).toBe("all");
  });

  test("returns 'one-at-a-time' for various inputs", () => {
    expect(parseQueueMode("one")).toBe("one-at-a-time");
    expect(parseQueueMode("one-at-a-time")).toBe("one-at-a-time");
    expect(parseQueueMode("one_at_a_time")).toBe("one-at-a-time");
    expect(parseQueueMode("single")).toBe("one-at-a-time");
  });

  test("returns undefined for empty or unknown", () => {
    expect(parseQueueMode()).toBeUndefined();
    expect(parseQueueMode("")).toBeUndefined();
    expect(parseQueueMode("unknown")).toBeUndefined();
  });
});

describe("splitArgs", () => {
  test("splits simple args", () => {
    expect(splitArgs("a b c")).toEqual(["a", "b", "c"]);
  });

  test("handles quoted strings", () => {
    expect(splitArgs('a "hello world" c')).toEqual(["a", "hello world", "c"]);
    expect(splitArgs("a 'hello world' c")).toEqual(["a", "hello world", "c"]);
  });

  test("handles empty input", () => {
    expect(splitArgs("")).toEqual([]);
  });

  test("handles multiple spaces and tabs", () => {
    expect(splitArgs("  a   b\tc  ")).toEqual(["a", "b", "c"]);
  });

  test("handles newlines", () => {
    expect(splitArgs("a\nb")).toEqual(["a", "b"]);
  });
});

describe("parseTreeArgs", () => {
  test("empty args", () => {
    const result = parseTreeArgs("");
    expect(result.targetId).toBeUndefined();
    expect(result.summarize).toBe(false);
    expect(result.mode).toBe("tail");
  });

  test("target id", () => {
    const result = parseTreeArgs("abc123");
    expect(result.targetId).toBe("abc123");
  });

  test("--summarize flag", () => {
    const result = parseTreeArgs("--summarize");
    expect(result.summarize).toBe(true);
  });

  test("--summary with custom instructions", () => {
    const result = parseTreeArgs('--summary "keep code only"');
    expect(result.summarize).toBe(true);
    expect(result.customInstructions).toBe("keep code only");
  });

  test("--replace flag", () => {
    const result = parseTreeArgs("--replace");
    expect(result.replaceInstructions).toBe(true);
  });

  test("--label flag", () => {
    const result = parseTreeArgs("--label my-label");
    expect(result.label).toBe("my-label");
  });

  test("--label= syntax", () => {
    const result = parseTreeArgs("--label=my-label");
    expect(result.label).toBe("my-label");
  });

  test("--head with limit", () => {
    const result = parseTreeArgs("--head 10");
    expect(result.mode).toBe("head");
    expect(result.limit).toBe(10);
  });

  test("--head= syntax", () => {
    const result = parseTreeArgs("--head=5");
    expect(result.mode).toBe("head");
    expect(result.limit).toBe(5);
  });

  test("--first= syntax", () => {
    const result = parseTreeArgs("--first=3");
    expect(result.mode).toBe("head");
    expect(result.limit).toBe(3);
  });

  test("--tail with limit", () => {
    const result = parseTreeArgs("--tail 20");
    expect(result.mode).toBe("tail");
    expect(result.limit).toBe(20);
  });

  test("--tail= syntax", () => {
    const result = parseTreeArgs("--tail=7");
    expect(result.mode).toBe("tail");
    expect(result.limit).toBe(7);
  });

  test("--last= syntax", () => {
    const result = parseTreeArgs("--last=4");
    expect(result.mode).toBe("tail");
    expect(result.limit).toBe(4);
  });

  test("--limit sets head mode by default", () => {
    const result = parseTreeArgs("--limit 15");
    expect(result.limit).toBe(15);
    expect(result.mode).toBe("head");
  });

  test("--limit= syntax", () => {
    const result = parseTreeArgs("--limit=8");
    expect(result.limit).toBe(8);
  });

  test("--offset sets head mode by default", () => {
    const result = parseTreeArgs("--offset 5");
    expect(result.offset).toBe(5);
    expect(result.mode).toBe("head");
  });

  test("--offset= syntax", () => {
    const result = parseTreeArgs("--offset=3");
    expect(result.offset).toBe(3);
  });

  test("--tail overrides --limit's default mode", () => {
    const result = parseTreeArgs("--tail --limit 10");
    expect(result.mode).toBe("tail");
    expect(result.limit).toBe(10);
  });

  test("--head without explicit limit", () => {
    const result = parseTreeArgs("--head");
    expect(result.mode).toBe("head");
    expect(result.limit).toBeUndefined();
  });

  test("target + flags combined", () => {
    const result = parseTreeArgs("abc --summarize --head 5");
    expect(result.targetId).toBe("abc");
    expect(result.summarize).toBe(true);
    expect(result.mode).toBe("head");
    expect(result.limit).toBe(5);
  });

  test("unknown flags are ignored", () => {
    const result = parseTreeArgs("--unknown --head 3");
    expect(result.mode).toBe("head");
    expect(result.limit).toBe(3);
  });
});

describe("stripTrigger", () => {
  test("strips trigger pattern", () => {
    const trigger = /(?:^|\s)@PiClaw\b/i;
    expect(stripTrigger("@PiClaw /model gpt-4", trigger)).toBe("/model gpt-4");
  });

  test("handles no trigger", () => {
    const trigger = /(?:^|\s)@PiClaw\b/i;
    expect(stripTrigger("/model gpt-4", trigger)).toBe("/model gpt-4");
  });

  test("handles no pattern", () => {
    expect(stripTrigger("  hello  ")).toBe("hello");
  });
});
