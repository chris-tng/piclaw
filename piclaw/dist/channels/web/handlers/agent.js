import { ASSISTANT_AVATAR, ASSISTANT_NAME, BACKGROUND_AGENT_TIMEOUT, TRIGGER_PATTERN, USER_AVATAR, USER_AVATAR_BACKGROUND, USER_NAME, } from "../../../core/config.js";
import { parseControlCommand } from "../../../agent-control/index.js";
import { normalizeAgentMessagePayload, parseAgentMessageRequest, storeAgentUserMessage, } from "../agent-message-service.js";
import { getMessageRowIdById, getMessagesSince } from "../../../db.js";
import { detectChannel, formatMessages, formatOutbound } from "../../../router.js";
import { createAgentProfileBuilder } from "../agent-utils.js";
import { resolveAvatarUrl } from "../avatar-service.js";
import { createAgentEventEmitter, createStreamingEventHandler } from "../agent-events.js";
import { storeAgentTurn } from "../agent-message-store.js";
import { resolveThreadId, resolveThreadRootId } from "../threading.js";
import { createUuid } from "../../../utils/ids.js";
export async function handleAgentMessage(channel, req, pathname, chatJid, defaultAgentId) {
    const agentId = pathname.split("/")[2] || defaultAgentId;
    const parsed = await parseAgentMessageRequest(req);
    if (parsed.error || !parsed.payload)
        return channel.json({ error: parsed.error }, 400);
    const normalized = normalizeAgentMessagePayload(parsed.payload);
    if (!normalized.content)
        return channel.json({ error: "Missing 'content' field" }, 400);
    const interaction = storeAgentUserMessage(channel, chatJid, {
        content: normalized.content,
        mediaIds: normalized.mediaIds,
        contentBlocks: normalized.contentBlocks,
        linkPreviews: normalized.linkPreviews,
    });
    if (!interaction)
        return channel.json({ error: "Failed to store message" }, 500);
    channel.broadcastEvent("new_post", interaction);
    const threadId = resolveThreadId(normalized.threadId, interaction.id);
    const markCommandHandled = () => {
        if (interaction?.timestamp) {
            channel.state.lastAgentTimestamp[chatJid] = interaction.timestamp;
            channel.saveState();
        }
    };
    const command = parseControlCommand(normalized.content, TRIGGER_PATTERN);
    if (command) {
        const result = await channel.agentPool.applyControlCommand(chatJid, command);
        const formatted = formatOutbound(result.message, "web");
        const isQueueCommand = command.type === "queue" || command.type === "queue_all";
        if (formatted) {
            if (isQueueCommand && result.queued_followup) {
                channel.queueFollowupPlaceholder(chatJid, formatted, interaction.id);
            }
            else {
                await channel.sendMessage(chatJid, formatted, interaction.id);
            }
        }
        // Broadcast model changes so the UI hint updates immediately
        const modelCommands = ["model", "thinking", "cycle_model", "cycle_thinking"];
        if (result.status === "success" && modelCommands.includes(command.type)) {
            const getModel = channel.agentPool
                .getCurrentModelLabel;
            if (typeof getModel === "function") {
                const model = await getModel(chatJid).catch(() => null);
                channel.broadcastEvent("model_changed", { chat_jid: chatJid, model: model ?? null });
            }
        }
        markCommandHandled();
        return channel.json({ user_message: interaction, thread_id: threadId, command: result }, 201);
    }
    // If message looks like an extension slash command (starts with '/'), execute it directly
    const trimmed = (normalized.content || "").trim();
    if (trimmed.startsWith("/")) {
        const cmdResult = await channel.agentPool.applySlashCommand(chatJid, trimmed);
        try {
            const formatted = formatOutbound(cmdResult.message || "", "web");
            if (formatted)
                await channel.sendMessage(chatJid, formatted, interaction.id);
        }
        catch (e) {
            console.error('[web] Failed to send slash command response:', e);
        }
        markCommandHandled();
        return channel.json({ user_message: interaction, thread_id: threadId, command: cmdResult }, 201);
    }
    const steerResult = await channel.agentPool.queueStreamingMessage(chatJid, normalized.content, "steer");
    if (steerResult.queued) {
        channel.queuePendingSteering(chatJid, interaction.timestamp);
        channel.broadcastEvent("agent_steer_queued", { chat_jid: chatJid });
        return channel.json({
            user_message: interaction,
            thread_id: threadId,
            queued: "steer",
        }, 201);
    }
    if (steerResult.error) {
        console.warn(`[web] Failed to queue steering message: ${steerResult.error}`);
    }
    channel.queue.enqueue(async () => {
        await processChat(channel, chatJid, agentId, interaction.id);
    }, `chat:${chatJid}`);
    return channel.json({ user_message: interaction, thread_id: threadId }, 201);
}
export async function processChat(channel, chatJid, agentId, threadRootId) {
    const since = channel.state.lastAgentTimestamp[chatJid] || "";
    const messages = getMessagesSince(chatJid, since, ASSISTANT_NAME);
    if (messages.length === 0)
        return;
    const channelName = detectChannel(chatJid);
    const prompt = formatMessages(messages, channelName);
    const prevCursor = channel.state.lastAgentTimestamp[chatJid] || "";
    const lastMessage = messages[messages.length - 1];
    const pendingThreadRootId = getMessageRowIdById(chatJid, lastMessage.id) ?? null;
    channel.state.setPendingResume(chatJid, {
        prevTimestamp: prevCursor,
        messageId: lastMessage.id,
        threadRootId: pendingThreadRootId,
        createdAt: new Date().toISOString(),
    });
    channel.state.lastAgentTimestamp[chatJid] = lastMessage.timestamp;
    channel.saveState();
    const threadId = lastMessage.timestamp;
    const THOUGHT_PREVIEW_LINES = 8;
    const DRAFT_PREVIEW_LINES = 8;
    const PREVIEW_MAX_CHARS_PER_LINE = 160;
    const turnId = createUuid("turn");
    const withAgentProfile = createAgentProfileBuilder(ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
    const emitter = createAgentEventEmitter(channel, withAgentProfile);
    const trackedEmitter = {
        ...emitter,
        status: (payload) => {
            channel.updateAgentStatus(chatJid, payload);
            emitter.status(payload);
        },
    };
    trackedEmitter.status({
        thread_id: threadId,
        agent_id: agentId,
        type: "thinking",
        title: "Thinking...",
        turn_id: turnId,
    });
    const resolvedThreadRootId = resolveThreadRootId(channel, chatJid, messages[messages.length - 1].id ?? "", threadRootId);
    const streamingHandler = createStreamingEventHandler({
        emitter: trackedEmitter,
        agentId,
        threadId,
        turnId,
        thoughtPreviewLines: THOUGHT_PREVIEW_LINES,
        draftPreviewLines: DRAFT_PREVIEW_LINES,
        previewMaxCharsPerLine: PREVIEW_MAX_CHARS_PER_LINE,
        includeThoughtFull: () => channel.isPanelExpanded(turnId, "thought"),
        includeDraftFull: () => channel.isPanelExpanded(turnId, "draft"),
        onThoughtBuffer: (text, totalLines) => channel.updateThoughtBuffer(turnId, text, totalLines),
        onDraftBuffer: (text, totalLines) => channel.updateDraftBuffer(turnId, text, totalLines),
    });
    const hasActiveClients = channel.sse.clients.size > 0;
    const timeoutMs = hasActiveClients ? undefined : BACKGROUND_AGENT_TIMEOUT;
    const output = await channel.agentPool.runAgent(prompt, chatJid, {
        timeoutMs,
        onAutoCompact: (notice) => {
            const phaseLabel = notice.phase === "pre"
                ? "Auto-compacting to free context"
                : "Auto-compacting after response";
            if (notice.status === "start") {
                trackedEmitter.status({
                    thread_id: threadId,
                    agent_id: agentId,
                    type: "intent",
                    title: phaseLabel,
                    turn_id: turnId,
                });
            }
            else if (notice.status === "end" && notice.phase === "pre") {
                trackedEmitter.status({
                    thread_id: threadId,
                    agent_id: agentId,
                    type: "thinking",
                    title: "Thinking...",
                    turn_id: turnId,
                });
            }
            else if (notice.status === "error" && notice.phase === "pre") {
                trackedEmitter.status({
                    thread_id: threadId,
                    agent_id: agentId,
                    type: "intent",
                    title: "Auto-compaction failed; continuing",
                    turn_id: turnId,
                });
                trackedEmitter.status({
                    thread_id: threadId,
                    agent_id: agentId,
                    type: "thinking",
                    title: "Thinking...",
                    turn_id: turnId,
                });
            }
        },
        onEvent: streamingHandler,
        onTurnComplete: (turn) => {
            // Intermediate turn completed (follow-up boundary) — store as threaded message
            if (turn.text || turn.attachments.length > 0) {
                storeAgentTurn(channel, emitter, {
                    chatJid,
                    text: turn.text,
                    attachments: turn.attachments,
                    channelName,
                    threadId: resolvedThreadRootId,
                });
            }
        },
    });
    if (output.status === "error") {
        channel.state.lastAgentTimestamp[chatJid] = prevCursor;
        channel.state.clearPendingResume(chatJid);
        channel.saveState();
        trackedEmitter.status({
            thread_id: threadId,
            agent_id: agentId,
            type: "error",
            title: output.error || "Agent error",
            turn_id: turnId,
        });
        return;
    }
    // Store the final turn's output
    const finalAttachments = output.attachments ?? [];
    if (output.result || finalAttachments.length > 0) {
        storeAgentTurn(channel, emitter, {
            chatJid,
            text: output.result || "",
            attachments: finalAttachments,
            channelName,
            threadId: resolvedThreadRootId,
        });
    }
    const pendingSteerTimestamp = channel.consumePendingSteering(chatJid);
    if (pendingSteerTimestamp) {
        const current = channel.state.lastAgentTimestamp[chatJid] || "";
        if (!current || current < pendingSteerTimestamp) {
            channel.state.lastAgentTimestamp[chatJid] = pendingSteerTimestamp;
            channel.saveState();
        }
    }
    channel.state.clearPendingResume(chatJid);
    channel.saveState();
    trackedEmitter.status({
        thread_id: threadId,
        agent_id: agentId,
        type: "done",
        turn_id: turnId,
    });
}
