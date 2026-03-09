/**
 * channels/web/content-endpoints.ts – timeline/search/thread/thought endpoint helpers.
 */

import {
  getHashtagResponse,
  getSearchResponse,
  getThreadResponse,
  getTimelineResponse,
} from "./timeline-service.js";

export interface ContentEndpointsContext {
  defaultChatJid: string;
  json(payload: unknown, status?: number): Response;
  getBuffer(
    turnId: string,
    panel: "thought" | "draft"
  ): { text: string; totalLines: number; updatedAt: number } | undefined;
}

export function handleTimelineRequest(
  limit: number,
  before: number | undefined,
  ctx: ContentEndpointsContext
): Response {
  const result = getTimelineResponse(ctx.defaultChatJid, limit, before);
  return ctx.json(result.body, result.status);
}

export function handleHashtagRequest(
  tag: string,
  limit: number,
  offset: number,
  ctx: ContentEndpointsContext
): Response {
  const result = getHashtagResponse(ctx.defaultChatJid, tag, limit, offset);
  return ctx.json(result.body, result.status);
}

export function handleSearchRequest(
  query: string,
  limit: number,
  offset: number,
  ctx: ContentEndpointsContext
): Response {
  const result = getSearchResponse(ctx.defaultChatJid, query, limit, offset);
  return ctx.json(result.body, result.status);
}

export function handleThreadRequest(id: number | null, ctx: ContentEndpointsContext): Response {
  const result = getThreadResponse(ctx.defaultChatJid, id);
  return ctx.json(result.body, result.status);
}

export function handleThoughtRequest(
  panel: string | null,
  turnId: string | null,
  ctx: ContentEndpointsContext
): Response {
  if (!turnId) return ctx.json({ error: "Missing turn_id" }, 400);
  const normalized = panel === "draft" ? "draft" : "thought";
  const buffer = ctx.getBuffer(turnId, normalized);
  if (!buffer) return ctx.json({ error: "Thought not found" }, 404);
  return ctx.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
}
