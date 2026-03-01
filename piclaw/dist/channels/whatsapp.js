import { mkdirSync } from "fs";
import { join } from "path";
import makeWASocket, { Browsers, DisconnectReason, makeCacheableSignalKeyStore, useMultiFileAuthState, } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import { ASSISTANT_NAME, STORE_DIR, WHATSAPP_PHONE } from "../core/config.js";
import { createUuid } from "../utils/ids.js";
// Minimal pino-compatible logger for baileys (it requires one)
const silentLogger = {
    level: "silent",
    child: () => silentLogger,
    trace: () => { },
    debug: () => { },
    info: () => { },
    warn: () => { },
    error: () => { },
    fatal: () => { },
};
const MAX_RECONNECT_ATTEMPTS = 5;
const BASE_RECONNECT_DELAY_MS = 2_000; // 2s, 4s, 8s, 16s, 32s
export class WhatsAppChannel {
    sock;
    connected = false;
    outgoingQueue = [];
    flushing = false;
    opts;
    pairingRequested = false;
    reconnectAttempts = 0;
    reconnectTimer = null;
    constructor(opts) {
        this.opts = {
            ...opts,
            phoneNumber: opts.phoneNumber || (WHATSAPP_PHONE || undefined),
        };
    }
    async connect() {
        return new Promise((resolve, reject) => {
            this.connectInternal(resolve).catch(reject);
        });
    }
    async connectInternal(onFirstOpen) {
        const authDir = join(STORE_DIR, "auth");
        mkdirSync(authDir, { recursive: true });
        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        this.sock = makeWASocket({
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, silentLogger) },
            logger: silentLogger,
            browser: Browsers.macOS("Chrome"),
        });
        this.sock.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect, qr } = update;
            if (connection === "open" && this.opts.phoneNumber && !state.creds.registered) {
                this.requestPairingCode().catch((err) => console.error("[whatsapp] Failed to request pairing code:", err));
            }
            if (qr && !this.opts.phoneNumber) {
                qrcode.generate(qr, { small: true }, (code) => {
                    console.log("\n" + code);
                    console.log("[whatsapp] Scan the QR code above to authenticate\n");
                });
            }
            if (connection === "close") {
                this.connected = false;
                this.pairingRequested = false;
                const reason = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = reason !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    this.reconnectAttempts++;
                    if (this.reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
                        console.error(`[whatsapp] Failed to reconnect after ${MAX_RECONNECT_ATTEMPTS} attempts, giving up.`);
                        if (onFirstOpen) {
                            onFirstOpen();
                            onFirstOpen = undefined;
                        }
                        return;
                    }
                    const delay = BASE_RECONNECT_DELAY_MS * Math.pow(2, this.reconnectAttempts - 1);
                    console.log(`[whatsapp] Disconnected (reason=${reason}), reconnecting in ${(delay / 1000).toFixed(1)}s ` +
                        `(attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
                    const pending = onFirstOpen;
                    onFirstOpen = undefined;
                    this.reconnectTimer = setTimeout(() => {
                        this.reconnectTimer = null;
                        this.connectInternal(pending).catch((err) => {
                            console.error("[whatsapp] Reconnect failed:", err);
                        });
                    }, delay);
                }
                else {
                    console.log("[whatsapp] Logged out. Re-authenticate to continue.");
                    process.exit(0);
                }
            }
            else if (connection === "open") {
                this.connected = true;
                this.reconnectAttempts = 0; // reset on successful connection
                console.log("[whatsapp] Connected");
                this.sock.sendPresenceUpdate("available").catch(() => { });
                this.flushOutgoingQueue().catch(console.error);
                if (onFirstOpen) {
                    onFirstOpen();
                    onFirstOpen = undefined;
                }
            }
        });
        this.sock.ev.on("creds.update", saveCreds);
        this.sock.ev.on("messages.upsert", async ({ messages }) => {
            for (const msg of messages) {
                if (!msg.message)
                    continue;
                const chatJid = msg.key.remoteJid;
                if (!chatJid || chatJid === "status@broadcast")
                    continue;
                const timestamp = new Date(Number(msg.messageTimestamp) * 1000).toISOString();
                const content = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || "";
                const sender = msg.key.participant || msg.key.remoteJid || "";
                const senderName = msg.pushName || sender.split("@")[0];
                const fromMe = msg.key.fromMe || false;
                const isBotMessage = content.startsWith(`${ASSISTANT_NAME}:`);
                const msgId = msg.key.id || createUuid("fallback");
                this.opts.onChatMetadata(chatJid, timestamp);
                // Skip non-text messages (images without captions, stickers, audio, etc.)
                if (!content)
                    continue;
                // Store messages from monitored chats (or any from-me message for auto-registration)
                const jids = this.opts.chatJids();
                if (jids.has(chatJid) || fromMe) {
                    this.opts.onMessage(chatJid, {
                        id: msgId,
                        chat_jid: chatJid,
                        sender,
                        sender_name: senderName,
                        content,
                        timestamp,
                        is_from_me: fromMe,
                        is_bot_message: isBotMessage,
                    });
                }
            }
        });
    }
    async sendMessage(jid, text) {
        const prefixed = `${ASSISTANT_NAME}: ${text}`;
        if (!this.connected) {
            this.outgoingQueue.push({ jid, text: prefixed });
            return;
        }
        try {
            await this.sock.sendMessage(jid, { text: prefixed });
        }
        catch {
            this.outgoingQueue.push({ jid, text: prefixed });
        }
    }
    isConnected() { return this.connected; }
    async disconnect() {
        this.connected = false;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.reconnectAttempts = 0;
        this.sock?.end(undefined);
    }
    async setTyping(jid, isTyping) {
        try {
            await this.sock.sendPresenceUpdate(isTyping ? "composing" : "paused", jid);
        }
        catch { }
    }
    async flushOutgoingQueue() {
        if (this.flushing || this.outgoingQueue.length === 0)
            return;
        this.flushing = true;
        try {
            while (this.outgoingQueue.length > 0) {
                const item = this.outgoingQueue.shift();
                await this.sock.sendMessage(item.jid, { text: item.text });
            }
        }
        finally {
            this.flushing = false;
        }
    }
    async requestPairingCode() {
        if (!this.opts.phoneNumber || this.pairingRequested)
            return;
        this.pairingRequested = true;
        try {
            const code = await this.sock.requestPairingCode(this.opts.phoneNumber);
            console.log("[whatsapp] Pairing code requested");
            if (code)
                this.opts.onPairingCode?.(code);
        }
        catch (err) {
            this.pairingRequested = false;
            throw err;
        }
    }
}
