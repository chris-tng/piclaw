import { formatCompactNumber } from "../agent-control-helpers.js";
import { killTrackedProcesses } from "../../utils/process-tracker.js";
export async function handleRestart(session, _command) {
    try {
        await session.abort();
    }
    catch {
        // Ignore abort failures
    }
    const killed = killTrackedProcesses();
    try {
        await session.reload();
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
            status: "error",
            message: `Restart failed after killing ${killed} subprocess${killed === 1 ? "" : "es"}: ${message}`,
        };
    }
    const killedLabel = killed === 1 ? "1 subprocess" : `${killed} subprocesses`;
    return {
        status: "success",
        message: `Agent restarted. Killed ${killedLabel}.`,
    };
}
export async function handleCompact(session, command) {
    try {
        const result = await session.compact(command.instructions?.trim() || undefined);
        const lines = [
            "Compaction complete.",
            `Tokens before: ${formatCompactNumber(result.tokensBefore)}`,
            `First kept entry: ${result.firstKeptEntryId}`,
            "Summary:",
            result.summary,
        ];
        return { status: "success", message: lines.join("\n") };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
export async function handleAutoCompact(session, command) {
    const hasArgs = command.raw.trim().split(/\s+/).length > 1;
    if (command.enabled === undefined) {
        if (hasArgs) {
            return { status: "error", message: "Usage: /auto-compact on|off" };
        }
        return {
            status: "success",
            message: `Auto-compaction is ${session.autoCompactionEnabled ? "on" : "off"}.`,
        };
    }
    session.setAutoCompactionEnabled(command.enabled);
    return {
        status: "success",
        message: `Auto-compaction turned ${command.enabled ? "on" : "off"}.`,
    };
}
export async function handleAutoRetry(session, command) {
    const hasArgs = command.raw.trim().split(/\s+/).length > 1;
    if (command.enabled === undefined) {
        if (hasArgs) {
            return { status: "error", message: "Usage: /auto-retry on|off" };
        }
        return {
            status: "success",
            message: `Auto-retry is ${session.autoRetryEnabled ? "on" : "off"}.`,
        };
    }
    session.setAutoRetryEnabled(command.enabled);
    return {
        status: "success",
        message: `Auto-retry turned ${command.enabled ? "on" : "off"}.`,
    };
}
export async function handleAbort(session, _command) {
    try {
        await session.abort();
        return { status: "success", message: "Aborted current response." };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
export async function handleAbortRetry(session, _command) {
    session.abortRetry();
    return { status: "success", message: "Retry aborted." };
}
export async function handleAbortBash(session, _command) {
    if (!session.isBashRunning) {
        return { status: "success", message: "No bash command is running." };
    }
    session.abortBash();
    return { status: "success", message: "Bash command aborted." };
}
