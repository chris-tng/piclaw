/**
 * session-rotation.ts – Shared session rotation helpers.
 *
 * Provides a single safe rotation implementation used by both the manual
 * control command (`/session-rotate`) and automatic rotation in AgentPool.
 */
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "fs";
import { basename, dirname, extname, join } from "path";
import { formatBytes } from "./agent-control/agent-control-helpers.js";
/** Default compaction prompt used before a rotation handoff. */
export const ROTATION_COMPACTION_INSTRUCTIONS = [
    "Prepare a concise continuity summary for session rotation.",
    "Preserve active goals, decisions, constraints, user preferences, and any pending work relevant to the next turns.",
    "Prefer compact operational context over narrative detail.",
].join(" ");
/** Return the byte size for a persisted session file, or null if unavailable. */
export function getSessionFileSize(sessionFile) {
    if (!sessionFile)
        return null;
    try {
        return statSync(sessionFile).size;
    }
    catch {
        return null;
    }
}
/** Choose a unique archive path inside the current session directory. */
export function getArchivePath(sessionFile) {
    const archiveDir = join(dirname(sessionFile), "archive");
    mkdirSync(archiveDir, { recursive: true });
    const base = basename(sessionFile);
    const extension = extname(base);
    const stem = extension ? base.slice(0, -extension.length) : base;
    let candidate = join(archiveDir, base);
    let counter = 1;
    while (existsSync(candidate)) {
        candidate = join(archiveDir, `${stem}.archived-${counter}${extension}`);
        counter += 1;
    }
    return candidate;
}
/** Persist the current session entries immediately, even before another assistant response arrives. */
export function forcePersistSessionFile(session) {
    const sessionFile = session.sessionFile;
    const header = session.sessionManager.getHeader();
    if (!sessionFile || !header)
        return;
    const entries = session.sessionManager.getEntries();
    const content = [header, ...entries].map((entry) => JSON.stringify(entry)).join("\n");
    writeFileSync(sessionFile, `${content}\n`);
}
/** Return true when compaction errors are safe to fall back from during rotation. */
export function isRotationFallbackCompactionError(message) {
    return [
        "Already compacted",
        "Nothing to compact (session too small)",
        "No model selected",
    ].includes(message);
}
/** Build a carried-forward summary from compaction and branch-summary messages. */
export function collectCarriedSummary(messages) {
    const parts = [];
    let tokensBefore = 0;
    for (const message of messages) {
        if (message.role === "compactionSummary") {
            parts.push(message.summary.trim());
            tokensBefore = Math.max(tokensBefore, message.tokensBefore);
        }
        else if (message.role === "branchSummary") {
            parts.push(`Branch summary:\n${message.summary.trim()}`);
        }
    }
    const summary = parts.map((part) => part.trim()).filter(Boolean).join("\n\n");
    return {
        summary: summary || null,
        tokensBefore,
    };
}
/** Seed a freshly-created session from the current effective session context. */
export function seedRotatedSession(sessionManager, context, options) {
    if (options.sessionName?.trim()) {
        sessionManager.appendSessionInfo(options.sessionName.trim());
    }
    if (options.model) {
        sessionManager.appendModelChange(options.model.provider, options.model.modelId);
    }
    const carried = collectCarriedSummary(context.messages);
    if (carried.summary) {
        sessionManager.appendCompaction(carried.summary, "rotated-context", carried.tokensBefore);
    }
    for (const message of context.messages) {
        if (message.role === "compactionSummary" || message.role === "branchSummary") {
            continue;
        }
        if (message.role === "custom") {
            sessionManager.appendCustomMessageEntry(message.customType, message.content, message.display, message.details);
            continue;
        }
        sessionManager.appendMessage(message);
    }
}
/** Rotate a persisted session into a newly-seeded successor session file. */
export async function rotateSession(session, options = {}) {
    const reason = options.reason ?? "manual";
    if (session.isStreaming || session.isCompacting || session.isRetrying) {
        return {
            status: "error",
            reason,
            compacted: false,
            message: "Cannot rotate the session while a response, compaction, or retry is active.",
        };
    }
    if (session.pendingMessageCount > 0) {
        return {
            status: "error",
            reason,
            compacted: false,
            message: "Cannot rotate the session while queued steering or follow-up messages are pending.",
        };
    }
    const previousSessionFile = session.sessionFile?.trim();
    if (!previousSessionFile) {
        return {
            status: "error",
            reason,
            compacted: false,
            message: "No persisted session file is active yet.",
        };
    }
    if (!existsSync(previousSessionFile)) {
        return {
            status: "error",
            reason,
            compacted: false,
            message: `Current session file does not exist: ${previousSessionFile}`,
        };
    }
    const compactionInstructions = options.instructions?.trim() || ROTATION_COMPACTION_INSTRUCTIONS;
    let compacted = false;
    try {
        await session.compact(compactionInstructions);
        compacted = true;
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!isRotationFallbackCompactionError(message)) {
            return { status: "error", reason, compacted, message };
        }
    }
    const context = session.sessionManager.buildSessionContext();
    const archivePath = getArchivePath(previousSessionFile);
    const previousSize = getSessionFileSize(previousSessionFile);
    const currentModel = session.model
        ? { provider: session.model.provider, modelId: session.model.id }
        : context.model;
    const currentSessionName = session.sessionName?.trim() || undefined;
    let archived = false;
    try {
        copyFileSync(previousSessionFile, archivePath);
        archived = true;
        const ok = await session.newSession({
            parentSession: archivePath,
            setup: async (sessionManager) => {
                seedRotatedSession(sessionManager, context, {
                    sessionName: currentSessionName,
                    model: currentModel,
                });
            },
        });
        if (!ok) {
            if (archived)
                rmSync(archivePath, { force: true });
            return { status: "error", reason, compacted, message: "Session rotation cancelled." };
        }
        forcePersistSessionFile(session);
        rmSync(previousSessionFile, { force: true });
        const nextSessionFile = session.sessionFile || "(unavailable)";
        const nextSize = getSessionFileSize(session.sessionFile);
        const summaryCount = collectCarriedSummary(context.messages).summary ? 1 : 0;
        const carriedMessageCount = context.messages.filter((message) => message.role !== "compactionSummary" && message.role !== "branchSummary").length;
        return {
            status: "success",
            reason,
            compacted,
            archivePath,
            newSessionFile: nextSessionFile,
            previousSize,
            nextSize,
            message: [
                reason === "automatic" ? "Session auto-rotated." : "Session rotated.",
                `Archived previous session: ${archivePath}`,
                `New session: ${nextSessionFile}`,
                `Previous file size: ${previousSize === null ? "unknown" : formatBytes(previousSize)}`,
                `New file size: ${nextSize === null ? "unknown" : formatBytes(nextSize)}`,
                `Continuity seed: ${summaryCount > 0 ? "summary + " : ""}${carriedMessageCount} carried message${carriedMessageCount === 1 ? "" : "s"}`,
                `Compaction before rotate: ${compacted ? "yes" : "no (used current effective context)"}`,
            ].join("\n"),
        };
    }
    catch (err) {
        if (archived) {
            try {
                rmSync(archivePath, { force: true });
            }
            catch {
                // best effort cleanup only
            }
        }
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", reason, compacted, message };
    }
}
