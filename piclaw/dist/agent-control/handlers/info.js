/**
 * agent-control/handlers/info.ts – Handlers for informational / read-only commands.
 *
 * Handles /commands, /state, /stats, /context, /last, /search-workspace,
 * /labels, and /label. These commands display session state, token usage,
 * and search results without modifying the session.
 *
 * Consumers: agent-control-handlers.ts dispatches to these handlers.
 */
import { statSync } from "fs";
import { formatBytes, formatCompactNumber, formatCurrency } from "../agent-control-helpers.js";
import { CONTROL_COMMAND_DEFINITIONS } from "../command-registry.js";
import { getChatJid } from "../../core/chat-context.js";
import { SESSION_MAX_SIZE_BYTES, SESSION_MAX_SIZE_MB } from "../../core/config.js";
import { getTokenUsageByModel, getTokenUsageByProvider, getTokenUsageTotals } from "../../db.js";
import { searchWorkspace } from "../../workspace-search.js";
/** Handle /state: display current session state summary. */
export async function handleState(session, _command) {
    const modelLabel = session.model ? `${session.model.provider}/${session.model.id}` : "none";
    const steeringCount = session.getSteeringMessages().length;
    const followUpCount = session.getFollowUpMessages().length;
    const sessionFileSize = (() => {
        if (!session.sessionFile)
            return null;
        try {
            return statSync(session.sessionFile).size;
        }
        catch {
            return null;
        }
    })();
    const isOversizedSession = sessionFileSize !== null && sessionFileSize >= SESSION_MAX_SIZE_BYTES;
    const lines = [
        `Model: ${modelLabel}`,
        `Thinking level: ${session.thinkingLevel}${session.supportsThinking() ? "" : " (thinking off)"}`,
        `Streaming: ${session.isStreaming ? "yes" : "no"}`,
        `Compacting: ${session.isCompacting ? "yes" : "no"}`,
        `Retrying: ${session.isRetrying ? "yes" : "no"}`,
        `Auto-compaction: ${session.autoCompactionEnabled ? "on" : "off"}`,
        `Auto-retry: ${session.autoRetryEnabled ? "on" : "off"}`,
        `Steering mode: ${session.steeringMode}`,
        `Follow-up mode: ${session.followUpMode}`,
        `Pending messages: ${session.pendingMessageCount} (steer ${steeringCount}, follow-up ${followUpCount})`,
        `Session id: ${session.sessionId}`,
        `Session name: ${session.sessionName || "none"}`,
        `Session file: ${session.sessionFile || "none"}`,
        `Session file size: ${sessionFileSize === null ? "unknown" : formatBytes(sessionFileSize)}`,
    ];
    if (isOversizedSession && sessionFileSize !== null) {
        lines.push(`Session file warning: exceeds configured threshold (${formatBytes(sessionFileSize)} >= ${SESSION_MAX_SIZE_MB} MB). Consider /session-rotate.`);
    }
    return { status: "success", message: lines.join("\n") };
}
/** Handle /stats: display token usage and cost statistics. */
export async function handleStats(session, _command) {
    const stats = session.getSessionStats();
    const tokens = stats.tokens;
    const lines = [
        "Session stats:",
        `• Messages: ${stats.userMessages} user, ${stats.assistantMessages} assistant, ${stats.toolResults} tool results (${stats.totalMessages} total)`,
        `• Tool calls: ${stats.toolCalls}`,
        `• Tokens: input ${formatCompactNumber(tokens.input)}, output ${formatCompactNumber(tokens.output)}, cache read ${formatCompactNumber(tokens.cacheRead)}, cache write ${formatCompactNumber(tokens.cacheWrite)}, total ${formatCompactNumber(tokens.total)}`,
        `• Cost: ${formatCurrency(stats.cost)}`,
    ];
    const chatJid = getChatJid();
    try {
        const totals = getTokenUsageTotals(chatJid);
        if (totals.runs > 0) {
            const providerRows = getTokenUsageByProvider(chatJid, 5);
            const modelRows = getTokenUsageByModel(chatJid, 5);
            lines.push("", "Tracked usage (persisted):", `• Overall: input ${formatCompactNumber(totals.input_tokens)}, output ${formatCompactNumber(totals.output_tokens)}, cache read ${formatCompactNumber(totals.cache_read_tokens)}, cache write ${formatCompactNumber(totals.cache_write_tokens)}, total ${formatCompactNumber(totals.total_tokens)}, cost ${formatCurrency(totals.cost_total)} (${formatCompactNumber(totals.runs)} run${totals.runs === 1 ? "" : "s"})`);
            if (providerRows.length > 0) {
                lines.push("• Per provider:");
                for (const row of providerRows) {
                    const provider = row.provider || "(unknown provider)";
                    lines.push(`  - ${provider}: total ${formatCompactNumber(row.total_tokens)}, cost ${formatCurrency(row.cost_total)} (${formatCompactNumber(row.runs)} run${row.runs === 1 ? "" : "s"})`);
                }
            }
            if (modelRows.length > 0) {
                lines.push("• Per model:");
                for (const row of modelRows) {
                    const model = row.model || "(unknown model)";
                    lines.push(`  - ${model}: total ${formatCompactNumber(row.total_tokens)}, cost ${formatCurrency(row.cost_total)} (${formatCompactNumber(row.runs)} run${row.runs === 1 ? "" : "s"})`);
                }
            }
        }
    }
    catch {
        // Database may be unavailable in isolated command-handler tests.
    }
    return { status: "success", message: lines.join("\n") };
}
/** Handle /context: display context window usage breakdown. */
export async function handleContext(session, _command) {
    const usage = session.getContextUsage();
    if (!usage) {
        return { status: "error", message: "Context usage unavailable (no model configured)." };
    }
    if (usage.tokens === null) {
        return {
            status: "success",
            message: `Context usage: unknown. Context window: ${formatCompactNumber(usage.contextWindow)}.`,
        };
    }
    const percent = usage.percent ?? (usage.tokens / usage.contextWindow) * 100;
    return {
        status: "success",
        message: `Context usage: ${formatCompactNumber(usage.tokens)} / ${formatCompactNumber(usage.contextWindow)} (${percent.toFixed(1)}%).`,
    };
}
/** Handle /last: display the last assistant response. */
export async function handleLast(session, _command) {
    const last = session.getLastAssistantText();
    if (!last) {
        return { status: "error", message: "No assistant messages yet." };
    }
    return { status: "success", message: `Last assistant response:\n\n${last}` };
}
/** Handle /search-workspace: full-text search across workspace files. */
export async function handleSearchWorkspace(_session, command) {
    const query = command.query?.trim();
    if (!query) {
        return {
            status: "error",
            message: "Usage: /search <query> [--scope notes|skills|all] [--limit N] [--offset N] [--no-refresh] [--max-kb N]",
        };
    }
    const { rows, limit, offset, error } = await searchWorkspace({
        query,
        scope: command.scope,
        limit: command.limit,
        offset: command.offset,
        refresh: command.refresh,
        max_kb: command.max_kb,
    });
    if (error) {
        return { status: "error", message: error };
    }
    if (!rows.length) {
        return { status: "success", message: "No matching workspace files found." };
    }
    const header = `Workspace matches (${rows.length} result${rows.length === 1 ? "" : "s"}; limit ${limit}, offset ${offset}):`;
    const lines = rows.map((row) => `• ${row.path} — ${row.snippet}`);
    return { status: "success", message: `${header}\n${lines.join("\n")}` };
}
/** Handle /commands: list all available control commands. */
export async function handleCommands(session, _command) {
    const describeSource = (source, detail) => {
        const base = source === "core" ? "core"
            : source === "extension" ? "workspace extension"
                : source === "pi-extension" ? "pi extension"
                    : source === "template" ? "prompt template"
                        : "skill";
        return detail ? `${base} (${detail})` : base;
    };
    const entries = new Map();
    const addEntry = (name, description, source, detail) => {
        const trimmed = name.trim();
        if (!trimmed)
            return;
        const key = trimmed.toLowerCase();
        const existing = entries.get(key);
        if (!existing) {
            entries.set(key, { name: trimmed, description, source, detail, extensions: [] });
            return;
        }
        if (!existing.description && description) {
            existing.description = description;
        }
        if (existing.source === "core") {
            existing.extensions.push({ source, detail });
            return;
        }
        if (source === "core") {
            const previous = { source: existing.source, detail: existing.detail };
            entries.set(key, {
                name: trimmed,
                description: description ?? existing.description,
                source: "core",
                detail: undefined,
                extensions: [...existing.extensions, previous],
            });
            return;
        }
        existing.extensions.push({ source, detail });
    };
    for (const command of CONTROL_COMMAND_DEFINITIONS) {
        addEntry(command.name, command.description, "core");
    }
    const extensionRunner = session.extensionRunner;
    if (extensionRunner) {
        const extCommands = extensionRunner.getRegisteredCommandsWithPaths();
        const isPiBuiltin = (extensionPath) => {
            if (!extensionPath)
                return false;
            return extensionPath.includes("node_modules/@mariozechner/pi-");
        };
        for (const entry of extCommands) {
            const name = entry.command?.name;
            if (!name)
                continue;
            const description = entry.command.description || `extension (${entry.extensionPath})`;
            const source = isPiBuiltin(entry.extensionPath) ? "pi-extension" : "extension";
            addEntry(`/${name}`, description, source, entry.extensionPath || undefined);
        }
    }
    for (const template of session.promptTemplates) {
        const description = template.description || "prompt template";
        addEntry(`/${template.name}`, description, "template", template.name);
    }
    const skills = session.resourceLoader.getSkills().skills;
    for (const skill of skills) {
        const description = skill.description || "skill";
        addEntry(`/skill:${skill.name}`, description, "skill", skill.name);
    }
    const sorted = Array.from(entries.values()).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    const lines = ["Available commands:"];
    for (const entry of sorted) {
        const suffix = entry.description ? ` - ${entry.description}` : "";
        const notes = [];
        if (entry.source !== "core") {
            notes.push(describeSource(entry.source, entry.detail));
        }
        if (entry.extensions.length) {
            const extNotes = entry.extensions.map((ext) => describeSource(ext.source, ext.detail));
            notes.push(`extended by ${extNotes.join(", ")}`);
        }
        const noteText = notes.length ? ` [${notes.join("; ")}]` : "";
        lines.push(`• ${entry.name}${suffix}${noteText}`);
    }
    return {
        status: "success",
        message: lines.join("\n"),
    };
}
