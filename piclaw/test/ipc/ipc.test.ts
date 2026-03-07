/**
 * test/ipc/ipc.test.ts – Tests for the IPC file-based messaging system.
 *
 * Verifies IPC file creation, watcher detection, message parsing,
 * scheduled task registration, and cleanup of processed files.
 */

import { beforeAll, beforeEach, afterAll, expect, test } from "bun:test";
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv, waitFor } from "../helpers.js";

let restoreEnv: (() => void) | null = null;
let db: typeof import("../../src/db.js");
let ipc: typeof import("../../src/ipc.js");
let config: typeof import("../../src/core/config.js");

const sentMessages: Array<{ jid: string; text: string }> = [];
const sentNudges: string[] = [];
const resumedChats: Array<Record<string, any>> = [];
const resumePendingCalls: Array<Record<string, any> | undefined> = [];

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
  config = await import("../../src/core/config.js");
  ipc.startIpcWatcher({
    sendMessage: async (jid, text) => {
      sentMessages.push({ jid, text });
    },
    sendNudge: async (text) => {
      sentNudges.push(text);
    },
    resolveModel: (input) => {
      if (input === "valid/model") return { model: "valid/model" };
      return { error: "Invalid model." };
    },
    resumeChat: async (data) => {
      resumedChats.push(data);
    },
    resumePending: async (data) => {
      resumePendingCalls.push(data);
    },
  });

});

beforeEach(() => {
  sentMessages.length = 0;
  sentNudges.length = 0;
  resumedChats.length = 0;
  resumePendingCalls.length = 0;
});

afterAll(() => {
  restoreEnv?.();
});

test("IPC message sends to web chat and removes file", async () => {
  const messagesDir = join(config.DATA_DIR, "ipc", "messages");
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
  const tasksDir = join(config.DATA_DIR, "ipc", "tasks");
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

test("IPC resume_pending triggers resumePending handler", async () => {
  const tasksDir = join(config.DATA_DIR, "ipc", "tasks");
  mkdirSync(tasksDir, { recursive: true });
  const filePath = join(tasksDir, `resume_${Date.now()}.json`);
  writeFileSync(
    filePath,
    JSON.stringify({
      type: "resume_pending",
      chatJid: "web:default",
    })
  );

  await waitFor(() => resumePendingCalls.length === 1);
  expect(resumePendingCalls[0]?.chatJid).toBe("web:default");
});

test("IPC renames malformed task files", async () => {
  const ipcDir = join(config.DATA_DIR, "ipc");
  const tasksDir = join(ipcDir, "tasks");
  mkdirSync(tasksDir, { recursive: true });
  const fileName = `bad_${Date.now()}.json`;
  const filePath = join(tasksDir, fileName);
  writeFileSync(filePath, "{not valid json");

  await waitFor(() => readdirSync(ipcDir).some((file) => file === `error-${fileName}`));

  const errorPath = join(ipcDir, `error-${fileName}`);
  expect(readdirSync(tasksDir).includes(fileName)).toBe(false);
  expect(readdirSync(ipcDir).includes(`error-${fileName}`)).toBe(true);
  unlinkSync(errorPath);
});

test("IPC update_task with invalid model reports error", async () => {
  const tasksDir = join(config.DATA_DIR, "ipc", "tasks");
  mkdirSync(tasksDir, { recursive: true });

  const taskId = `task_${Date.now()}`;
  db.createTask({
    id: taskId,
    chat_jid: "web:default",
    prompt: "hello",
    model: null,
    schedule_type: "once",
    schedule_value: new Date().toISOString(),
    next_run: new Date().toISOString(),
    status: "active",
    created_at: new Date().toISOString(),
  });

  const filePath = join(tasksDir, `update_${Date.now()}.json`);
  writeFileSync(
    filePath,
    JSON.stringify({
      type: "update_task",
      taskId,
      chatJid: "web:default",
      model: "invalid/model",
    })
  );

  await waitFor(() => sentMessages.length === 1);
  expect(sentMessages[0].jid).toBe("web:default");
  expect(sentMessages[0].text).toContain("Cannot update task");

  const task = db.getTaskById(taskId);
  expect(task?.model ?? null).toBe(null);
});
