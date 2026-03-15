/**
 * runtime/startup.ts – Runtime startup wiring helpers.
 */
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { WebChannel } from "../channels/web.js";
import { PushoverChannel } from "../channels/pushover.js";
import { WhatsAppChannel } from "../channels/whatsapp.js";
import { setMessagesPostFn } from "../extensions/messages-crud.js";
import { DATA_DIR, PUSHOVER_APP_TOKEN, PUSHOVER_DEVICE, PUSHOVER_PRIORITY, PUSHOVER_SOUND, PUSHOVER_USER_KEY, STORE_DIR, TOOL_OUTPUT_CLEANUP_INTERVAL_MS, TOOL_OUTPUT_RETENTION_DAYS, WHATSAPP_PHONE, WORKSPACE_DIR, } from "../core/config.js";
import { initDatabase, storeChatMetadata, storeMessage } from "../db.js";
import { startToolOutputCleanup } from "../tool-output.js";
import { createUuid } from "../utils/ids.js";
import { patchConsoleTimestamps } from "./console-timestamps.js";
/** Initialize directories, database, and persisted runtime state. */
export function initializeRuntimeEnvironment(state) {
    patchConsoleTimestamps();
    mkdirSync(STORE_DIR, { recursive: true });
    mkdirSync(DATA_DIR, { recursive: true });
    mkdirSync(WORKSPACE_DIR, { recursive: true });
    initDatabase();
    startToolOutputCleanup(TOOL_OUTPUT_RETENTION_DAYS, TOOL_OUTPUT_CLEANUP_INTERVAL_MS);
    state.loadTimestamps();
    state.loadChats();
}
/** Start web channel and run immediate crash-recovery bootstrap. */
export async function startWebChannel(queue, agentPool) {
    const web = new WebChannel({ queue, agentPool });
    await web.start();
    web.recoverInflightRuns();
    // Wire the messages tool post action to use the web channel for broadcast.
    setMessagesPostFn((chatJid, content, isBot, mediaIds, contentBlocks) => {
        const interaction = web.storeMessage(chatJid, content, isBot, mediaIds, {
            contentBlocks,
        });
        if (!interaction)
            return null;
        web.broadcastEvent("new_post", interaction);
        return interaction.id;
    });
    return web;
}
/**
 * Queue a self-addressed IPC task to resume pending chats once background
 * workers and external channels are fully online.
 */
export function queueStartupResumePendingIpc() {
    try {
        const tasksDir = join(DATA_DIR, "ipc", "tasks");
        mkdirSync(tasksDir, { recursive: true });
        const alreadyQueued = readdirSync(tasksDir).some((file) => file.startsWith("resume_pending_"));
        if (alreadyQueued) {
            console.log("[startup] resume_pending IPC already queued; skipping duplicate startup resume.");
            return;
        }
        const payload = {
            type: "resume_pending",
            chatJid: "all",
            reason: "startup",
        };
        const filePath = join(tasksDir, `resume_pending_${createUuid("startup")}.json`);
        writeFileSync(filePath, JSON.stringify(payload));
        console.log(`[startup] Queued startup resume_pending IPC: ${filePath}`);
    }
    catch (err) {
        console.error("[startup] Failed to queue resume_pending IPC:", err);
    }
}
/** Start optional Pushover channel if configured. */
export async function startOptionalPushoverChannel() {
    if (!PUSHOVER_APP_TOKEN || !PUSHOVER_USER_KEY) {
        return null;
    }
    const pushover = new PushoverChannel({
        appToken: PUSHOVER_APP_TOKEN,
        userKey: PUSHOVER_USER_KEY,
        device: PUSHOVER_DEVICE || undefined,
        priority: PUSHOVER_PRIORITY,
        sound: PUSHOVER_SOUND || undefined,
    });
    await pushover.start();
    return pushover;
}
/** Build WhatsApp channel with runtime callbacks and pairing IPC integration. */
export function createWhatsAppChannel(state) {
    if (!WHATSAPP_PHONE) {
        // Return a no-op stub when WhatsApp is not configured.
        // The runtime expects a whatsapp object with connect/disconnect/sendMessage/setTyping.
        return {
            connect: async () => { },
            disconnect: async () => { },
            sendMessage: async () => { },
            setTyping: async () => { },
            isConnected: () => false,
        };
    }
    return new WhatsAppChannel({
        chatJids: () => state.chatJids,
        phoneNumber: WHATSAPP_PHONE || undefined,
        onPairingCode: (code) => {
            try {
                const ipcDir = join(DATA_DIR, "ipc", "messages");
                mkdirSync(ipcDir, { recursive: true });
                const payload = {
                    type: "message",
                    chatJid: "web:default",
                    text: code,
                };
                const filePath = join(ipcDir, `${createUuid("pairing")}.json`);
                writeFileSync(filePath, JSON.stringify(payload));
            }
            catch (err) {
                console.error("[whatsapp] Failed to write pairing code IPC message:", err);
            }
        },
        onMessage: (chatJid, msg) => {
            if (!state.chatJids.has(chatJid) && msg.is_from_me) {
                state.chatJids.add(chatJid);
                state.saveChats();
            }
            storeMessage(msg);
        },
        onChatMetadata: (chatJid, timestamp) => storeChatMetadata(chatJid, timestamp),
    });
}
