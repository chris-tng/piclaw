/**
 * Shared attachment registry – tracks pending file attachments per chat.
 *
 * The attach_file extension tool registers attachments here; AgentPool
 * reads them via take() after a prompt completes.
 */
export class AttachmentRegistry {
    pending = new Map();
    register(chatJid, info) {
        const list = this.pending.get(chatJid) ?? [];
        list.push(info);
        this.pending.set(chatJid, list);
    }
    take(chatJid) {
        const list = this.pending.get(chatJid) ?? [];
        this.pending.delete(chatJid);
        return list;
    }
    clear(chatJid) {
        this.pending.delete(chatJid);
    }
}
// ── Module-level singleton ────────────────────────────────
// Shared between AgentPool and the file-attachments extension.
let _instance = null;
export function getAttachmentRegistry() {
    if (!_instance)
        _instance = new AttachmentRegistry();
    return _instance;
}
