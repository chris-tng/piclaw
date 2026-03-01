import { CronExpressionParser } from "cron-parser";
import { SCHEDULER_POLL_INTERVAL, TIMEZONE } from "./core/config.js";
import { getDueTasks, getTaskById, logTaskRun, updateTaskAfterRun } from "./db.js";
import { detectChannel, formatOutbound } from "./router.js";
export function computeNextRun(scheduleType, scheduleValue) {
    if (scheduleType === "cron") {
        try {
            return CronExpressionParser.parse(scheduleValue, { tz: TIMEZONE }).next().toISOString();
        }
        catch {
            return null;
        }
    }
    if (scheduleType === "interval") {
        const ms = parseInt(scheduleValue, 10);
        if (isNaN(ms) || ms <= 0)
            return null;
        return new Date(Date.now() + ms).toISOString();
    }
    if (scheduleType === "once") {
        return null;
    }
    return null;
}
function parseModelLabel(label) {
    const trimmed = label.trim();
    const slash = trimmed.indexOf("/");
    if (slash > 0) {
        return {
            provider: trimmed.slice(0, slash),
            modelId: trimmed.slice(slash + 1),
        };
    }
    return { provider: undefined, modelId: trimmed };
}
async function applyModelLabel(agentPool, chatJid, label) {
    const { provider, modelId } = parseModelLabel(label);
    return agentPool.applyControlCommand(chatJid, {
        type: "model",
        provider,
        modelId,
        raw: `/model ${label}`,
    });
}
async function switchTaskModel(task, deps) {
    if (!task.model)
        return null;
    const control = await applyModelLabel(deps.agentPool, task.chat_jid, task.model);
    if (control.status === "error") {
        return `Model switch failed: ${control.message}`;
    }
    return null;
}
async function restoreOriginalModel(task, deps, savedModel) {
    if (!task.model || !savedModel || savedModel === task.model)
        return;
    const control = await applyModelLabel(deps.agentPool, task.chat_jid, savedModel);
    if (control.status === "error") {
        console.error(`[scheduler] Failed to restore model ${savedModel}: ${control.message}`);
    }
}
export async function runScheduledTask(task, deps) {
    // Re-check task status (may have been paused/cancelled while queued)
    const fresh = getTaskById(task.id);
    if (!fresh || fresh.status !== "active")
        return;
    const start = Date.now();
    let result = null;
    let error = null;
    // Save session position so we can restore after the task.
    // This isolates the task's prompt/response in a side branch of the session
    // tree, preventing context pollution of the user's conversation.
    const savedLeafId = await deps.agentPool.saveSessionPosition(task.chat_jid);
    const savedModel = await deps.agentPool.getCurrentModelLabel(task.chat_jid);
    try {
        // Switch model if task specifies one
        if (task.model) {
            if (!savedModel || savedModel !== task.model) {
                error = await switchTaskModel(task, deps);
            }
        }
        if (!error) {
            const out = await deps.agentPool.runAgent(task.prompt, task.chat_jid);
            if (out.status === "error") {
                error = out.error || "Unknown";
            }
            else if (out.result) {
                result = out.result;
                const t = formatOutbound(result, detectChannel(task.chat_jid));
                if (t) {
                    await deps.sendMessage(task.chat_jid, t);
                    await deps.sendNudge?.(t);
                }
            }
        }
    }
    catch (e) {
        error = e instanceof Error ? e.message : String(e);
    }
    finally {
        // Navigate back to the saved position — the task's prompt and response
        // stay in a side branch and won't pollute the user's conversation context.
        await deps.agentPool.restoreSessionPosition(task.chat_jid, savedLeafId);
        // Restore the original model if it was changed
        await restoreOriginalModel(task, deps, savedModel);
    }
    logTaskRun({
        task_id: task.id,
        run_at: new Date().toISOString(),
        duration_ms: Date.now() - start,
        status: error ? "error" : "success",
        result,
        error,
    });
    const nextRun = computeNextRun(task.schedule_type, task.schedule_value);
    updateTaskAfterRun(task.id, nextRun, error ? `Error: ${error}` : (result?.slice(0, 200) || "Completed"));
}
let started = false;
export function startSchedulerLoop(deps) {
    if (started)
        return;
    started = true;
    console.log("[scheduler] Started");
    const loop = async () => {
        try {
            for (const task of getDueTasks()) {
                const cur = getTaskById(task.id);
                if (!cur || cur.status !== "active")
                    continue;
                deps.queue.enqueueTask(cur.id, () => runScheduledTask(cur, deps));
            }
        }
        catch (e) {
            console.error("[scheduler]", e);
        }
        setTimeout(loop, SCHEDULER_POLL_INTERVAL);
    };
    loop();
}
