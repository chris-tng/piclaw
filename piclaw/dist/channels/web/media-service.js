/**
 * web/media-service.ts – File upload and retrieval service.
 *
 * Wraps db/media.ts operations with validation:
 *   - File size limit (10 MB) — returns 413 if exceeded
 *   - Content-type whitelist — returns 415 for disallowed types
 *     (falls back to allowing any image/* or text/* prefix)
 *
 * Consumers: web/handlers/media.ts delegates to MediaService methods.
 */
import { readFileSync, statSync } from "fs";
import { basename, extname } from "path";
import { createMedia, getMediaById, getMediaInfoById } from "../../db.js";
/**
 * Max upload size: 10 MB.
 * This is enforced at the application level. The Bun.serve()
 * maxRequestBodySize (512 MB) is a separate hard cap.
 */
const MAX_MEDIA_UPLOAD_BYTES = 10 * 1024 * 1024;
/**
 * Content types explicitly allowed for media uploads.
 * Types not in this set can still pass if they match image/* or text/*
 * prefixes (for uncommon but valid subtypes like image/tiff).
 */
const ALLOWED_MEDIA_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/x-icon",
    "video/mp4",
    "video/webm",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "application/pdf",
    "text/plain",
    "text/markdown",
    "text/csv",
    "text/html",
    "text/xml",
    "application/json",
    "application/xml",
    "application/zip",
    "application/gzip",
]);
/**
 * File upload/download service wrapping db/media.ts operations.
 * Validates size and content type before persisting to the database.
 */
const normalizeContentType = (value, fallback) => {
    const type = (value || fallback || "application/octet-stream").toLowerCase();
    return type || "application/octet-stream";
};
const isAllowedMediaType = (contentType) => {
    const normalized = contentType.toLowerCase();
    return ALLOWED_MEDIA_TYPES.has(normalized) || normalized.startsWith("image/") || normalized.startsWith("text/");
};
const EXTENSION_MEDIA_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mp3": "audio/mpeg",
    ".ogg": "audio/ogg",
    ".wav": "audio/wav",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".md": "text/markdown",
    ".csv": "text/csv",
    ".html": "text/html",
    ".xml": "text/xml",
    ".json": "application/json",
    ".zip": "application/zip",
    ".gz": "application/gzip",
};
const inferContentTypeFromPath = (filePath) => {
    const extension = extname(filePath).toLowerCase();
    return EXTENSION_MEDIA_TYPES[extension] || "application/octet-stream";
};
/**
 * Service for validating and persisting uploaded media blobs.
 *
 * Used by web handlers and IPC path-based ingestion to create media rows and
 * retrieve media payloads/metadata for rendering and downloads.
 */
export class MediaService {
    /**
     * Validate and store an uploaded file.
     * Returns 413 if file exceeds MAX_MEDIA_UPLOAD_BYTES.
     * Returns 415 if content type is not in the allowlist.
     */
    async createFromFile(file) {
        // Size check — reject before reading the full body into memory
        if (file.size > MAX_MEDIA_UPLOAD_BYTES) {
            return {
                status: 413,
                body: { error: `File too large (max ${MAX_MEDIA_UPLOAD_BYTES / 1024 / 1024} MB)` },
            };
        }
        // Content-type check — allow explicit whitelist plus any image/* or text/*
        const contentType = normalizeContentType(file.type, "application/octet-stream");
        if (!isAllowedMediaType(contentType)) {
            return { status: 415, body: { error: `Unsupported media type: ${contentType}` } };
        }
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const mediaId = createMedia(file.name || "upload", contentType, data, null, { size: file.size });
        return { status: 200, body: { id: mediaId, filename: file.name, size: file.size, contentType } };
    }
    /**
     * Validate and store a file by filesystem path.
     * Returns 413 if file exceeds MAX_MEDIA_UPLOAD_BYTES.
     * Returns 415 if content type is not in the allowlist.
     * Returns 404 if the file does not exist.
     */
    async createFromPath(filePath, contentTypeOverride, filenameOverride) {
        let stats;
        try {
            stats = statSync(filePath);
        }
        catch {
            return { status: 404, body: { error: `Media file not found: ${filePath}` } };
        }
        if (!stats.isFile()) {
            return { status: 400, body: { error: `Media path is not a regular file: ${filePath}` } };
        }
        if (stats.size > MAX_MEDIA_UPLOAD_BYTES) {
            return {
                status: 413,
                body: { error: `File too large (max ${MAX_MEDIA_UPLOAD_BYTES / 1024 / 1024} MB)` },
            };
        }
        const contentType = normalizeContentType(contentTypeOverride, inferContentTypeFromPath(filePath));
        if (!isAllowedMediaType(contentType)) {
            return { status: 415, body: { error: `Unsupported media type: ${contentType}` } };
        }
        let data;
        try {
            data = new Uint8Array(readFileSync(filePath));
        }
        catch {
            return { status: 500, body: { error: `Unable to read media file: ${filePath}` } };
        }
        const mediaId = createMedia(filenameOverride || basename(filePath), contentType, data, null, { size: stats.size });
        return {
            status: 200,
            body: {
                id: mediaId,
                filename: filenameOverride || basename(filePath),
                size: stats.size,
                contentType,
            },
        };
    }
    getMedia(id, thumbnail) {
        const media = getMediaById(id);
        if (!media)
            return { status: 404, body: new Blob([JSON.stringify({ error: "Media not found" })]) };
        const blob = thumbnail && media.thumbnail ? media.thumbnail : media.data;
        const buffer = blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength);
        const body = new Blob([buffer], { type: media.content_type });
        return { status: 200, body, contentType: media.content_type };
    }
    getInfo(id) {
        const info = getMediaInfoById(id);
        if (!info)
            return { status: 404, body: { error: "Media not found" } };
        return { status: 200, body: info };
    }
}
