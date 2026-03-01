import { createTrackedBashOperations } from "../../tools/tracked-bash.js";
import { formatShellBlock, resolveShellCwd } from "../agent-control-helpers.js";
const SHELL_OUTPUT_LIMIT = 20000;
const SHELL_TIMEOUT_SECONDS = 30;
export async function handleShell(session, command) {
    const rawCommand = command.command?.trim();
    if (!rawCommand) {
        return {
            status: "error",
            message: "Usage: /shell <command>",
        };
    }
    const cwd = resolveShellCwd();
    const bash = createTrackedBashOperations();
    let output = "";
    let truncated = false;
    const onData = (data) => {
        if (truncated)
            return;
        const chunk = data.toString("utf8");
        const remaining = SHELL_OUTPUT_LIMIT - output.length;
        if (remaining <= 0) {
            truncated = true;
            return;
        }
        if (chunk.length > remaining) {
            output += chunk.slice(0, remaining);
            truncated = true;
            return;
        }
        output += chunk;
    };
    let exitCode = null;
    let timedOut = false;
    let errorMessage = null;
    try {
        const result = await bash.exec(rawCommand, cwd, {
            onData,
            timeout: SHELL_TIMEOUT_SECONDS,
        });
        exitCode = result.exitCode ?? null;
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.startsWith("timeout:")) {
            timedOut = true;
        }
        else if (message !== "aborted") {
            errorMessage = message;
        }
    }
    const meta = [];
    if (truncated)
        meta.push("(output truncated)");
    if (timedOut)
        meta.push(`(timed out after ${SHELL_TIMEOUT_SECONDS}s)`);
    if (exitCode !== null)
        meta.push(`(exit code ${exitCode})`);
    if (errorMessage)
        meta.push(`(error: ${errorMessage})`);
    const isSuccess = !timedOut && !errorMessage && (exitCode === null || exitCode === 0);
    return {
        status: isSuccess ? "success" : "error",
        message: formatShellBlock(rawCommand, output, meta),
    };
}
export async function handleBash(session, command) {
    const rawCommand = command.command?.trim();
    if (!rawCommand) {
        return {
            status: "error",
            message: "Usage: /bash <command>",
        };
    }
    try {
        const bashOps = createTrackedBashOperations();
        const result = await session.executeBash(rawCommand, undefined, { operations: bashOps });
        const meta = [];
        if (result.cancelled)
            meta.push("(cancelled)");
        if (result.truncated)
            meta.push("(output truncated)");
        if (result.exitCode !== undefined && result.exitCode !== null) {
            meta.push(`(exit code ${result.exitCode})`);
        }
        if (result.fullOutputPath)
            meta.push(`(full output: ${result.fullOutputPath})`);
        const isSuccess = !result.cancelled && (result.exitCode === undefined || result.exitCode === null || result.exitCode === 0);
        return {
            status: isSuccess ? "success" : "error",
            message: formatShellBlock(rawCommand, result.output ?? "", meta),
        };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
