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
import { handleAuthVerifyRequest, type TotpAuthContext } from "./web/totp-auth.js";
import {
  buildSessionCookieHeader,
  isRequestAuthenticated,
  isRequestTotpSession,
} from "./web/session-auth.js";
import { isInternalSecretRequestAuthorized } from "./web/internal-secret.js";
import {
  handleWebauthnLoginFinish as handleWebauthnLoginFinishRequest,
  handleWebauthnLoginStart as handleWebauthnLoginStartRequest,
  handleWebauthnRegisterFinish as handleWebauthnRegisterFinishRequest,
  handleWebauthnRegisterStart as handleWebauthnRegisterStartRequest,
  type WebauthnAuthContext,
} from "./web/webauthn-auth.js";
import {
  handleWebauthnEnrollPageRequest,
  type WebauthnEnrolPageContext,
} from "./web/webauthn-enrol-page.js";
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
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import {
  handleWorkspaceAttach,
  handleWorkspaceDelete,
  handleWorkspaceDownload,
  handleWorkspaceFile,
  handleWorkspaceRaw,
  handleWorkspaceTree,
  handleWorkspaceUpdate,
  handleWorkspaceUpload,
  startWorkspaceWatcher,
} from "./web/handlers/workspace.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import {
  getMessageRowIdById,
  getMessagesSince,
  replaceMessageContent,
  getAllChatCursors,
  getChatCursor,
  setChatCursor,
  getFailedRun,
  clearFailedRun,
  getInflightRuns,
  rollbackInflightRun,
  clearInflightMarker,
  hasAgentRepliesAfter,
  getDb,
} from "../db.js";
import type { InteractionRow } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { storeWebMessage } from "./web/message-store.js";
import { deletePostResponse } from "./web/timeline-service.js";
import { getAgentsResponse } from "./web/agents-service.js";
import { buildAvatarResponse, ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import {
  handleAgentContextRequest,
  handleAgentModelsRequest,
  handleAgentStatusRequest,
  type AgentStatusContext,
} from "./web/agent-status.js";
import { bindWebUiSessionBinder } from "./web/agent-pool-binder.js";
import {
  handleHashtagRequest,
  handleSearchRequest,
  handleThoughtRequest,
  handleThreadRequest,
  handleTimelineRequest,
  type ContentEndpointsContext,
} from "./web/content-endpoints.js";
import { handleManifestRequest } from "./web/manifest.js";
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
import { broadcastAgentResponse, broadcastInteractionUpdated } from "./web/interaction-service.js";
import { RemoteInteropService } from "../remote/service.js";
import { getClientKey as getRequestClientKey } from "./web/http/client.js";

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
  pendingLinkPreviews = new Set<number>();
  workspaceWatcher: { close: () => Promise<void> } | null = null;
  workspaceVisible = false;
  workspaceShowHidden = false;
  pendingSteering = new Map<string, string[]>();
  activeAgentStatuses = new Map<string, Record<string, unknown>>();
  lastCommandInteractionId: number | null = null;
  webauthnChallenges = new WebauthnChallengeTracker();
  totpFailureTracker = new TotpFailureTracker();
  thoughtBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  draftBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  expandedPanels = new Map<string, { thought: boolean; draft: boolean }>();

  constructor(opts: WebChannelOpts) {
    this.queue = opts.queue;
    this.agentPool = opts.agentPool;
    this.uiBridge = new UiBridge(this);
    this.remoteInterop = new RemoteInteropService(this.agentPool);
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
      // limits (e.g., 10 MB for media uploads, 100 KB for message content).
      // This is the outermost safety net; Bun rejects bodies exceeding this
      // before any handler code runs.
      maxRequestBodySize: 50 * 1024 * 1024, // 50 MB hard cap
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

  async sendMessage(
    chatJid: string,
    text: string,
    options?: number | null | { threadId?: number | null; forceRoot?: boolean; source?: string }
  ): Promise<void> {
    const normalized = typeof options === "number" || options === null
      ? { threadId: options ?? null }
      : (options ?? {});
    const threadId = normalized.threadId ?? null;
    const forceRoot = Boolean(normalized.forceRoot);

    const interaction = this.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);
    if (interaction) {
      if (forceRoot && !threadId) {
        // Ensure scheduled messages start new threads (not replies to inflight turns).
        getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(interaction.id, interaction.id);
        interaction.data.thread_id = interaction.id;
      }
      broadcastAgentResponse(
        this,
        interaction,
        ASSISTANT_NAME,
        resolveAvatarUrl("agent", ASSISTANT_AVATAR),
        USER_NAME || null,
        resolveAvatarUrl("user", USER_AVATAR),
        USER_AVATAR_BACKGROUND || null
      );
    }
  }

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number): InteractionRow | null {
    const interaction = this.storeMessage(chatJid, text, true, [], { threadId });
    if (!interaction) return null;

    this.state.enqueueFollowupPlaceholder(chatJid, interaction.id);

    broadcastAgentResponse(
      this,
      interaction,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return interaction;
  }

  consumeQueuedFollowupPlaceholder(chatJid: string): number | null {
    return this.state.consumeFollowupPlaceholder(chatJid);
  }

  queuePendingSteering(chatJid: string, timestamp: string | undefined): void {
    if (!timestamp) return;
    const existing = this.pendingSteering.get(chatJid) ?? [];
    existing.push(timestamp);
    this.pendingSteering.set(chatJid, existing);
  }

  consumePendingSteering(chatJid: string): string | null {
    const entries = this.pendingSteering.get(chatJid);
    if (!entries || entries.length === 0) return null;
    this.pendingSteering.delete(chatJid);
    entries.sort();
    return entries[entries.length - 1] ?? null;
  }

  updateAgentStatus(chatJid: string, status: Record<string, unknown>): void {
    const type = status?.type;
    if (type === "done" || type === "error") {
      const removed = this.activeAgentStatuses.delete(chatJid);
      if (removed) {
        this.state.setAgentStatus(chatJid, null);
        this.saveState();
      }
      return;
    }
    this.activeAgentStatuses.set(chatJid, status);
    this.state.setAgentStatus(chatJid, status);
    this.saveState();
  }

  getAgentStatus(chatJid: string): Record<string, unknown> | null {
    return this.activeAgentStatuses.get(chatJid) ?? null;
  }

  replaceQueuedFollowupPlaceholder(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined,
    threadId?: number
  ): InteractionRow | null {
    const updated = replaceMessageContent(chatJid, rowId, text, {
      contentBlocks,
      mediaIds,
    });
    if (!updated) return null;

    updated.data.agent_id = DEFAULT_AGENT_ID;
    if (threadId) updated.data.thread_id = threadId;

    broadcastInteractionUpdated(
      this,
      updated,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return updated;
  }

  getThreadRootId(chatJid: string, messageId: string): number | null {
    return getMessageRowIdById(chatJid, messageId);
  }

  resumeChat(chatJid: string, threadRootId?: number | null): void {
    this.queue.enqueue(async () => {
      await this.processChat(chatJid, DEFAULT_AGENT_ID, threadRootId ?? undefined);
    }, `resume:${chatJid}:${Date.now()}`);
  }

  skipFailedOnModelSwitch(chatJid: string): void {
    const failed = getFailedRun(chatJid);
    if (!failed) return;
    const current = getChatCursor(chatJid);
    if (!current || current < failed.failedTs) {
      setChatCursor(chatJid, failed.failedTs);
    }
    clearFailedRun(chatJid);
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
    const inflights = getInflightRuns();
    if (inflights.length === 0) return;

    try {
      getDb().transaction(() => {
        for (const inflight of inflights) {
          // Check if agent already stored replies after the inflight message.
          // If so, the run completed successfully but endChatRun() wasn't
          // reached before the process was killed. In that case, just clear
          // the inflight marker — do NOT roll back the cursor, as that would
          // cause the same user message to be re-processed (duplicate reply).
          if (hasAgentRepliesAfter(inflight.chatJid, inflight.prevTs)) {
            console.log(
              `[web] Inflight run for ${inflight.chatJid} (started ${inflight.startedAt}) ` +
              `already has agent replies — clearing marker without rollback`
            );
            clearInflightMarker(inflight.chatJid);
          } else {
            rollbackInflightRun(inflight.chatJid, inflight.prevTs);
          }
        }
      })();
    } catch (err) {
      console.error("[web] Failed to roll back inflight runs; will retry on next startup:", err);
      return;
    }

    for (const inflight of inflights) {
      // Only re-enqueue if the cursor was actually rolled back (no agent replies existed)
      if (!hasAgentRepliesAfter(inflight.chatJid, inflight.prevTs)) {
        console.log(`[web] Recovering interrupted run for ${inflight.chatJid} (started ${inflight.startedAt})`);
        this.queue.enqueue(async () => {
          await this.processChat(inflight.chatJid, DEFAULT_AGENT_ID);
        }, `inflight-recovery:${inflight.chatJid}`);
      }
    }
  }

  /**
   * Scan all known chats (or a specific one) for messages that arrived after
   * their stored cursor and enqueue processChat() for each with pending work.
   * Called after a restart via the resume_pending IPC.
   */
  resumePendingChats(chatJid?: string): void {
    const cursors = getAllChatCursors();
    const jids = chatJid && chatJid !== "all"
      ? [chatJid]
      : Object.keys(cursors);

    for (const jid of jids) {
      const since = cursors[jid];
      if (since === undefined) continue; // No cursor → never processed, skip
      const messages = getMessagesSince(jid, since, ASSISTANT_NAME);
      if (messages.length === 0) continue;
      this.queue.enqueue(async () => {
        await this.processChat(jid, DEFAULT_AGENT_ID);
      }, `resume:${jid}:${Date.now()}`);
    }
  }

  loadState(): void {
    this.state.load();
    // Clear any persisted agent statuses from the previous process.
    // After a restart no agents are running, so stale "intent" or "tool_call"
    // statuses would otherwise be served to the UI indefinitely.
    const restored = this.state.getAgentStatuses();
    if (Object.keys(restored).length > 0) {
      for (const jid of Object.keys(restored)) {
        this.state.setAgentStatus(jid, null);
      }
      this.state.save();
    }
    this.activeAgentStatuses = new Map();
  }

  saveState(): void {
    this.state.save();
  }

  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void {
    if (!turnId) return;
    const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
    current[panel] = expanded;
    if (!current.thought && !current.draft) {
      this.expandedPanels.delete(turnId);
    } else {
      this.expandedPanels.set(turnId, current);
    }
  }

  isPanelExpanded(turnId: string, panel: "thought" | "draft"): boolean {
    return this.expandedPanels.get(turnId)?.[panel] ?? false;
  }

  updateThoughtBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.thoughtBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.thoughtBuffers);
  }

  updateDraftBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.draftBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.draftBuffers);
  }

  getBuffer(turnId: string, panel: "thought" | "draft") {
    return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
  }

  pruneBuffers(map: Map<string, { text: string; totalLines: number; updatedAt: number }>): void {
    const limit = 50;
    if (map.size <= limit) return;
    const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
    for (let i = 0; i < entries.length - limit; i += 1) {
      map.delete(entries[i][0]);
    }
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
    return this.isTotpEnabled() || this.isPasskeyEnabled();
  }

  isInternalSecretEnabled(): boolean {
    return Boolean(WEB_INTERNAL_SECRET && WEB_INTERNAL_SECRET.trim());
  }

  isPasskeyEnabled(): boolean {
    const mode = (WEB_PASSKEY_MODE || "").toLowerCase();
    if (mode === "totp-only") return false;
    if (mode === "passkey-only") return true;
    return this.isTotpEnabled();
  }

  isPasskeyOnly(): boolean {
    return (WEB_PASSKEY_MODE || "").toLowerCase() === "passkey-only";
  }

  isTotpEnabled(): boolean {
    return Boolean(WEB_TOTP_SECRET && WEB_TOTP_SECRET.trim());
  }

  isTotpSession(req: Request): boolean {
    return isRequestTotpSession(req, this.isTotpEnabled());
  }

  private getClientKey(req: Request): string {
    return getRequestClientKey(req);
  }

  private logAuthEvent(req: Request, event: string): void {
    const ip = this.getClientKey(req);
    console.warn(`[auth] ${event} (ip=${ip})`);
  }

  verifyInternalSecret(req: Request): boolean {
    return isInternalSecretRequestAuthorized(req, WEB_INTERNAL_SECRET || "");
  }

  isAuthenticated(req: Request): boolean {
    return isRequestAuthenticated(req, this.isAuthEnabled());
  }

  private buildSessionCookie(token: string, req: Request): string {
    return buildSessionCookieHeader(token, req, WEB_SESSION_TTL, Boolean(WEB_TLS_CERT && WEB_TLS_KEY));
  }

  private getWebauthnAuthContext(): WebauthnAuthContext {
    return {
      isPasskeyEnabled: () => this.isPasskeyEnabled(),
      json: (payload, status = 200) => this.json(payload, status),
      buildSessionCookie: (token, req) => this.buildSessionCookie(token, req),
      logAuthEvent: (req, event) => this.logAuthEvent(req, event),
      getClientKey: (req) => this.getClientKey(req),
      challenges: this.webauthnChallenges,
    };
  }

  private getWebauthnEnrolPageContext(): WebauthnEnrolPageContext {
    return {
      isPasskeyEnabled: () => this.isPasskeyEnabled(),
      json: (payload, status = 200) => this.json(payload, status),
    };
  }

  private getTotpAuthContext(): TotpAuthContext {
    return {
      isAuthEnabled: () => this.isAuthEnabled(),
      isTotpEnabled: () => this.isTotpEnabled(),
      json: (payload, status = 200) => this.json(payload, status),
      getClientKey: (req) => this.getClientKey(req),
      logAuthEvent: (req, event) => this.logAuthEvent(req, event),
      buildSessionCookie: (token, req) => this.buildSessionCookie(token, req),
      failureTracker: this.totpFailureTracker,
    };
  }

  private getPostMutationsContext(): PostMutationsContext {
    return {
      defaultChatJid: DEFAULT_CHAT_JID,
      lastCommandInteractionId: this.lastCommandInteractionId,
      json: (payload, status = 200) => this.json(payload, status),
      replaceMessageContent: (chatJid, id, content) => replaceMessageContent(chatJid, id, content, {}),
      setThreadId: (messageId, threadId) => {
        getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(threadId, messageId);
      },
      broadcastInteractionUpdated: (interaction) => {
        broadcastInteractionUpdated(
          this,
          interaction,
          ASSISTANT_NAME,
          resolveAvatarUrl("agent", ASSISTANT_AVATAR),
          USER_NAME || null,
          resolveAvatarUrl("user", USER_AVATAR),
          USER_AVATAR_BACKGROUND || null
        );
      },
      storeMessage: (chatJid, content, isBot, mediaIds, options = {}) =>
        this.storeMessage(chatJid, content, isBot, mediaIds, options),
      broadcastAgentResponse: (interaction) => {
        broadcastAgentResponse(
          this,
          interaction,
          ASSISTANT_NAME,
          resolveAvatarUrl("agent", ASSISTANT_AVATAR),
          USER_NAME || null,
          resolveAvatarUrl("user", USER_AVATAR),
          USER_AVATAR_BACKGROUND || null
        );
      },
    };
  }

  private getAgentStatusContext(): AgentStatusContext {
    return {
      defaultChatJid: DEFAULT_CHAT_JID,
      json: (payload, status = 200) => this.json(payload, status),
      getAgentStatus: (chatJid) => this.getAgentStatus(chatJid),
      getBuffer: (turnId, panel) => this.getBuffer(turnId, panel),
      getContextUsageForChat: (chatJid) => this.agentPool.getContextUsageForChat(chatJid),
      getAvailableModels: (chatJid) => this.agentPool.getAvailableModels(chatJid),
    };
  }

  private getContentEndpointsContext(): ContentEndpointsContext {
    return {
      defaultChatJid: DEFAULT_CHAT_JID,
      json: (payload, status = 200) => this.json(payload, status),
      getBuffer: (turnId, panel) => this.getBuffer(turnId, panel),
    };
  }

  private getUiEndpointsContext(): UiEndpointsContext {
    return {
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
    };
  }

  async handleAuthVerify(req: Request): Promise<Response> {
    return await handleAuthVerifyRequest(req, this.getTotpAuthContext());
  }

  async handleWebauthnLoginStart(req: Request): Promise<Response> {
    return await handleWebauthnLoginStartRequest(req, this.getWebauthnAuthContext());
  }

  async handleWebauthnLoginFinish(req: Request): Promise<Response> {
    return await handleWebauthnLoginFinishRequest(req, this.getWebauthnAuthContext());
  }

  async handleWebauthnRegisterStart(req: Request): Promise<Response> {
    return await handleWebauthnRegisterStartRequest(req, this.getWebauthnAuthContext());
  }

  async handleWebauthnRegisterFinish(req: Request): Promise<Response> {
    return await handleWebauthnRegisterFinishRequest(req, this.getWebauthnAuthContext());
  }

  async handleWebauthnEnrollPage(_req: Request): Promise<Response> {
    return handleWebauthnEnrollPageRequest(this.getWebauthnEnrolPageContext());
  }

  async serveLoginPage(): Promise<Response> {
    return this.serveStatic("login.html");
  }

  redirectToLogin(): Response {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  async handleRequest(req: Request): Promise<Response> {
    const { RequestRouterService } = await import("./web/request-router-service.js");
    const router = new RequestRouterService(this);
    return router.handle(req);
  }

  async handleAgents(): Promise<Response> {
    const result = await getAgentsResponse(this.agentPool, {
      chatJid: DEFAULT_CHAT_JID,
      agentId: DEFAULT_AGENT_ID,
      agentName: ASSISTANT_NAME,
      agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      userName: USER_NAME || null,
      userAvatar: resolveAvatarUrl("user", USER_AVATAR),
      userAvatarBackground: USER_AVATAR_BACKGROUND || null,
    });
    return this.json(result.body, result.status);
  }

  async handleManifest(req: Request): Promise<Response> {
    return await handleManifestRequest(req, {
      assistantName: ASSISTANT_NAME,
      assistantAvatar: ASSISTANT_AVATAR,
      ensureAvatarCache,
    });
  }

  async handleAvatar(kind: "agent" | "user", req: Request): Promise<Response> {
    const source = kind === "agent" ? ASSISTANT_AVATAR : USER_AVATAR;
    if (!source) return this.json({ error: "Avatar not found" }, 404);
    const response = await buildAvatarResponse(kind, source, req);
    if (response) return response;
    return this.json({ error: "Avatar not found" }, 404);
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
    const { handlePost } = await import("./web/handlers/posts.js");
    return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
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
    const { handleAgentMessage } = await import("./web/handlers/agent.js");
    return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
  }

  async processChat(chatJid: string, agentId: string, threadRootId?: number | null): Promise<void> {
    const { processChat } = await import("./web/handlers/agent.js");
    return processChat(this, chatJid, agentId, threadRootId ?? undefined);
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

  async handleMediaUpload(req: Request): Promise<Response> {
    return handleMediaUpload(this, req);
  }

  handleMedia(id: number, thumbnail: boolean): Response {
    return handleMedia(this, id, thumbnail);
  }

  handleMediaInfo(id: number): Response {
    return handleMediaInfo(this, id);
  }

  async handleRemote(req: Request): Promise<Response> {
    return this.remoteInterop.handleRequest(req);
  }

  handleWorkspaceTree(req: Request): Response {
    return handleWorkspaceTree(this, req);
  }

  handleWorkspaceFile(req: Request): Response {
    return handleWorkspaceFile(this, req);
  }

  async handleWorkspaceUpdate(req: Request): Promise<Response> {
    return handleWorkspaceUpdate(this, req);
  }

  handleWorkspaceDelete(req: Request): Response {
    return handleWorkspaceDelete(this, req);
  }

  handleWorkspaceRaw(req: Request): Response {
    return handleWorkspaceRaw(this, req);
  }

  async handleWorkspaceAttach(req: Request): Promise<Response> {
    return handleWorkspaceAttach(this, req);
  }

  async handleWorkspaceUpload(req: Request): Promise<Response> {
    return handleWorkspaceUpload(this, req);
  }

  async handleWorkspaceDownload(req: Request): Promise<Response> {
    return handleWorkspaceDownload(this, req);
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
