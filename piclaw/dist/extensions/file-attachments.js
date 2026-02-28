/**
 * file-attachments – registers the attach_file tool as an extension.
 *
 * The tool stores a file from the workspace as a media blob and registers
 * it with the shared AttachmentRegistry so the AgentPool can include
 * attachment metadata in the response.
 *
 * Reads `process.env.PICLAW_CHAT_JID` at execution time.
 */
import { basename, resolve, relative } from "path";
import { Type } from "@sinclair/typebox";
import { createMedia } from "../db.js";
import { WORKSPACE_DIR } from "../config.js";
import { getAttachmentRegistry } from "../agent-pool/attachments.js";
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
function getChatJid() {
    return process.env.PICLAW_CHAT_JID ?? "web:default";
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
    registry.register(getChatJid(), {
        id: mediaId,
        name: filename,
        contentType,
        size,
        kind,
        sourcePath: resolved,
    });
    return {
        content: [{ type: "text", text: `Attached ${filename} (${Math.round(size / 1024)} KB). You can reference it as attachment:${filename}.` }],
        details: { media_id: mediaId, filename, content_type: contentType, size, kind },
    };
}
// ── Factory ───────────────────────────────────────────────
export const fileAttachments = (pi) => {
    pi.registerTool({
        name: "attach_file",
        label: "attach_file",
        description: "Attach a file from the workspace so the user can download it in the web UI. Returns an attachment handle.",
        parameters: AttachmentSchema,
        execute,
    });
};
