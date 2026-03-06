/**
 * web/channel-state.ts – Persistent state for the web channel.
 *
 * After moving cursor positions and failed-run records into the `chat_cursors`
 * DB table (db/chat-cursors.ts), this class is responsible only for
 * transient per-chat agent status payloads that the UI polls for.
 *
 * agentStatuses is cleared on every startup (in loadState()), so its
 * persisted form is only ever used to clean up stale UI state from the
 * previous process – it is not relied upon for correctness.
 *
 * Consumers: channels/web.ts reads/writes state during agent run
 *            orchestration and SSE broadcasting.
 */
import { getRouterState, setRouterState } from "../../db.js";
/** Persistent per-chat state manager for the web channel. */
export class WebChannelState {
    stateKey;
    agentStatuses = {};
    queuedFollowupPlaceholders = new Map();
    constructor(stateKey) {
        this.stateKey = stateKey;
    }
    load() {
        const data = getRouterState(this.stateKey);
        try {
            const parsed = data ? JSON.parse(data) : {};
            this.agentStatuses =
                parsed && typeof parsed === "object" && typeof parsed.agentStatuses === "object"
                    ? parsed.agentStatuses
                    : {};
        }
        catch {
            this.agentStatuses = {};
        }
    }
    save() {
        setRouterState(this.stateKey, JSON.stringify({ agentStatuses: this.agentStatuses }));
    }
    setAgentStatus(chatJid, status) {
        if (!status) {
            delete this.agentStatuses[chatJid];
            return;
        }
        this.agentStatuses[chatJid] = status;
    }
    getAgentStatuses() {
        return { ...this.agentStatuses };
    }
    enqueueFollowupPlaceholder(chatJid, rowId) {
        const existing = this.queuedFollowupPlaceholders.get(chatJid) ?? [];
        existing.push(rowId);
        this.queuedFollowupPlaceholders.set(chatJid, existing);
    }
    consumeFollowupPlaceholder(chatJid) {
        const queue = this.queuedFollowupPlaceholders.get(chatJid);
        if (!queue || queue.length === 0)
            return null;
        const next = queue.shift() ?? null;
        if (!queue.length)
            this.queuedFollowupPlaceholders.delete(chatJid);
        return next;
    }
}
