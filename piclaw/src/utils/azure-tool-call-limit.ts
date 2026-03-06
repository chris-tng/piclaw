type ToolCallEntry = {
  callId: string;
  itemId?: string;
  name?: string;
  args?: string;
  output?: string;
  callIndex: number;
  outputIndex?: number;
  reasoningIndex?: number;
  removed?: boolean;
  deduped?: boolean;
};

export type ToolCallLimitConfig = {
  limit: number;
  summaryMax: number;
  outputChars: number;
  dedupeToolOutputSearch: boolean;
};

export type ToolCallLimitResult = {
  messages: Array<any>;
  toolCallTotal: number;
  toolCallKept: number;
  toolCallRemoved: number;
  toolCallDeduped: number;
  summaryText?: string;
};

function formatToolCallSnippet(text: string, maxChars: number): string {
  if (!text) return "(no output)";
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (!collapsed) return "(no output)";
  if (collapsed.length <= maxChars) return collapsed;
  return `${collapsed.slice(0, Math.max(1, maxChars - 1))}…`;
}

function parseToolOutputSearchArgs(args?: string): { handle?: string; query?: string } | null {
  if (!args) return null;
  try {
    const parsed = JSON.parse(args) as { handle?: string; query?: string };
    const handle = typeof parsed?.handle === "string" ? parsed.handle.trim() : "";
    const query = typeof parsed?.query === "string" ? parsed.query.trim() : "";
    if (!handle && !query) return null;
    return { handle, query };
  } catch {
    return null;
  }
}

type ReasoningEntry = {
  index: number;
  id?: string;
  paired: boolean;
};

function findReasoningForCall(item: any, reasoningItems: ReasoningEntry[]): number | undefined {
  if (!item || typeof item !== "object") return undefined;

  const explicit =
    (typeof item.reasoning === "string" ? item.reasoning : undefined) ||
    (typeof item.reasoning_id === "string" ? item.reasoning_id : undefined) ||
    (typeof item.reasoning?.id === "string" ? item.reasoning.id : undefined);

  const itemId = typeof item.id === "string" ? item.id : "";
  let candidate = explicit;

  if (!candidate && itemId) {
    if (itemId.startsWith("fc_")) {
      candidate = `rs_${itemId.slice(3)}`;
    } else if (itemId.startsWith("fc-")) {
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

function describeToolCall(entry: ToolCallEntry, outputChars: number): string {
  const name = entry.name || "tool";
  const outputPreview = formatToolCallSnippet(entry.output || "", outputChars);

  if (name === "tool_output_search") {
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

export function applyToolCallLimit(messages: Array<any>, config: ToolCallLimitConfig): ToolCallLimitResult {
  const entries: ToolCallEntry[] = [];
  const entryByCallId = new Map<string, ToolCallEntry>();
  const reasoningItems: ReasoningEntry[] = [];

  messages.forEach((item, index) => {
    if (!item || typeof item !== "object") return;

    if (item.type === "reasoning") {
      const id = typeof item.id === "string" ? item.id : undefined;
      reasoningItems.push({ index, id, paired: false });
      return;
    }

    if (item.type === "function_call") {
      const callId = String(item.call_id || item.id || "").trim();
      if (!callId) return;
      const entry: ToolCallEntry = {
        callId,
        itemId: typeof item.id === "string" ? item.id : undefined,
        name: typeof item.name === "string" ? item.name : undefined,
        args: typeof item.arguments === "string" ? item.arguments : undefined,
        callIndex: index,
      };
      entry.reasoningIndex = findReasoningForCall(item, reasoningItems);
      entries.push(entry);
      entryByCallId.set(callId, entry);
      return;
    }

    if (item.type === "function_call_output") {
      const callId = String(item.call_id || "").trim();
      if (!callId) return;
      const entry = entryByCallId.get(callId) || {
        callId,
        callIndex: -1,
      };
      entry.outputIndex = index;
      entry.output = typeof item.output === "string" ? item.output : undefined;
      if (!entryByCallId.has(callId)) {
        entries.push(entry);
        entryByCallId.set(callId, entry);
      }
    }
  });

  const toolCallTotal = entries.filter((entry) => entry.callIndex >= 0).length;
  let toolCallDeduped = 0;
  if (config.dedupeToolOutputSearch) {
    const seen = new Map<string, ToolCallEntry>();
    for (const entry of entries) {
      if (entry.name !== "tool_output_search") continue;
      const parsed = parseToolOutputSearchArgs(entry.args);
      if (!parsed?.handle || !parsed?.query) continue;
      const key = `${parsed.handle}|${parsed.query}`;
      if (seen.has(key)) {
        entry.removed = true;
        entry.deduped = true;
        toolCallDeduped += 1;
      } else {
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

  const removeIndexes = new Set<number>();
  const keptReasoningIndexes = new Set<number>();
  for (const entry of entries) {
    if (!entry.removed && entry.reasoningIndex !== undefined) {
      keptReasoningIndexes.add(entry.reasoningIndex);
    }
  }

  for (const entry of removedEntries) {
    if (entry.callIndex >= 0) removeIndexes.add(entry.callIndex);
    if (entry.outputIndex !== undefined) removeIndexes.add(entry.outputIndex);
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
    if (!removeIndexes.has(i)) insertAt += 1;
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
