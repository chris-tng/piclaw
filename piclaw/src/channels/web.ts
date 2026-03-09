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
import {
  handleAuthVerifyEndpoint,
  handleWebauthnEnrollPageEndpoint,
  handleWebauthnLoginFinishEndpoint,
  handleWebauthnLoginStartEndpoint,
  handleWebauthnRegisterFinishEndpoint,
  handleWebauthnRegisterStartEndpoint,
  redirectToLoginResponse,
  serveLoginPageResponse,
  type AuthEndpointsContext,
} from "./web/auth-endpoints.js";
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
  replaceMessageContent,
  getDb,
} from "../db.js";
import type { InteractionRow } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { AgentStatusStore } from "./web/agent-status-store.js";
import { FollowupPlaceholderStore } from "./web/followup-placeholders.js";
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
  type AgentStatusContext,
} from "./web/agent-status.js";
import { AgentBuffers, type WebAgentBufferEntry } from "./web/agent-buffers.js";
import { bindWebUiSessionBinder } from "./web/agent-pool-binder.js";
import {
  handleHashtagRequest,
  handleSearchRequest,
  handleThoughtRequest,
  handleThreadRequest,
  handleTimelineRequest,
  type ContentEndpointsContext,
} from "./web/content-endpoints.js";
import {
  handleAgentsRequest,
  handleAvatarRequest,
  type AgentsEndpointContext,
  type AvatarEndpointContext,
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
  createAgentStatusContext,
  createAgentsEndpointContext,
  createAvatarEndpointContext,
  createContentEndpointsContext,
  createPostMutationsContext,
  createUiEndpointsContext,
} from "./web/endpoint-contexts.js";
import {
  handleInternalPostRequest,
  handleUpdatePostRequest,
  type PostMutationsContext,
} from "./web/post-mutations.js";
import {
  handleAgentRespondRequest,
  handleThoughtVisibilityRequest,
  handleWorkspaceVisibilityRequest,
  type UiEndpointsContext,
} from "./web/ui-endpoints.js";
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
export class WebChannel {
  queue: AgentQueue;
  agentPool: AgentPool;
  server: ReturnType<typeof Bun.serve> | null = null;
  state = new WebChannelState(STATE_KEY);
  sse = new SseHub();
  uiBridge: UiBridge;
  remoteInterop: RemoteInteropService;
  responses = new ResponseService();
  requestRouter: RequestRouterService;
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
        replaceMessageContent: (chatJid, rowId, text, mediaIds, contentBlocks) =>
          replaceMessageContent(chatJid, rowId, text, { contentBlocks, mediaIds }),
        setMessageThreadToSelf: (messageId) => {
          getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(messageId, messageId);
        },
      },
      broadcaster: {
        broadcastAgentResponse: (interaction) => this.interactionBroadcaster.broadcastAgentResponse(interaction),
        broadcastInteractionUpdated: (interaction) => this.interactionBroadcaster.broadcastInteractionUpdated(interaction),
      },
      followups: {
        enqueue: (chatJid, rowId) => this.followupPlaceholderStore.enqueue(chatJid, rowId),
      },
    };
  }

  async sendMessage(chatJid: string, text: string, options?: SendMessageOptions): Promise<void> {
    sendWebMessage(chatJid, text, options, this.getMessageWriteContext());
  }

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number): InteractionRow | null {
    return queueFollowupPlaceholderMessage(chatJid, text, threadId, this.getMessageWriteContext());
  }

  consumeQueuedFollowupPlaceholder(chatJid: string): number | null {
    return this.followupPlaceholderStore.consume(chatJid);
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
    threadId?: number
  ): InteractionRow | null {
    return replaceQueuedFollowupPlaceholderMessage(
      chatJid,
      rowId,
      text,
      mediaIds,
      contentBlocks,
      threadId,
      this.getMessageWriteContext()
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

  isAuthEnabled(): boolean {
    return this.authGateway.isAuthEnabled();
  }

  isInternalSecretEnabled(): boolean {
    return this.authGateway.isInternalSecretEnabled();
  }

  isPasskeyEnabled(): boolean {
    return this.authGateway.isPasskeyEnabled();
  }

  isPasskeyOnly(): boolean {
    return this.authGateway.isPasskeyOnly();
  }

  isTotpEnabled(): boolean {
    return this.authGateway.isTotpEnabled();
  }

  isTotpSession(req: Request): boolean {
    return this.authGateway.isTotpSession(req);
  }

  verifyInternalSecret(req: Request): boolean {
    return this.authGateway.verifyInternalSecret(req);
  }

  isAuthenticated(req: Request): boolean {
    return this.authGateway.isAuthenticated(req);
  }

  private getPostMutationsContext(): PostMutationsContext {
    return createPostMutationsContext({
      defaultChatJid: DEFAULT_CHAT_JID,
      getLastCommandInteractionId: () => this.lastCommandInteractionId,
      json: (payload, status = 200) => this.json(payload, status),
      replaceMessageContent: (chatJid, id, content) => replaceMessageContent(chatJid, id, content, {}),
      setThreadId: (messageId, threadId) => {
        getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(threadId, messageId);
      },
      broadcastInteractionUpdated: (interaction) => {
        this.interactionBroadcaster.broadcastInteractionUpdated(interaction);
      },
      storeMessage: (chatJid, content, isBot, mediaIds, options = {}) =>
        this.storeMessage(chatJid, content, isBot, mediaIds, options),
      broadcastAgentResponse: (interaction) => {
        this.interactionBroadcaster.broadcastAgentResponse(interaction);
      },
    });
  }

  private getAgentStatusContext(): AgentStatusContext {
    return createAgentStatusContext({
      defaultChatJid: DEFAULT_CHAT_JID,
      json: (payload, status = 200) => this.json(payload, status),
      getAgentStatus: (chatJid) => this.getAgentStatus(chatJid),
      getBuffer: (turnId, panel) => this.getBuffer(turnId, panel),
      getContextUsageForChat: (chatJid) => this.agentPool.getContextUsageForChat(chatJid),
      getAvailableModels: (chatJid) => this.agentPool.getAvailableModels(chatJid),
    });
  }

  private getContentEndpointsContext(): ContentEndpointsContext {
    return createContentEndpointsContext({
      defaultChatJid: DEFAULT_CHAT_JID,
      json: (payload, status = 200) => this.json(payload, status),
      getBuffer: (turnId, panel) => this.getBuffer(turnId, panel),
    });
  }

  private getUiEndpointsContext(): UiEndpointsContext {
    return createUiEndpointsContext({
      json: (payload, status = 200) => this.json(payload, status),
      getWorkspaceVisible: () => this.workspaceVisible,
      setWorkspaceVisible: (value) => {
        this.workspaceVisible = value;
      },
      getWorkspaceShowHidden: () => this.workspaceShowHidden,
      setWorkspaceShowHidden: (value) => {
        this.workspaceShowHidden = value;
      },
      setPanelExpanded: (turnId, panel, expanded) => {
        this.setPanelExpanded(turnId, panel, expanded);
      },
      handleUiResponse: (requestId, outcome) => this.uiBridge.handleUiResponse(requestId, outcome),
    });
  }

  private getAgentsEndpointsContext(): AgentsEndpointContext {
    return createAgentsEndpointContext({
      agentPool: this.agentPool,
      defaultChatJid: DEFAULT_CHAT_JID,
      defaultAgentId: DEFAULT_AGENT_ID,
      agentName: ASSISTANT_NAME,
      agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      userName: USER_NAME || null,
      userAvatar: resolveAvatarUrl("user", USER_AVATAR),
      userAvatarBackground: USER_AVATAR_BACKGROUND || null,
      json: (payload, status = 200) => this.json(payload, status),
    });
  }

  private getAvatarEndpointsContext(): AvatarEndpointContext {
    return createAvatarEndpointContext({
      assistantAvatar: ASSISTANT_AVATAR || null,
      userAvatar: USER_AVATAR || null,
      json: (payload, status = 200) => this.json(payload, status),
    });
  }

  private getAuthEndpointsContext(): AuthEndpointsContext {
    return {
      createTotpContext: () => this.authGateway.createTotpContext(),
      createWebauthnContext: () => this.authGateway.createWebauthnContext(),
      createWebauthnEnrolPageContext: () => this.authGateway.createWebauthnEnrolPageContext(),
      serveStatic: (relPath) => this.serveStatic(relPath),
    };
  }

  async handleAuthVerify(req: Request): Promise<Response> {
    return await handleAuthVerifyEndpoint(req, this.getAuthEndpointsContext());
  }

  async handleWebauthnLoginStart(req: Request): Promise<Response> {
    return await handleWebauthnLoginStartEndpoint(req, this.getAuthEndpointsContext());
  }

  async handleWebauthnLoginFinish(req: Request): Promise<Response> {
    return await handleWebauthnLoginFinishEndpoint(req, this.getAuthEndpointsContext());
  }

  async handleWebauthnRegisterStart(req: Request): Promise<Response> {
    return await handleWebauthnRegisterStartEndpoint(req, this.getAuthEndpointsContext());
  }

  async handleWebauthnRegisterFinish(req: Request): Promise<Response> {
    return await handleWebauthnRegisterFinishEndpoint(req, this.getAuthEndpointsContext());
  }

  async handleWebauthnEnrollPage(_req: Request): Promise<Response> {
    return await handleWebauthnEnrollPageEndpoint(this.getAuthEndpointsContext());
  }

  async serveLoginPage(): Promise<Response> {
    return await serveLoginPageResponse(this.getAuthEndpointsContext());
  }

  redirectToLogin(): Response {
    return redirectToLoginResponse();
  }

  async handleRequest(req: Request): Promise<Response> {
    return this.requestRouter.handle(req);
  }

  async handleAgents(): Promise<Response> {
    return await handleAgentsRequest(this.getAgentsEndpointsContext());
  }

  async handleManifest(req: Request): Promise<Response> {
    return await handleManifestRequest(req, {
      assistantName: ASSISTANT_NAME,
      assistantAvatar: ASSISTANT_AVATAR,
      ensureAvatarCache,
    });
  }

  async handleAvatar(kind: "agent" | "user", req: Request): Promise<Response> {
    return await handleAvatarRequest(kind, req, this.getAvatarEndpointsContext());
  }

  async handleWorkspaceVisibility(req: Request): Promise<Response> {
    return await handleWorkspaceVisibilityRequest(req, this.getUiEndpointsContext());
  }

  handleTimeline(limit: number, before?: number): Response {
    return handleTimelineRequest(limit, before, this.getContentEndpointsContext());
  }

  handleHashtag(tag: string, limit: number, offset: number): Response {
    return handleHashtagRequest(tag, limit, offset, this.getContentEndpointsContext());
  }

  handleSearch(query: string, limit: number, offset: number): Response {
    return handleSearchRequest(query, limit, offset, this.getContentEndpointsContext());
  }

  handleThread(id: number | null): Response {
    return handleThreadRequest(id, this.getContentEndpointsContext());
  }

  handleThought(panel: string | null, turnId: string | null): Response {
    return handleThoughtRequest(panel, turnId, this.getContentEndpointsContext());
  }

  async handleThoughtVisibility(req: Request): Promise<Response> {
    return await handleThoughtVisibilityRequest(req, this.getUiEndpointsContext());
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
    return await handleUpdatePostRequest(req, id, this.getPostMutationsContext());
  }

  /**
   * POST /internal/post – Create an internal agent message.
   * Requires internal secret when WEB_INTERNAL_SECRET is configured.
   * Content is capped at 100 KB to prevent DB bloat.
   */
  async handleInternalPost(req: Request): Promise<Response> {
    return await handleInternalPostRequest(req, this.getPostMutationsContext());
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
    return handleAgentStatusRequest(req, this.getAgentStatusContext());
  }

  /** GET /agent/context — return context window usage for the compose box indicator. */
  async handleAgentContext(req: Request): Promise<Response> {
    return await handleAgentContextRequest(req, this.getAgentStatusContext());
  }

  /** GET /agent/models — return available model labels and current selection. */
  async handleAgentModels(req: Request): Promise<Response> {
    return await handleAgentModelsRequest(req, this.getAgentStatusContext());
  }

  /**
   * POST /agent/respond – Handle a UI response to an agent request (e.g., confirmation dialog).
   * Validates request_id is a non-empty string of ≤ 256 chars.
   */
  async handleAgentRespond(req: Request): Promise<Response> {
    return await handleAgentRespondRequest(req, this.getUiEndpointsContext());
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
    options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; threadId?: number } = {}
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
