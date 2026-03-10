/**
 * web/http/dispatch-shell.ts – Shell/static/avatar route dispatch helpers.
 */

import type { WebChannel } from "../../web.js";
import type { RouteFlags } from "./route-flags.js";

/** Static asset serving function signature used by shell-route dispatcher. */
export type ServeStaticAsset = (req: Request, relPath: string) => Promise<Response>;

/**
 * Handle shell/static/avatar routes when the request matches; otherwise return null.
 */
export async function handleShellRoutes(
  channel: WebChannel,
  req: Request,
  pathname: string,
  flags: RouteFlags,
  serveStaticAsset: ServeStaticAsset
): Promise<Response | null> {
  if (flags.isIndex) {
    return channel.serveStatic("index.html");
  }

  if (flags.isManifest) {
    return channel.handleManifest(req);
  }

  if (flags.isFavicon) {
    const avatarResp = await channel.handleAvatar("agent", req);
    if (avatarResp.status === 200) return avatarResp;
    return await serveStaticAsset(req, "favicon.ico");
  }

  if (flags.isAppleIcon) {
    const avatarResp = await channel.handleAvatar("agent", req);
    if (avatarResp.status === 200) return avatarResp;
    return await serveStaticAsset(req, pathname.slice(1));
  }

  if (flags.isStaticAsset) {
    const rel = pathname.replace("/static/", "");
    return channel.serveStatic(rel);
  }

  if (flags.isDocsAsset) {
    const rel = pathname.replace("/docs/", "");
    return channel.serveDocsStatic(rel);
  }

  if (pathname === "/sse/stream") {
    return channel.handleSse();
  }

  if (req.method === "GET" && pathname === "/agents") {
    return await channel.handleAgents();
  }

  if (flags.isAvatar) {
    return await channel.handleAvatar("agent", req);
  }

  if (flags.isGetOrHead && pathname === "/avatar/user") {
    return await channel.handleAvatar("user", req);
  }

  return null;
}
