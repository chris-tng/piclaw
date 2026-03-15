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
import { initTheme } from "@mariozechner/pi-coding-agent";
import { WebauthnChallengeTracker } from "./web/webauthn-challenges.js";
import { TotpFailureTracker } from "./web/totp-failure-tracker.js";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, USER_AVATAR, USER_AVATAR_BACKGROUND, USER_NAME, WEB_HOST, WEB_IDLE_TIMEOUT, WEB_PORT, WEB_TLS_CERT, WEB_TLS_KEY, WEB_SESSION_TTL, WEB_TOTP_SECRET, WEB_INTERNAL_SECRET, WEB_PASSKEY_MODE, WEB_TERMINAL_ENABLED, } from "../core/config.js";
import { startWorkspaceWatcher } from "./web/handlers/workspace.js";
import { RequestRouterService } from "./web/request-router-service.js";
import { checkCsrfOrigin } from "./web/http/security.js";
import { handlePost as handlePostRequest } from "./web/handlers/posts.js";
import { handleAgentMessage as handleAgentMessageRequest, processChat as processAgentChat, } from "./web/handlers/agent.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import { deleteMessageByRowId, replaceMessageContent, getDb, getInflightMessageId, getMessageByRowId, getMessageThreadRootIdById, getDeferredQueuedFollowups, setDeferredQueuedFollowups, } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { AgentStatusStore } from "./web/agent-status-store.js";
import { FollowupPlaceholderStore } from "./web/followup-placeholders.js";
import { PendingSteeringStore } from "./web/pending-steering.js";
import { storeWebMessage } from "./web/message-store.js";
import { queueFollowupPlaceholderMessage, replaceQueuedFollowupPlaceholderMessage, sendWebMessage, } from "./web/message-write-flows.js";
import { deletePostResponse } from "./web/timeline-service.js";
import { ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import { handleAgentContextRequest, handleAgentModelsRequest, handleAgentStatusRequest, } from "./web/agent-status.js";
import { AgentBuffers } from "./web/agent-buffers.js";
import { bindWebUiSessionBinder } from "./web/agent-pool-binder.js";
import { handleHashtagRequest, handleSearchRequest, handleThoughtRequest, handleThreadRequest, handleTimelineRequest, } from "./web/content-endpoints.js";
import { handleAgentsRequest, handleAvatarRequest, } from "./web/identity-endpoints.js";
import { handleManifestRequest } from "./web/manifest.js";
import { getThreadRootId as getThreadRootIdForChat, resumeChat as resumeWebChat, skipFailedOnModelSwitch as skipFailedOnModelSwitchForChat, } from "./web/chat-run-control.js";
import { recoverInflightRuns as recoverWebInflightRuns, resumePendingChats as resumeWebPendingChats, } from "./web/recovery.js";
import { handleInternalPostRequest, handleUpdatePostRequest, } from "./web/post-mutations.js";
import { handleAgentRespondRequest, handleThoughtVisibilityRequest, handleWorkspaceVisibilityRequest, } from "./web/ui-endpoints.js";
import { buildAdaptiveCardSubmissionText, buildAdaptiveCardSubmitBlock, getAdaptiveCardSubmitBehavior, getAdaptiveCardSubmitState, getAdaptiveCardTestFailure, markAdaptiveCardState, sanitizeAdaptiveCardActionPayload, sanitizeAdaptiveCardSubmissionData, } from "./web/adaptive-card-actions.js";
import { createWebChannelEndpointContexts, } from "./web/channel-endpoint-context-factory.js";
import { createInteractionBroadcaster } from "./web/interaction-broadcaster.js";
import { WebAuthGateway } from "./web/auth-gateway.js";
import { TerminalSessionService } from "./web/terminal/terminal-session-service.js";
import { RemoteInteropService } from "../remote/service.js";
const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";
/** Web channel: HTTP/SSE server, API endpoints, and agent event bridge. */
export class WebChannel {
    queue;
    agentPool;
    server = null;
    state = new WebChannelState(STATE_KEY);
    sse = new SseHub();
    uiBridge;
    remoteInterop;
    responses = new ResponseService();
    requestRouter;
    endpointContexts;
    pendingLinkPreviews = new Set();
    workspaceWatcher = null;
    workspaceVisible = false;
    workspaceShowHidden = false;
    followupPlaceholderStore = new FollowupPlaceholderStore();
    pendingSteeringStore = new PendingSteeringStore();
    agentStatusStore;
    interactionBroadcaster;
    lastCommandInteractionId = null;
    webauthnChallenges = new WebauthnChallengeTracker();
    totpFailureTracker = new TotpFailureTracker();
    agentBuffers = new AgentBuffers();
    authGateway;
    terminalService = new TerminalSessionService();
    constructor(opts) {
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
        this.authGateway = new WebAuthGateway({
            passkeyMode: WEB_PASSKEY_MODE || "",
            totpSecret: WEB_TOTP_SECRET || "",
            internalSecret: WEB_INTERNAL_SECRET || "",
            sessionTtlSeconds: WEB_SESSION_TTL,
            hasTls: Boolean(WEB_TLS_CERT && WEB_TLS_KEY),
        }, {
            json: (payload, status = 200) => this.json(payload, status),
            challenges: this.webauthnChallenges,
            failureTracker: this.totpFailureTracker,
        });
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
        bindWebUiSessionBinder(this.agentPool, (session, chatJid) => this.uiBridge.bindSession(session, chatJid));
    }
    async start() {
        this.loadState();
        try {
            initTheme();
        }
        catch { }
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
            fetch: (req, server) => this.handleFetch(req, server),
            websocket: {
                open: (ws) => this.terminalService.attachClient(ws),
                message: (ws, message) => this.terminalService.handleMessage(ws, message),
                close: (ws) => this.terminalService.detachClient(ws),
            },
            ...(tls ? { tls } : {}),
        });
        this.workspaceWatcher = startWorkspaceWatcher(this);
        const scheme = tls ? "https" : "http";
        console.log(`[web] UI listening on ${scheme}://${WEB_HOST}:${WEB_PORT}`);
    }
    async stop() {
        this.sse.closeAll();
        this.uiBridge.stop();
        this.terminalService.shutdown();
        this.server?.stop(true);
        this.server = null;
        if (this.workspaceWatcher) {
            await this.workspaceWatcher.close();
            this.workspaceWatcher = null;
        }
    }
    getMessageWriteContext() {
        return {
            defaultAgentId: DEFAULT_AGENT_ID,
            store: {
                storeMessage: (chatJid, content, isBot, mediaIds, options) => this.storeMessage(chatJid, content, isBot, mediaIds, options),
                replaceMessageContent: (chatJid, rowId, text, mediaIds, contentBlocks, isTerminalAgentReply) => replaceMessageContent(chatJid, rowId, text, { contentBlocks, mediaIds, isTerminalAgentReply }) ?? null,
                setMessageThreadToSelf: (messageId) => {
                    getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(messageId, messageId);
                },
            },
            broadcaster: {
                broadcastAgentResponse: (interaction) => this.interactionBroadcaster.broadcastAgentResponse(interaction),
                broadcastInteractionUpdated: (interaction) => this.interactionBroadcaster.broadcastInteractionUpdated(interaction),
            },
            followups: {
                enqueue: (chatJid, rowId, queuedContent, threadId, queuedAt) => this.followupPlaceholderStore.enqueue(chatJid, rowId, queuedContent, threadId, queuedAt),
            },
        };
    }
    async sendMessage(chatJid, text, options) {
        sendWebMessage(chatJid, text, options, this.getMessageWriteContext());
    }
    queueFollowupPlaceholder(chatJid, text, threadId, queuedContent) {
        return queueFollowupPlaceholderMessage(chatJid, text, threadId, (queuedContent || "").trim() || text, this.getMessageWriteContext());
    }
    getDeferredQueuedFollowupItems(chatJid) {
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
    setDeferredQueuedFollowupItems(chatJid, items) {
        const persisted = items.map((item) => ({
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
    allocateDeferredQueuedRowId(chatJid) {
        const queued = this.getDeferredQueuedFollowupItems(chatJid);
        const minRowId = queued.reduce((min, item) => (item.rowId < min ? item.rowId : min), 0);
        return minRowId <= -1 ? minRowId - 1 : -1;
    }
    enqueueQueuedFollowupItem(chatJid, rowId, queuedContent, threadId, queuedAt, extras) {
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
    consumeQueuedFollowupItem(chatJid) {
        const queued = this.getDeferredQueuedFollowupItems(chatJid);
        const next = queued.shift() ?? null;
        this.setDeferredQueuedFollowupItems(chatJid, queued);
        return next;
    }
    prependQueuedFollowupItem(chatJid, item) {
        const queued = this.getDeferredQueuedFollowupItems(chatJid);
        queued.unshift({
            rowId: item.rowId,
            queuedContent: item.queuedContent,
            threadId: item.threadId ?? null,
            queuedAt: item.queuedAt,
            mediaIds: item.mediaIds ? [...item.mediaIds] : undefined,
            contentBlocks: Array.isArray(item.contentBlocks) ? [...item.contentBlocks] : undefined,
            linkPreviews: Array.isArray(item.linkPreviews) ? [...item.linkPreviews] : undefined,
            materializeRetries: item.materializeRetries ?? 0,
        });
        this.setDeferredQueuedFollowupItems(chatJid, queued);
    }
    consumeQueuedFollowupPlaceholder(chatJid) {
        return this.followupPlaceholderStore.consume(chatJid);
    }
    getQueuedFollowupCount(chatJid) {
        return this.getDeferredQueuedFollowupItems(chatJid).length + this.followupPlaceholderStore.count(chatJid);
    }
    getQueuedFollowupItems(chatJid) {
        const rows = [
            ...this.getDeferredQueuedFollowupItems(chatJid),
            ...this.followupPlaceholderStore.peek(chatJid),
        ];
        // Deduplicate by rowId — the two stores use different ID spaces (negative
        // for deferred, positive for placeholder), but guard against bugs that
        // might put the same item in both stores.
        const seen = new Set();
        return rows
            .map((row) => ({
            ...row,
            queuedAt: row.queuedAt,
        }))
            .filter((row) => {
            if (seen.has(row.rowId))
                return false;
            seen.add(row.rowId);
            return true;
        })
            .sort((a, b) => String(a.queuedAt).localeCompare(String(b.queuedAt)));
    }
    removeQueuedFollowupItem(chatJid, rowId) {
        const queued = this.getDeferredQueuedFollowupItems(chatJid);
        const queuedIndex = queued.findIndex((item) => item.rowId === rowId);
        if (queuedIndex >= 0) {
            const [removed] = queued.splice(queuedIndex, 1);
            this.setDeferredQueuedFollowupItems(chatJid, queued);
            return removed ?? null;
        }
        return this.followupPlaceholderStore.remove(chatJid, rowId);
    }
    queuePendingSteering(chatJid, timestamp) {
        this.pendingSteeringStore.queue(chatJid, timestamp);
    }
    consumePendingSteering(chatJid) {
        return this.pendingSteeringStore.consumeLatest(chatJid);
    }
    updateAgentStatus(chatJid, status) {
        this.agentStatusStore.update(chatJid, status);
    }
    getAgentStatus(chatJid) {
        return this.agentStatusStore.get(chatJid);
    }
    replaceQueuedFollowupPlaceholder(chatJid, rowId, text, mediaIds, contentBlocks, threadId, isTerminalAgentReply) {
        return replaceQueuedFollowupPlaceholderMessage(chatJid, rowId, text, mediaIds, contentBlocks, threadId, this.getMessageWriteContext(), isTerminalAgentReply);
    }
    getThreadRootId(chatJid, messageId) {
        return getThreadRootIdForChat(chatJid, messageId);
    }
    getResumeChatContext() {
        return {
            defaultAgentId: DEFAULT_AGENT_ID,
            enqueue: (task, key) => this.queue.enqueue(task, key),
            processChat: (chatJid, agentId, threadRootId) => this.processChat(chatJid, agentId, threadRootId),
        };
    }
    resumeChat(chatJid, threadRootId) {
        resumeWebChat(chatJid, threadRootId, this.getResumeChatContext());
    }
    skipFailedOnModelSwitch(chatJid) {
        skipFailedOnModelSwitchForChat(chatJid);
    }
    getRecoveryContext() {
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
    recoverInflightRuns() {
        recoverWebInflightRuns(this.getRecoveryContext());
    }
    /**
     * Scan all known chats (or a specific one) for messages that arrived after
     * their stored cursor and enqueue processChat() for each with pending work.
     * Called after a restart via the resume_pending IPC.
     */
    resumePendingChats(chatJid) {
        resumeWebPendingChats(this.getRecoveryContext(), chatJid);
    }
    loadState() {
        this.agentStatusStore.load();
    }
    saveState() {
        this.state.save();
    }
    setPanelExpanded(turnId, panel, expanded) {
        this.agentBuffers.setPanelExpanded(turnId, panel, expanded);
    }
    isPanelExpanded(turnId, panel) {
        return this.agentBuffers.isPanelExpanded(turnId, panel);
    }
    updateThoughtBuffer(turnId, text, totalLines) {
        this.agentBuffers.updateBuffer(turnId, "thought", text, totalLines);
    }
    updateDraftBuffer(turnId, text, totalLines) {
        this.agentBuffers.updateBuffer(turnId, "draft", text, totalLines);
    }
    getBuffer(turnId, panel) {
        return this.agentBuffers.getBuffer(turnId, panel);
    }
    async loadTlsOptions() {
        if (!WEB_TLS_CERT || !WEB_TLS_KEY)
            return null;
        try {
            const [cert, key] = await Promise.all([
                Bun.file(WEB_TLS_CERT).text(),
                Bun.file(WEB_TLS_KEY).text(),
            ]);
            return { cert, key };
        }
        catch (error) {
            console.error("[web] Failed to load TLS cert/key:", error);
            return null;
        }
    }
    async handleFetch(req, server) {
        const pathname = new URL(req.url).pathname;
        if (pathname === "/terminal/ws") {
            return this.handleTerminalWebSocketUpgrade(req, server);
        }
        return this.handleRequest(req);
    }
    handleTerminalWebSocketUpgrade(req, server) {
        if (!WEB_TERMINAL_ENABLED) {
            return this.json({ error: "Web terminal is disabled." }, 404);
        }
        const authEnabled = this.authGateway.isAuthEnabled();
        if (authEnabled && !this.authGateway.isAuthenticated(req)) {
            return this.json({ error: "Unauthorized" }, 401);
        }
        if (!checkCsrfOrigin(req)) {
            return this.json({ error: "Origin not allowed" }, 403);
        }
        const owner = this.terminalService.resolveOwnerFromRequest(req, !authEnabled);
        if (!owner) {
            return this.json({ error: "Unauthorized" }, 401);
        }
        if (!server?.upgrade(req, { data: owner })) {
            return this.json({ error: "WebSocket upgrade failed" }, 400);
        }
        return undefined;
    }
    async handleRequest(req) {
        return this.requestRouter.handle(req);
    }
    async handleAgents() {
        return await handleAgentsRequest(this.endpointContexts.agents());
    }
    async handleManifest(req) {
        return await handleManifestRequest(req, {
            assistantName: ASSISTANT_NAME,
            assistantAvatar: ASSISTANT_AVATAR,
            ensureAvatarCache,
        });
    }
    async handleAvatar(kind, req) {
        return await handleAvatarRequest(kind, req, this.endpointContexts.avatar());
    }
    async handleWorkspaceVisibility(req) {
        return await handleWorkspaceVisibilityRequest(req, this.endpointContexts.ui());
    }
    handleTimeline(limit, before) {
        return handleTimelineRequest(limit, before, this.endpointContexts.content());
    }
    handleHashtag(tag, limit, offset) {
        return handleHashtagRequest(tag, limit, offset, this.endpointContexts.content());
    }
    handleSearch(query, limit, offset) {
        return handleSearchRequest(query, limit, offset, this.endpointContexts.content());
    }
    handleThread(id) {
        return handleThreadRequest(id, this.endpointContexts.content());
    }
    handleThought(panel, turnId) {
        return handleThoughtRequest(panel, turnId, this.endpointContexts.content());
    }
    async handleThoughtVisibility(req) {
        return await handleThoughtVisibilityRequest(req, this.endpointContexts.ui());
    }
    handleDeletePost(id, cascade = false) {
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
    async handleUpdatePost(req, id) {
        return await handleUpdatePostRequest(req, id, this.endpointContexts.postMutations());
    }
    /**
     * POST /internal/post – Create an internal agent message.
     * Requires internal secret when WEB_INTERNAL_SECRET is configured.
     * Content is capped at 100 KB to prevent DB bloat.
     */
    async handleInternalPost(req) {
        return await handleInternalPostRequest(req, this.endpointContexts.postMutations());
    }
    handleSse() {
        return this.sse.handleRequest();
    }
    handleTerminalSession(req) {
        if (!WEB_TERMINAL_ENABLED) {
            return this.json({ enabled: false, error: "Web terminal is disabled." }, 200);
        }
        const authEnabled = this.authGateway.isAuthEnabled();
        if (authEnabled && !this.authGateway.isAuthenticated(req)) {
            return this.json({ error: "Unauthorized" }, 401);
        }
        const owner = this.terminalService.resolveOwnerFromRequest(req, !authEnabled);
        if (!owner) {
            return this.json({ error: "Unauthorized" }, 401);
        }
        return this.json(this.terminalService.getSessionInfo(owner));
    }
    broadcastEvent(eventType, data) {
        this.sse.broadcast(eventType, data);
    }
    async handlePost(req, isReply) {
        return handlePostRequest(this, req, isReply, DEFAULT_CHAT_JID);
    }
    handleAgentStatus(req) {
        return handleAgentStatusRequest(req, this.endpointContexts.agentStatus());
    }
    /** GET /agent/context — return context window usage for the compose box indicator. */
    async handleAgentContext(req) {
        return await handleAgentContextRequest(req, this.endpointContexts.agentStatus());
    }
    /** GET /agent/queue-state — return queued follow-up placeholder count and pending content. */
    async handleAgentQueueState(req) {
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
    async removeQueuedFollowupForAction(chatJid, rowId) {
        const queued = this.getDeferredQueuedFollowupItems(chatJid);
        const queuedIndex = queued.findIndex((item) => item.rowId === Number(rowId));
        const removedQueued = queuedIndex >= 0 ? (queued.splice(queuedIndex, 1)[0] ?? null) : null;
        if (queuedIndex >= 0) {
            this.setDeferredQueuedFollowupItems(chatJid, queued);
        }
        const removedPlaceholder = removedQueued ? null : this.followupPlaceholderStore.remove(chatJid, Number(rowId));
        const removed = removedQueued ?? removedPlaceholder;
        const source = removedQueued ? "deferred" : removedPlaceholder ? "placeholder" : null;
        if (!removed || !source)
            return { removed: null, source: null };
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
    async handleAgentQueueRemove(req) {
        try {
            const payload = (await req.json());
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return this.json({ error: message }, 500);
        }
    }
    /** POST /agent/queue-steer — atomically convert one queued follow-up into steering or an immediate send. */
    async handleAgentQueueSteer(req) {
        try {
            const payload = (await req.json());
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
            const interaction = this.storeMessage(chatJid, steerContent, false, removed.mediaIds ?? [], {
                contentBlocks: Array.isArray(removed.contentBlocks) ? removed.contentBlocks : undefined,
                linkPreviews: Array.isArray(removed.linkPreviews) ? removed.linkPreviews : undefined,
                threadId: steerThreadId ?? undefined,
                isSteeringMessage: isStreaming,
            });
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return this.json({ error: message }, 500);
        }
    }
    /** GET /agent/models — return available model labels and current selection. */
    async handleAgentModels(req) {
        return await handleAgentModelsRequest(req, this.endpointContexts.agentStatus());
    }
    /**
     * POST /agent/respond – Handle a UI response to an agent request (e.g., confirmation dialog).
     * Validates request_id is a non-empty string of ≤ 256 chars.
     */
    async handleAgentRespond(req) {
        return await handleAgentRespondRequest(req, this.endpointContexts.ui());
    }
    async handleAdaptiveCardAction(req) {
        let payload;
        try {
            payload = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        const normalized = sanitizeAdaptiveCardActionPayload(payload);
        const chatJid = normalized.chatJid ?? DEFAULT_CHAT_JID;
        if (!normalized.postId || normalized.postId <= 0) {
            return this.json({ error: "Missing or invalid post_id" }, 400);
        }
        if (!normalized.cardId) {
            return this.json({ error: "Missing or invalid card_id" }, 400);
        }
        if (!normalized.actionType) {
            return this.json({ error: "Missing or invalid action.type" }, 400);
        }
        if (normalized.actionType === "Action.OpenUrl") {
            return this.json({ status: "ok", handled: "client", action_type: normalized.actionType, url: normalized.actionUrl || null }, 200);
        }
        if (normalized.actionType !== "Action.Submit") {
            return this.json({ error: `Unsupported action type: ${normalized.actionType}` }, 400);
        }
        const sourceInteraction = getMessageByRowId(chatJid, normalized.postId);
        if (!sourceInteraction) {
            return this.json({ error: "Source post not found" }, 404);
        }
        const simulatedFailure = getAdaptiveCardTestFailure(normalized.cardId, normalized.actionData);
        if (simulatedFailure) {
            return this.json({ error: simulatedFailure }, 422);
        }
        const submittedAt = new Date().toISOString();
        const sanitizedSubmissionData = sanitizeAdaptiveCardSubmissionData(normalized.actionData);
        const submissionMeta = {
            action_type: normalized.actionType,
            title: normalized.actionTitle || undefined,
            data: sanitizedSubmissionData,
            submitted_at: submittedAt,
        };
        const submitBehavior = getAdaptiveCardSubmitBehavior(sourceInteraction.data?.content_blocks, normalized.cardId);
        const targetState = getAdaptiveCardSubmitState(normalized.actionData);
        const updatedCardBlocks = submitBehavior === "keep_active"
            ? sourceInteraction.data?.content_blocks ?? null
            : markAdaptiveCardState(sourceInteraction.data?.content_blocks, normalized.cardId, targetState, submittedAt, submissionMeta);
        if (!updatedCardBlocks) {
            return this.json({ error: "Adaptive card not found or no longer active" }, 409);
        }
        const threadId = normalized.threadId ?? sourceInteraction.data?.thread_id ?? sourceInteraction.id;
        const submissionText = buildAdaptiveCardSubmissionText(normalized.actionTitle, normalized.cardId, sanitizedSubmissionData);
        const submissionBlock = buildAdaptiveCardSubmitBlock({
            cardId: normalized.cardId,
            sourcePostId: normalized.postId,
            title: normalized.actionTitle || undefined,
            data: sanitizedSubmissionData,
            submittedAt,
        });
        const forwardReq = new Request(`http://internal/agent/${DEFAULT_AGENT_ID}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: submissionText,
                thread_id: threadId,
                content_blocks: [submissionBlock],
            }),
        });
        const forwardRes = await handleAgentMessageRequest(this, forwardReq, `/agent/${DEFAULT_AGENT_ID}/message`, chatJid, DEFAULT_AGENT_ID);
        if (!forwardRes.ok) {
            return forwardRes;
        }
        const updatedInteraction = submitBehavior === "keep_active"
            ? null
            : replaceMessageContent(chatJid, normalized.postId, sourceInteraction.data?.content || "", {
                contentBlocks: updatedCardBlocks,
                linkPreviews: Array.isArray(sourceInteraction.data?.link_previews) ? sourceInteraction.data.link_previews : undefined,
                mediaIds: Array.isArray(sourceInteraction.data?.media_ids) ? sourceInteraction.data.media_ids : undefined,
            });
        if (updatedInteraction) {
            this.interactionBroadcaster.broadcastInteractionUpdated(updatedInteraction);
        }
        const responseBody = await forwardRes.json().catch(() => ({}));
        return this.json({
            ...responseBody,
            card_updated: Boolean(updatedInteraction),
            source_post_id: normalized.postId,
            card_id: normalized.cardId,
            card_state: submitBehavior === "keep_active" ? "active" : (updatedInteraction ? targetState : null),
            submitted_at: submittedAt,
        }, forwardRes.status);
    }
    async handleAgentMessage(req, pathname) {
        return handleAgentMessageRequest(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
    }
    async processChat(chatJid, agentId, threadRootId) {
        return processAgentChat(this, chatJid, agentId, threadRootId ?? undefined);
    }
    storeMessage(chatJid, content, isBot, mediaIds, options = {}) {
        return storeWebMessage(this, {
            chatJid,
            content,
            isBot,
            mediaIds,
            agentId: DEFAULT_AGENT_ID,
            agentName: ASSISTANT_NAME,
        }, {
            contentBlocks: options.contentBlocks,
            linkPreviews: options.linkPreviews,
            threadId: options.threadId ?? null,
            isTerminalAgentReply: options.isTerminalAgentReply,
            isSteeringMessage: options.isSteeringMessage,
        });
    }
    async handleRemote(req) {
        return this.remoteInterop.handleRequest(req);
    }
    async serveStatic(relPath) {
        return this.responses.serveStatic(relPath);
    }
    async serveDocsStatic(relPath) {
        return this.responses.serveDocsStatic(relPath);
    }
    json(data, status = 200) {
        return this.responses.json(data, status);
    }
    clampInt(value, fallback, min, max) {
        return this.responses.clampInt(value, fallback, min, max);
    }
    parseOptionalInt(value) {
        return this.responses.parseOptionalInt(value);
    }
}
