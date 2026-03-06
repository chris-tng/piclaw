/**
 * web/agent-events.ts – Transforms pi-agent session events into SSE broadcasts.
 *
 * Subscribes to the agent session's event stream and translates events
 * (text deltas, tool calls, message completions) into SSE payloads for the
 * web UI. Also manages draft/thought buffer accumulation and auto-compaction
 * status broadcasts.
 *
 * Consumers: channels/web.ts wires this up during agent runs.
 */
import { buildPreview, createToolTitleTracker } from "./agent-utils.js";
/** Create an AgentEventEmitter that broadcasts via the given SSE hub. */
export function createAgentEventEmitter(channel, withAgentProfile) {
    return {
        status: (payload) => channel.broadcastEvent("agent_status", withAgentProfile(payload)),
        thought: (payload) => channel.broadcastEvent("agent_thought", withAgentProfile(payload)),
        thoughtDelta: (payload) => channel.broadcastEvent("agent_thought_delta", withAgentProfile(payload)),
        draft: (payload) => channel.broadcastEvent("agent_draft", withAgentProfile(payload)),
        draftDelta: (payload) => channel.broadcastEvent("agent_draft_delta", withAgentProfile(payload)),
        response: (payload) => channel.broadcastEvent("agent_response", withAgentProfile(payload)),
    };
}
/** Create an event handler that translates agent session events to SSE broadcasts. */
export function createStreamingEventHandler(options) {
    const thoughtPreviewLines = options.thoughtPreviewLines ?? 8;
    const draftPreviewLines = options.draftPreviewLines ?? 8;
    const previewMaxCharsPerLine = options.previewMaxCharsPerLine ?? 160;
    let thoughtBuffer = "";
    let draftBuffer = "";
    let thoughtHasDelta = false;
    let thoughtDeltaActive = false;
    let draftDeltaActive = false;
    const { remember, lookup, forget } = createToolTitleTracker();
    const base = {
        thread_id: options.threadId,
        agent_id: options.agentId,
        turn_id: options.turnId,
    };
    return (event) => {
        if (event.type === "message_update") {
            const messageEvent = event.assistantMessageEvent;
            if (messageEvent.type === "thinking_start") {
                thoughtBuffer = "";
                thoughtHasDelta = false;
                thoughtDeltaActive = false;
                if (options.includeThoughtFull?.()) {
                    thoughtDeltaActive = true;
                    options.emitter.thoughtDelta({
                        ...base,
                        delta: "",
                        reset: true,
                    });
                }
            }
            if (messageEvent.type === "thinking_delta") {
                thoughtBuffer += messageEvent.delta;
                thoughtHasDelta = true;
                const { preview, totalLines } = buildPreview(thoughtBuffer, thoughtPreviewLines, previewMaxCharsPerLine);
                options.onThoughtBuffer?.(thoughtBuffer, totalLines);
                options.emitter.thought({
                    ...base,
                    text: preview,
                    total_lines: totalLines,
                });
                const shouldSendDelta = Boolean(options.includeThoughtFull?.());
                if (shouldSendDelta && !thoughtDeltaActive) {
                    thoughtDeltaActive = true;
                    options.emitter.thoughtDelta({
                        ...base,
                        delta: thoughtBuffer,
                        reset: true,
                    });
                }
                else if (shouldSendDelta) {
                    options.emitter.thoughtDelta({
                        ...base,
                        delta: messageEvent.delta,
                    });
                }
                else {
                    thoughtDeltaActive = false;
                }
            }
            if (messageEvent.type === "thinking_end") {
                thoughtBuffer = messageEvent.content || thoughtBuffer;
                const { preview, totalLines } = buildPreview(thoughtBuffer, thoughtPreviewLines, previewMaxCharsPerLine);
                options.onThoughtBuffer?.(thoughtBuffer, totalLines);
                options.emitter.thought({
                    ...base,
                    text: preview,
                    total_lines: totalLines,
                });
                const shouldSendDelta = Boolean(options.includeThoughtFull?.());
                if (shouldSendDelta && !thoughtHasDelta) {
                    thoughtDeltaActive = true;
                    options.emitter.thoughtDelta({
                        ...base,
                        delta: thoughtBuffer,
                        reset: true,
                    });
                }
                else if (!shouldSendDelta) {
                    thoughtDeltaActive = false;
                }
            }
            if (messageEvent.type === "toolcall_end") {
                const title = remember(messageEvent.toolCall.id, messageEvent.toolCall.name, messageEvent.toolCall.arguments);
                options.emitter.status({
                    ...base,
                    type: "tool_call",
                    title,
                });
            }
            if (messageEvent.type === "text_start") {
                draftBuffer = "";
                draftDeltaActive = false;
                options.onDraftBuffer?.(draftBuffer, 0);
                options.emitter.draft({
                    ...base,
                    text: "",
                    total_lines: 0,
                    kind: "draft",
                    mode: "replace",
                });
                if (options.includeDraftFull?.()) {
                    draftDeltaActive = true;
                    options.emitter.draftDelta({
                        ...base,
                        delta: "",
                        reset: true,
                    });
                }
            }
            if (messageEvent.type === "text_delta") {
                draftBuffer += messageEvent.delta;
                const { preview, totalLines } = buildPreview(draftBuffer, draftPreviewLines, previewMaxCharsPerLine);
                options.onDraftBuffer?.(draftBuffer, totalLines);
                options.emitter.draft({
                    ...base,
                    text: preview,
                    total_lines: totalLines,
                    kind: "draft",
                    mode: "replace",
                });
                const shouldSendDelta = Boolean(options.includeDraftFull?.());
                if (shouldSendDelta && !draftDeltaActive) {
                    draftDeltaActive = true;
                    options.emitter.draftDelta({
                        ...base,
                        delta: draftBuffer,
                        reset: true,
                    });
                }
                else if (shouldSendDelta) {
                    options.emitter.draftDelta({
                        ...base,
                        delta: messageEvent.delta,
                    });
                }
                else {
                    draftDeltaActive = false;
                }
            }
        }
        if (event.type === "tool_execution_start") {
            const title = remember(event.toolCallId, event.toolName, event.args);
            options.emitter.status({
                ...base,
                type: "tool_call",
                title,
            });
        }
        if (event.type === "tool_execution_update") {
            const title = lookup(event.toolCallId, event.toolName, event.args);
            options.emitter.status({
                ...base,
                type: "tool_status",
                title,
                status: "Working...",
            });
        }
        if (event.type === "tool_execution_end") {
            const title = lookup(event.toolCallId, event.toolName);
            forget(event.toolCallId);
            options.emitter.status({
                ...base,
                type: "tool_status",
                title,
                status: event.isError ? "Failed" : "Done",
            });
        }
        // Surface provider/API errors and retries so the user sees what's happening
        // instead of silent waiting. These events are emitted by the upstream
        // agent-session for any provider (not just Azure).
        if (event.type === "auto_retry_start") {
            const e = event;
            const delaySec = e.delayMs ? Math.round(e.delayMs / 1000) : "?";
            options.emitter.status({
                ...base,
                type: "intent",
                title: `Retrying after error (attempt ${e.attempt ?? "?"}/${e.maxAttempts ?? "?"}, ${delaySec}s delay)`,
                detail: e.errorMessage || undefined,
            });
        }
        if (event.type === "auto_retry_end") {
            const e = event;
            if (!e.success) {
                options.emitter.status({
                    ...base,
                    type: "error",
                    title: e.finalError || "Request failed after retries",
                });
            }
        }
        if (event.type === "auto_compaction_start") {
            const reason = event.reason;
            const title = reason === "overflow"
                ? "Recovering from context overflow"
                : "Auto-compacting after response";
            options.emitter.status({
                ...base,
                type: "intent",
                title,
            });
        }
        if (event.type === "auto_compaction_end") {
            const e = event;
            if (e.errorMessage) {
                options.emitter.status({
                    ...base,
                    type: "error",
                    title: e.errorMessage,
                });
            }
            else if (e.willRetry) {
                options.emitter.status({
                    ...base,
                    type: "intent",
                    title: "Retrying after auto-compaction",
                });
            }
            else if (e.aborted) {
                options.emitter.status({
                    ...base,
                    type: "intent",
                    title: "Auto-compaction cancelled",
                });
            }
        }
    };
}
