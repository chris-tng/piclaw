/**
 * web/handlers/agent.ts – HTTP handlers for agent-related API endpoints.
 *
 * Handles GET /agents, GET /agent/status, GET /agent/thought,
 * POST /agent/thought/visibility, avatar upload/retrieval, user profile,
 * and branding endpoints.
 *
 * Consumers: web/request-router.ts routes agent paths to these handlers.
 */

import type { WebChannelLike } from "../web-channel-contracts.js";
import {
  AGENT_TIMEOUT,
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
import { handleUiThemeCommand } from "../ui-theme-commands.js";
import { handleAdaptiveCardTestCommand } from "../adaptive-card-test-command.js";
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
import type { AttachmentInfo } from "../../../agent-pool/attachments.js";

/** Handle POST to create an agent message and start an agent run. */
export async function handleAgentMessage(
  channel: WebChannelLike,
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

  const command = parseControlCommand(content, TRIGGER_PATTERN);
  const requestMode = normalized.mode ?? "auto";
  const trimmed = content.trim();
  const themeCommand = handleUiThemeCommand(trimmed);
  const testCardCommand = handleAdaptiveCardTestCommand(trimmed);
  const isStreaming = typeof channel.agentPool.isStreaming === "function"
    ? channel.agentPool.isStreaming(chatJid)
    : false;
  const isActive = typeof (channel.agentPool as { isActive?: (chatJid: string) => boolean }).isActive === "function"
    ? (channel.agentPool as { isActive: (chatJid: string) => boolean }).isActive(chatJid)
    : isStreaming;
  // NOTE: we intentionally use the in-memory active-run flags—not the DB
  // inflight marker—to decide whether to queue/defer. The DB marker survives
  // restarts and can be stale (cleared only when recovery runs), so trusting
  // it here would silently defer messages against ghost turns that no
  // processChat is actively draining. The in-memory session state resets on
  // restart and reflects whether the agent pool still has an active run,
  // including streaming/compaction/retry phases of the same turn.


  const queueDeferredFollowup = (
    queuedContent: string,
    extras?: { mediaIds?: number[]; contentBlocks?: unknown[]; linkPreviews?: unknown[] }
  ): Response => {
    const queuedAt = new Date().toISOString();
    // Don't inherit the active turn's thread root. Deferred followups are
    // independent messages typed while the agent was busy — they should
    // start their own thread when materialized (self-rooted via
    // storeWebMessage's default behaviour).
    const queuedThreadId: number | null = null;
    const queuedRowId = channel.enqueueQueuedFollowupItem(chatJid, 0, queuedContent, queuedThreadId, queuedAt, extras);
    channel.broadcastEvent("agent_followup_queued", {
      chat_jid: chatJid,
      thread_id: queuedThreadId,
      row_id: queuedRowId,
      content: queuedContent,
      timestamp: queuedAt,
    });
    return channel.json({ queued: "followup", thread_id: queuedThreadId }, 201);
  };

  const queueDeferredSteer = async (steerContent: string, source?: string): Promise<Response | null> => {
    if (!isStreaming) return null;
    const steerResult = await channel.agentPool.queueStreamingMessage(chatJid, steerContent, "steer");
    if (!steerResult.queued) return null;
    const queuedAt = new Date().toISOString();
    channel.broadcastEvent("agent_steer_queued", {
      chat_jid: chatJid,
      thread_id: null,
      source,
      timestamp: queuedAt,
      content: steerContent,
    });
    return channel.json({ queued: "steer", thread_id: null }, 201);
  };

  // Normal in-turn user messages should remain out of the timeline until the
  // current turn fully finalizes. Queue them in server state first, then
  // persist/broadcast the real user message only when consumed.
  const shouldDeferQueuedFollowup = !command && !themeCommand && !testCardCommand && isActive && (requestMode === "queue" || requestMode === "auto");

  console.log(
    `[web] handleAgentMessage ${chatJid}: mode=${requestMode}, isStreaming=${isStreaming}, isActive=${isActive}, ` +
      `shouldDefer=${shouldDeferQueuedFollowup}, hasCommand=${!!command}, ` +
      `content=${content.slice(0, 60)}`
  );

  if (shouldDeferQueuedFollowup) {
    return queueDeferredFollowup(content, {
      mediaIds: normalized.mediaIds,
      contentBlocks: normalized.contentBlocks,
      linkPreviews: normalized.linkPreviews,
    });
  }

  if (!command && !themeCommand && isStreaming && requestMode === "steer") {
    const steerResponse = await queueDeferredSteer(content, "compose");
    if (steerResponse) return steerResponse;
  }

  if ((command?.type === "queue" || command?.type === "queue_all") && isStreaming) {
    const queuedText = (command.message || "").trim();
    if (queuedText) {
      return queueDeferredFollowup(queuedText);
    }
  }

  if (command?.type === "steer" && isStreaming) {
    const steerText = (command.message || "").trim();
    if (steerText) {
      const steerResponse = await queueDeferredSteer(steerText, "command");
      if (steerResponse) return steerResponse;
    }
  }

  if (themeCommand) {
    if (themeCommand.payload) {
      channel.broadcastEvent("ui_theme", { chat_jid: chatJid, ...themeCommand.payload });
    }

    return channel.json(
      { thread_id: null, command: themeCommand, ui_only: true },
      200
    );
  }

  if (testCardCommand) {
    if (testCardCommand.status === "error") {
      return channel.json({ thread_id: null, command: testCardCommand }, 400);
    }

    if (testCardCommand.emit === false) {
      return channel.json({ thread_id: null, command: testCardCommand, emitted: false }, 200);
    }

    await channel.sendMessage(chatJid, testCardCommand.content, {
      forceRoot: true,
      contentBlocks: testCardCommand.contentBlocks,
    });

    return channel.json(
      { thread_id: null, command: testCardCommand, emitted: true },
      201
    );
  }

  const interaction = storeAgentUserMessage(channel, chatJid, {
    content,
    mediaIds: normalized.mediaIds,
    contentBlocks: normalized.contentBlocks,
    linkPreviews: normalized.linkPreviews,
  });

  if (!interaction) return channel.json({ error: "Failed to store message" }, 500);

  // Defer new_post broadcast — don't emit for messages that will be queued
  // as follow-ups (prevents flash in timeline before filtering kicks in).
  let newPostBroadcast = false;
  const broadcastNewPost = () => {
    if (!newPostBroadcast) {
      newPostBroadcast = true;
      channel.broadcastEvent("new_post", interaction);
    }
  };

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

  const queueFollowupMessage = async (): Promise<Response | null> => {
    // Web queued follow-ups are managed by the web channel itself rather than
    // AgentSession's internal follow-up queue. This guarantees the current turn
    // finalizes and publishes before the next queued user message begins.
    if (!isStreaming) {
      return null;
    }

    channel.enqueueQueuedFollowupItem(
      chatJid,
      interaction.id,
      content,
      interaction.id,
      interaction.timestamp
    );
    channel.broadcastEvent("agent_followup_queued", {
      chat_jid: chatJid,
      thread_id: interaction.data?.thread_id ?? interaction.id ?? null,
      row_id: interaction.id,
      content,
      timestamp: interaction.timestamp,
    });

    return channel.json(
      {
        user_message: interaction,
        thread_id: threadId,
        queued: "followup",
      },
      201
    );
  };

  const queueSteerMessage = async (source?: string): Promise<Response | null> => {
    const steerResult = await channel.agentPool.queueStreamingMessage(chatJid, content, "steer");
    if (!steerResult.queued) {
      return null;
    }

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
    channel.broadcastEvent("agent_steer_queued", {
      chat_jid: chatJid,
      thread_id: threadId ?? null,
      source,
    });

    return channel.json(
      {
        user_message: interaction,
        thread_id: threadId,
        queued: "steer",
      },
      201
    );
  };

  if (command) {
    broadcastNewPost();
    const commandTurnId = createUuid("turn");
    const commandTitle = content.trim().split(/\s+/, 1)[0] || "command";
    emitCommandStatus({
      thread_id: interaction.timestamp,
      agent_id: agentId,
      turn_id: commandTurnId,
      type: "intent",
      title: "Running " + commandTitle + "...",
    });

    const result = await channel.agentPool.applyControlCommand(chatJid, command);
    const formatted = formatOutbound(result.message, "web");
    const isQueueCommand = command.type === "queue" || command.type === "queue_all";
    const isSteerCommand = command.type === "steer";

    if (formatted) {
      if (isQueueCommand && result.queued_followup) {
        markCommandHandled();
        return queueDeferredFollowup(((command as { message?: string }).message || content).trim());
      } else if (isSteerCommand && (result as { queued_steer?: boolean }).queued_steer) {
        const steerResponse = await queueSteerMessage("command");
        if (steerResponse) {
          return steerResponse;
        }
      } else if (isSteerCommand && (result as { queued_followup?: boolean }).queued_followup) {
        markCommandHandled();
        return queueDeferredFollowup(((command as { message?: string }).message || content).trim());
      } else if (isSteerCommand && result.status === "error" && result.message === "No active response to steer. Please send a message first.") {
        const queueResponse = await queueFollowupMessage();
        if (queueResponse) {
          return queueResponse;
        }
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
        if (typeof channel.agentPool.getCurrentModelLabel === "function") {
          nextModel = await channel.agentPool.getCurrentModelLabel(chatJid).catch(() => null);
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
      title: result.status === "success" ? "Completed " + commandTitle : (result.message || "Command failed"),
    });

    if (isSteerCommand && (result as { queued_steer?: boolean }).queued_steer) {
      return channel.json({ user_message: interaction, thread_id: threadId, command: result, queued: "steer" }, 201);
    }

    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: threadId, command: result },
      201
    );
  }

  // If message looks like an extension slash command (starts with "/"), execute it directly
  if (trimmed.startsWith("/")) {
    broadcastNewPost();
    const commandTurnId = createUuid("turn");
    const slashName = trimmed.split(/\s+/, 1)[0] || "/command";
    emitCommandStatus({
      thread_id: interaction.timestamp,
      agent_id: agentId,
      turn_id: commandTurnId,
      type: "intent",
      title: "Running " + slashName + "...",
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
        title: cmdResult.status === "success" ? "Completed " + slashName : (cmdResult.message || "Command failed"),
      });
    }

    markCommandHandled();
    return channel.json(
      { user_message: interaction, thread_id: threadId, command: cmdResult },
      201
    );
  }

  if (requestMode === "steer") {
    const steerResponse = await queueSteerMessage("compose");
    if (steerResponse) {
      return steerResponse;
    }
  }

  if (requestMode === "queue" || requestMode === "auto") {
    const followupResponse = await queueFollowupMessage();
    if (followupResponse) {
      return followupResponse;
    }
  }

  // Normal (non-queued) message processing — broadcast to timeline now
  broadcastNewPost();

  console.log(
    `[web] handleAgentMessage ${chatJid}: normal path → enqueue processChat ` +
      `(key=chat:${chatJid}:${interaction.id})`
  );

  channel.queue.enqueue(async () => {
    await processChat(channel, chatJid, agentId, interaction.data?.thread_id ?? interaction.id);
  }, `chat:${chatJid}:${interaction.id}`);

  return channel.json({ user_message: interaction, thread_id: threadId }, 201);

}

/** Process a chat message: detect commands, queue agent run, or store post. */
export async function processChat(
  channel: WebChannelLike,
  chatJid: string,
  agentId: string,
  threadRootId?: number
): Promise<void> {
  const MAX_MATERIALIZE_RETRIES = 5;

  const materializeNextDeferredFollowup = (): boolean => {
    const nextQueued = channel.consumeQueuedFollowupItem(chatJid);
    if (!nextQueued) return false;

    const retries = nextQueued.materializeRetries ?? 0;

    const queuedInteraction = channel.storeMessage(
      chatJid,
      nextQueued.queuedContent,
      false,
      nextQueued.mediaIds ?? [],
      {
        contentBlocks: Array.isArray(nextQueued.contentBlocks) ? nextQueued.contentBlocks : undefined,
        linkPreviews: Array.isArray(nextQueued.linkPreviews) ? nextQueued.linkPreviews : undefined,
        threadId: nextQueued.threadId ?? undefined,
      }
    );

    if (!queuedInteraction) {
      if (retries >= MAX_MATERIALIZE_RETRIES) {
        // Too many failures — drop the item to prevent infinite loops.
        console.error(
          `[web] Dropping queued followup for ${chatJid} after ${retries} failed materialize attempts ` +
            `(rowId=${nextQueued.rowId}, content=${nextQueued.queuedContent?.slice(0, 80)})`
        );
        channel.broadcastEvent("agent_followup_consumed", {
          chat_jid: chatJid,
          thread_id: nextQueued.threadId ?? null,
          row_id: nextQueued.rowId,
          content: nextQueued.queuedContent,
          timestamp: nextQueued.queuedAt,
        });
        return false;
      }
      // Preserve order and increment retry counter.
      const withRetry = { ...nextQueued, materializeRetries: retries + 1 };
      channel.prependQueuedFollowupItem(chatJid, withRetry);
      console.warn(
        `[web] Failed to materialize queued followup for ${chatJid} ` +
          `(attempt ${retries + 1}/${MAX_MATERIALIZE_RETRIES}, rowId=${nextQueued.rowId})`
      );
      return false;
    }

    channel.broadcastEvent("agent_followup_consumed", {
      chat_jid: chatJid,
      thread_id: nextQueued.threadId ?? null,
      row_id: nextQueued.rowId,
      content: nextQueued.queuedContent,
      timestamp: nextQueued.queuedAt,
    });
    channel.broadcastEvent("new_post", queuedInteraction);
    channel.resumeChat(chatJid, queuedInteraction.data?.thread_id ?? queuedInteraction.id);
    return true;
  };

  const prevCursor = getChatCursor(chatJid);
  const messages = getMessagesSince(chatJid, prevCursor, ASSISTANT_NAME);

  if (messages.length === 0) {
    console.log(
      `[web] processChat ${chatJid}: cursor=${prevCursor}, pendingMessages=0, threadRootId=${threadRootId ?? "none"}`
    );
    materializeNextDeferredFollowup();
    return;
  }

  // Process exactly one persisted user message per turn. Batching multiple
  // user messages into one prompt causes cross-parented replies and makes
  // queue/turn finalization ordering nondeterministic.
  const currentMessage = messages[0];
  if (!currentMessage) return;

  // Derive thread root from the actual message being processed, NOT from
  // the threadRootId parameter. The parameter comes from whichever
  // handleAgentMessage enqueued this processChat, but cursor-ordered
  // message selection may pick a DIFFERENT message. Using the parameter
  // would cross-parent the response under the wrong thread.
  const messageThreadId = currentMessage.thread_id ?? undefined;
  const effectiveThreadRootId = messageThreadId ?? threadRootId;

  console.log(
    `[web] processChat ${chatJid}: cursor=${prevCursor}, ` +
      `pendingMessages=${messages.length} [${messages.map(m => `${m.id}@${m.timestamp}`).join(", ")}], ` +
      `threadRootId=${threadRootId ?? "none"}, ` +
      `msgThread=${messageThreadId ?? "none"}, ` +
      `effectiveThread=${effectiveThreadRootId ?? "none"}, ` +
      `processing=${currentMessage.id}`
  );

  const channelName = detectChannel(chatJid);
  const prompt = formatMessages([currentMessage], channelName);
  const lastMessage = currentMessage;

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
    currentMessage.id ?? "",
    effectiveThreadRootId
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
  // Keep interactive web turns bounded so stalled sessions still reach a
  // terminal state, but do not clamp them too aggressively. A 5 minute cap
  // proved too short for legitimate long-running tool workflows, so we allow
  // up to 15 minutes here while still respecting any lower global timeout.
  const INTERACTIVE_WEB_TIMEOUT_MS = Math.min(AGENT_TIMEOUT, 15 * 60 * 1000);
  const timeoutMs = hasActiveClients
    ? INTERACTIVE_WEB_TIMEOUT_MS
    : (BACKGROUND_AGENT_TIMEOUT > 0 ? BACKGROUND_AGENT_TIMEOUT : AGENT_TIMEOUT);

  let turnCount = 0;
  const publishDraftFallback = (reason?: "timeout" | "error" | "empty-final") => {
    // Draft fallback should publish the currently visible draft for whichever
    // turn failed to finalize, even if earlier turns in the same session were
    // already flushed via onTurnComplete(). For the very first turn we must
    // still skip placeholder consumption so an already-queued follow-up is not
    // accidentally stolen by the original response.
    const draft = channel.getBuffer(turnId, "draft");
    const draftText = typeof draft?.text === "string" ? draft.text.trim() : "";
    if (!draftText) return false;

    const suffix =
      reason === "timeout"
        ? "\n\n⚠️ Response timed out before finalization."
        : reason === "error"
          ? "\n\n⚠️ Response ended with an error before finalization."
          : "";

    return storeAgentTurn(channel, emitter, {
      chatJid,
      text: `${draftText}${suffix}`,
      attachments: [],
      channelName,
      threadId: resolvedThreadRootId,
      skipPlaceholder: turnCount === 0,
      isTerminalAgentReply: true,
    });
  };

  const finalizeSuccessfulRun = async () => {
    // Single UPDATE: clears inflight AND clears any stale failed_run atomically.
    endChatRun(chatJid);

    const cursorAfterEnd = getChatCursor(chatJid);
    const pendingSteerTimestamp = channel.consumePendingSteering(chatJid);
    if (pendingSteerTimestamp) {
      const current = getChatCursor(chatJid);
      if (!current || current < pendingSteerTimestamp) {
        setChatCursor(chatJid, pendingSteerTimestamp);
      }
    }

    const cursorAfterSteer = getChatCursor(chatJid);

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

    // If more persisted user messages already exist after the cursor, process
    // them before consuming deferred queued items. This preserves one-message-
    // per-turn ordering and prevents cross-thread batching.
    const cursorNow = getChatCursor(chatJid);
    const remainingPersisted = getMessagesSince(chatJid, cursorNow, ASSISTANT_NAME);

    console.log(
      `[web] finalizeSuccessfulRun ${chatJid}: cursorAfterEnd=${cursorAfterEnd}, ` +
        `cursorAfterSteer=${cursorAfterSteer}, cursorNow=${cursorNow}, ` +
        `remaining=${remainingPersisted.length}${remainingPersisted.length > 0 ? ` [${remainingPersisted.map(m => `${m.id}@${m.timestamp}`).join(", ")}]` : ""}`
    );

    if (remainingPersisted.length > 0) {
      channel.resumeChat(chatJid);
      return;
    }

    // Start the next queued follow-up only after this turn has fully finalized.
    materializeNextDeferredFollowup();
  };

  const output = await channel.agentPool.runAgent(prompt, chatJid, {
    timeoutMs,
    onEvent: streamingHandler,
    onTurnComplete: (turn: { text: string; attachments: unknown[] }) => {
      // Turn boundary: the first turn (index 0) is the original prompt's
      // response — skip placeholder consumption so it doesn't steal a
      // placeholder that belongs to a queued follow-up.
      // Subsequent turns (index 1+) are follow-up responses and should
      // consume their corresponding placeholder.
      const isFirstTurn = turnCount === 0;
      turnCount++;
      if (turn.text || turn.attachments.length > 0) {
        const stored = storeAgentTurn(channel, emitter, {
          chatJid,
          text: turn.text,
          attachments: turn.attachments as AttachmentInfo[],
          channelName,
          threadId: resolvedThreadRootId,
          skipPlaceholder: isFirstTurn,
        });
        if (!stored) {
          console.warn(
            `[web] Failed to persist intermediate turn ${turnCount} for ${chatJid} ` +
              `(${turn.text.length} chars, ${turn.attachments.length} attachments)`
          );
        }
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

    const errorText = output.error || "Agent error";
    const fallbackPublished = errorText.toLowerCase().includes("timed out")
      ? publishDraftFallback("timeout")
      : publishDraftFallback("error");

    if (fallbackPublished) {
      // A persisted draft fallback is a terminal outcome, not a replayable
      // failure. Clear inflight state through the normal success path so the
      // turn can drain pending work and the client receives a normal done
      // transition plus the already-persisted fallback post.
      await finalizeSuccessfulRun();
      return;
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
      title: errorText,
      turn_id: turnId,
    });
    return;
  }

  // Store the final turn's output. The same first-turn placeholder rule used
  // during onTurnComplete() also applies here: the original response must not
  // consume a queued follow-up placeholder, but later turns are allowed to.
  //
  // Exactly-once rule: never clear inflight state unless a terminal reply was
  // actually persisted (either the final output itself or a draft fallback).
  const finalAttachments = output.attachments ?? [];
  const hasOutput = !!(output.result || finalAttachments.length > 0);
  const finalized = hasOutput
    ? storeAgentTurn(channel, emitter, {
        chatJid,
        text: output.result || "",
        attachments: finalAttachments as AttachmentInfo[],
        channelName,
        threadId: resolvedThreadRootId,
        skipPlaceholder: turnCount === 0,
        isTerminalAgentReply: true,
      })
    : publishDraftFallback("empty-final");

  if (!finalized && hasOutput) {
    // The agent produced output but persistence failed (DB write error).
    // Record a failed run so the message is retried on model switch.
    const errorText = "Agent completed but terminal response could not be persisted.";
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
      title: errorText,
      turn_id: turnId,
    });
    return;
  }

  if (!finalized && !hasOutput) {
    // Check if a draft buffer existed — if so, the agent DID produce content
    // but persistence failed, which is a real error worth recording.
    const draft = channel.getBuffer(turnId, "draft");
    const hadDraft = !!(typeof draft?.text === "string" && draft.text.trim());
    if (hadDraft) {
      const errorText = "Agent completed but draft response could not be persisted.";
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
        title: errorText,
        turn_id: turnId,
      });
      return;
    }

    // The agent completed normally but produced no output and there was no
    // draft buffer.  This typically happens when restart recovery replays a
    // contextless message.  Treat as a successful no-op so the cursor
    // advances and the same message is not retried endlessly.
    //
    // Post a system notice so the user can see their message was consumed
    // without a response and re-send if needed.
    console.warn(
      `[web] Agent completed for ${chatJid} without output — ` +
        "finalizing as no-op to advance cursor"
    );

    const originalContent = currentMessage.content || "";
    const preview = originalContent.length > 120
      ? originalContent.slice(0, 120) + "…"
      : originalContent;
    const noticeText = preview
      ? `⚠️ Your message was received but the agent produced no response. You may need to re-send it.\n\n> ${preview}`
      : "⚠️ Your message was received but the agent produced no response. You may need to re-send it.";

    const notice = channel.storeMessage(chatJid, noticeText, true, [], {
      threadId: resolvedThreadRootId ?? undefined,
      isTerminalAgentReply: true,
    });
    if (notice) {
      channel.broadcastEvent("agent_response", notice);
    }

    await finalizeSuccessfulRun();
    return;
  }

  await finalizeSuccessfulRun();
}
