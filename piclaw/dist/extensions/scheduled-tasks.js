/**
 * scheduled-tasks – registers /tasks and /scheduled commands that query
 * the SQLite scheduled_tasks table.
 */
import { Type } from "@sinclair/typebox";
import { createTask, getDb } from "../db.js";
import { computeNextRun } from "../task-scheduler.js";
import { validateShellCommand, validateShellCwd } from "../utils/task-validation.js";
import { createUuid } from "../utils/ids.js";
function computeInitialRun(scheduleType, scheduleValue) {
    if (scheduleType === "once") {
        const d = new Date(scheduleValue);
        if (isNaN(d.getTime()))
            return null;
        return d.toISOString();
    }
    return computeNextRun(scheduleType, scheduleValue);
}
const STATUS_VALUES = new Set(["active", "paused", "completed"]);
function summarizePrompt(prompt, maxLen = 140) {
    if (!prompt)
        return "(no prompt)";
    const firstLine = prompt.replace(/\r\n/g, "\n").split("\n")[0].trim();
    if (firstLine.length <= maxLen)
        return firstLine;
    return `${firstLine.slice(0, maxLen - 1)}…`;
}
function summarizeCommand(command, maxLen = 140) {
    const cmd = (command || "").trim();
    if (!cmd)
        return "(no command)";
    if (cmd.length <= maxLen)
        return cmd;
    return `${cmd.slice(0, maxLen - 1)}…`;
}
function formatTask(row) {
    const next = row.next_run ? `next ${row.next_run}` : "next n/a";
    const model = row.model ? ` model ${row.model}` : "";
    const kind = row.task_kind === "shell" ? "shell" : "agent";
    const summary = kind === "shell" ? summarizeCommand(row.command) : summarizePrompt(row.prompt);
    return `• ${row.id} (${row.status}) — ${kind} ${row.schedule_type} ${row.schedule_value}, ${next}${model} — ${summary}`;
}
function listTasks(filter) {
    const db = getDb();
    const counts = db
        .query("SELECT status, COUNT(*) as count FROM scheduled_tasks GROUP BY status")
        .all();
    const countMap = new Map(counts.map((row) => [row.status, row.count]));
    let rows;
    if (filter && STATUS_VALUES.has(filter)) {
        rows = db
            .query("SELECT id, chat_jid, prompt, model, task_kind, command, cwd, timeout_sec, schedule_type, schedule_value, next_run, status, created_at FROM scheduled_tasks WHERE status = ? ORDER BY next_run")
            .all(filter);
    }
    else {
        rows = db
            .query("SELECT id, chat_jid, prompt, model, task_kind, command, cwd, timeout_sec, schedule_type, schedule_value, next_run, status, created_at FROM scheduled_tasks ORDER BY created_at")
            .all();
    }
    const header = filter && STATUS_VALUES.has(filter)
        ? `Scheduled tasks (${filter})`
        : "Scheduled tasks";
    const summary = `Active ${countMap.get("active") ?? 0} • Paused ${countMap.get("paused") ?? 0} • Completed ${countMap.get("completed") ?? 0}`;
    return {
        summary: `${header}\n${summary}`,
        lines: rows.map(formatTask),
    };
}
/** Parameters for the schedule_task internal tool. */
const ScheduleTaskSchema = Type.Object({
    chat_jid: Type.Optional(Type.String({ description: "Target chat JID (default: web:default)." })),
    schedule_type: Type.Union([
        Type.Literal("cron"),
        Type.Literal("interval"),
        Type.Literal("once"),
    ], { description: "Schedule type." }),
    schedule_value: Type.String({ description: "Cron expression, interval ms, or ISO timestamp." }),
    prompt: Type.Optional(Type.String({ description: "Agent prompt (for task_kind=agent)." })),
    model: Type.Optional(Type.String({ description: "Model override (agent tasks only)." })),
    task_kind: Type.Optional(Type.Union([
        Type.Literal("agent"),
        Type.Literal("shell"),
    ], { description: "Task kind: agent or shell." })),
    command: Type.Optional(Type.String({ description: "Shell command to execute (task_kind=shell)." })),
    cwd: Type.Optional(Type.String({ description: "Working directory for shell tasks (relative to workspace)." })),
    timeout_sec: Type.Optional(Type.Integer({ description: "Shell timeout in seconds.", minimum: 1, maximum: 3600 })),
});
const failureDetails = {
    ok: false,
    id: null,
    task_kind: null,
    next_run: null,
};
/** Extension factory that registers /tasks and /scheduled slash commands. */
export const scheduledTasks = (pi) => {
    const handler = async (args) => {
        const token = (args || "").trim().toLowerCase();
        const filter = token === "all" || token === "" ? null : token;
        if (filter && !STATUS_VALUES.has(filter)) {
            const message = "Usage: /tasks [all|active|paused|completed]";
            pi.sendMessage({ customType: "scheduled-tasks", content: message, display: true });
            return;
        }
        const { summary, lines } = listTasks(filter);
        const body = lines.length > 0 ? lines.join("\n") : "(no tasks found)";
        const message = `${summary}\n${body}`;
        pi.sendMessage({ customType: "scheduled-tasks", content: message, display: true });
    };
    pi.registerCommand("tasks", {
        description: "List scheduled tasks (all|active|paused|completed)",
        handler,
    });
    pi.registerCommand("scheduled", {
        description: "Alias for /tasks",
        handler,
    });
    pi.registerTool({
        name: "schedule_task",
        label: "schedule_task",
        description: "Schedule an agent prompt or shell command to run later or on a recurring basis.",
        parameters: ScheduleTaskSchema,
        async execute(_toolCallId, params) {
            const chatJid = typeof params.chat_jid === "string" && params.chat_jid.trim()
                ? params.chat_jid.trim()
                : "web:default";
            const taskKind = params.task_kind === "shell" || params.command ? "shell" : "agent";
            if (taskKind === "agent") {
                const prompt = typeof params.prompt === "string" ? params.prompt.trim() : "";
                if (!prompt) {
                    return { content: [{ type: "text", text: "Missing prompt for agent task." }], details: failureDetails };
                }
                const nextRun = computeInitialRun(params.schedule_type, params.schedule_value);
                if (!nextRun) {
                    return { content: [{ type: "text", text: "Invalid schedule value." }], details: failureDetails };
                }
                const taskId = createUuid("task");
                createTask({
                    id: taskId,
                    chat_jid: chatJid,
                    prompt,
                    model: typeof params.model === "string" && params.model.trim() ? params.model.trim() : null,
                    task_kind: "agent",
                    command: null,
                    cwd: null,
                    timeout_sec: null,
                    schedule_type: params.schedule_type,
                    schedule_value: params.schedule_value,
                    next_run: nextRun,
                    status: "active",
                    created_at: new Date().toISOString(),
                });
                const details = { ok: true, id: taskId, task_kind: "agent", next_run: nextRun };
                return {
                    content: [{ type: "text", text: `Scheduled agent task for ${chatJid}.` }],
                    details,
                };
            }
            const validated = validateShellCommand(params.command);
            if (!validated.ok) {
                return { content: [{ type: "text", text: validated.error || "Invalid shell command." }], details: failureDetails };
            }
            if (params.model) {
                return { content: [{ type: "text", text: "Model overrides are not supported for shell tasks." }], details: failureDetails };
            }
            const cwdResult = validateShellCwd(params.cwd);
            if (!cwdResult.ok) {
                return { content: [{ type: "text", text: cwdResult.error || "Invalid cwd." }], details: failureDetails };
            }
            const nextRun = computeInitialRun(params.schedule_type, params.schedule_value);
            if (!nextRun) {
                return { content: [{ type: "text", text: "Invalid schedule value." }], details: failureDetails };
            }
            const taskId = createUuid("task");
            createTask({
                id: taskId,
                chat_jid: chatJid,
                prompt: validated.command || "",
                model: null,
                task_kind: "shell",
                command: validated.command || null,
                cwd: cwdResult.cwd,
                timeout_sec: params.timeout_sec ?? null,
                schedule_type: params.schedule_type,
                schedule_value: params.schedule_value,
                next_run: nextRun,
                status: "active",
                created_at: new Date().toISOString(),
            });
            const details = { ok: true, id: taskId, task_kind: "shell", next_run: nextRun };
            return {
                content: [{ type: "text", text: `Scheduled shell task for ${chatJid}.` }],
                details,
            };
        },
    });
};
