/**
 * task-scheduler.ts – Polls for due scheduled tasks and executes them.
 *
 * Runs a periodic loop (every SCHEDULER_POLL_INTERVAL ms) that queries the
 * database for active tasks whose `next_run` is in the past, then enqueues
 * each task on the AgentQueue for serial execution.
 *
 * Each task run:
 *   1. Saves the current session tree position so the user's conversation
 *      context is not polluted.
 *   2. Optionally switches the LLM model if the task specifies one.
 *   3. Runs the agent with the task's prompt.
 *   4. Sends the response to the task's chat and triggers a nudge notification.
 *   5. Restores the original session position and model.
 *   6. Logs the run result and computes the next_run timestamp.
 *
 * Consumers:
 *   - runtime.ts calls startSchedulerLoop() at startup.
 *   - The AgentQueue (queue.ts) serialises task execution with user messages.
 */
import { CronExpressionParser } from "cron-parser";
import { SCHEDULER_POLL_INTERVAL, TIMEZONE, WORKSPACE_DIR } from "./core/config.js";
import { getDueTasks, getTaskById, logTaskRun, updateTaskAfterRun } from "./db.js";
import { detectChannel, formatOutbound } from "./router.js";
import { createTrackedBashOperations } from "./tools/tracked-bash.js";
import { validateShellCommand, validateShellCwd } from "./utils/task-validation.js";
/**
 * Compute the next execution time for a task based on its schedule type:
 *   - cron: parse the expression and return the next occurrence.
 *   - interval: add the interval (ms) to now.
 *   - once: return null (no further runs).
 */
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
/** Parse a "provider/modelId" label into its components. */
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
/** Apply a model label to the agent pool for a specific chat. */
async function applyModelLabel(agentPool, chatJid, label) {
    const { provider, modelId } = parseModelLabel(label);
    return agentPool.applyControlCommand(chatJid, {
        type: "model",
        provider,
        modelId,
        raw: `/model ${label}`,
    });
}
/**
 * Switch the agent to the task's model override.
 * Returns an error message string on failure, or null on success.
 */
async function switchTaskModel(task, deps) {
    if (!task.model)
        return null;
    const control = await applyModelLabel(deps.agentPool, task.chat_jid, task.model);
    if (control.status === "error") {
        return `Model switch failed: ${control.message}`;
    }
    return null;
}
/** Restore the agent's model to what it was before the task ran. */
async function restoreOriginalModel(task, deps, savedModel) {
    if (!task.model || !savedModel || savedModel === task.model)
        return;
    const control = await applyModelLabel(deps.agentPool, task.chat_jid, savedModel);
    if (control.status === "error") {
        console.error(`[scheduler] Failed to restore model ${savedModel}: ${control.message}`);
    }
}
const MAX_SHELL_OUTPUT_CHARS = 8000;
async function runShellTask(task) {
    const validated = validateShellCommand(task.command);
    if (!validated.ok)
        return { result: null, error: validated.error || "Invalid command." };
    const cwdResult = validateShellCwd(task.cwd);
    if (!cwdResult.ok)
        return { result: null, error: cwdResult.error || "Invalid cwd." };
    const exec = createTrackedBashOperations();
    let output = "";
    let outputBytes = 0;
    let truncated = false;
    try {
        const res = await exec.exec(validated.command, cwdResult.cwd || WORKSPACE_DIR, {
            onData: (chunk) => {
                outputBytes += chunk.length;
                if (output.length < MAX_SHELL_OUTPUT_CHARS) {
                    const text = chunk.toString("utf8");
                    output += text.slice(0, MAX_SHELL_OUTPUT_CHARS - output.length);
                }
                else {
                    truncated = true;
                }
            },
            timeout: task.timeout_sec ?? undefined,
            env: undefined,
        });
        const trimmed = output.trim();
        const summary = trimmed ? trimmed : "(no output)";
        const suffix = truncated ? `\n…(truncated; ${outputBytes} bytes total)` : "";
        const formatted = `\`\`\`\n${summary}${suffix}\n\`\`\``;
        if (res.exitCode && res.exitCode !== 0) {
            return { result: null, error: `Command failed (exit ${res.exitCode}).\n${formatted}` };
        }
        return { result: formatted, error: null };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { result: null, error: `Command error: ${message}` };
    }
}
/**
 * Execute a single scheduled task: run the agent or shell command, deliver the response,
 * log the result, and update the task's next_run.
 */
export async function runScheduledTask(task, deps) {
    // Re-check task status (may have been paused/cancelled while queued).
    const fresh = getTaskById(task.id);
    if (!fresh || fresh.status !== "active")
        return;
    const start = Date.now();
    let result = null;
    let error = null;
    const kind = task.task_kind === "shell" || task.command ? "shell" : "agent";
    if (kind === "shell") {
        const out = await runShellTask(task);
        if (out.error) {
            error = out.error;
        }
        else if (out.result) {
            result = out.result;
            const t = formatOutbound(result, detectChannel(task.chat_jid));
            if (t) {
                await deps.sendMessage(task.chat_jid, t, { forceRoot: true, source: "scheduled" });
                await deps.sendNudge?.(t);
            }
        }
    }
    else {
        // Save session position so we can restore after the task.
        // This isolates the task's prompt/response in a side branch of the session
        // tree, preventing context pollution of the user's conversation.
        const savedLeafId = await deps.agentPool.saveSessionPosition(task.chat_jid);
        const savedModel = await deps.agentPool.getCurrentModelLabel(task.chat_jid);
        try {
            // Switch model if task specifies one.
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
                        await deps.sendMessage(task.chat_jid, t, { forceRoot: true, source: "scheduled" });
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
            // Restore the original model if it was changed.
            await restoreOriginalModel(task, deps, savedModel);
        }
    }
    // Record the run in the task_run_logs table.
    logTaskRun({
        task_id: task.id,
        run_at: new Date().toISOString(),
        duration_ms: Date.now() - start,
        status: error ? "error" : "success",
        result,
        error,
    });
    // Compute and persist the next execution time (null for one-shot tasks).
    const nextRun = computeNextRun(task.schedule_type, task.schedule_value);
    updateTaskAfterRun(task.id, nextRun, error ? `Error: ${error}` : (result?.slice(0, 200) || "Completed"));
}
/** Guard to prevent starting the loop more than once. */
let started = false;
/**
 * Start the scheduler polling loop. Checks for due tasks every
 * SCHEDULER_POLL_INTERVAL ms and enqueues them on the shared AgentQueue.
 *
 * Called once by runtime.ts during startup.
 */
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
