/**
 * web/http/static.ts – Static file serving for the web UI.
 *
 * Serves the bundled HTML, CSS, JS, and font files from the web/static
 * directory. Handles content-type detection and caching headers.
 *
 * Consumers: web/http/response-service.ts and web/request-router.ts.
 */

import { extname, resolve } from "path";

const STATIC_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "web", "static");
const DOCS_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "docs");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

/** Serve a static file from the web/static directory. */
export async function serveStatic(relPath: string, notFound: () => Response): Promise<Response> {
  const filePath = resolve(STATIC_DIR, relPath);
  if (!filePath.startsWith(STATIC_DIR)) return notFound();

  const file = Bun.file(filePath);
  if (!(await file.exists())) return notFound();

  const ext = extname(filePath);
  const contentType = relPath.endsWith("manifest.json")
    ? "application/manifest+json; charset=utf-8"
    : MIME_TYPES[ext] || "application/octet-stream";

  // HTML: never cache so new deploys are picked up on next load.
  // Dist bundles (JS/CSS): short cache, browser revalidates each visit.
  // Everything else (fonts, icons, vendor libs): 1 hour cache.
  const cacheControl =
    ext === ".html"
      ? "no-cache, no-store, must-revalidate"
      : relPath.includes("/dist/")
        ? "public, max-age=300, must-revalidate"
        : "public, max-age=3600";

  return new Response(file, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });
}

/** Serve a static file from the docs directory. */
export async function serveDocsStatic(relPath: string, notFound: () => Response): Promise<Response> {
  const filePath = resolve(DOCS_DIR, relPath);
  if (!filePath.startsWith(DOCS_DIR)) return notFound();

  const file = Bun.file(filePath);
  if (!(await file.exists())) return notFound();

  const contentType = MIME_TYPES[extname(filePath)] || "application/octet-stream";
  return new Response(file, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
