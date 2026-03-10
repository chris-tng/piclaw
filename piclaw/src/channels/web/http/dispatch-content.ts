/**
 * web/http/dispatch-content.ts – Timeline/post/search/thread route dispatch helpers.
 */

import type { WebChannel } from "../../web.js";

/**
 * Handle primary content routes when the request matches; otherwise return null.
 */
export async function handleContentPrimaryRoutes(
  channel: WebChannel,
  req: Request,
  pathname: string,
  url: URL
): Promise<Response | null> {
  if (req.method === "GET" && pathname === "/timeline") {
    const limit = channel.clampInt(url.searchParams.get("limit"), 10, 1, 100);
    const before = channel.parseOptionalInt(url.searchParams.get("before"));
    return channel.handleTimeline(limit, before ?? undefined);
  }

  if (req.method === "GET" && pathname.startsWith("/hashtag/")) {
    const tag = decodeURIComponent(pathname.replace("/hashtag/", ""));
    const limit = channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
    const offset = channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
    return channel.handleHashtag(tag, limit, offset);
  }

  if (req.method === "GET" && pathname === "/search") {
    const query = (url.searchParams.get("q") || "").trim();
    const limit = channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
    const offset = channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
    return channel.handleSearch(query, limit, offset);
  }

  if (req.method === "POST" && pathname === "/post") {
    return await channel.handlePost(req, false);
  }

  if (req.method === "POST" && pathname === "/reply") {
    return await channel.handlePost(req, true);
  }

  if (req.method === "PATCH" && pathname.startsWith("/post/")) {
    const id = channel.parseOptionalInt(pathname.replace("/post/", ""));
    return await channel.handleUpdatePost(req, id);
  }

  if (req.method === "GET" && pathname.startsWith("/thread/")) {
    const id = channel.parseOptionalInt(pathname.replace("/thread/", ""));
    return channel.handleThread(id);
  }

  return null;
}

/**
 * Handle late content routes that currently run after agent dispatch.
 */
export async function handleContentSecondaryRoutes(
  channel: WebChannel,
  req: Request,
  pathname: string,
  url: URL
): Promise<Response | null> {
  if (req.method === "DELETE" && pathname.startsWith("/post/")) {
    const id = channel.parseOptionalInt(pathname.replace("/post/", ""));
    const cascade = url.searchParams.get("cascade") === "true" || url.searchParams.get("cascade") === "1";
    return channel.handleDeletePost(id, cascade);
  }

  if (req.method === "POST" && pathname === "/internal/post") {
    return await channel.handleInternalPost(req);
  }

  return null;
}
