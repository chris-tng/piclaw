import { expect, test, afterEach } from "bun:test";
import { existsSync } from "fs";
import { getTestWorkspace, setEnv } from "../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("save and search tool output", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../src/db.js");
  db.initDatabase();

  const toolOutput = await import("../../src/tool-output.js");
  const text = "hello world\nthis is a test\nsearchable content";
  const saved = toolOutput.saveToolOutput(text, { source: "test" });

  expect(existsSync(saved.path)).toBe(true);
  expect(saved.lineCount).toBe(3);

  const snippets = toolOutput.searchToolOutput(saved.id, "searchable", 5);
  expect(snippets.length).toBeGreaterThan(0);
});

test("prune removes old outputs", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../src/db.js");
  db.initDatabase();

  const toolOutput = await import("../../src/tool-output.js");
  const oldDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
  const saved = toolOutput.saveToolOutput("old output", { createdAt: oldDate });
  expect(existsSync(saved.path)).toBe(true);

  const removed = toolOutput.pruneToolOutputs(7);
  expect(removed).toBeGreaterThan(0);
  expect(existsSync(saved.path)).toBe(false);
});
