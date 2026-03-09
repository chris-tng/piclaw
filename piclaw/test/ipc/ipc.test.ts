/**
 * test/ipc/ipc.test.ts – Tests for the IPC file-based messaging system.
 *
 * Verifies IPC file creation, watcher detection, message parsing,
 * scheduled task registration, and cleanup of processed files.
 */

import { beforeAll, afterAll, expect, test } from "bun:test";
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv, waitFor } from "../helpers.js";

let restoreEnv: (() => void) | null = null;
let db: typeof import("../../src/db.js");
let ipc: typeof import("../../src/ipc.js");
let config: typeof import("../../src/core/config.js");
let deps: import("../../src/ipc.js").IpcDeps;

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
  deps = {
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
  };
  ipc.startIpcWatcher(deps);

});


afterAll(() => {
  ipc.stopIpcWatcher();
  restoreEnv?.();
});

test("IPC message sends to web chat", async () => {
  const start = sentMessages.length;
  await ipc.processMessageCommand({ type: "message", chatJid: "web:default", text: "hello" }, deps);
  await waitFor(() => sentMessages.length > start);

  const msg = sentMessages[sentMessages.length - 1];
  expect(msg.jid).toBe("web:default");
  expect(msg.text).toBe("hello");
});

test("IPC schedule_task creates a due agent task", async () => {
  await ipc.processTaskCommand({
    type: "schedule_task",
    chatJid: "web:default",
    prompt: "say hi",
    schedule_type: "once",
    schedule_value: "2020-01-01T00:00:00.000Z",
  }, deps);

  await waitFor(() => db.getDueTasks().length > 0);

  const due = db.getDueTasks();
  expect(due.length).toBeGreaterThan(0);
  expect(due[0].task_kind ?? "agent").toBe("agent");
});

test("IPC schedule_task creates a due shell task", async () => {
  await ipc.processTaskCommand({
    type: "schedule_task",
    chatJid: "web:default",
    task_kind: "shell",
    command: "echo hi",
    schedule_type: "once",
    schedule_value: "2020-01-01T00:00:00.000Z",
  }, deps);

  await waitFor(() => db.getDueTasks().some((t) => t.task_kind === "shell"));

  const due = db.getDueTasks().find((t) => t.task_kind === "shell");
  expect(due?.command).toBe("echo hi");
});

test("IPC schedule_task rejects unsafe shell command", async () => {
  const start = sentMessages.length;
  await ipc.processTaskCommand({
    type: "schedule_task",
    chatJid: "web:default",
    task_kind: "shell",
    command: "rm -rf /",
    schedule_type: "once",
    schedule_value: "2020-01-01T00:00:00.000Z",
  }, deps);
  await waitFor(() => sentMessages.length > start);
  expect(sentMessages[sentMessages.length - 1].text).toContain("Cannot schedule shell task");
});

test("IPC resume_pending triggers resumePending handler", async () => {
  const start = resumePendingCalls.length;
  await ipc.processTaskCommand({ type: "resume_pending", chatJid: "web:default" }, deps);
  await waitFor(() => resumePendingCalls.length > start, 10000);
  expect(resumePendingCalls[resumePendingCalls.length - 1]?.chatJid).toBe("web:default");
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

  const start = sentMessages.length;
  await ipc.processTaskCommand({
    type: "update_task",
    taskId,
    chatJid: "web:default",
    model: "invalid/model",
  }, deps);
  await waitFor(() => sentMessages.length > start);
  const msg = sentMessages[sentMessages.length - 1];
  expect(msg.jid).toBe("web:default");
  expect(msg.text).toContain("Cannot update task");

  const task = db.getTaskById(taskId);
  expect(task?.model ?? null).toBe(null);
});

test("IPC update_task ignores invalid schedule values", async () => {
  const taskId = `task_schedule_${Date.now()}`;
  const originalNextRun = new Date(Date.now() + 60_000).toISOString();
  db.createTask({
    id: taskId,
    chat_jid: "web:default",
    prompt: "hello",
    model: null,
    schedule_type: "interval",
    schedule_value: "60000",
    next_run: originalNextRun,
    status: "active",
    created_at: new Date().toISOString(),
  });

  await ipc.processTaskCommand({
    type: "update_task",
    taskId,
    schedule_type: "interval",
    schedule_value: "not-a-number",
  }, deps);

  const task = db.getTaskById(taskId);
  expect(task?.next_run).toBe(originalNextRun);
});

test("IPC cleanup_tasks removes completed tasks and logs", async () => {
  const tasksDir = join(config.DATA_DIR, "ipc", "tasks");
  mkdirSync(tasksDir, { recursive: true });

  const completedId = `task_completed_${Date.now()}`;
  db.createTask({
    id: completedId,
    chat_jid: "web:default",
    prompt: "done",
    model: null,
    schedule_type: "once",
    schedule_value: new Date().toISOString(),
    next_run: null,
    status: "completed",
    created_at: new Date().toISOString(),
  });
  db.logTaskRun({
    task_id: completedId,
    run_at: new Date().toISOString(),
    duration_ms: 10,
    status: "success",
    result: "ok",
    error: null,
  });

  const activeId = `task_active_${Date.now()}`;
  db.createTask({
    id: activeId,
    chat_jid: "web:default",
    prompt: "active",
    model: null,
    schedule_type: "once",
    schedule_value: new Date().toISOString(),
    next_run: null,
    status: "active",
    created_at: new Date().toISOString(),
  });

  const start = sentMessages.length;
  await ipc.processTaskCommand({ type: "cleanup_tasks", chatJid: "web:default" }, deps);
  await waitFor(() => sentMessages.length > start, 10000);
  expect(sentMessages[sentMessages.length - 1].text).toContain("Cleaned up 1 completed task");
  expect(db.getTaskById(completedId)).toBeNull();
  expect(db.getTaskRunLogs(completedId).length).toBe(0);
  expect(db.getTaskById(activeId)).not.toBeNull();
});
