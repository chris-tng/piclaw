import { extname, resolve } from "path";
const STATIC_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "web", "static");
const DOCS_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "docs");
const MIME_TYPES = {
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
export async function serveStatic(relPath, notFound) {
    const filePath = resolve(STATIC_DIR, relPath);
    if (!filePath.startsWith(STATIC_DIR))
        return notFound();
    const file = Bun.file(filePath);
    if (!(await file.exists()))
        return notFound();
    const contentType = MIME_TYPES[extname(filePath)] || "application/octet-stream";
    return new Response(file, {
        headers: {
            "Content-Type": contentType,
        },
    });
}
export async function serveDocsStatic(relPath, notFound) {
    const filePath = resolve(DOCS_DIR, relPath);
    if (!filePath.startsWith(DOCS_DIR))
        return notFound();
    const file = Bun.file(filePath);
    if (!(await file.exists()))
        return notFound();
    const contentType = MIME_TYPES[extname(filePath)] || "application/octet-stream";
    return new Response(file, {
        headers: {
            "Content-Type": contentType,
        },
    });
}
