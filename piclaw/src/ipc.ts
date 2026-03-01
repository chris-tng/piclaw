import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync } from "fs";
import { join } from "path";
import { CronExpressionParser } from "cron-parser";
import { DATA_DIR, IPC_POLL_INTERVAL, TIMEZONE } from "./config.js";
import { createTask, deleteTask, getTaskById, updateTask } from "./db.js";

export interface IpcDeps {
  sendMessage: (jid: string, text: string) => Promise<void>;
  sendNudge?: (text: string) => Promise<void>;
}

let running = false;

export function startIpcWatcher(deps: IpcDeps): void {
  if (running) return;
  running = true;

  const ipcDir = join(DATA_DIR, "ipc");
  const tasksDir = join(ipcDir, "tasks");
  const messagesDir = join(ipcDir, "messages");
  mkdirSync(tasksDir, { recursive: true });
  mkdirSync(messagesDir, { recursive: true });

  const poll = async () => {
    // Process outbound messages
    try {
      if (existsSync(messagesDir)) {
        for (const file of readdirSync(messagesDir).filter((f) => f.endsWith(".json"))) {
          const fp = join(messagesDir, file);
          try {
            const data = JSON.parse(readFileSync(fp, "utf-8"));
            if (data.type === "message" && data.chatJid && data.text) {
              await deps.sendMessage(data.chatJid, data.text);
              if (data.noNudge !== true) {
                await deps.sendNudge?.(data.text);
              }
            }
            unlinkSync(fp);
          } catch (e) { console.error(`[ipc] Error processing message ${file}:`, e); try { renameSync(fp, join(ipcDir, `error-${file}`)); } catch {} }
        }
      }
    } catch (e) { console.error("[ipc] Error reading messages dir:", e); }

    // Process task commands
    try {
      if (existsSync(tasksDir)) {
        for (const file of readdirSync(tasksDir).filter((f) => f.endsWith(".json"))) {
          const fp = join(tasksDir, file);
          try {
            const data = JSON.parse(readFileSync(fp, "utf-8"));
            processTaskCommand(data);
            unlinkSync(fp);
          } catch (e) { console.error(`[ipc] Error processing task ${file}:`, e); try { renameSync(fp, join(ipcDir, `error-${file}`)); } catch {} }
        }
      }
    } catch (e) { console.error("[ipc] Error reading tasks dir:", e); }

    setTimeout(poll, IPC_POLL_INTERVAL);
  };

  poll();
  console.log("[ipc] Watcher started");
}

function processTaskCommand(data: Record<string, any>): void {
  switch (data.type) {
    case "schedule_task": {
      if (!data.prompt || !data.schedule_type || !data.schedule_value || !data.chatJid) return;
      let nextRun: string | null = null;
      if (data.schedule_type === "cron") {
        try { nextRun = CronExpressionParser.parse(data.schedule_value, { tz: TIMEZONE }).next().toISOString(); } catch { return; }
      } else if (data.schedule_type === "interval") {
        const ms = parseInt(data.schedule_value, 10);
        if (isNaN(ms) || ms <= 0) return;
        nextRun = new Date(Date.now() + ms).toISOString();
      } else if (data.schedule_type === "once") {
        const d = new Date(data.schedule_value);
        if (isNaN(d.getTime())) return;
        nextRun = d.toISOString();
      }
      const model = typeof data.model === "string" && data.model.trim() ? data.model.trim() : null;
      createTask({ id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, chat_jid: data.chatJid, prompt: data.prompt, model, schedule_type: data.schedule_type, schedule_value: data.schedule_value, next_run: nextRun, status: "active", created_at: new Date().toISOString() });
      break;
    }
    case "pause_task": { const t = data.taskId && getTaskById(data.taskId); if (t) updateTask(data.taskId, { status: "paused" }); break; }
    case "resume_task": { const t = data.taskId && getTaskById(data.taskId); if (t) updateTask(data.taskId, { status: "active" }); break; }
    case "cancel_task": { const t = data.taskId && getTaskById(data.taskId); if (t) deleteTask(data.taskId); break; }
  }
}
