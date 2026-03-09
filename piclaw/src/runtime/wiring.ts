/**
 * runtime/wiring.ts – Runtime message/scheduler wiring helpers.
 */

import { startIpcWatcher, type IpcDeps } from "../ipc.js";
import { startSchedulerLoop, type SchedulerDeps } from "../task-scheduler.js";

/** Minimal sender contract exposed to runtime worker wiring. */
export type RuntimeSenders = Pick<IpcDeps, "sendMessage" | "sendNudge">;

/** Optional sendMessage options accepted by web message dispatch. */
export type RuntimeSendMessageOptions = Parameters<RuntimeSenders["sendMessage"]>[2];

/** Web-channel capabilities required by runtime worker startup. */
export interface RuntimeWebWorkerChannel {
  sendMessage: RuntimeSenders["sendMessage"];
  resumeChat: (chatJid: string, threadRootId?: number | null) => void;
  resumePendingChats: (chatJid?: string) => void;
}

/** WhatsApp-channel capability required by runtime worker startup. */
export interface RuntimeWhatsAppWorkerChannel {
  sendMessage: (jid: string, text: string) => Promise<void>;
}

/** Optional Pushover-channel capability required by runtime worker startup. */
export interface RuntimePushoverWorkerChannel {
  sendMessage: (jid: string, text: string) => Promise<void>;
}

/** Agent-pool model resolution capability required by IPC update_task handling. */
export interface RuntimeModelResolver {
  resolveModelInput: NonNullable<IpcDeps["resolveModel"]>;
}

/** Build sendMessage/sendNudge closures for runtime workers. */
export function createRuntimeSenders(
  web: RuntimeWebWorkerChannel,
  whatsapp: RuntimeWhatsAppWorkerChannel,
  pushover: RuntimePushoverWorkerChannel | null
): RuntimeSenders {
  const sendMessage = async (jid: string, text: string, options?: RuntimeSendMessageOptions) => {
    if (jid.startsWith("web:")) {
      await web.sendMessage(jid, text, options);
      return;
    }
    await whatsapp.sendMessage(jid, text);
  };

  const sendNudge = pushover
    ? async (text: string) => {
        await pushover.sendMessage("", text).catch((err) =>
          console.error("[pushover] Failed to send nudge:", err)
        );
      }
    : undefined;

  return { sendMessage, sendNudge };
}

/** Start IPC and scheduler background workers with runtime callbacks. */
export function startRuntimeWorkers(
  queue: SchedulerDeps["queue"],
  agentPool: SchedulerDeps["agentPool"] & RuntimeModelResolver,
  web: RuntimeWebWorkerChannel,
  senders: RuntimeSenders
): void {
  startIpcWatcher({
    sendMessage: senders.sendMessage,
    sendNudge: senders.sendNudge,
    resolveModel: (input) => agentPool.resolveModelInput(input),
    resumeChat: async (data) => {
      const chatJid = typeof data.chatJid === "string" && data.chatJid.trim()
        ? data.chatJid.trim()
        : "web:default";
      const threadRootId = typeof data.threadRootId === "number" ? data.threadRootId : null;
      web.resumeChat(chatJid, threadRootId);
    },
    resumePending: async (data) => {
      const chatJid = typeof data?.chatJid === "string" && data.chatJid.trim()
        ? data.chatJid.trim()
        : undefined;
      web.resumePendingChats(chatJid);
    },
  });

  startSchedulerLoop({
    queue,
    agentPool,
    sendMessage: senders.sendMessage,
    sendNudge: senders.sendNudge,
  });
}
