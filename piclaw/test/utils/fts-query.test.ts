/**
 * test/utils/fts-query.test.ts – Tests for FTS query sanitization.
 */
import { expect, test, describe } from "bun:test";
import { sanitizeFtsQuery, isFtsOperatorQuery, prepareFtsQuery } from "../../src/utils/fts-query.js";

describe("isFtsOperatorQuery", () => {
  test("detects AND/OR/NOT keywords", () => {
    expect(isFtsOperatorQuery("foo AND bar")).toBe(true);
    expect(isFtsOperatorQuery("foo OR bar")).toBe(true);
    expect(isFtsOperatorQuery("NOT foo")).toBe(true);
    expect(isFtsOperatorQuery("NEAR(foo bar)")).toBe(true);
  });

  test("detects quoted phrases", () => {
    expect(isFtsOperatorQuery('"hello world"')).toBe(true);
    expect(isFtsOperatorQuery('foo "exact phrase" bar')).toBe(true);
  });

  test("detects grouping parentheses", () => {
    expect(isFtsOperatorQuery("(foo OR bar) AND baz")).toBe(true);
  });

  test("detects column prefix", () => {
    expect(isFtsOperatorQuery("content:hello")).toBe(true);
  });

  test("returns false for plain text", () => {
    expect(isFtsOperatorQuery("hello")).toBe(false);
    expect(isFtsOperatorQuery("hello world")).toBe(false);
    expect(isFtsOperatorQuery("pi-side-agents")).toBe(false);
    expect(isFtsOperatorQuery("some random query text")).toBe(false);
  });
});

describe("sanitizeFtsQuery", () => {
  test("passes simple words through", () => {
    expect(sanitizeFtsQuery("hello")).toBe("hello");
    expect(sanitizeFtsQuery("hello world")).toBe("hello world");
  });

  test("strips special FTS characters", () => {
    expect(sanitizeFtsQuery('hello "world"')).toBe("hello world");
    expect(sanitizeFtsQuery("hello(world)")).toBe("hello world");
    expect(sanitizeFtsQuery("hello:world")).toBe("hello world");
    expect(sanitizeFtsQuery("hello*")).toBe("hello");
  });

  test("quotes FTS keywords used as terms", () => {
    expect(sanitizeFtsQuery("and")).toBe('"and"');
    expect(sanitizeFtsQuery("or")).toBe('"or"');
    expect(sanitizeFtsQuery("not")).toBe('"not"');
    expect(sanitizeFtsQuery("near")).toBe('"near"');
    expect(sanitizeFtsQuery("foo and bar")).toBe('foo "and" bar');
  });

  test("strips leading hyphens (NOT prefix)", () => {
    expect(sanitizeFtsQuery("-hello")).toBe("hello");
    expect(sanitizeFtsQuery("--hello")).toBe("hello");
    expect(sanitizeFtsQuery("foo -bar")).toBe("foo bar");
  });

  test("returns null for empty/whitespace-only input", () => {
    expect(sanitizeFtsQuery("")).toBe(null);
    expect(sanitizeFtsQuery("   ")).toBe(null);
  });

  test("returns null when only special chars remain", () => {
    expect(sanitizeFtsQuery('"()*')).toBe(null);
  });

  test("handles hyphenated identifiers (like pi-side-agents)", () => {
    // hyphens inside tokens are fine; only leading hyphens are stripped
    const result = sanitizeFtsQuery("pi-side-agents");
    expect(result).toBe("pi-side-agents");
  });

  test("handles slash-separated paths", () => {
    const result = sanitizeFtsQuery("workspace/tmp/files");
    expect(result).toBe("workspace/tmp/files");
  });

  test("collapses multiple spaces", () => {
    expect(sanitizeFtsQuery("hello    world")).toBe("hello world");
  });
});

describe("prepareFtsQuery", () => {
  test("returns null for empty input", () => {
    expect(prepareFtsQuery("")).toBe(null);
    expect(prepareFtsQuery("   ")).toBe(null);
  });

  test("passes through operator queries unchanged", () => {
    expect(prepareFtsQuery("foo AND bar")).toBe("foo AND bar");
    expect(prepareFtsQuery('"exact phrase"')).toBe('"exact phrase"');
  });

  test("sanitizes plain multi-word queries", () => {
    expect(prepareFtsQuery("hello world")).toBe("hello world");
  });

  test("sanitizes queries with problematic chars", () => {
    const result = prepareFtsQuery("pi-side-agents worktree");
    expect(result).toBe("pi-side-agents worktree");
  });

  test("handles the real-world failures we hit today", () => {
    // These caused actual errors in tool_output_search during this session:

    // "no such column: side" — hyphenated token parsed as column ref
    expect(prepareFtsQuery("pi-side-agents")).toBe("pi-side-agents");

    // "fts5: syntax error near '/'" — slash in query
    expect(prepareFtsQuery("/agents")).toBe("/agents");

    // "no such column: capable" — compound term parsed as column
    expect(prepareFtsQuery("service-capable cross-client workbench")).toBe("service-capable cross-client workbench");

    // "no such column: commit" — hyphenated compound
    expect(prepareFtsQuery("auto-commit dashboard widget")).toBe("auto-commit dashboard widget");

    // "no such column: packages" — plain word treated as column
    expect(prepareFtsQuery("pi-packages install")).toBe("pi-packages install");
  });
});
