import { statSync, readdirSync, readFileSync } from "fs";
import path from "path";
import type { WebChannel } from "../../web.js";
import { WORKSPACE_DIR } from "../../../config.js";
import { createMedia } from "../../../db.js";

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "output",
  ".cache",
  ".venv",
  ".piclaw",
  "tmp",
  "coverage",
]);

const MAX_TREE_ENTRIES = 2000;
const MAX_PREVIEW_BYTES = 64 * 1024;
const MAX_ATTACH_BYTES = 25 * 1024 * 1024;

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const TEXT_EXTS = new Set([
  ".md", ".txt", ".log", ".json", ".yaml", ".yml", ".toml", ".ini", ".conf",
  ".js", ".ts", ".tsx", ".jsx", ".css", ".html", ".sh", ".py", ".go", ".rs",
  ".c", ".cpp", ".h", ".hpp", ".java", ".kt", ".swift", ".sql",
]);

function resolveWorkspacePath(input: string | null): string | null {
  const raw = (input || "").trim();
  const resolved = path.resolve(WORKSPACE_DIR, raw);
  const rel = path.relative(WORKSPACE_DIR, resolved);
  if (!rel || rel === ".") return WORKSPACE_DIR;
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  return resolved;
}

function toRelativePath(absPath: string): string {
  const rel = path.relative(WORKSPACE_DIR, absPath) || ".";
  return rel.split(path.sep).join("/");
}

function contentTypeForPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".md":
      return "text/markdown";
    case ".txt":
    case ".log":
    case ".conf":
    case ".ini":
      return "text/plain";
    case ".json":
      return "application/json";
    case ".yaml":
    case ".yml":
      return "text/yaml";
    case ".toml":
      return "text/toml";
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".ts":
    case ".tsx":
      return "text/typescript";
    case ".jsx":
      return "text/jsx";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

function isTextFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXTS.has(ext);
}

function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

function formatMtime(stats: { mtime?: Date }): string | null {
  if (!stats.mtime) return null;
  return stats.mtime.toISOString();
}

function shouldExcludeDir(name: string): boolean {
  return EXCLUDE_DIRS.has(name);
}

function buildTree(absPath: string, depth: number, state: { count: number; truncated: boolean }): any {
  const stats = statSync(absPath);
  const node = {
    name: path.basename(absPath) || "workspace",
    path: toRelativePath(absPath),
    type: stats.isDirectory() ? "dir" : "file",
    size: stats.isDirectory() ? null : stats.size,
    mtime: formatMtime(stats),
    children: [] as any[] | undefined,
  };

  state.count += 1;
  if (state.count > MAX_TREE_ENTRIES) {
    state.truncated = true;
    node.children = undefined;
    return node;
  }

  if (!stats.isDirectory() || depth <= 0) {
    node.children = undefined;
    return node;
  }

  const entries = readdirSync(absPath, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith(".") || entry.name === ".piclaw")
    .filter((entry) => !entry.isDirectory() || !shouldExcludeDir(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  node.children = [];
  for (const entry of entries) {
    if (state.count >= MAX_TREE_ENTRIES) {
      state.truncated = true;
      break;
    }
    const childPath = path.join(absPath, entry.name);
    try {
      node.children.push(buildTree(childPath, depth - 1, state));
    } catch {
      // ignore unreadable paths
    }
  }

  return node;
}

function detectBinary(buffer: Uint8Array): boolean {
  const max = Math.min(buffer.length, 4096);
  for (let i = 0; i < max; i += 1) {
    if (buffer[i] === 0) return true;
  }
  return false;
}

export function handleWorkspaceTree(_channel: WebChannel, req: Request): Response {
  const url = new URL(req.url);
  const targetPath = resolveWorkspacePath(url.searchParams.get("path"));
  if (!targetPath) return new Response(JSON.stringify({ error: "Invalid path" }), { status: 400 });

  const depthRaw = parseInt(url.searchParams.get("depth") || "2", 10);
  const depth = Number.isFinite(depthRaw) ? Math.min(Math.max(depthRaw, 1), 6) : 2;

  try {
    const state = { count: 0, truncated: false };
    const tree = buildTree(targetPath, depth, state);
    return new Response(JSON.stringify({ root: tree, truncated: state.truncated }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to read workspace" }), { status: 500 });
  }
}

export function handleWorkspaceFile(_channel: WebChannel, req: Request): Response {
  const url = new URL(req.url);
  const targetPath = resolveWorkspacePath(url.searchParams.get("path"));
  if (!targetPath) return new Response(JSON.stringify({ error: "Invalid path" }), { status: 400 });

  try {
    const stats = statSync(targetPath);
    if (stats.isDirectory()) {
      return new Response(JSON.stringify({ error: "Path is a directory" }), { status: 400 });
    }

    const relPath = toRelativePath(targetPath);
    const contentType = contentTypeForPath(targetPath);
    const isImage = isImageFile(targetPath);

    if (isImage) {
      const rawUrl = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
      return new Response(
        JSON.stringify({
          path: relPath,
          name: path.basename(targetPath),
          kind: "image",
          content_type: contentType,
          size: stats.size,
          mtime: formatMtime(stats),
          url: rawUrl,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const maxParam = parseInt(url.searchParams.get("max") || "", 10);
    const maxBytes = Number.isFinite(maxParam) ? Math.min(Math.max(maxParam, 1024), MAX_PREVIEW_BYTES) : 20000;
    const buffer = readFileSync(targetPath, { encoding: null }) as Buffer;
    const slice = buffer.subarray(0, maxBytes);
    const truncated = buffer.length > maxBytes;

    if (!isTextFile(targetPath) && detectBinary(slice)) {
      return new Response(
        JSON.stringify({
          path: relPath,
          name: path.basename(targetPath),
          kind: "binary",
          content_type: contentType,
          size: stats.size,
          mtime: formatMtime(stats),
          truncated,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    let text = slice.toString("utf-8");
    if (path.extname(targetPath).toLowerCase() === ".json") {
      try {
        text = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // keep raw
      }
    }

    return new Response(
      JSON.stringify({
        path: relPath,
        name: path.basename(targetPath),
        kind: "text",
        content_type: contentType,
        size: stats.size,
        mtime: formatMtime(stats),
        text,
        truncated,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Failed to read file" }), { status: 500 });
  }
}

export function handleWorkspaceRaw(_channel: WebChannel, req: Request): Response {
  const url = new URL(req.url);
  const targetPath = resolveWorkspacePath(url.searchParams.get("path"));
  if (!targetPath) return new Response("Invalid path", { status: 400 });

  try {
    const stats = statSync(targetPath);
    if (stats.isDirectory()) return new Response("Path is a directory", { status: 400 });
    const contentType = contentTypeForPath(targetPath);
    const file = Bun.file(targetPath);
    return new Response(file, { headers: { "Content-Type": contentType } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export async function handleWorkspaceAttach(_channel: WebChannel, req: Request): Promise<Response> {
  let data: { path?: string };
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const targetPath = resolveWorkspacePath(data.path || null);
  if (!targetPath) return new Response(JSON.stringify({ error: "Invalid path" }), { status: 400 });

  try {
    const stats = statSync(targetPath);
    if (stats.isDirectory()) return new Response(JSON.stringify({ error: "Path is a directory" }), { status: 400 });
    if (stats.size > MAX_ATTACH_BYTES) {
      return new Response(JSON.stringify({ error: "File too large to attach" }), { status: 400 });
    }

    const dataBuf = readFileSync(targetPath);
    const filename = path.basename(targetPath);
    const contentType = contentTypeForPath(targetPath);
    const mediaId = createMedia(filename, contentType, new Uint8Array(dataBuf), null, {
      size: stats.size,
      kind: "file",
      source_path: targetPath,
    });

    return new Response(
      JSON.stringify({
        media_id: mediaId,
        filename,
        size: stats.size,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Failed to attach file" }), { status: 500 });
  }
}
