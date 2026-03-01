import { extractTextFromContent, formatCompactNumber, truncateText } from "../agent-control-helpers.js";
export async function handleTree(session, command) {
    const sessionManager = session.sessionManager;
    const leafId = sessionManager.getLeafId();
    if (!command.targetId) {
        const roots = sessionManager.getTree();
        if (roots.length === 0) {
            return { status: "success", message: "Tree is empty." };
        }
        const describeEntry = (entry) => {
            switch (entry.type) {
                case "message": {
                    const msg = entry.message;
                    const role = msg?.role || "message";
                    if (role === "toolResult") {
                        return `toolResult: ${msg.toolName || "tool"}`;
                    }
                    const text = extractTextFromContent(msg?.content);
                    if (text) {
                        return `${role}: \"${truncateText(text, 80)}\"`;
                    }
                    if (Array.isArray(msg?.content)) {
                        const toolCall = msg.content.find((c) => c?.type === "toolCall");
                        if (toolCall)
                            return `${role}: [tool ${toolCall.name}]`;
                    }
                    return role;
                }
                case "compaction":
                    return `[compaction: ${formatCompactNumber(entry.tokensBefore)} tokens]`;
                case "branch_summary":
                    return `[branch summary from ${entry.fromId}]`;
                case "thinking_level_change":
                    return `[thinking ${entry.thinkingLevel}]`;
                case "model_change":
                    return `[model ${entry.provider}/${entry.modelId}]`;
                case "custom":
                    return `[custom ${entry.customType}]`;
                case "custom_message":
                    return `[custom message ${entry.customType}]`;
                case "label":
                    return `[label ${entry.label || "clear"}]`;
                case "session_info":
                    return `[session name ${entry.name || "none"}]`;
                default:
                    return `[${entry.type}]`;
            }
        };
        const lines = ["Session tree:"];
        const flatLines = [];
        const walk = (node, depth) => {
            const indent = "  ".repeat(depth);
            const label = node.label ? ` [${node.label}]` : "";
            const active = node.entry.id === leafId ? " ← active" : "";
            flatLines.push(`${indent}• ${node.entry.id} ${describeEntry(node.entry)}${label}${active}`);
            for (const child of node.children || []) {
                walk(child, depth + 1);
            }
        };
        for (const root of roots) {
            walk(root, 0);
        }
        const totalEntries = flatLines.length;
        const limit = Math.max(1, command.limit ?? 10);
        const mode = command.mode ?? "tail";
        const offset = Math.max(0, command.offset ?? 0);
        let start;
        let end;
        if (mode === "tail") {
            start = Math.max(totalEntries - limit, 0);
            end = totalEntries;
        }
        else {
            start = Math.min(offset, totalEntries);
            end = Math.min(start + limit, totalEntries);
        }
        const slice = flatLines.slice(start, end);
        lines.push(...slice);
        if (slice.length < totalEntries) {
            const range = mode === "tail"
                ? `last ${slice.length} of ${totalEntries}`
                : `entries ${start + 1}-${start + slice.length} of ${totalEntries}`;
            lines.push(`… showing ${range}. Use /tree --limit N [--offset M] or /tree --tail N to view more.`);
        }
        lines.push("Use /tree <entryId> to navigate. Add --summarize or --summary \"...\" for branch summaries.");
        return { status: "success", message: lines.join("\n") };
    }
    const options = {
        summarize: command.summarize ?? false,
        customInstructions: command.customInstructions,
        replaceInstructions: command.replaceInstructions,
        label: command.label,
    };
    try {
        const result = await session.navigateTree(command.targetId, options);
        if (result.cancelled) {
            return { status: "error", message: "Tree navigation cancelled." };
        }
        if (result.aborted) {
            return { status: "error", message: "Tree navigation aborted." };
        }
        if (result.editorText) {
            return {
                status: "success",
                message: `Navigation complete. Selected text:\n${result.editorText}`,
            };
        }
        return { status: "success", message: "Navigation complete." };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
export async function handleLabel(session, command) {
    if (!command.targetId) {
        return { status: "error", message: "Usage: /label <entryId> <label|clear>" };
    }
    const rawLabel = command.label?.trim();
    const label = rawLabel && !["clear", "none", "off"].includes(rawLabel.toLowerCase()) ? rawLabel : "";
    session.sessionManager.appendLabelChange(command.targetId.trim(), label);
    return {
        status: "success",
        message: label ? `Label set on ${command.targetId}: ${label}` : `Label cleared on ${command.targetId}.`,
    };
}
export async function handleLabels(session, _command) {
    const roots = session.sessionManager.getTree();
    const labels = [];
    const describeEntry = (entry) => {
        if (entry.type === "message") {
            const role = entry.message?.role || "message";
            const text = extractTextFromContent(entry.message?.content);
            if (text)
                return `${role}: \"${truncateText(text, 60)}\"`;
            return role;
        }
        return `[${entry.type}]`;
    };
    const walk = (node) => {
        if (node.label) {
            labels.push({ id: node.entry.id, label: node.label, summary: describeEntry(node.entry) });
        }
        for (const child of node.children || []) {
            walk(child);
        }
    };
    for (const root of roots)
        walk(root);
    if (labels.length === 0) {
        return { status: "success", message: "No labels set." };
    }
    const lines = ["Labels:", ...labels.map((item) => `• ${item.id} [${item.label}] ${item.summary}`)];
    return { status: "success", message: lines.join("\n") };
}
