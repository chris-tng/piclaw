/**
 * web/http/dispatch-agent.ts – Agent route dispatch helpers.
 */

import type { WebChannelLike } from "../web-channel-contracts.js";

/**
 * Handle /agent routes when the request matches; otherwise return null.
 */
export async function handleAgentRoutes(
  channel: WebChannelLike,
  req: Request,
  pathname: string,
  url: URL
): Promise<Response | null> {
  if (req.method === "GET" && pathname === "/agent/thought") {
    const turnId = url.searchParams.get("turn_id");
    const panel = url.searchParams.get("panel");
    return channel.handleThought(panel, turnId);
  }

  if (req.method === "POST" && pathname === "/agent/thought/visibility") {
    return await channel.handleThoughtVisibility(req);
  }

  if (req.method === "POST" && pathname.startsWith("/agent/") && pathname.endsWith("/message")) {
    return await channel.handleAgentMessage(req, pathname);
  }

  if (req.method === "GET" && pathname === "/agent/status") {
    return channel.handleAgentStatus(req);
  }

  if (req.method === "GET" && pathname === "/agent/context") {
    return await channel.handleAgentContext(req);
  }

  if (req.method === "GET" && pathname === "/agent/queue-state") {
    return await channel.handleAgentQueueState(req);
  }

  if (req.method === "POST" && pathname === "/agent/queue-remove") {
    return await channel.handleAgentQueueRemove(req);
  }

  if (req.method === "POST" && pathname === "/agent/queue-steer") {
    return await channel.handleAgentQueueSteer(req);
  }

  if (req.method === "GET" && pathname === "/agent/models") {
    return await channel.handleAgentModels(req);
  }

  if (req.method === "POST" && pathname === "/agent/respond") {
    return await channel.handleAgentRespond(req);
  }

  if (req.method === "POST" && pathname === "/agent/card-action") {
    return await channel.handleAdaptiveCardAction(req);
  }

  // /agent/whitelist — deprecated no-op stub, removed for security hygiene.
  if (req.method === "POST" && pathname === "/agent/whitelist") {
    return channel.json({ error: "Not found" }, 404);
  }

  return null;
}
