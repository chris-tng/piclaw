/**
 * ipc.ts – Inter-Process Communication watcher for file-based task commands.
 *
 * External processes (skills, scripts, the reload flow) communicate with the
 * running piclaw instance by dropping JSON files into the IPC directories:
 *   - `<DATA_DIR>/ipc/messages/*.json` – outbound messages to send.
 *   - `<DATA_DIR>/ipc/tasks/*.json`    – task lifecycle commands (schedule,
 *     pause, resume, cancel, update, cleanup, resume_chat, resume_pending).
 *
 * The watcher polls these directories every IPC_POLL_INTERVAL ms, processes
 * each file, and deletes it on success (or renames it to `error-*` on failure).
 *
 * Consumers:
 *   - runtime.ts calls startIpcWatcher() at startup, passing in the required
 *     dependency functions (sendMessage, sendNudge, resolveModel, etc.).
 *   - The `schedule` skill writes task files to trigger scheduled tasks.
 *   - The `send-message` skill writes message files for immediate delivery.
 *   - The reload script writes `resume_pending` tasks to resume after restart.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync } from "fs";
import { join } from "path";
import { CronExpressionParser } from "cron-parser";
import { DATA_DIR, IPC_POLL_INTERVAL, TIMEZONE } from "./core/config.js";
import { createTask, deleteTask, getTaskById, updateTask } from "./db.js";
import { createUuid } from "./utils/ids.js";
import { validateShellCommand, validateShellCwd } from "./utils/task-validation.js";
/** Guard to prevent starting the watcher more than once. */
let running = false;
/**
 * Start the IPC directory watcher. Polls for new JSON files in the messages
 * and tasks directories on a recurring timer.
 *
 * Called once by runtime.ts during application startup.
 */
export function startIpcWatcher(deps) {
    if (running)
        return;
    running = true;
    const ipcDir = join(DATA_DIR, "ipc");
    const tasksDir = join(ipcDir, "tasks");
    const messagesDir = join(ipcDir, "messages");
    mkdirSync(tasksDir, { recursive: true });
    mkdirSync(messagesDir, { recursive: true });
    const poll = async () => {
        // --- Process outbound message files ---
        try {
            if (existsSync(messagesDir)) {
                for (const file of readdirSync(messagesDir).filter((f) => f.endsWith(".json"))) {
                    const fp = join(messagesDir, file);
                    try {
                        const data = JSON.parse(readFileSync(fp, "utf-8"));
                        await processMessageCommand(data, deps);
                        unlinkSync(fp);
                    }
                    catch (e) {
                        console.error(`[ipc] Error processing message ${file}:`, e);
                        try {
                            renameSync(fp, join(ipcDir, `error-${file}`));
                        }
                        catch { }
                    }
                }
            }
        }
        catch (e) {
            console.error("[ipc] Error reading messages dir:", e);
        }
        // --- Process task command files ---
        try {
            if (existsSync(tasksDir)) {
                for (const file of readdirSync(tasksDir).filter((f) => f.endsWith(".json"))) {
                    const fp = join(tasksDir, file);
                    try {
                        const data = JSON.parse(readFileSync(fp, "utf-8"));
                        await processTaskCommand(data, deps);
                        unlinkSync(fp);
                    }
                    catch (e) {
                        console.error(`[ipc] Error processing task ${file}:`, e);
                        try {
                            renameSync(fp, join(ipcDir, `error-${file}`));
                        }
                        catch { }
                    }
                }
            }
        }
        catch (e) {
            console.error("[ipc] Error reading tasks dir:", e);
        }
        setTimeout(poll, IPC_POLL_INTERVAL);
    };
    poll();
    console.log("[ipc] Watcher started");
}
/**
 * Dispatch a single IPC message command.
 */
export async function processMessageCommand(data, deps) {
    if (data.type === "message" && data.chatJid && data.text) {
        await deps.sendMessage(data.chatJid, data.text);
        if (data.noNudge !== true) {
            await deps.sendNudge?.(data.text);
        }
    }
}
/**
 * Dispatch a single IPC task command. The `data.type` field determines
 * which operation is performed (schedule, pause, resume, cancel, etc.).
 */
export async function processTaskCommand(data, deps) {
    switch (data.type) {
        // --- Create a new scheduled task ---
        case "schedule_task": {
            if (!data.schedule_type || !data.schedule_value || !data.chatJid)
                return;
            const taskKind = data.task_kind === "shell" || data.command ? "shell" : "agent";
            let nextRun = null;
            if (data.schedule_type === "cron") {
                try {
                    nextRun = CronExpressionParser.parse(data.schedule_value, { tz: TIMEZONE }).next().toISOString();
                }
                catch {
                    return;
                }
            }
            else if (data.schedule_type === "interval") {
                const ms = parseInt(data.schedule_value, 10);
                if (isNaN(ms) || ms <= 0)
                    return;
                nextRun = new Date(Date.now() + ms).toISOString();
            }
            else if (data.schedule_type === "once") {
                const d = new Date(data.schedule_value);
                if (isNaN(d.getTime()))
                    return;
                nextRun = d.toISOString();
            }
            if (taskKind === "shell") {
                const validated = validateShellCommand(data.command);
                if (!validated.ok) {
                    await deps.sendMessage(data.chatJid, `Cannot schedule shell task: ${validated.error || "Invalid command."}`);
                    return;
                }
                const cwdResult = validateShellCwd(data.cwd);
                if (!cwdResult.ok) {
                    await deps.sendMessage(data.chatJid, `Cannot schedule shell task: ${cwdResult.error || "Invalid cwd."}`);
                    return;
                }
                if (data.model) {
                    await deps.sendMessage(data.chatJid, "Cannot schedule shell task with a model override.");
                    return;
                }
                createTask({
                    id: createUuid("task"),
                    chat_jid: data.chatJid,
                    prompt: validated.command || "",
                    model: null,
                    task_kind: "shell",
                    command: validated.command || null,
                    cwd: cwdResult.cwd,
                    timeout_sec: Number.isFinite(data.timeout_sec) ? Number(data.timeout_sec) : null,
                    schedule_type: data.schedule_type,
                    schedule_value: data.schedule_value,
                    next_run: nextRun,
                    status: "active",
                    created_at: new Date().toISOString(),
                });
                break;
            }
            if (!data.prompt || typeof data.prompt !== "string" || !data.prompt.trim())
                return;
            // Validate the model override if one was requested.
            const requested = typeof data.model === "string" && data.model.trim() ? data.model.trim() : null;
            let model = null;
            if (requested) {
                if (!deps.resolveModel) {
                    await deps.sendMessage(data.chatJid, `Cannot schedule task: model validation unavailable for "${requested}".`);
                    return;
                }
                const resolved = deps.resolveModel(requested);
                if (!resolved.model) {
                    await deps.sendMessage(data.chatJid, `Cannot schedule task: ${resolved.error || "Invalid model."}`);
                    return;
                }
                model = resolved.model;
            }
            createTask({
                id: createUuid("task"),
                chat_jid: data.chatJid,
                prompt: data.prompt,
                model,
                task_kind: "agent",
                command: null,
                cwd: null,
                timeout_sec: null,
                schedule_type: data.schedule_type,
                schedule_value: data.schedule_value,
                next_run: nextRun,
                status: "active",
                created_at: new Date().toISOString(),
            });
            break;
        }
        // --- Pause an active task ---
        case "pause_task": {
            const t = data.taskId && getTaskById(data.taskId);
            if (t)
                updateTask(data.taskId, { status: "paused" });
            break;
        }
        // --- Resume a paused task ---
        case "resume_task": {
            const t = data.taskId && getTaskById(data.taskId);
            if (t)
                updateTask(data.taskId, { status: "active" });
            break;
        }
        // --- Delete a task and its run logs ---
        case "cancel_task": {
            const t = data.taskId && getTaskById(data.taskId);
            if (t)
                deleteTask(data.taskId);
            break;
        }
        // --- Partially update a task (prompt, schedule, model) ---
        case "update_task": {
            if (!data.taskId)
                return;
            const t = getTaskById(data.taskId);
            if (!t)
                return;
            const updates = {};
            if (typeof data.prompt === "string")
                updates.prompt = data.prompt;
            if (typeof data.schedule_type === "string")
                updates.schedule_type = data.schedule_type;
            if (typeof data.schedule_value === "string")
                updates.schedule_value = data.schedule_value;
            if (typeof data.task_kind === "string")
                updates.task_kind = data.task_kind;
            if (typeof data.command === "string")
                updates.command = data.command;
            if (typeof data.cwd === "string")
                updates.cwd = data.cwd;
            if (Number.isFinite(data.timeout_sec))
                updates.timeout_sec = Number(data.timeout_sec);
            if (typeof data.model === "string") {
                if (data.model === "") {
                    updates.model = null;
                }
                else if (deps.resolveModel) {
                    const resolved = deps.resolveModel(data.model.trim());
                    if (!resolved.model) {
                        if (data.chatJid)
                            await deps.sendMessage(data.chatJid, `Cannot update task: ${resolved.error || "Invalid model."}`);
                        return;
                    }
                    updates.model = resolved.model;
                }
                else {
                    updates.model = data.model.trim();
                }
            }
            // Validate shell command changes if applicable
            const kind = updates.task_kind ?? t.task_kind ?? (t.command ? "shell" : "agent");
            if (kind === "shell") {
                if (updates.command !== undefined) {
                    const validated = validateShellCommand(updates.command);
                    if (!validated.ok) {
                        if (data.chatJid)
                            await deps.sendMessage(data.chatJid, `Cannot update task: ${validated.error || "Invalid command."}`);
                        return;
                    }
                    updates.command = validated.command;
                    updates.prompt = validated.command;
                }
                if (updates.cwd !== undefined) {
                    const cwdResult = validateShellCwd(updates.cwd);
                    if (!cwdResult.ok) {
                        if (data.chatJid)
                            await deps.sendMessage(data.chatJid, `Cannot update task: ${cwdResult.error || "Invalid cwd."}`);
                        return;
                    }
                    updates.cwd = cwdResult.cwd;
                }
                if (updates.model !== undefined && updates.model) {
                    if (data.chatJid)
                        await deps.sendMessage(data.chatJid, "Cannot set model override on shell tasks.");
                    return;
                }
            }
            // Recalculate next_run if schedule changed.
            if (updates.schedule_type || updates.schedule_value) {
                const sType = updates.schedule_type || t.schedule_type;
                const sValue = updates.schedule_value || t.schedule_value;
                try {
                    if (sType === "cron") {
                        updates.next_run = CronExpressionParser.parse(sValue, { tz: TIMEZONE }).next().toISOString();
                    }
                    else if (sType === "interval") {
                        updates.next_run = new Date(Date.now() + parseInt(sValue, 10)).toISOString();
                    }
                    else if (sType === "once") {
                        updates.next_run = new Date(sValue).toISOString();
                    }
                }
                catch { /* keep existing next_run */ }
            }
            if (Object.keys(updates).length > 0)
                updateTask(data.taskId, updates);
            break;
        }
        // --- Bulk-delete all completed tasks ---
        case "cleanup_tasks": {
            const db = (await import("./db/connection.js")).getDb();
            const completed = db.prepare("SELECT id FROM scheduled_tasks WHERE status = 'completed'").all();
            for (const { id } of completed) {
                db.prepare("DELETE FROM task_run_logs WHERE task_id = ?").run(id);
            }
            const result = db.prepare("DELETE FROM scheduled_tasks WHERE status = 'completed'").run();
            const count = result.changes ?? 0;
            if (data.chatJid)
                await deps.sendMessage(data.chatJid, `Cleaned up ${count} completed task(s).`);
            break;
        }
        // --- Resume a specific chat after restart ---
        case "resume_chat": {
            if (deps.resumeChat) {
                await deps.resumeChat(data);
            }
            break;
        }
        // --- Resume any pending agent turns after restart ---
        case "resume_pending": {
            if (deps.resumePending) {
                await deps.resumePending(data);
            }
            break;
        }
    }
}
