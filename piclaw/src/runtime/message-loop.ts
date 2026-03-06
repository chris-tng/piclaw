/**
 * runtime/message-loop.ts – Core message processing and enqueue logic.
 *
 * Implements the main polling callback that:
 *   1. Fetches new messages since the last timestamp (via db/messages.ts).
 *   2. Detects whether each message is a control command (agent-control) or
 *      a regular user message.
 *   3. Formats messages into XML and enqueues agent runs on the AgentQueue.
 *   4. Delivers agent responses via the WhatsApp channel.
 *
 * Also provides the processChat() helper used by the web channel to inject
 * messages directly into the queue without going through the poll cycle.
 *
 * Consumers:
 *   - runtime.ts passes processMessages() to the polling timer.
 *   - channels/web.ts calls processChat() when a web-channel message arrives.
 */

import type { AgentPool } from "../agent-pool.js";
import type { AgentQueue } from "../queue.js";
import type { WhatsAppChannel } from "../channels/whatsapp.js";
import { getMessagesSince, getNewMessages } from "../db.js";
import { parseControlCommand, type AgentControlCommand } from "../agent-control/index.js";
import { detectChannel, formatMessages, formatOutbound } from "../router.js";
import type { RuntimeState } from "./state.js";

/**
 * Dependencies injected into the message-processing functions.
 * Provided by runtime.ts to avoid circular imports.
 */
export interface MessageProcessingDeps {
  agentPool: AgentPool;
  whatsapp: WhatsAppChannel;
  state: RuntimeState;
  assistantName: string;
  triggerPattern: RegExp;
}

/** Process pending messages for a single chat: send to agent, deliver response. */
export async function processMessages(chatJid: string, deps: MessageProcessingDeps): Promise<boolean> {
  const since = deps.state.lastAgentTimestamp[chatJid] || "";
  const messages = getMessagesSince(chatJid, since, deps.assistantName);
  if (messages.length === 0) return true;

  const commandQueue: Array<{ message: (typeof messages)[number]; command: AgentControlCommand }> = [];
  const promptMessages: typeof messages = [];

  for (const message of messages) {
    const command = !message.is_bot_message
      ? parseControlCommand(message.content, deps.triggerPattern)
      : null;
    if (command) {
      if (!deps.state.wasCommandProcessed(chatJid, message.id)) {
        commandQueue.push({ message, command });
      }
      continue;
    }
    promptMessages.push(message);
  }

  for (const { message, command } of commandQueue) {
    const result = await deps.agentPool.applyControlCommand(chatJid, command);
    await deps.whatsapp.sendMessage(chatJid, result.message);
    deps.state.markCommandProcessed(chatJid, message.id);
  }

  // Check trigger on non-command messages only
  const hasTrigger = promptMessages.some((m) => deps.triggerPattern.test(m.content.trim()));
  if (!hasTrigger) return true;

  const channel = detectChannel(chatJid);
  const prevCursor = deps.state.lastAgentTimestamp[chatJid] || "";
  deps.state.lastAgentTimestamp[chatJid] = messages[messages.length - 1].timestamp;
  deps.state.saveTimestamps();

  const stripTrigger = (text: string): string => {
    if (!text) return "";
    const flags = deps.triggerPattern.flags.includes("g")
      ? deps.triggerPattern.flags
      : `${deps.triggerPattern.flags}g`;
    const pattern = new RegExp(deps.triggerPattern.source, flags);
    return text.replace(pattern, " ").trim();
  };

  const lastPrompt = promptMessages[promptMessages.length - 1];
  const cleaned = lastPrompt ? stripTrigger(lastPrompt.content) : "";
  if (promptMessages.length === 1 && cleaned.startsWith("/")) {
    console.log(`[piclaw] Executing slash command from ${chatJid}`);
    await deps.whatsapp.setTyping(chatJid, true);
    const result = await deps.agentPool.applySlashCommand(chatJid, cleaned);
    await deps.whatsapp.setTyping(chatJid, false);

    if (result.message) {
      const text = formatOutbound(result.message, channel);
      if (text) await deps.whatsapp.sendMessage(chatJid, text);
    }

    if (result.status === "error") {
      console.error(`[piclaw] Agent error: ${result.message}`);
    }

    return true;
  }

  const prompt = formatMessages(promptMessages, channel);

  console.log(`[piclaw] Processing ${promptMessages.length} messages from ${chatJid}`);

  await deps.whatsapp.setTyping(chatJid, true);

  const output = await deps.agentPool.runAgent(prompt, chatJid, {
    onTurnComplete: async (turn) => {
      if (turn.text) {
        const text = formatOutbound(turn.text, channel);
        if (text) await deps.whatsapp.sendMessage(chatJid, text);
      }
    },
  });

  await deps.whatsapp.setTyping(chatJid, false);

  if (output.status === "error") {
    console.error(`[piclaw] Agent error: ${output.error}`);
    return true;
  }

  if (output.result) {
    const text = formatOutbound(output.result, channel);
    if (text) await deps.whatsapp.sendMessage(chatJid, text);
  }

  return true;
}

/** Dependencies for the message polling loop. */
export interface MessageLoopDeps {
  queue: AgentQueue;
  state: RuntimeState;
  assistantName: string;
  pollIntervalMs: number;
  processMessages: (chatJid: string) => Promise<boolean>;
}

/** Start the polling loop that checks for new messages across all chats. */
export async function runMessageLoop(deps: MessageLoopDeps): Promise<void> {
  console.log(`[piclaw] Running (trigger: @${deps.assistantName})`);
  while (true) {
    try {
      const jids = [...deps.state.chatJids];
      const { messages, newTimestamp } = getNewMessages(jids, deps.state.lastTimestamp, deps.assistantName);
      if (messages.length > 0) {
        deps.state.lastTimestamp = newTimestamp;
        deps.state.saveTimestamps();
        // Deduplicate by chat
        const byChat = new Map<string, boolean>();
        for (const msg of messages) byChat.set(msg.chat_jid, true);
        for (const chatJid of byChat.keys()) {
          deps.queue.enqueue(async () => {
            const ok = await deps.processMessages(chatJid);
            if (!ok) throw new Error(`Agent processing failed for ${chatJid}`);
          }, `chat:${chatJid}`);
        }
      }
    } catch (err) {
      console.error("[piclaw] Message loop error:", err);
    }
    await Bun.sleep(deps.pollIntervalMs);
  }
}
