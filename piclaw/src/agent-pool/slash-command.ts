import type { AgentSession } from "@mariozechner/pi-coding-agent";

import type { AgentControlResult } from "../agent-control/agent-control-types.js";
import { AGENT_TIMEOUT } from "../core/config.js";
import { detectChannel } from "../router.js";
import { withChatContext } from "../core/chat-context.js";

export async function executeSlashCommand(
  session: AgentSession,
  chatJid: string,
  rawText: string
): Promise<AgentControlResult> {
  const startTime = Date.now();
  try {
    console.log(`[agent-pool] Executing slash command for ${chatJid}: ${rawText}`);

    const trimmed = rawText.trim();
    if (!trimmed.startsWith("/")) {
      return { status: "error", message: "Not a slash command." };
    }

    const rawCommand = trimmed.slice(1);
    const spaceIndex = rawCommand.indexOf(" ");
    const commandName = spaceIndex === -1 ? rawCommand : rawCommand.slice(0, spaceIndex);

    const skills = session.resourceLoader.getSkills().skills;
    const templates = session.promptTemplates;
    const extensionRunner = session.extensionRunner;

    let known = false;
    if (rawCommand.startsWith("skill:")) {
      const skillName = rawCommand.slice(6).split(/\s+/)[0];
      known = skills.some((skill) => skill.name === skillName);
      if (!known) {
        return {
          status: "error",
          message: `Unknown skill: /skill:${skillName}. Use /commands to list available commands.`,
        };
      }
    } else if (templates.some((template) => template.name === commandName)) {
      known = true;
    } else if (extensionRunner?.getCommand(commandName)) {
      known = true;
    }

    if (!known) {
      return {
        status: "error",
        message: `Unknown command: /${commandName}. Use /commands to list available commands.`,
      };
    }

    // Collect textual output from events (both streaming deltas and final message_end)
    let assistantBuffer = "";
    const customBuffers: string[] = [];
    const capturedMessages: Array<{ role: string; text: string; customType?: string }> = [];

    const extractTextFromContent = (content: any): string => {
      if (!content) return "";
      if (typeof content === "string") return content;
      if (Array.isArray(content)) {
        return content
          .filter((b) => b && b.type === "text")
          .map((b) => b.text)
          .join("") || "";
      }
      return "";
    };

    const onEvent = (event: any) => {
      try {
        if (event.type === "message_update") {
          const me = event.assistantMessageEvent;
          if (me && me.type === "text_delta") {
            assistantBuffer += me.delta || "";
          }
        }
        if (event.type === "message_end") {
          const msg = event.message;
          const text = extractTextFromContent(msg.content);
          if (text) {
            capturedMessages.push({
              role: msg.role,
              text,
              customType: msg.customType,
            });
          }
          if (msg.role === "assistant") {
            assistantBuffer = text || assistantBuffer;
          } else if (msg.role === "custom" || msg.role === "toolResult" || msg.role === "user") {
            if (text) customBuffers.push(text);
          } else {
            if (text) customBuffers.push(text);
          }
        }
      } catch {
        // ignore
      }
    };

    const unsub = session.subscribe(onEvent);

    let timedOut = false;
    const timeoutId = setTimeout(async () => {
      timedOut = true;
      console.error(`[agent-pool] Slash command timeout after ${AGENT_TIMEOUT}ms for ${chatJid}`);
      try {
        await session.abort();
      } catch {}
    }, AGENT_TIMEOUT);

    const channel = detectChannel(chatJid);
    try {
      await withChatContext(chatJid, channel, async () => {
        await session.prompt(rawText);
      });
    } finally {
      clearTimeout(timeoutId);
      unsub();
    }

    if (timedOut) {
      return { status: "error", message: `Timed out after ${AGENT_TIMEOUT}ms` };
    }

    const finalText = (assistantBuffer && assistantBuffer.trim())
      ? assistantBuffer.trim()
      : customBuffers.join("\n\n").trim();
    const message = finalText || capturedMessages.map((m) => m.text).join("\n\n").trim();

    console.log(`[agent-pool] Slash command completed in ${Date.now() - startTime}ms (${message.length} chars)`);
    return { status: "success", message, messages: capturedMessages };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[agent-pool] Slash command error for ${chatJid}:`, message);
    return { status: "error", message };
  }
}
