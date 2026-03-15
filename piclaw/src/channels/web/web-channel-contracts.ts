/**
 * web/web-channel-contracts.ts – Structural channel contracts for web handler modules.
 *
 * This module centralizes the shared structural type used across web request/route/
 * handler layers to avoid importing `web.ts` directly and reintroducing static
 * circular dependency edges.
 */

import type { AgentPool } from "../../agent-pool.js";
import type { SendMessageOptions } from "./message-write-flows.js";
import type { WorkspaceDispatchChannel } from "./http/dispatch-workspace.js";
import type { MediaDispatchChannel } from "./http/dispatch-media.js";
import type { RequestGuardsChannel } from "./http/request-guards.js";
import type { AuthEndpointsContext } from "./auth-endpoints.js";
import type { InteractionRow } from "../../db.js";
import type { WebAgentBufferEntry } from "./agent-buffers.js";
import type { QueuedFollowupItem } from "./followup-placeholders.js";
import type { UiBridge } from "./ui-bridge.js";
import type { TotpAuthContext } from "./totp-auth.js";
import type { WebauthnAuthContext } from "./webauthn-auth.js";
import type { WebauthnEnrolPageContext } from "./webauthn-enrol-page.js";

interface AuthGatewayLike {
  isAuthEnabled(): boolean;
  isInternalSecretEnabled(): boolean;
  verifyInternalSecret(req: Request): boolean;
  isAuthenticated(req: Request): boolean;
  isTotpSession(req: Request): boolean;
  createTotpContext(): TotpAuthContext;
  createWebauthnContext(): WebauthnAuthContext;
  createWebauthnEnrolPageContext(): WebauthnEnrolPageContext;
}

interface InteractionBroadcasterLike {
  broadcastInteractionUpdated(interaction: InteractionRow): void;
  broadcastAgentResponse(interaction: InteractionRow): void;
}

interface TaskQueueLike {
  enqueue(task: () => unknown, key: string): unknown;
}

export interface WebChannelLike
  extends RequestGuardsChannel,
    WorkspaceDispatchChannel,
    MediaDispatchChannel {

  /** Auth/session helper layer. */
  authGateway: AuthGatewayLike;

  endpointContexts: RequestGuardsChannel["endpointContexts"] & {
    auth(): AuthEndpointsContext;
  };

  /** Runtime dependencies and state services used across web layers. */
  queue: TaskQueueLike;
  uiBridge: UiBridge;
  interactionBroadcaster: InteractionBroadcasterLike;

  /** Message persistence and thread state. */
  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options?: {
      contentBlocks?: unknown[];
      linkPreviews?: unknown[];
      threadId?: number;
      isTerminalAgentReply?: boolean;
      isSteeringMessage?: boolean;
    }
  ): InteractionRow | null;

  sendMessage(chatJid: string, text: string, options?: SendMessageOptions): Promise<void>;
  updateAgentStatus(chatJid: string, status: Record<string, unknown>): void;
  getAgentStatus(chatJid: string): Record<string, unknown> | null;
  getBuffer(turnId: string, panel: "thought" | "draft"): WebAgentBufferEntry | undefined;
  getThreadRootId(chatJid: string, messageId: string): number | null;
  saveState(): void;
  skipFailedOnModelSwitch(chatJid: string): void;

  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void;
  isPanelExpanded(turnId: string, panel: "thought" | "draft"): boolean;
  updateThoughtBuffer(turnId: string, text: string, totalLines: number): void;
  updateDraftBuffer(turnId: string, text: string, totalLines: number): void;

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number, queuedContent?: string): InteractionRow | null;
  enqueueQueuedFollowupItem(
    chatJid: string,
    rowId: number,
    queuedContent: string,
    threadId?: number | null,
    queuedAt?: string,
    extras?: { mediaIds?: number[]; contentBlocks?: unknown[]; linkPreviews?: unknown[] }
  ): number;
  getQueuedFollowupCount(chatJid: string): number;
  getQueuedFollowupItems(chatJid: string): QueuedFollowupItem[];
  removeQueuedFollowupItem(chatJid: string, rowId: number): QueuedFollowupItem | null;
  consumeQueuedFollowupItem(chatJid: string): QueuedFollowupItem | null;
  prependQueuedFollowupItem(chatJid: string, item: QueuedFollowupItem): void;
  consumeQueuedFollowupPlaceholder(chatJid: string): number | null;
  replaceQueuedFollowupPlaceholder(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined,
    threadId?: number,
    isTerminalAgentReply?: boolean
  ): InteractionRow | null;
  queuePendingSteering(chatJid: string, timestamp: string | undefined): void;
  consumePendingSteering(chatJid: string): string | null;

  /** UI/runtime state consumed by endpoint contexts. */
  workspaceVisible: boolean;
  workspaceShowHidden: boolean;

  /** SSE runtime handle. */
  sse: {
    clients: { size: number };
  };

  /** Last command interaction id used for slash-command follow-up behavior. */
  lastCommandInteractionId: number | null;

  /** General endpoint handlers. */
  serveStatic(relPath: string): Promise<Response>;
  serveDocsStatic(relPath: string): Promise<Response>;
  handleRemote(req: Request): Promise<Response>;
  handleManifest(req: Request): Promise<Response>;
  handleAvatar(kind: "agent" | "user", req: Request): Promise<Response>;
  handleSse(): Response;
  handleTerminalSession(req: Request): Response;
  handleAgents(): Promise<Response>;

  handleWorkspaceVisibility(req: Request): Promise<Response>;
  handleTimeline(limit: number, before?: number): Response;
  handleHashtag(tag: string, limit: number, offset: number): Response;
  handleSearch(query: string, limit: number, offset: number): Response;
  handleThread(id: number | null): Response;
  handleThought(panel: string | null, turnId: string | null): Response;
  handleThoughtVisibility(req: Request): Promise<Response>;
  handleDeletePost(id: number | null, cascade: boolean): Response;
  handleUpdatePost(req: Request, id: number | null): Promise<Response>;
  handleInternalPost(req: Request): Promise<Response>;
  handlePost(req: Request, isReply: boolean): Promise<Response>;

  handleAgentStatus(req: Request): Response;
  handleAgentContext(req: Request): Promise<Response>;
  handleAgentQueueState(req: Request): Promise<Response>;
  handleAgentQueueRemove(req: Request): Promise<Response>;
  handleAgentQueueSteer(req: Request): Promise<Response>;
  handleAgentModels(req: Request): Promise<Response>;
  handleAgentRespond(req: Request): Promise<Response>;
  handleAdaptiveCardAction(req: Request): Promise<Response>;
  handleAgentMessage(req: Request, pathname: string): Promise<Response>;
  resumeChat(chatJid: string, threadRootId?: number | null): void;

  /** Utility helpers shared via request helpers and helpers. */
  parseOptionalInt(value: string | null): number | null;
  clampInt(value: string | null, fallback: number, min: number, max: number): number;

  /** Agent pool used by routing handlers and endpoint contexts. */
  agentPool: AgentPool;

  /** Compatibility for legacy channel-wide SSE event emitter. */
  broadcastEvent(eventType: string, data: unknown): void;
}
