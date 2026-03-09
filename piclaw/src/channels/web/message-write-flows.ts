/**
 * channels/web/message-write-flows.ts – Message write orchestration for web interactions.
 */

import type { InteractionRow } from "../../db.js";

export type SendMessageOptions =
  | number
  | null
  | {
      threadId?: number | null;
      forceRoot?: boolean;
      source?: string;
    };

export interface MessageWriteStore {
  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options?: { threadId?: number }
  ): InteractionRow | null;
  replaceMessageContent(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined
  ): InteractionRow | null;
  setMessageThreadToSelf(messageId: number): void;
}

export interface MessageWriteBroadcaster {
  broadcastAgentResponse(interaction: InteractionRow): void;
  broadcastInteractionUpdated(interaction: InteractionRow): void;
}

export interface MessageWriteFollowupQueue {
  enqueue(chatJid: string, rowId: number): void;
}

export interface MessageWriteContext {
  defaultAgentId: string;
  store: MessageWriteStore;
  broadcaster: MessageWriteBroadcaster;
  followups: MessageWriteFollowupQueue;
}

interface NormalizedSendMessageOptions {
  threadId: number | null;
  forceRoot: boolean;
}

function normalizeSendMessageOptions(options?: SendMessageOptions): NormalizedSendMessageOptions {
  const normalized = typeof options === "number" || options === null
    ? { threadId: options ?? null }
    : (options ?? {});

  return {
    threadId: normalized.threadId ?? null,
    forceRoot: Boolean(normalized.forceRoot),
  };
}

/** Store and broadcast an agent message response to web clients. */
export function sendWebMessage(
  chatJid: string,
  text: string,
  options: SendMessageOptions | undefined,
  ctx: MessageWriteContext
): void {
  const { threadId, forceRoot } = normalizeSendMessageOptions(options);
  const interaction = ctx.store.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);

  if (!interaction) return;

  if (forceRoot && !threadId) {
    // Ensure scheduled messages start new threads (not replies to inflight turns).
    ctx.store.setMessageThreadToSelf(interaction.id);
    interaction.data.thread_id = interaction.id;
  }

  ctx.broadcaster.broadcastAgentResponse(interaction);
}

/** Store, queue, and broadcast a follow-up placeholder interaction. */
export function queueFollowupPlaceholderMessage(
  chatJid: string,
  text: string,
  threadId: number | undefined,
  ctx: MessageWriteContext
): InteractionRow | null {
  const interaction = ctx.store.storeMessage(chatJid, text, true, [], { threadId });
  if (!interaction) return null;

  ctx.followups.enqueue(chatJid, interaction.id);
  ctx.broadcaster.broadcastAgentResponse(interaction);
  return interaction;
}

/** Replace a queued follow-up placeholder and broadcast the update. */
export function replaceQueuedFollowupPlaceholderMessage(
  chatJid: string,
  rowId: number,
  text: string,
  mediaIds: number[],
  contentBlocks: Array<Record<string, unknown>> | undefined,
  threadId: number | undefined,
  ctx: MessageWriteContext
): InteractionRow | null {
  const updated = ctx.store.replaceMessageContent(chatJid, rowId, text, mediaIds, contentBlocks);
  if (!updated) return null;

  updated.data.agent_id = ctx.defaultAgentId;
  if (threadId) updated.data.thread_id = threadId;

  ctx.broadcaster.broadcastInteractionUpdated(updated);
  return updated;
}
