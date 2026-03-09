/**
 * runtime/wiring.ts – Runtime message/scheduler wiring helpers.
 */

import { startIpcWatcher } from "../ipc.js";
import type { AgentQueue } from "../queue.js";
import { startSchedulerLoop } from "../task-scheduler.js";
import type { AgentPool } from "../agent-pool.js";
import type { PushoverChannel } from "../channels/pushover.js";
import type { WebChannel } from "../channels/web.js";
import type { WhatsAppChannel } from "../channels/whatsapp.js";

export type RuntimeSendMessageOptions = { forceRoot?: boolean; threadId?: number | null; source?: string };

export type RuntimeSenders = {
  sendMessage: (jid: string, text: string, options?: RuntimeSendMessageOptions) => Promise<void>;
  sendNudge?: (text: string) => Promise<void>;
};

/** Build sendMessage/sendNudge closures for runtime workers. */
export function createRuntimeSenders(
  web: WebChannel,
  whatsapp: WhatsAppChannel,
  pushover: PushoverChannel | null
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
  queue: AgentQueue,
  agentPool: AgentPool,
  web: WebChannel,
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
