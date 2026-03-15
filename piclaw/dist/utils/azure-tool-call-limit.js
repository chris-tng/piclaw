/**
 * utils/azure-tool-call-limit.ts – Azure tool-call history trimming helpers.
 *
 * Azure OpenAI responses can fail when historical function-call +
 * function_call_output items exceed service limits. This module removes or
 * deduplicates older tool-call items and inserts a compact assistant summary so
 * conversational continuity is preserved while staying under the cap.
 */
function asToolCallMessage(value) {
    if (!value || typeof value !== "object")
        return null;
    return value;
}
function getStringField(message, key) {
    const value = message[key];
    return typeof value === "string" ? value : undefined;
}
function formatToolCallSnippet(text, maxChars) {
    if (!text)
        return "(no output)";
    const collapsed = text.replace(/\s+/g, " ").trim();
    if (!collapsed)
        return "(no output)";
    if (collapsed.length <= maxChars)
        return collapsed;
    return `${collapsed.slice(0, Math.max(1, maxChars - 1))}…`;
}
function parseToolOutputSearchArgs(args) {
    if (!args)
        return null;
    try {
        const parsed = asToolCallMessage(JSON.parse(args));
        if (!parsed)
            return null;
        const handle = (getStringField(parsed, "handle") || "").trim();
        const query = (getStringField(parsed, "query") || "").trim();
        if (!handle && !query)
            return null;
        return { handle, query };
    }
    catch {
        return null;
    }
}
function findReasoningForCall(item, reasoningItems) {
    const reasoningField = item.reasoning;
    const reasoningRecord = asToolCallMessage(reasoningField);
    const explicit = (typeof reasoningField === "string" ? reasoningField : undefined) ||
        getStringField(item, "reasoning_id") ||
        getStringField(reasoningRecord ?? {}, "id");
    const itemId = getStringField(item, "id") || "";
    let candidate = explicit;
    if (!candidate && itemId) {
        if (itemId.startsWith("fc_")) {
            candidate = `rs_${itemId.slice(3)}`;
        }
        else if (itemId.startsWith("fc-")) {
            candidate = `rs-${itemId.slice(3)}`;
        }
    }
    if (candidate) {
        const matched = reasoningItems.find((entry) => entry.id === candidate);
        if (matched) {
            matched.paired = true;
            return matched.index;
        }
    }
    for (let i = reasoningItems.length - 1; i >= 0; i -= 1) {
        const entry = reasoningItems[i];
        if (!entry.paired) {
            entry.paired = true;
            return entry.index;
        }
    }
    return undefined;
}
function describeToolCall(entry, outputChars) {
    const name = entry.name || "tool";
    const outputPreview = formatToolCallSnippet(entry.output || "", outputChars);
    if (name === "search_tool_output") {
        const parsed = parseToolOutputSearchArgs(entry.args);
        const handle = parsed?.handle ? `handle=${parsed.handle}` : "";
        const query = parsed?.query ? `query=\"${parsed.query}\"` : "";
        const meta = [handle, query].filter(Boolean).join(", ");
        const suffix = meta ? ` (${meta})` : "";
        return `• ${name}${suffix}: ${outputPreview}`;
    }
    if (entry.args) {
        const argsPreview = formatToolCallSnippet(entry.args, 80);
        const suffix = argsPreview && argsPreview !== "(no output)" ? ` (${argsPreview})` : "";
        return `• ${name}${suffix}: ${outputPreview}`;
    }
    return `• ${name}: ${outputPreview}`;
}
/**
 * Remove/dedupe older function-call items and inject an assistant summary.
 *
 * The returned message array preserves order for retained items and inserts the
 * synthetic summary where removed blocks originally began.
 */
export function applyToolCallLimit(messages, config) {
    const entries = [];
    const entryByCallId = new Map();
    const reasoningItems = [];
    messages.forEach((rawItem, index) => {
        const item = asToolCallMessage(rawItem);
        if (!item)
            return;
        const itemType = getStringField(item, "type");
        if (itemType === "reasoning") {
            reasoningItems.push({ index, id: getStringField(item, "id"), paired: false });
            return;
        }
        if (itemType === "function_call") {
            const callId = String(getStringField(item, "call_id") || getStringField(item, "id") || "").trim();
            if (!callId)
                return;
            const entry = {
                callId,
                itemId: getStringField(item, "id"),
                name: getStringField(item, "name"),
                args: getStringField(item, "arguments"),
                callIndex: index,
            };
            entry.reasoningIndex = findReasoningForCall(item, reasoningItems);
            entries.push(entry);
            entryByCallId.set(callId, entry);
            return;
        }
        if (itemType === "function_call_output") {
            const callId = String(getStringField(item, "call_id") || "").trim();
            if (!callId)
                return;
            const entry = entryByCallId.get(callId) || {
                callId,
                callIndex: -1,
            };
            entry.outputIndex = index;
            entry.output = getStringField(item, "output");
            if (!entryByCallId.has(callId)) {
                entries.push(entry);
                entryByCallId.set(callId, entry);
            }
        }
    });
    const toolCallTotal = entries.filter((entry) => entry.callIndex >= 0).length;
    let toolCallDeduped = 0;
    if (config.dedupeToolOutputSearch) {
        const seen = new Map();
        for (const entry of entries) {
            if (entry.name !== "search_tool_output")
                continue;
            const parsed = parseToolOutputSearchArgs(entry.args);
            if (!parsed?.handle || !parsed?.query)
                continue;
            const key = `${parsed.handle}|${parsed.query}`;
            if (seen.has(key)) {
                entry.removed = true;
                entry.deduped = true;
                toolCallDeduped += 1;
            }
            else {
                seen.set(key, entry);
            }
        }
    }
    const ordered = entries
        .filter((entry) => entry.callIndex >= 0 && !entry.removed)
        .sort((a, b) => a.callIndex - b.callIndex);
    if (config.limit > 0 && ordered.length > config.limit) {
        const removeCount = ordered.length - config.limit;
        for (let i = 0; i < removeCount; i += 1) {
            ordered[i].removed = true;
        }
    }
    const removedEntries = entries.filter((entry) => entry.removed);
    const removedToolCalls = removedEntries.filter((entry) => entry.callIndex >= 0).length;
    const toolCallRemoved = removedToolCalls;
    const toolCallKept = toolCallTotal - removedToolCalls;
    if (removedEntries.length === 0) {
        return { messages, toolCallTotal, toolCallKept: toolCallTotal, toolCallRemoved: 0, toolCallDeduped };
    }
    const removeIndexes = new Set();
    const keptReasoningIndexes = new Set();
    for (const entry of entries) {
        if (!entry.removed && entry.reasoningIndex !== undefined) {
            keptReasoningIndexes.add(entry.reasoningIndex);
        }
    }
    for (const entry of removedEntries) {
        if (entry.callIndex >= 0)
            removeIndexes.add(entry.callIndex);
        if (entry.outputIndex !== undefined)
            removeIndexes.add(entry.outputIndex);
        if (entry.reasoningIndex !== undefined && !keptReasoningIndexes.has(entry.reasoningIndex)) {
            removeIndexes.add(entry.reasoningIndex);
        }
    }
    const summaryLines = removedEntries
        .filter((entry) => entry.callIndex >= 0)
        .sort((a, b) => a.callIndex - b.callIndex)
        .slice(0, Math.max(0, config.summaryMax))
        .map((entry) => describeToolCall(entry, config.outputChars));
    let summaryText = `Earlier tool calls (${removedToolCalls}) were summarised to stay under the Azure 128 tool-call limit.`;
    if (summaryLines.length > 0) {
        summaryText = `${summaryText}\n\n${summaryLines.join("\n")}`;
    }
    if (removedToolCalls > summaryLines.length) {
        summaryText = `${summaryText}\n\n(${removedToolCalls - summaryLines.length} more tool call(s) omitted.)`;
    }
    const summaryIdBase = `msg_tool_summary_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const summaryId = summaryIdBase.length <= 64 ? summaryIdBase : summaryIdBase.slice(0, 64).replace(/_+$/, "");
    const summaryMessage = {
        type: "message",
        role: "assistant",
        content: [
            {
                type: "output_text",
                text: summaryText,
                annotations: [],
            },
        ],
        status: "completed",
        id: summaryId,
    };
    const insertIndex = Math.min(...Array.from(removeIndexes));
    let insertAt = 0;
    for (let i = 0; i < messages.length && i < insertIndex; i += 1) {
        if (!removeIndexes.has(i))
            insertAt += 1;
    }
    const filtered = messages.filter((_, idx) => !removeIndexes.has(idx));
    filtered.splice(insertAt, 0, summaryMessage);
    return {
        messages: filtered,
        toolCallTotal,
        toolCallKept,
        toolCallRemoved,
        toolCallDeduped,
        summaryText,
    };
}
