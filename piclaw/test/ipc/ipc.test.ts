import { beforeAll, beforeEach, afterAll, expect, test } from "bun:test";
import { mkdirSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv, waitFor } from "../helpers.js";

let restoreEnv: (() => void) | null = null;
let db: typeof import("../../src/db.js");
let ipc: typeof import("../../src/ipc.js");

const sentMessages: Array<{ jid: string; text: string }> = [];
const sentNudges: string[] = [];

beforeAll(async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  db = await import("../../src/db.js");
  db.initDatabase();

  ipc = await import("../../src/ipc.js");
  ipc.startIpcWatcher({
    sendMessage: async (jid, text) => {
      sentMessages.push({ jid, text });
    },
    sendNudge: async (text) => {
      sentNudges.push(text);
    },
  });

});

beforeEach(() => {
  sentMessages.length = 0;
  sentNudges.length = 0;
});

afterAll(() => {
  restoreEnv?.();
});

test("IPC message sends to web chat and removes file", async () => {
  const messagesDir = join(process.env.PICLAW_DATA!, "ipc", "messages");
  mkdirSync(messagesDir, { recursive: true });
  const filePath = join(messagesDir, `msg_${Date.now()}.json`);
  writeFileSync(
    filePath,
    JSON.stringify({ type: "message", chatJid: "web:default", text: "hello" })
  );

  await waitFor(() => sentMessages.length === 1);

  expect(sentMessages.length).toBe(1);
  expect(sentMessages[0].jid).toBe("web:default");
  expect(sentMessages[0].text).toBe("hello");
  expect(readdirSync(messagesDir).length).toBe(0);
});

test("IPC schedule_task creates a due task", async () => {
  const tasksDir = join(process.env.PICLAW_DATA!, "ipc", "tasks");
  mkdirSync(tasksDir, { recursive: true });
  const filePath = join(tasksDir, `task_${Date.now()}.json`);
  writeFileSync(
    filePath,
    JSON.stringify({
      type: "schedule_task",
      chatJid: "web:default",
      prompt: "say hi",
      schedule_type: "once",
      schedule_value: "2020-01-01T00:00:00.000Z",
    })
  );

  await waitFor(() => db.getDueTasks().length > 0);

  const due = db.getDueTasks();
  expect(due.length).toBeGreaterThan(0);
});
