/**
 * web/handlers/agent.ts – HTTP handlers for agent-related API endpoints.
 *
 * Handles GET /agents, GET /agent/status, GET /agent/thought,
 * POST /agent/thought/visibility, avatar upload/retrieval, user profile,
 * and branding endpoints.
 *
 * Consumers: web/request-router.ts routes agent paths to these handlers.
 */

import type { WebChannel } from "../../web.js";
import {
  ASSISTANT_AVATAR,
  ASSISTANT_NAME,
  BACKGROUND_AGENT_TIMEOUT,
  TRIGGER_PATTERN,
  USER_AVATAR,
  USER_AVATAR_BACKGROUND,
  USER_NAME,
} from "../../../core/config.js";
import { parseControlCommand } from "../../../agent-control/index.js";
import {
  normalizeAgentMessagePayload,
  parseAgentMessageRequest,
  storeAgentUserMessage,
} from "../agent-message-service.js";
import {
  beginChatRun,
  endChatRun,
  endChatRunWithError,
  getChatCursor,
  getInflightMessageId,
  getMessageRowIdById,
  getMessagesSince,
  getDb,
  rollbackInflightRun,
  setChatCursor,
} from "../../../db.js";
import { detectChannel, formatMessages, formatOutbound } from "../../../router.js";
import { createAgentProfileBuilder } from "../agent-utils.js";
import { resolveAvatarUrl } from "../avatar-service.js";
import { createAgentEventEmitter, createStreamingEventHandler } from "../agent-events.js";
import { broadcastInteractionUpdated } from "../interaction-service.js";
import { storeAgentTurn } from "../agent-message-store.js";
import { resolveThreadId, resolveThreadRootId } from "../threading.js";
import { createUuid } from "../../../utils/ids.js";

/** Handle POST to create an agent message and start an agent run. */
export async function handleAgentMessage(
  channel: WebChannel,
  req: Request,
  pathname: string,
  chatJid: string,
  defaultAgentId: string
): Promise<Response> {
  const agentId = pathname.split("/")[2] || defaultAgentId;
  const parsed = await parseAgentMessageRequest(req);
  if (parsed.error || !parsed.payload) return channel.json({ error: parsed.error }, 400);

  const normalized = normalizeAgentMessagePayload(parsed.payload);
  const content = typeof normalized.content === "string" ? normalized.content : "";
  const hasAttachments =
    normalized.mediaIds.length > 0 ||
    (Array.isArray(normalized.contentBlocks) && normalized.contentBlocks.length > 0) ||
    (Array.isArray(normalized.linkPreviews) && normalized.linkPreviews.length > 0);
  const hasPayload = content.trim().length > 0 || hasAttachments;
  if (!hasPayload) return channel.json({ error: "Missing 'content' field" }, 400);

  const interaction = storeAgentUserMessage(channel, chatJid, {
    content,
    mediaIds: normalized.mediaIds,
    contentBlocks: normalized.contentBlocks,
    linkPreviews: normalized.linkPreviews,
  });

  if (!interaction) return channel.json({ error: "Failed to store message" }, 500);

  channel.broadcastEvent("new_post", interaction);

  let threadId = resolveThreadId(normalized.threadId, interaction.id);

  const markCommandHandled = () => {
    if (interaction?.timestamp) {
      setChatCursor(chatJid, interaction.timestamp);
    }
  };

  const withAgentProfile = createAgentProfileBuilder(
    ASSISTANT_NAME,
    resolveAvatarUrl("agent", ASSISTANT_AVATAR),
    USER_NAME || null,
    resolveAvatarUrl("user", USER_AVATAR),
    USER_AVATAR_BACKGROUND || null
  );

  const emitCommandStatus = (payload: Record<string, unknown>) => {
    channel.updateAgentStatus(chatJid, payload);
    channel.broadcastEvent("agent_status", withAgentProfile(payload));
  };

  const command = parseControlCommand(content, TRIGGER_PATTERN);
  if (command) {
    const commandTurnId = createUuid("turn");
    const commandTitle = content.trim().split(/\s+/, 1)[0] || "command";
    emitCommandStatus({
      thread_id: interaction.timestamp,
      agent_id: agentId,
      turn_id: commandTurnId,
      type: "intent",
      title: `Running ${commandTitle}...`,
    });

    const result = await channel.agentPool.applyControlCommand(chatJid, command);
    const formatted = formatOutbound(result.message, "web");
    const isQueueCommand = command.type === "queue" || command.type === "queue_all";
    if (formatted) {
      if (isQueueCommand && result.queued_followup) {
        channel.queueFollowupPlaceholder(chatJid, formatted, interaction.id);
      } else {
        await channel.sendMessage(chatJid, formatted, interaction.id);
      }
    }

    // Broadcast model changes so the UI hint updates immediately
    const modelCommands = ["model", "thinking", "cycle_model", "cycle_thinking"];
    if (result.status === "success" && modelCommands.includes(command.type)) {
      let nextModel = result.model_label ?? null;
      let thinkingLevel = result.thinking_level ?? null;
      let supportsThinking: boolean | undefined = undefined;

      try {
        const modelState = await channel.agentPool.getAvailableModels(chatJid);
        if (!nextModel) nextModel = modelState.current ?? null;
        if (thinkingLevel == null) thinkingLevel = modelState.thinking_level ?? null;
        supportsThinking = modelState.supports_thinking;
      } catch {
        const getModel = (channel.agentPool as { getCurrentModelLabel?: (jid: string) => Promise<string | null> })
          .getCurrentModelLabel;
        if (typeof getModel === "function") {
          nextModel = await getModel(chatJid).catch(() => null);
        }
      }

      channel.broadcastEvent("model_changed", {
        chat_jid: chatJid,
        model: nextModel ?? null,
        thinking_level: thinkingLevel ?? null,
        supports_thinking: supportsThinking,
      });
    }

    if (result.status === "success" && (command.type === "model" || command.type === "cycle_model")) {
      channel.skipFailedOnModelSwitch(chatJid);
    }

    emitCommandStatus({
      thread_id: interaction.timestamp,
      agent_id: agentId,
      turn_id: commandTurnId,
      type: result.status === "success" ? "done" : "error",
      title: result.status === "success" ? `Completed ${commandTitle}` : (result.message || "Command failed"),
    });

    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: threadId, command: result },
      201
    );
  }

  // If message looks like an extension slash command (starts with '/'), execute it directly
  const trimmed = content.trim();
  if (trimmed.startsWith("/")) {
    const commandTurnId = createUuid("turn");
    const slashName = trimmed.split(/\s+/, 1)[0] || "/command";
    emitCommandStatus({
      thread_id: interaction.timestamp,
      agent_id: agentId,
      turn_id: commandTurnId,
      type: "intent",
      title: `Running ${slashName}...`,
    });

    channel.lastCommandInteractionId = interaction.id;
    let cmdResult;
    try {
      cmdResult = await channel.agentPool.applySlashCommand(chatJid, trimmed);
    } finally {
      channel.lastCommandInteractionId = null;
    }
    try {
      const formatted = formatOutbound(cmdResult.message || "", "web");
      if (formatted) await channel.sendMessage(chatJid, formatted, interaction.id);
    } catch (e) {
      console.error('[web] Failed to send slash command response:', e);
    }

    if (slashName === "/reload" && cmdResult.status === "success") {
      emitCommandStatus({
        thread_id: interaction.timestamp,
        agent_id: agentId,
        turn_id: commandTurnId,
        type: "intent",
        title: "Reload scheduled — waiting for restart",
        detail: cmdResult.message || undefined,
      });
    } else {
      emitCommandStatus({
        thread_id: interaction.timestamp,
        agent_id: agentId,
        turn_id: commandTurnId,
        type: cmdResult.status === "success" ? "done" : "error",
        title: cmdResult.status === "success" ? `Completed ${slashName}` : (cmdResult.message || "Command failed"),
      });
    }

    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: threadId, command: cmdResult },
      201
    );
  }

  const steerResult = await channel.agentPool.queueStreamingMessage(chatJid, content, "steer");
  if (steerResult.queued) {
    // Parent steering messages to the original inflight turn root so they
    // render as thread replies (indented like agent responses).
    const inflightMessageId = getInflightMessageId(chatJid);
    const rootRowId = inflightMessageId ? getMessageRowIdById(chatJid, inflightMessageId) : null;
    if (rootRowId && rootRowId !== interaction.id) {
      getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(rootRowId, interaction.id);
      interaction.data.thread_id = rootRowId;
      threadId = rootRowId;
      broadcastInteractionUpdated(
        channel,
        interaction,
        ASSISTANT_NAME,
        resolveAvatarUrl("agent", ASSISTANT_AVATAR),
        USER_NAME || null,
        resolveAvatarUrl("user", USER_AVATAR),
        USER_AVATAR_BACKGROUND || null
      );
    }

    channel.queuePendingSteering(chatJid, interaction.timestamp);
    channel.broadcastEvent("agent_steer_queued", { chat_jid: chatJid, thread_id: threadId ?? null });
    return channel.json(
      {
        user_message: interaction,
        thread_id: threadId,
        queued: "steer",
      },
      201
    );
  }

  if (steerResult.error) {
    console.warn(`[web] Failed to queue steering message: ${steerResult.error}`);
  }

  channel.queue.enqueue(async () => {
    await processChat(channel, chatJid, agentId, interaction.id);
  }, `chat:${chatJid}:${interaction.id}`);

  return channel.json({ user_message: interaction, thread_id: threadId }, 201);
}

/** Process a chat message: detect commands, queue agent run, or store post. */
export async function processChat(
  channel: WebChannel,
  chatJid: string,
  agentId: string,
  threadRootId?: number
): Promise<void> {
  const prevCursor = getChatCursor(chatJid);
  const messages = getMessagesSince(chatJid, prevCursor, ASSISTANT_NAME);
  if (messages.length === 0) return;

  const channelName = detectChannel(chatJid);
  const prompt = formatMessages(messages, channelName);
  const lastMessage = messages[messages.length - 1];

  // Atomically advance the cursor AND write an inflight marker in one SQL
  // statement. If the process is killed before endChatRun(), the next
  // startup sees the inflight marker, rolls the cursor back to prevCursor,
  // and retries this turn.
  beginChatRun(chatJid, lastMessage.timestamp, {
    prevTs: prevCursor,
    messageId: lastMessage.id,
    startedAt: new Date().toISOString(),
  });

  const threadId = lastMessage.timestamp;

  const THOUGHT_PREVIEW_LINES = 8;
  const DRAFT_PREVIEW_LINES = 8;
  const PREVIEW_MAX_CHARS_PER_LINE = 160;

  const turnId = createUuid("turn");
  const withAgentProfile = createAgentProfileBuilder(
    ASSISTANT_NAME,
    resolveAvatarUrl("agent", ASSISTANT_AVATAR),
    USER_NAME || null,
    resolveAvatarUrl("user", USER_AVATAR),
    USER_AVATAR_BACKGROUND || null
  );
  const emitter = createAgentEventEmitter(channel, withAgentProfile);
  const trackedEmitter = {
    ...emitter,
    status: (payload: Record<string, unknown>) => {
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

  const resolvedThreadRootId = resolveThreadRootId(
    channel,
    chatJid,
    messages[messages.length - 1].id ?? "",
    threadRootId
  );


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
    if (output.error && output.error.includes("already processing")) {
      // A concurrent run is already handling this chat. Roll back the cursor
      // we advanced so this message stays pending, then throw so the queue
      // retries after backoff.
      rollbackInflightRun(chatJid, prevCursor);
      trackedEmitter.status({
        thread_id: threadId,
        agent_id: agentId,
        type: "intent",
        title: "Queued — waiting for current response",
        turn_id: turnId,
      });
      throw new Error(output.error);
    }

    if (output.error && output.error.includes("No API provider registered for api:")) {
      // Extension/provider registration races can happen right after restart.
      // Keep the message pending and let the queue retry automatically.
      rollbackInflightRun(chatJid, prevCursor);
      trackedEmitter.status({
        thread_id: threadId,
        agent_id: agentId,
        type: "intent",
        title: "Model provider is initializing — retrying shortly",
        detail: output.error,
        turn_id: turnId,
      });
      throw new Error(output.error);
    }

    // Single UPDATE: clears inflight AND writes failed_run atomically.
    // No window exists where inflight is gone but failed_run is not yet set.
    endChatRunWithError(chatJid, {
      prevTs: prevCursor,
      failedTs: lastMessage.timestamp,
      messageId: lastMessage.id,
      threadRootId: resolvedThreadRootId ?? null,
      createdAt: new Date().toISOString(),
    });

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

  // Single UPDATE: clears inflight AND clears any stale failed_run atomically.
  endChatRun(chatJid);

  const pendingSteerTimestamp = channel.consumePendingSteering(chatJid);
  if (pendingSteerTimestamp) {
    const current = getChatCursor(chatJid);
    if (!current || current < pendingSteerTimestamp) {
      setChatCursor(chatJid, pendingSteerTimestamp);
    }
  }

  channel.saveState();
  const contextUsage = await channel.agentPool.getContextUsageForChat(chatJid);
  trackedEmitter.status({
    thread_id: threadId,
    agent_id: agentId,
    type: "done",
    turn_id: turnId,
    context_usage: contextUsage
      ? { tokens: contextUsage.tokens, contextWindow: contextUsage.contextWindow, percent: contextUsage.percent }
      : null,
  });
}
