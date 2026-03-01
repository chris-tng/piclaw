import { expect, test, afterEach } from "bun:test";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { getTestWorkspace, importFresh, setEnv } from "../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("agent pool aggregates streamed text and writes logs", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const { AgentPool } = await importFresh<typeof import("../src/agent-pool.js")>("../src/agent-pool.js");

  class StubSession {
    private listeners: Array<(event: any) => void> = [];
    subscribe(listener: (event: any) => void) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
    async prompt(_prompt: string) {
      const deltas = ["Hello", " ", "world"];
      for (const delta of deltas) {
        for (const listener of this.listeners) {
          listener({
            type: "message_update",
            assistantMessageEvent: { type: "text_delta", delta },
          });
        }
      }
    }
    async abort() {}
    dispose() {}
  }

  const pool = new AgentPool({
    createSession: async () => new StubSession() as any,
  });

  const result = await pool.runAgent("test", "web:default");
  expect(result.status).toBe("success");
  expect(result.result).toBe("Hello world");
  expect(process.env.PICLAW_CHAT_JID).toBeUndefined();

  const logsDir = join(process.env.PICLAW_WORKSPACE || ws.workspace, "logs");
  const logFiles = readdirSync(logsDir).filter((f) => f.startsWith("agent-") && f.endsWith(".log"));
  expect(logFiles.length).toBeGreaterThan(0);
  const latest = logFiles.sort().slice(-1)[0];
  const content = readFileSync(join(logsDir, latest), "utf8");
  expect(content).toContain("Hello world");
});
