/**
 * runtime/startup.ts – Runtime startup wiring helpers.
 */

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { AgentPool } from "../agent-pool.js";
import { WebChannel } from "../channels/web.js";
import { PushoverChannel } from "../channels/pushover.js";
import { WhatsAppChannel } from "../channels/whatsapp.js";
import {
  DATA_DIR,
  PUSHOVER_APP_TOKEN,
  PUSHOVER_DEVICE,
  PUSHOVER_PRIORITY,
  PUSHOVER_SOUND,
  PUSHOVER_USER_KEY,
  STORE_DIR,
  TOOL_OUTPUT_CLEANUP_INTERVAL_MS,
  TOOL_OUTPUT_RETENTION_DAYS,
  WHATSAPP_PHONE,
  WORKSPACE_DIR,
} from "../core/config.js";
import { initDatabase, storeChatMetadata, storeMessage } from "../db.js";
import type { AgentQueue } from "../queue.js";
import type { RuntimeState } from "./state.js";
import { startToolOutputCleanup } from "../tool-output.js";
import { createUuid } from "../utils/ids.js";
import { patchConsoleTimestamps } from "./console-timestamps.js";

/** Initialize directories, database, and persisted runtime state. */
export function initializeRuntimeEnvironment(state: RuntimeState): void {
  patchConsoleTimestamps();
  mkdirSync(STORE_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });
  mkdirSync(WORKSPACE_DIR, { recursive: true });

  initDatabase();
  startToolOutputCleanup(TOOL_OUTPUT_RETENTION_DAYS, TOOL_OUTPUT_CLEANUP_INTERVAL_MS);
  state.loadTimestamps();
  state.loadChats();
}

/** Start web channel and run crash-recovery/pending work bootstrap. */
export async function startWebChannel(queue: AgentQueue, agentPool: AgentPool): Promise<WebChannel> {
  const web = new WebChannel({ queue, agentPool });
  await web.start();
  web.recoverInflightRuns();
  web.resumePendingChats();
  return web;
}

/** Start optional Pushover channel if configured. */
export async function startOptionalPushoverChannel(): Promise<PushoverChannel | null> {
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
export function createWhatsAppChannel(state: RuntimeState): WhatsAppChannel {
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
      } catch (err) {
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
