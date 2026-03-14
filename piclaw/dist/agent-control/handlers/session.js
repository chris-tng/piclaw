/**
 * agent-control/handlers/session.ts – Handlers for session management commands.
 *
 * Handles /session-name, /new-session, /switch-session, /session-rotate,
 * /fork, /forks, and /export-html commands for managing the pi-agent session tree.
 *
 * Consumers: agent-control-handlers.ts dispatches to these handlers.
 */
import { truncateText } from "../agent-control-helpers.js";
import { rotateSession } from "../../session-rotation.js";
/** Handle /session-name: rename the current session. */
export async function handleSessionName(session, command) {
    if (!command.name) {
        return {
            status: "success",
            message: `Session name: ${session.sessionName || "none"}.`,
        };
    }
    const name = command.name.trim();
    const normalized = name.toLowerCase();
    if (["clear", "none", "off"].includes(normalized)) {
        session.setSessionName("");
        return { status: "success", message: "Session name cleared." };
    }
    session.setSessionName(name);
    return { status: "success", message: `Session name set to "${name}".` };
}
/** Handle /new-session: create a new session, optionally under a parent. */
export async function handleNewSession(session, command) {
    const ok = await session.newSession(command.parent ? { parentSession: command.parent } : undefined);
    if (!ok) {
        return { status: "error", message: "New session cancelled." };
    }
    return { status: "success", message: "Started a new session." };
}
/** Handle /switch-session: switch to an existing session by path. */
export async function handleSwitchSession(session, command) {
    if (!command.path) {
        return { status: "error", message: "Usage: /switch-session <path>" };
    }
    const ok = await session.switchSession(command.path.trim());
    if (!ok) {
        return { status: "error", message: "Switch session cancelled." };
    }
    return { status: "success", message: `Switched to session: ${command.path.trim()}.` };
}
/** Handle /session-rotate: archive the current session file and start a compact carried-forward successor. */
export async function handleSessionRotate(session, command) {
    const result = await rotateSession(session, {
        instructions: command.instructions,
        reason: "manual",
    });
    return {
        status: result.status,
        message: result.message,
    };
}
/** Handle /fork: fork the conversation from a specific entry. */
export async function handleFork(session, command) {
    if (!command.entryId) {
        return { status: "error", message: "Usage: /fork <entryId>" };
    }
    try {
        const result = await session.fork(command.entryId.trim());
        if (result.cancelled) {
            return { status: "error", message: "Fork cancelled." };
        }
        const selected = result.selectedText ? `Selected text:\n${result.selectedText}` : "Fork created.";
        return { status: "success", message: selected };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
/** Handle /fork: fork the conversation from a specific entry. */
export async function handleForks(session, _command) {
    const messages = session.getUserMessagesForForking();
    if (messages.length === 0) {
        return { status: "success", message: "No user messages available for forking." };
    }
    const lines = ["Forkable messages:", ...messages.map((msg) => `• ${msg.entryId}: ${truncateText(msg.text, 120)}`)];
    return { status: "success", message: lines.join("\n") };
}
/** Handle /export-html: export the session as an HTML file. */
export async function handleExportHtml(session, command) {
    try {
        const outputPath = command.path?.trim() || undefined;
        const path = await session.exportToHtml(outputPath);
        return { status: "success", message: `Exported session to ${path}.` };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
