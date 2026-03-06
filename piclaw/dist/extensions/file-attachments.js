/**
 * file-attachments – registers the attach_file tool as an extension.
 *
 * The tool stores a file from the workspace as a media blob and registers
 * it with the shared AttachmentRegistry so the AgentPool can include
 * attachment metadata in the response.
 *
 * Reads the current chat JID from AsyncLocalStorage/env at execution time.
 */
import { basename, resolve, relative } from "path";
import { Type } from "@sinclair/typebox";
import { createMedia, getMediaById } from "../db.js";
import { WORKSPACE_DIR } from "../core/config.js";
import { getAttachmentRegistry } from "../agent-pool/attachments.js";
import { getChatJid } from "../core/chat-context.js";
// ── Schema ────────────────────────────────────────────────
const AttachmentSchema = Type.Object({
    path: Type.String({ description: "Path to a file inside the workspace." }),
    name: Type.Optional(Type.String({ description: "Optional display name for the attachment." })),
    content_type: Type.Optional(Type.String({ description: "Optional MIME type override." })),
    kind: Type.Optional(Type.Union([Type.Literal("image"), Type.Literal("file")], { description: "Force attachment kind." })),
});
const ReadAttachmentSchema = Type.Object({
    id: Type.Number({ description: "Attachment (media) ID to load." }),
    mode: Type.Optional(Type.Union([Type.Literal("auto"), Type.Literal("text"), Type.Literal("image"), Type.Literal("base64")], { description: "How to return the attachment content." })),
    max_bytes: Type.Optional(Type.Number({ description: "Max bytes to read (default 5 MB)." })),
});
const ExportAttachmentSchema = Type.Object({
    id: Type.Number({ description: "Attachment (media) ID to export." }),
    filename: Type.Optional(Type.String({ description: "Optional filename override." })),
});
// ── Helpers ───────────────────────────────────────────────
function resolveWorkspacePath(inputPath) {
    if (!inputPath)
        return null;
    const resolved = resolve(WORKSPACE_DIR, inputPath);
    const rel = relative(WORKSPACE_DIR, resolved);
    if (rel.startsWith("..") || rel.startsWith("/"))
        return null;
    return resolved;
}
function detectContentType(path, fallback) {
    if (fallback)
        return fallback;
    try {
        const file = Bun.file(path);
        if (file.type)
            return file.type;
    }
    catch { /* ignore */ }
    return "application/octet-stream";
}
function isTextContentType(contentType) {
    if (!contentType)
        return false;
    if (contentType.startsWith("text/"))
        return true;
    return /json|xml|yaml|x-www-form-urlencoded|csv|markdown|javascript|typescript/i.test(contentType);
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes))
        return "0 B";
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function buildExportPath(id, filename) {
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    return resolve("/workspace/tmp", `${id}-${safeName}`);
}
// ── Tool execute ──────────────────────────────────────────
async function execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
    const resolved = resolveWorkspacePath(params.path);
    if (!resolved) {
        return { content: [{ type: "text", text: "Attachment path must be inside the workspace." }], details: {} };
    }
    const file = Bun.file(resolved);
    if (!(await file.exists())) {
        return { content: [{ type: "text", text: `File not found: ${params.path}` }], details: {} };
    }
    const data = new Uint8Array(await file.arrayBuffer());
    const filename = params.name || basename(resolved);
    const contentType = detectContentType(resolved, params.content_type);
    const size = file.size;
    const kind = params.kind || (contentType.startsWith("image/") ? "image" : "file");
    const mediaId = createMedia(filename, contentType, data, null, { size, source_path: resolved, kind });
    const registry = getAttachmentRegistry();
    registry.register(getChatJid("web:default"), {
        id: mediaId,
        name: filename,
        contentType,
        size,
        kind,
        sourcePath: resolved,
    });
    return {
        content: [{ type: "text", text: `Attached "${filename}" (${Math.round(size / 1024)} KB). A download card will appear in the chat automatically.` }],
        details: { filename, content_type: contentType, size, kind },
    };
}
async function executeReadAttachment(_toolCallId, params) {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) {
        return { content: [{ type: "text", text: "Attachment id must be a positive number." }], details: {} };
    }
    const record = getMediaById(id);
    if (!record) {
        return { content: [{ type: "text", text: `No attachment found for id ${id}.` }], details: {} };
    }
    const contentType = record.content_type || "application/octet-stream";
    const filename = record.filename || `attachment-${id}`;
    const size = record.data?.length || 0;
    const maxBytes = Number.isFinite(params.max_bytes) ? Math.max(1, params.max_bytes) : 5 * 1024 * 1024;
    const mode = (params.mode || "auto").toLowerCase();
    const isImage = contentType.startsWith("image/");
    const isText = isTextContentType(contentType);
    if (mode === "image" || (mode === "auto" && isImage)) {
        if (size > maxBytes) {
            return {
                content: [{ type: "text", text: `Attachment ${filename} is ${formatBytes(size)}. Increase max_bytes to load the full image.` }],
                details: { id, filename, content_type: contentType, size, truncated: true },
            };
        }
        const encoded = Buffer.from(record.data).toString("base64");
        return {
            content: [
                { type: "text", text: `Attachment ${filename} (${formatBytes(size)})` },
                { type: "image", data: encoded, mimeType: contentType },
            ],
            details: { id, filename, content_type: contentType, size, mode: "image" },
        };
    }
    const slice = record.data.slice(0, maxBytes);
    const truncated = size > maxBytes;
    if (mode === "text" || (mode === "auto" && isText)) {
        const text = new TextDecoder().decode(slice);
        const suffix = truncated ? `\n\n[truncated to ${formatBytes(maxBytes)}]` : "";
        return {
            content: [{ type: "text", text: `${text}${suffix}` }],
            details: { id, filename, content_type: contentType, size, truncated, mode: "text" },
        };
    }
    const base64 = Buffer.from(slice).toString("base64");
    const note = truncated ? ` (truncated to ${formatBytes(maxBytes)})` : "";
    return {
        content: [{ type: "text", text: `Attachment ${filename} (${contentType}, ${formatBytes(size)}) base64${note}:\n${base64}` }],
        details: { id, filename, content_type: contentType, size, truncated, mode: "base64" },
    };
}
async function executeExportAttachment(_toolCallId, params) {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) {
        return { content: [{ type: "text", text: "Attachment id must be a positive number." }], details: {} };
    }
    const record = getMediaById(id);
    if (!record) {
        return { content: [{ type: "text", text: `No attachment found for id ${id}.` }], details: {} };
    }
    const filename = params.filename || record.filename || `attachment-${id}`;
    const outputPath = buildExportPath(id, filename);
    await Bun.write(outputPath, record.data);
    return {
        content: [{ type: "text", text: `Attachment ${filename} exported to ${outputPath}.` }],
        details: {
            id,
            filename,
            output_path: outputPath,
            content_type: record.content_type || "application/octet-stream",
            size: record.data?.length || 0,
        },
    };
}
// ── System prompt hint ─────────────────────────────────────
const ATTACHMENT_HINT = [
    "## File Attachments",
    "You have an attach_file tool. When you create or generate a file the user",
    "will want (images, charts, CSVs, PDFs, archives, code exports, etc.),",
    "always call attach_file with the workspace path so they get a download",
    "card in the chat. Do not just tell the user the file path — attach it.",
    "You do NOT need to paste the file contents into your reply.",
    "After attaching, briefly mention what you attached so the user knows",
    "to look for the download card below your message.",
    "Use attachment:<id> when you want to reference an uploaded attachment by id.",
    "Use read_attachment to load an attachment by id (auto/text/image/base64 modes).",
    "Use export_attachment to save an attachment into /workspace/tmp for shell tools.",
].join("\n");
// ── Factory ───────────────────────────────────────────────
/** Extension factory that registers the attach_file tool. */
export const fileAttachments = (pi) => {
    pi.on("before_agent_start", async (event) => {
        return { systemPrompt: `${event.systemPrompt}\n\n${ATTACHMENT_HINT}` };
    });
    pi.registerTool({
        name: "attach_file",
        label: "attach_file",
        description: "Attach a file from the workspace so the user can download it in the web UI. Returns an attachment handle.",
        parameters: AttachmentSchema,
        execute,
    });
    pi.registerTool({
        name: "read_attachment",
        label: "read_attachment",
        description: "Load an attachment by id and return its contents (text/image/base64).",
        parameters: ReadAttachmentSchema,
        execute: executeReadAttachment,
    });
    pi.registerTool({
        name: "export_attachment",
        label: "export_attachment",
        description: "Export an attachment by id to /workspace/tmp for shell tools.",
        parameters: ExportAttachmentSchema,
        execute: executeExportAttachment,
    });
};
