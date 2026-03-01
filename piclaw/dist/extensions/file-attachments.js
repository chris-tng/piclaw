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
import { createMedia } from "../db.js";
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
    "Use attachment:<filename> only when you want to embed inline (images, links).",
].join("\n");
// ── Factory ───────────────────────────────────────────────
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
};
