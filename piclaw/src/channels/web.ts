/**
 * channels/web.ts – Web channel: HTTP server, SSE, and API endpoints.
 *
 * The WebChannel class is the central coordinator for the web UI. It:
 *   - Starts the HTTP(S) server (Bun.serve) with TLS and auth support.
 *   - Routes requests to handlers (posts, media, agent, workspace).
 *   - Manages SSE connections for real-time event streaming to browsers.
 *   - Bridges agent events (drafts, thoughts, status) to the UI.
 *   - Handles inbound messages and control commands from the web compose box.
 *
 * Consumers:
 *   - runtime.ts creates and starts the WebChannel.
 *   - The web UI (web/src/) connects via SSE and REST API.
 */

import { AgentQueue } from "../queue.js";
import type { AgentPool } from "../agent-pool.js";
import { initTheme } from "@mariozechner/pi-coding-agent";
import { WebauthnChallengeTracker } from "./web/webauthn-challenges.js";
import { TotpFailureTracker } from "./web/totp-failure-tracker.js";
import {
  ASSISTANT_AVATAR,
  ASSISTANT_NAME,
  USER_AVATAR,
  USER_AVATAR_BACKGROUND,
  USER_NAME,
  WEB_HOST,
  WEB_IDLE_TIMEOUT,
  WEB_PORT,
  WEB_TLS_CERT,
  WEB_TLS_KEY,
  WEB_SESSION_TTL,
  WEB_TOTP_SECRET,
  WEB_INTERNAL_SECRET,
  WEB_PASSKEY_MODE,
} from "../core/config.js";
import { startWorkspaceWatcher } from "./web/handlers/workspace.js";
import type { WebChannelLike } from "./web/web-channel-contracts.js";
import { RequestRouterService } from "./web/request-router-service.js";
import { handlePost as handlePostRequest } from "./web/handlers/posts.js";
import {
  handleAgentMessage as handleAgentMessageRequest,
  processChat as processAgentChat,
} from "./web/handlers/agent.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import {
  deleteMessageByRowId,
  replaceMessageContent,
  getDb,
  getInflightMessageId,
  getMessageByRowId,
  getMessageThreadRootIdById,
  getDeferredQueuedFollowups,
  setDeferredQueuedFollowups,
} from "../db.js";
import type { DeferredQueuedFollowupRecord, InteractionRow } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { AgentStatusStore } from "./web/agent-status-store.js";
import { FollowupPlaceholderStore, type QueuedFollowupItem } from "./web/followup-placeholders.js";
import { PendingSteeringStore } from "./web/pending-steering.js";
import { storeWebMessage } from "./web/message-store.js";
import {
  queueFollowupPlaceholderMessage,
  replaceQueuedFollowupPlaceholderMessage,
  sendWebMessage,
  type MessageWriteContext,
  type SendMessageOptions,
} from "./web/message-write-flows.js";
import { deletePostResponse } from "./web/timeline-service.js";
import { ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import {
  handleAgentContextRequest,
  handleAgentModelsRequest,
  handleAgentStatusRequest,
} from "./web/agent-status.js";
import { AgentBuffers, type WebAgentBufferEntry } from "./web/agent-buffers.js";
import { bindWebUiSessionBinder } from "./web/agent-pool-binder.js";
import {
  handleHashtagRequest,
  handleSearchRequest,
  handleThoughtRequest,
  handleThreadRequest,
  handleTimelineRequest,
} from "./web/content-endpoints.js";
import {
  handleAgentsRequest,
  handleAvatarRequest,
} from "./web/identity-endpoints.js";
import { handleManifestRequest } from "./web/manifest.js";
import {
  getThreadRootId as getThreadRootIdForChat,
  resumeChat as resumeWebChat,
  skipFailedOnModelSwitch as skipFailedOnModelSwitchForChat,
  type ResumeChatContext,
} from "./web/chat-run-control.js";
import {
  recoverInflightRuns as recoverWebInflightRuns,
  resumePendingChats as resumeWebPendingChats,
  type WebRecoveryContext,
} from "./web/recovery.js";
import {
  handleInternalPostRequest,
  handleUpdatePostRequest,
} from "./web/post-mutations.js";
import {
  handleAgentRespondRequest,
  handleThoughtVisibilityRequest,
  handleWorkspaceVisibilityRequest,
} from "./web/ui-endpoints.js";
import {
  createWebChannelEndpointContexts,
  type WebChannelEndpointContexts,
} from "./web/channel-endpoint-context-factory.js";
import { createInteractionBroadcaster, type InteractionBroadcaster } from "./web/interaction-broadcaster.js";
import { WebAuthGateway } from "./web/auth-gateway.js";
import { RemoteInteropService } from "../remote/service.js";

const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";
/** Construction options for WebChannel: queue and agentPool references. */
export interface WebChannelOpts {
  queue: AgentQueue;
  agentPool: AgentPool;
}

/** Web channel: HTTP/SSE server, API endpoints, and agent event bridge. */
export class WebChannel implements WebChannelLike {
  queue: AgentQueue;
  agentPool: AgentPool;
  server: ReturnType<typeof Bun.serve> | null = null;
  state = new WebChannelState(STATE_KEY);
  sse = new SseHub();
  uiBridge: UiBridge;
  remoteInterop: RemoteInteropService;
  responses = new ResponseService();
  requestRouter: RequestRouterService;
  endpointContexts: WebChannelEndpointContexts;
  pendingLinkPreviews = new Set<number>();
  workspaceWatcher: { close: () => Promise<void> } | null = null;
  workspaceVisible = false;
  workspaceShowHidden = false;
  followupPlaceholderStore = new FollowupPlaceholderStore();
  pendingSteeringStore = new PendingSteeringStore();
  agentStatusStore: AgentStatusStore;
  interactionBroadcaster: InteractionBroadcaster;
  lastCommandInteractionId: number | null = null;
  webauthnChallenges = new WebauthnChallengeTracker();
  totpFailureTracker = new TotpFailureTracker();
  agentBuffers = new AgentBuffers();
  authGateway: WebAuthGateway;

  constructor(opts: WebChannelOpts) {
    this.queue = opts.queue;
    this.agentPool = opts.agentPool;
    this.uiBridge = new UiBridge(this);
    this.remoteInterop = new RemoteInteropService(this.agentPool);
    this.agentStatusStore = new AgentStatusStore(this.state);
    this.interactionBroadcaster = createInteractionBroadcaster(this, {
      agentName: ASSISTANT_NAME,
      agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      userName: USER_NAME || null,
      userAvatar: resolveAvatarUrl("user", USER_AVATAR),
      userAvatarBackground: USER_AVATAR_BACKGROUND || null,
    });
    this.authGateway = new WebAuthGateway(
      {
        passkeyMode: WEB_PASSKEY_MODE || "",
        totpSecret: WEB_TOTP_SECRET || "",
        internalSecret: WEB_INTERNAL_SECRET || "",
        sessionTtlSeconds: WEB_SESSION_TTL,
        hasTls: Boolean(WEB_TLS_CERT && WEB_TLS_KEY),
      },
      {
        json: (payload, status = 200) => this.json(payload, status),
        challenges: this.webauthnChallenges,
        failureTracker: this.totpFailureTracker,
      }
    );
    this.requestRouter = new RequestRouterService(this);
    this.endpointContexts = createWebChannelEndpointContexts(this, {
      defaultChatJid: DEFAULT_CHAT_JID,
      defaultAgentId: DEFAULT_AGENT_ID,
      agentName: ASSISTANT_NAME,
      agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      userName: USER_NAME || null,
      userAvatar: resolveAvatarUrl("user", USER_AVATAR),
      userAvatarBackground: USER_AVATAR_BACKGROUND || null,
      assistantAvatarRaw: ASSISTANT_AVATAR || null,
      userAvatarRaw: USER_AVATAR || null,
    });
    bindWebUiSessionBinder(this.agentPool, (session, chatJid) =>
      this.uiBridge.bindSession(session, chatJid)
    );
  }

  async start(): Promise<void> {
    this.loadState();
    try { initTheme(); } catch {}
    const tls = await this.loadTlsOptions();
    this.server = Bun.serve({
      hostname: WEB_HOST,
      port: WEB_PORT,
      idleTimeout: WEB_IDLE_TIMEOUT,
      // Hard limit on request body size. Individual endpoints enforce tighter
      // limits (e.g., 10 MB for media uploads, 512 MB for workspace uploads,
      // 100 KB for message content).
      // This is the outermost safety net; Bun rejects bodies exceeding this
      // before any handler code runs.
      maxRequestBodySize: 512 * 1024 * 1024, // 512 MB hard cap
      fetch: (req) => this.handleRequest(req),
      ...(tls ? { tls } : {}),
    });
    this.workspaceWatcher = startWorkspaceWatcher(this);
    const scheme = tls ? "https" : "http";
    console.log(`[web] UI listening on ${scheme}://${WEB_HOST}:${WEB_PORT}`);
  }

  async stop(): Promise<void> {
    this.sse.closeAll();
    this.uiBridge.stop();
    this.server?.stop(true);
    this.server = null;
    if (this.workspaceWatcher) {
      await this.workspaceWatcher.close();
      this.workspaceWatcher = null;
    }
  }

  private getMessageWriteContext(): MessageWriteContext {
    return {
      defaultAgentId: DEFAULT_AGENT_ID,
      store: {
        storeMessage: (chatJid, content, isBot, mediaIds, options) =>
          this.storeMessage(chatJid, content, isBot, mediaIds, options),
        replaceMessageContent: (chatJid, rowId, text, mediaIds, contentBlocks, isTerminalAgentReply) =>
          replaceMessageContent(chatJid, rowId, text, { contentBlocks, mediaIds, isTerminalAgentReply }) ?? null,
        setMessageThreadToSelf: (messageId) => {
          getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(messageId, messageId);
        },
      },
      broadcaster: {
        broadcastAgentResponse: (interaction) => this.interactionBroadcaster.broadcastAgentResponse(interaction),
        broadcastInteractionUpdated: (interaction) => this.interactionBroadcaster.broadcastInteractionUpdated(interaction),
      },
      followups: {
        enqueue: (chatJid, rowId, queuedContent, threadId, queuedAt) =>
          this.followupPlaceholderStore.enqueue(chatJid, rowId, queuedContent, threadId, queuedAt),
      },
    };
  }

  async sendMessage(chatJid: string, text: string, options?: SendMessageOptions): Promise<void> {
    sendWebMessage(chatJid, text, options, this.getMessageWriteContext());
  }

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number, queuedContent?: string): InteractionRow | null {
    return queueFollowupPlaceholderMessage(
      chatJid,
      text,
      threadId,
      (queuedContent || "").trim() || text,
      this.getMessageWriteContext()
    );
  }

  private getDeferredQueuedFollowupItems(chatJid: string): QueuedFollowupItem[] {
    return getDeferredQueuedFollowups(chatJid).map((item) => ({
      rowId: item.rowId,
      queuedContent: item.queuedContent,
      threadId: item.threadId ?? null,
      queuedAt: item.queuedAt,
      mediaIds: item.mediaIds ? [...item.mediaIds] : undefined,
      contentBlocks: Array.isArray(item.contentBlocks) ? [...item.contentBlocks] : undefined,
      linkPreviews: Array.isArray(item.linkPreviews) ? [...item.linkPreviews] : undefined,
    }));
  }

  private setDeferredQueuedFollowupItems(chatJid: string, items: QueuedFollowupItem[]): void {
    const persisted: DeferredQueuedFollowupRecord[] = items.map((item) => ({
      rowId: item.rowId,
      queuedContent: item.queuedContent,
      threadId: item.threadId ?? null,
      queuedAt: item.queuedAt,
      mediaIds: item.mediaIds ? [...item.mediaIds] : undefined,
      contentBlocks: Array.isArray(item.contentBlocks) ? [...item.contentBlocks] : undefined,
      linkPreviews: Array.isArray(item.linkPreviews) ? [...item.linkPreviews] : undefined,
    }));
    setDeferredQueuedFollowups(chatJid, persisted);
  }

  private allocateDeferredQueuedRowId(chatJid: string): number {
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    const minRowId = queued.reduce((min, item) => (item.rowId < min ? item.rowId : min), 0);
    return minRowId <= -1 ? minRowId - 1 : -1;
  }

  enqueueQueuedFollowupItem(
    chatJid: string,
    rowId: number,
    queuedContent: string,
    threadId?: number | null,
    queuedAt?: string,
    extras?: { mediaIds?: number[]; contentBlocks?: unknown[]; linkPreviews?: unknown[] }
  ): number {
    const resolvedRowId = Number.isFinite(rowId) && rowId !== 0 ? rowId : this.allocateDeferredQueuedRowId(chatJid);
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    queued.push({
      rowId: resolvedRowId,
      queuedContent,
      threadId: threadId ?? null,
      queuedAt: queuedAt ?? new Date().toISOString(),
      mediaIds: extras?.mediaIds ? [...extras.mediaIds] : undefined,
      contentBlocks: Array.isArray(extras?.contentBlocks) ? [...extras.contentBlocks] : undefined,
      linkPreviews: Array.isArray(extras?.linkPreviews) ? [...extras.linkPreviews] : undefined,
    });
    this.setDeferredQueuedFollowupItems(chatJid, queued);
    return resolvedRowId;
  }

  consumeQueuedFollowupItem(chatJid: string): QueuedFollowupItem | null {
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    const next = queued.shift() ?? null;
    this.setDeferredQueuedFollowupItems(chatJid, queued);
    return next;
  }

  prependQueuedFollowupItem(chatJid: string, item: QueuedFollowupItem): void {
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    queued.unshift({
      rowId: item.rowId,
      queuedContent: item.queuedContent,
      threadId: item.threadId ?? null,
      queuedAt: item.queuedAt,
      mediaIds: item.mediaIds ? [...item.mediaIds] : undefined,
      contentBlocks: Array.isArray(item.contentBlocks) ? [...item.contentBlocks] : undefined,
      linkPreviews: Array.isArray(item.linkPreviews) ? [...item.linkPreviews] : undefined,
    });
    this.setDeferredQueuedFollowupItems(chatJid, queued);
  }

  consumeQueuedFollowupPlaceholder(chatJid: string): number | null {
    return this.followupPlaceholderStore.consume(chatJid);
  }

  getQueuedFollowupCount(chatJid: string): number {
    return this.getDeferredQueuedFollowupItems(chatJid).length + this.followupPlaceholderStore.count(chatJid);
  }

  getQueuedFollowupItems(chatJid: string): QueuedFollowupItem[] {
    const rows = [
      ...this.getDeferredQueuedFollowupItems(chatJid),
      ...this.followupPlaceholderStore.peek(chatJid),
    ];
    // Deduplicate by rowId — the two stores use different ID spaces (negative
    // for deferred, positive for placeholder), but guard against bugs that
    // might put the same item in both stores.
    const seen = new Set<number>();
    return rows
      .map((row) => ({
        ...row,
        queuedAt: row.queuedAt,
      }))
      .filter((row) => {
        if (seen.has(row.rowId)) return false;
        seen.add(row.rowId);
        return true;
      })
      .sort((a, b) => String(a.queuedAt).localeCompare(String(b.queuedAt)));
  }

  removeQueuedFollowupItem(chatJid: string, rowId: number): QueuedFollowupItem | null {
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    const queuedIndex = queued.findIndex((item) => item.rowId === rowId);
    if (queuedIndex >= 0) {
      const [removed] = queued.splice(queuedIndex, 1);
      this.setDeferredQueuedFollowupItems(chatJid, queued);
      return removed ?? null;
    }
    return this.followupPlaceholderStore.remove(chatJid, rowId);
  }

  queuePendingSteering(chatJid: string, timestamp: string | undefined): void {
    this.pendingSteeringStore.queue(chatJid, timestamp);
  }

  consumePendingSteering(chatJid: string): string | null {
    return this.pendingSteeringStore.consumeLatest(chatJid);
  }

  updateAgentStatus(chatJid: string, status: Record<string, unknown>): void {
    this.agentStatusStore.update(chatJid, status);
  }

  getAgentStatus(chatJid: string): Record<string, unknown> | null {
    return this.agentStatusStore.get(chatJid);
  }

  replaceQueuedFollowupPlaceholder(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined,
    threadId?: number,
    isTerminalAgentReply?: boolean
  ): InteractionRow | null {
    return replaceQueuedFollowupPlaceholderMessage(
      chatJid,
      rowId,
      text,
      mediaIds,
      contentBlocks,
      threadId,
      this.getMessageWriteContext(),
      isTerminalAgentReply
    );
  }

  getThreadRootId(chatJid: string, messageId: string): number | null {
    return getThreadRootIdForChat(chatJid, messageId);
  }

  private getResumeChatContext(): ResumeChatContext {
    return {
      defaultAgentId: DEFAULT_AGENT_ID,
      enqueue: (task, key) => this.queue.enqueue(task, key),
      processChat: (chatJid, agentId, threadRootId) => this.processChat(chatJid, agentId, threadRootId),
    };
  }

  resumeChat(chatJid: string, threadRootId?: number | null): void {
    resumeWebChat(chatJid, threadRootId, this.getResumeChatContext());
  }

  skipFailedOnModelSwitch(chatJid: string): void {
    skipFailedOnModelSwitchForChat(chatJid);
  }

  private getRecoveryContext(): WebRecoveryContext {
    return {
      assistantName: ASSISTANT_NAME,
      defaultAgentId: DEFAULT_AGENT_ID,
      enqueue: (task, key) => this.queue.enqueue(task, key),
      processChat: (chatJid, agentId, threadRootId) => this.processChat(chatJid, agentId, threadRootId),
    };
  }

  /**
   * Check for inflight run markers left by a previous process that was killed
   * mid-turn. Rolls back all cursors in a single transaction (all-or-nothing),
   * then enqueues a retry for each. Only enqueues if the transaction succeeds –
   * if the rollback fails the inflight markers remain and will be retried on
   * the next startup.
   *
   * Called once at startup before the queue starts processing.
   */
  recoverInflightRuns(): void {
    recoverWebInflightRuns(this.getRecoveryContext());
  }

  /**
   * Scan all known chats (or a specific one) for messages that arrived after
   * their stored cursor and enqueue processChat() for each with pending work.
   * Called after a restart via the resume_pending IPC.
   */
  resumePendingChats(chatJid?: string): void {
    resumeWebPendingChats(this.getRecoveryContext(), chatJid);
  }

  loadState(): void {
    this.agentStatusStore.load();
  }

  saveState(): void {
    this.state.save();
  }

  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void {
    this.agentBuffers.setPanelExpanded(turnId, panel, expanded);
  }

  isPanelExpanded(turnId: string, panel: "thought" | "draft"): boolean {
    return this.agentBuffers.isPanelExpanded(turnId, panel);
  }

  updateThoughtBuffer(turnId: string, text: string, totalLines: number): void {
    this.agentBuffers.updateBuffer(turnId, "thought", text, totalLines);
  }

  updateDraftBuffer(turnId: string, text: string, totalLines: number): void {
    this.agentBuffers.updateBuffer(turnId, "draft", text, totalLines);
  }

  getBuffer(turnId: string, panel: "thought" | "draft"): WebAgentBufferEntry | undefined {
    return this.agentBuffers.getBuffer(turnId, panel);
  }

  private async loadTlsOptions(): Promise<{ cert: string; key: string } | null> {
    if (!WEB_TLS_CERT || !WEB_TLS_KEY) return null;
    try {
      const [cert, key] = await Promise.all([
        Bun.file(WEB_TLS_CERT).text(),
        Bun.file(WEB_TLS_KEY).text(),
      ]);
      return { cert, key };
    } catch (error) {
      console.error("[web] Failed to load TLS cert/key:", error);
      return null;
    }
  }

  async handleRequest(req: Request): Promise<Response> {
    return this.requestRouter.handle(req);
  }

  async handleAgents(): Promise<Response> {
    return await handleAgentsRequest(this.endpointContexts.agents());
  }

  async handleManifest(req: Request): Promise<Response> {
    return await handleManifestRequest(req, {
      assistantName: ASSISTANT_NAME,
      assistantAvatar: ASSISTANT_AVATAR,
      ensureAvatarCache,
    });
  }

  async handleAvatar(kind: "agent" | "user", req: Request): Promise<Response> {
    return await handleAvatarRequest(kind, req, this.endpointContexts.avatar());
  }

  async handleWorkspaceVisibility(req: Request): Promise<Response> {
    return await handleWorkspaceVisibilityRequest(req, this.endpointContexts.ui());
  }

  handleTimeline(limit: number, before?: number): Response {
    return handleTimelineRequest(limit, before, this.endpointContexts.content());
  }

  handleHashtag(tag: string, limit: number, offset: number): Response {
    return handleHashtagRequest(tag, limit, offset, this.endpointContexts.content());
  }

  handleSearch(query: string, limit: number, offset: number): Response {
    return handleSearchRequest(query, limit, offset, this.endpointContexts.content());
  }

  handleThread(id: number | null): Response {
    return handleThreadRequest(id, this.endpointContexts.content());
  }

  handleThought(panel: string | null, turnId: string | null): Response {
    return handleThoughtRequest(panel, turnId, this.endpointContexts.content());
  }

  async handleThoughtVisibility(req: Request): Promise<Response> {
    return await handleThoughtVisibilityRequest(req, this.endpointContexts.ui());
  }

  handleDeletePost(id: number | null, cascade = false): Response {
    const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
    if (result.deletedIds.length > 0) {
      this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
    }
    return this.json(result.body, result.status);
  }

  /**
   * PATCH /post/:id – Update a post's content and optionally set thread_id.
   * Validates: id is a positive integer, content ≤ 100 KB, thread_id is a
   * positive integer if provided. Uses parameterized queries (no SQL injection).
   */
  async handleUpdatePost(req: Request, id: number | null): Promise<Response> {
    return await handleUpdatePostRequest(req, id, this.endpointContexts.postMutations());
  }

  /**
   * POST /internal/post – Create an internal agent message.
   * Requires internal secret when WEB_INTERNAL_SECRET is configured.
   * Content is capped at 100 KB to prevent DB bloat.
   */
  async handleInternalPost(req: Request): Promise<Response> {
    return await handleInternalPostRequest(req, this.endpointContexts.postMutations());
  }

  handleSse(): Response {
    return this.sse.handleRequest();
  }

  broadcastEvent(eventType: string, data: unknown): void {
    this.sse.broadcast(eventType, data);
  }

  async handlePost(req: Request, isReply: boolean): Promise<Response> {
    return handlePostRequest(this, req, isReply, DEFAULT_CHAT_JID);
  }

  handleAgentStatus(req: Request): Response {
    return handleAgentStatusRequest(req, this.endpointContexts.agentStatus());
  }

  /** GET /agent/context — return context window usage for the compose box indicator. */
  async handleAgentContext(req: Request): Promise<Response> {
    return await handleAgentContextRequest(req, this.endpointContexts.agentStatus());
  }

  /** GET /agent/queue-state — return queued follow-up placeholder count and pending content. */
  async handleAgentQueueState(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const chatJid = url.searchParams.get("chat_jid") ?? DEFAULT_CHAT_JID;
    const queuedItems = this.getQueuedFollowupItems(chatJid);
    const items = queuedItems
      .map((queued) => {
        const interaction = getMessageByRowId(chatJid, queued.rowId);
        return {
          row_id: queued.rowId,
          content: queued.queuedContent,
          timestamp: interaction?.timestamp ?? queued.queuedAt,
          thread_id: interaction?.data?.thread_id ?? queued.threadId ?? null,
        };
      })
      .filter((item) => typeof item.content === "string" && item.content.trim().length > 0);

    return this.json({
      count: items.length,
      items,
    });
  }

  private async removeQueuedFollowupForAction(
    chatJid: string,
    rowId: number,
  ): Promise<{ removed: QueuedFollowupItem | null; source: "deferred" | "placeholder" | null }> {
    const queued = this.getDeferredQueuedFollowupItems(chatJid);
    const queuedIndex = queued.findIndex((item) => item.rowId === Number(rowId));
    const removedQueued = queuedIndex >= 0 ? (queued.splice(queuedIndex, 1)[0] ?? null) : null;
    if (queuedIndex >= 0) {
      this.setDeferredQueuedFollowupItems(chatJid, queued);
    }
    const removedPlaceholder = removedQueued ? null : this.followupPlaceholderStore.remove(chatJid, Number(rowId));
    const removed = removedQueued ?? removedPlaceholder;
    const source = removedQueued ? "deferred" : removedPlaceholder ? "placeholder" : null;
    if (!removed || !source) return { removed: null, source: null };

    // Remove any hidden backing row so queue artifacts stay out of the
    // timeline even after the item is removed or converted into steering.
    if (removed.rowId > 0) {
      deleteMessageByRowId(chatJid, removed.rowId);
    }

    if (source === "placeholder") {
      await this.agentPool.removeQueuedFollowupMessage(chatJid, removed.queuedContent);
    }

    return { removed, source };
  }

  /** POST /agent/queue-remove — remove a queued follow-up row from UI + session queue. */
  async handleAgentQueueRemove(req: Request): Promise<Response> {
    try {
      const payload = (await req.json()) as { chat_jid?: string; row_id?: number | string };
      const chatJid = payload?.chat_jid ?? DEFAULT_CHAT_JID;
      const rawRowId = payload?.row_id;
      const rowId = typeof rawRowId === "string" ? Number(rawRowId) : rawRowId;
      if (!Number.isFinite(rowId)) {
        return this.json({ error: "Missing or invalid row_id" }, 400);
      }

      const { removed } = await this.removeQueuedFollowupForAction(chatJid, Number(rowId));
      if (!removed) {
        return this.json({ removed: false, count: this.getQueuedFollowupCount(chatJid) }, 200);
      }

      this.broadcastEvent("agent_followup_removed", {
        chat_jid: chatJid,
        row_id: removed.rowId,
        thread_id: removed.threadId ?? null,
      });

      return this.json({
        removed: true,
        row_id: removed.rowId,
        count: this.getQueuedFollowupCount(chatJid),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.json({ error: message }, 500);
    }
  }

  /** POST /agent/queue-steer — atomically convert one queued follow-up into steering or an immediate send. */
  async handleAgentQueueSteer(req: Request): Promise<Response> {
    try {
      const payload = (await req.json()) as { chat_jid?: string; row_id?: number | string };
      const chatJid = payload?.chat_jid ?? DEFAULT_CHAT_JID;
      const rawRowId = payload?.row_id;
      const rowId = typeof rawRowId === "string" ? Number(rawRowId) : rawRowId;
      if (!Number.isFinite(rowId)) {
        return this.json({ error: "Missing or invalid row_id" }, 400);
      }

      const { removed } = await this.removeQueuedFollowupForAction(chatJid, Number(rowId));
      if (!removed) {
        return this.json({ removed: false, count: this.getQueuedFollowupCount(chatJid) }, 200);
      }

      this.broadcastEvent("agent_followup_removed", {
        chat_jid: chatJid,
        row_id: removed.rowId,
        thread_id: removed.threadId ?? null,
      });

      const steerContent = typeof removed.queuedContent === "string" ? removed.queuedContent.trim() : "";
      if (!steerContent) {
        return this.json({ removed: true, queued: false, count: this.getQueuedFollowupCount(chatJid) }, 200);
      }

      const isStreaming = typeof this.agentPool.isStreaming === "function"
        ? this.agentPool.isStreaming(chatJid)
        : false;
      const inflightMessageId = getInflightMessageId(chatJid);
      const activeThreadRootId = inflightMessageId
        ? getMessageThreadRootIdById(chatJid, inflightMessageId)
        : null;
      const steerThreadId = removed.threadId ?? activeThreadRootId ?? null;

      const interaction = this.storeMessage(
        chatJid,
        steerContent,
        false,
        removed.mediaIds ?? [],
        {
          contentBlocks: Array.isArray(removed.contentBlocks) ? removed.contentBlocks : undefined,
          linkPreviews: Array.isArray(removed.linkPreviews) ? removed.linkPreviews : undefined,
          threadId: steerThreadId ?? undefined,
          isSteeringMessage: isStreaming,
        }
      );
      if (!interaction) {
        // Restore the queued item so a failed timeline write does not drop it.
        this.prependQueuedFollowupItem(chatJid, removed);
        this.broadcastEvent("agent_followup_queued", {
          chat_jid: chatJid,
          thread_id: removed.threadId ?? null,
          row_id: removed.rowId,
          content: removed.queuedContent,
          timestamp: removed.queuedAt,
        });
        return this.json({ error: "Failed to store message" }, 500);
      }

      this.broadcastEvent("new_post", interaction);

      if (isStreaming) {
        const steerResult = await this.agentPool.queueStreamingMessage(chatJid, steerContent, "steer");
        if (steerResult.queued) {
          this.queuePendingSteering(chatJid, interaction.timestamp);
          const queuedAt = new Date().toISOString();
          this.broadcastEvent("agent_steer_queued", {
            chat_jid: chatJid,
            thread_id: interaction.data?.thread_id ?? steerThreadId ?? null,
            source: "queued-item",
            timestamp: queuedAt,
            content: steerContent,
          });
          return this.json({
            removed: true,
            row_id: removed.rowId,
            user_message: interaction,
            thread_id: interaction.data?.thread_id ?? steerThreadId ?? null,
            queued: "steer",
            count: this.getQueuedFollowupCount(chatJid),
          }, 201);
        }
      }

      this.queue.enqueue(async () => {
        await this.processChat(chatJid, DEFAULT_AGENT_ID, interaction.data?.thread_id ?? interaction.id);
      }, `chat:${chatJid}:${interaction.id}`);

      return this.json({
        removed: true,
        row_id: removed.rowId,
        user_message: interaction,
        thread_id: interaction.data?.thread_id ?? interaction.id ?? null,
        count: this.getQueuedFollowupCount(chatJid),
      }, 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.json({ error: message }, 500);
    }
  }

  /** GET /agent/models — return available model labels and current selection. */
  async handleAgentModels(req: Request): Promise<Response> {
    return await handleAgentModelsRequest(req, this.endpointContexts.agentStatus());
  }

  /**
   * POST /agent/respond – Handle a UI response to an agent request (e.g., confirmation dialog).
   * Validates request_id is a non-empty string of ≤ 256 chars.
   */
  async handleAgentRespond(req: Request): Promise<Response> {
    return await handleAgentRespondRequest(req, this.endpointContexts.ui());
  }

  async handleAgentMessage(req: Request, pathname: string): Promise<Response> {
    return handleAgentMessageRequest(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
  }

  async processChat(chatJid: string, agentId: string, threadRootId?: number | null): Promise<void> {
    return processAgentChat(this, chatJid, agentId, threadRootId ?? undefined);
  }

  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options: {
      contentBlocks?: unknown[];
      linkPreviews?: unknown[];
      threadId?: number;
      isTerminalAgentReply?: boolean;
      isSteeringMessage?: boolean;
    } = {}
  ): InteractionRow | null {
    return storeWebMessage(
      this,
      {
        chatJid,
        content,
        isBot,
        mediaIds,
        agentId: DEFAULT_AGENT_ID,
        agentName: ASSISTANT_NAME,
      },
      {
        contentBlocks: options.contentBlocks,
        linkPreviews: options.linkPreviews,
        threadId: options.threadId ?? null,
        isTerminalAgentReply: options.isTerminalAgentReply,
        isSteeringMessage: options.isSteeringMessage,
      }
    );
  }

  async handleRemote(req: Request): Promise<Response> {
    return this.remoteInterop.handleRequest(req);
  }

  async serveStatic(relPath: string): Promise<Response> {
    return this.responses.serveStatic(relPath);
  }

  async serveDocsStatic(relPath: string): Promise<Response> {
    return this.responses.serveDocsStatic(relPath);
  }

  json(data: unknown, status = 200): Response {
    return this.responses.json(data, status);
  }

  clampInt(value: string | null, fallback: number, min: number, max: number): number {
    return this.responses.clampInt(value, fallback, min, max);
  }

  parseOptionalInt(value: string | null): number | null {
    return this.responses.parseOptionalInt(value);
  }
}
