import { initTheme } from "@mariozechner/pi-coding-agent";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, WEB_HOST, WEB_IDLE_TIMEOUT, WEB_PORT, WEB_TLS_CERT, WEB_TLS_KEY } from "../core/config.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import { handleWorkspaceAttach, handleWorkspaceFile, handleWorkspaceRaw, handleWorkspaceTree, startWorkspaceWatcher } from "./web/handlers/workspace.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import { getMessageRowIdById, replaceMessageContent, } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { storeWebMessage } from "./web/message-store.js";
import { deletePostResponse, getHashtagResponse, getSearchResponse, getThreadResponse, getTimelineResponse, } from "./web/timeline-service.js";
import { getAgentsResponse } from "./web/agents-service.js";
import { broadcastAgentResponse, broadcastInteractionUpdated } from "./web/interaction-service.js";
const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";
export class WebChannel {
    queue;
    agentPool;
    server = null;
    state = new WebChannelState(STATE_KEY);
    sse = new SseHub();
    uiBridge;
    responses = new ResponseService();
    pendingLinkPreviews = new Set();
    workspaceWatcher = null;
    workspaceVisible = false;
    workspaceShowHidden = false;
    pendingSteering = new Map();
    thoughtBuffers = new Map();
    draftBuffers = new Map();
    expandedPanels = new Map();
    constructor(opts) {
        this.queue = opts.queue;
        this.agentPool = opts.agentPool;
        this.uiBridge = new UiBridge(this);
        if (typeof this.agentPool.setSessionBinder === "function") {
            this.agentPool.setSessionBinder((session, chatJid) => this.uiBridge.bindSession(session, chatJid));
        }
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
            fetch: (req) => this.handleRequest(req),
            ...(tls ? { tls } : {}),
        });
        this.workspaceWatcher = startWorkspaceWatcher(this);
        const scheme = tls ? "https" : "http";
        console.log(`[web] UI listening on ${scheme}://${WEB_HOST}:${WEB_PORT}`);
    }
    async stop() {
        this.sse.closeAll();
        this.uiBridge.stop();
        this.server?.stop(true);
        this.server = null;
        if (this.workspaceWatcher) {
            await this.workspaceWatcher.close();
            this.workspaceWatcher = null;
        }
    }
    async sendMessage(chatJid, text, threadId) {
        const interaction = this.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);
        if (interaction) {
            broadcastAgentResponse(this, interaction, ASSISTANT_NAME, ASSISTANT_AVATAR || null);
        }
    }
    queueFollowupPlaceholder(chatJid, text, threadId) {
        const interaction = this.storeMessage(chatJid, text, true, [], { threadId });
        if (!interaction)
            return null;
        this.state.enqueueFollowupPlaceholder(chatJid, interaction.id);
        broadcastAgentResponse(this, interaction, ASSISTANT_NAME, ASSISTANT_AVATAR || null);
        return interaction;
    }
    consumeQueuedFollowupPlaceholder(chatJid) {
        return this.state.consumeFollowupPlaceholder(chatJid);
    }
    queuePendingSteering(chatJid, timestamp) {
        if (!timestamp)
            return;
        const existing = this.pendingSteering.get(chatJid) ?? [];
        existing.push(timestamp);
        this.pendingSteering.set(chatJid, existing);
    }
    consumePendingSteering(chatJid) {
        const entries = this.pendingSteering.get(chatJid);
        if (!entries || entries.length === 0)
            return null;
        this.pendingSteering.delete(chatJid);
        entries.sort();
        return entries[entries.length - 1] ?? null;
    }
    replaceQueuedFollowupPlaceholder(chatJid, rowId, text, mediaIds, contentBlocks, threadId) {
        const updated = replaceMessageContent(chatJid, rowId, text, {
            contentBlocks,
            mediaIds,
        });
        if (!updated)
            return null;
        updated.data.agent_id = DEFAULT_AGENT_ID;
        if (threadId)
            updated.data.thread_id = threadId;
        broadcastInteractionUpdated(this, updated, ASSISTANT_NAME, ASSISTANT_AVATAR || null);
        return updated;
    }
    getThreadRootId(chatJid, messageId) {
        return getMessageRowIdById(chatJid, messageId);
    }
    loadState() {
        this.state.load();
    }
    saveState() {
        this.state.save();
    }
    setPanelExpanded(turnId, panel, expanded) {
        if (!turnId)
            return;
        const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
        current[panel] = expanded;
        if (!current.thought && !current.draft) {
            this.expandedPanels.delete(turnId);
        }
        else {
            this.expandedPanels.set(turnId, current);
        }
    }
    isPanelExpanded(turnId, panel) {
        return this.expandedPanels.get(turnId)?.[panel] ?? false;
    }
    updateThoughtBuffer(turnId, text, totalLines) {
        if (!turnId)
            return;
        this.thoughtBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
        this.pruneBuffers(this.thoughtBuffers);
    }
    updateDraftBuffer(turnId, text, totalLines) {
        if (!turnId)
            return;
        this.draftBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
        this.pruneBuffers(this.draftBuffers);
    }
    getBuffer(turnId, panel) {
        return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
    }
    pruneBuffers(map) {
        const limit = 50;
        if (map.size <= limit)
            return;
        const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
        for (let i = 0; i < entries.length - limit; i += 1) {
            map.delete(entries[i][0]);
        }
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
    async handleRequest(req) {
        const { RequestRouterService } = await import("./web/request-router-service.js");
        const router = new RequestRouterService(this);
        return router.handle(req);
    }
    async handleAgents() {
        const result = await getAgentsResponse(this.agentPool, {
            chatJid: DEFAULT_CHAT_JID,
            agentId: DEFAULT_AGENT_ID,
            agentName: ASSISTANT_NAME,
            agentAvatar: ASSISTANT_AVATAR || null,
        });
        return this.json(result.body, result.status);
    }
    async handleWorkspaceVisibility(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (typeof data.visible === "boolean") {
            this.workspaceVisible = data.visible;
        }
        else {
            this.workspaceVisible = Boolean(data.visible);
        }
        if (typeof data.show_hidden === "boolean") {
            this.workspaceShowHidden = data.show_hidden;
        }
        else if (typeof data.showHidden === "boolean") {
            this.workspaceShowHidden = data.showHidden;
        }
        return this.json({ status: "ok", visible: this.workspaceVisible, show_hidden: this.workspaceShowHidden });
    }
    handleTimeline(limit, before) {
        const result = getTimelineResponse(DEFAULT_CHAT_JID, limit, before);
        return this.json(result.body, result.status);
    }
    handleHashtag(tag, limit, offset) {
        const result = getHashtagResponse(DEFAULT_CHAT_JID, tag, limit, offset);
        return this.json(result.body, result.status);
    }
    handleSearch(query, limit, offset) {
        const result = getSearchResponse(DEFAULT_CHAT_JID, query, limit, offset);
        return this.json(result.body, result.status);
    }
    handleThread(id) {
        const result = getThreadResponse(DEFAULT_CHAT_JID, id);
        return this.json(result.body, result.status);
    }
    handleThought(panel, turnId) {
        if (!turnId)
            return this.json({ error: "Missing turn_id" }, 400);
        const normalized = panel === "draft" ? "draft" : "thought";
        const buffer = this.getBuffer(turnId, normalized);
        if (!buffer)
            return this.json({ error: "Thought not found" }, 404);
        return this.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
    }
    async handleThoughtVisibility(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        const turnId = (data.turn_id || data.turnId || "").trim();
        const panel = data.panel === "draft" ? "draft" : "thought";
        const expanded = Boolean(data.expanded);
        if (!turnId)
            return this.json({ error: "Missing turn_id" }, 400);
        this.setPanelExpanded(turnId, panel, expanded);
        return this.json({ status: "ok", turn_id: turnId, panel, expanded });
    }
    handleDeletePost(id, cascade = false) {
        const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
        if (result.deletedIds.length > 0) {
            this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
        }
        return this.json(result.body, result.status);
    }
    handleSse() {
        return this.sse.handleRequest();
    }
    broadcastEvent(eventType, data) {
        this.sse.broadcast(eventType, data);
    }
    async handlePost(req, isReply) {
        const { handlePost } = await import("./web/handlers/posts.js");
        return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
    }
    async handleAgentRespond(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (!data.request_id)
            return this.json({ error: "Missing request_id" }, 400);
        const status = this.uiBridge.handleUiResponse(data.request_id, data.outcome);
        return this.json(status);
    }
    async handleAgentMessage(req, pathname) {
        const { handleAgentMessage } = await import("./web/handlers/agent.js");
        return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
    }
    async processChat(chatJid, agentId, threadRootId) {
        const { processChat } = await import("./web/handlers/agent.js");
        return processChat(this, chatJid, agentId, threadRootId ?? undefined);
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
        });
    }
    async handleMediaUpload(req) {
        return handleMediaUpload(this, req);
    }
    handleMedia(id, thumbnail) {
        return handleMedia(this, id, thumbnail);
    }
    handleMediaInfo(id) {
        return handleMediaInfo(this, id);
    }
    handleWorkspaceTree(req) {
        return handleWorkspaceTree(this, req);
    }
    handleWorkspaceFile(req) {
        return handleWorkspaceFile(this, req);
    }
    handleWorkspaceRaw(req) {
        return handleWorkspaceRaw(this, req);
    }
    async handleWorkspaceAttach(req) {
        return handleWorkspaceAttach(this, req);
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
