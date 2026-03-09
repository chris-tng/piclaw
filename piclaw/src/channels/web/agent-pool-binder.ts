/**
 * channels/web/agent-pool-binder.ts – safely bind UI session bridge to AgentPool.
 */

import type { AgentPool } from "../../agent-pool.js";
import type { AgentSession } from "@mariozechner/pi-coding-agent";

type SessionBinder = (session: AgentSession, chatJid: string) => Promise<void> | void;

interface SessionBinderCapable {
  setSessionBinder(binder?: SessionBinder): void;
}

function hasSessionBinder(agentPool: AgentPool): agentPool is AgentPool & SessionBinderCapable {
  const candidate = agentPool as AgentPool & Partial<SessionBinderCapable>;
  return typeof candidate.setSessionBinder === "function";
}

export function bindWebUiSessionBinder(agentPool: AgentPool, binder: SessionBinder): void {
  if (!hasSessionBinder(agentPool)) return;
  agentPool.setSessionBinder(binder);
}
