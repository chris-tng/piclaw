import { readFileSync, statSync } from "fs";
import path from "path";
import { createMedia } from "../../../db.js";
import { MAX_ATTACH_BYTES, MAX_PREVIEW_BYTES } from "./constants.js";
import { contentTypeForPath, detectBinary, formatMtime, isImageFile, isTextFile } from "./file-utils.js";
import { resolveWorkspacePath, toRelativePath } from "./paths.js";
export class WorkspaceFileService {
    getFile(pathParam, maxParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory()) {
                return { status: 400, body: { error: "Path is a directory" } };
            }
            const relPath = toRelativePath(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const isImage = isImageFile(targetPath);
            if (isImage) {
                const rawUrl = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "image",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        url: rawUrl,
                    },
                };
            }
            const maxParsed = parseInt(maxParam || "", 10);
            const maxBytes = Number.isFinite(maxParsed)
                ? Math.min(Math.max(maxParsed, 1024), MAX_PREVIEW_BYTES)
                : 20000;
            const buffer = readFileSync(targetPath, { encoding: null });
            const slice = buffer.subarray(0, maxBytes);
            const truncated = buffer.length > maxBytes;
            if (!isTextFile(targetPath) && detectBinary(slice)) {
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "binary",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        truncated,
                    },
                };
            }
            let text = slice.toString("utf-8");
            if (path.extname(targetPath).toLowerCase() === ".json") {
                try {
                    text = JSON.stringify(JSON.parse(text), null, 2);
                }
                catch {
                    // keep raw
                }
            }
            return {
                status: 200,
                body: {
                    path: relPath,
                    name: path.basename(targetPath),
                    kind: "text",
                    content_type: contentType,
                    size: stats.size,
                    mtime: formatMtime(stats),
                    text,
                    truncated,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to read file" } };
        }
    }
    getRaw(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: "Invalid path" };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: "Path is a directory" };
            const contentType = contentTypeForPath(targetPath);
            const file = Bun.file(targetPath);
            return { status: 200, body: file, contentType };
        }
        catch {
            return { status: 404, body: "Not found" };
        }
    }
    attachFile(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: { error: "Path is a directory" } };
            if (stats.size > MAX_ATTACH_BYTES) {
                return { status: 400, body: { error: "File too large to attach" } };
            }
            const dataBuf = readFileSync(targetPath);
            const filename = path.basename(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const mediaId = createMedia(filename, contentType, new Uint8Array(dataBuf), null, {
                size: stats.size,
                kind: "file",
                source_path: targetPath,
            });
            return {
                status: 200,
                body: {
                    media_id: mediaId,
                    filename,
                    size: stats.size,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to attach file" } };
        }
    }
}
