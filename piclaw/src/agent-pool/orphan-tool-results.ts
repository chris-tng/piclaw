/**
 * agent-pool/orphan-tool-results.ts – Prunes stale tool-result messages from session state.
 *
 * When historical toolResult entries no longer have matching assistant toolCall
 * blocks, downstream provider payloads can bloat or reference invalid tool-call IDs.
 * This helper removes orphaned tool results defensively before a new prompt run.
 */

import type { AgentSession } from "@mariozechner/pi-coding-agent";

interface AgentContentBlock {
  type?: unknown;
  id?: unknown;
}

interface AgentMessageRecord {
  role?: unknown;
  content?: unknown;
  toolCallId?: unknown;
}

interface SessionWithInternalAgent {
  agent?: {
    state?: {
      messages?: AgentMessageRecord[];
    };
    replaceMessages?: (messages: AgentMessageRecord[]) => void;
  };
}

/** Remove toolResult entries that no longer correspond to assistant tool calls. */
export function pruneOrphanToolResults(session: AgentSession, chatJid: string): void {
  const internalSession = session as unknown as SessionWithInternalAgent;
  const messages = internalSession.agent?.state?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return;

  const toolCallIds = new Set<string>();
  for (const msg of messages) {
    if (msg?.role !== "assistant" || !Array.isArray(msg.content)) continue;
    for (const block of msg.content) {
      const contentBlock = block as AgentContentBlock;
      if (contentBlock?.type === "toolCall" && typeof contentBlock.id === "string") {
        toolCallIds.add(contentBlock.id);
      }
    }
  }

  const shouldKeepToolResult = (msg: AgentMessageRecord) => {
    if (msg?.role !== "toolResult") return true;
    if (toolCallIds.size === 0) return false;
    const id = msg.toolCallId;
    return typeof id === "string" && toolCallIds.has(id);
  };

  const pruned = messages.filter(shouldKeepToolResult);

  if (pruned.length !== messages.length) {
    try {
      internalSession.agent?.replaceMessages?.(pruned);
      console.warn(`[agent-pool] Pruned ${messages.length - pruned.length} orphan tool result(s) for ${chatJid}`);
    } catch (err) {
      console.warn(`[agent-pool] Failed to prune orphan tool results for ${chatJid}:`, err);
    }
  }
}
