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
export class MediaService {
  /**
   * Validate and store an uploaded file.
   * Returns 413 if file exceeds MAX_MEDIA_UPLOAD_BYTES.
   * Returns 415 if content type is not in the allowlist.
   */
  async createFromFile(file: File): Promise<{ status: number; body: unknown }> {
    // Size check — reject before reading the full body into memory
    if (file.size > MAX_MEDIA_UPLOAD_BYTES) {
      return {
        status: 413,
        body: { error: `File too large (max ${MAX_MEDIA_UPLOAD_BYTES / 1024 / 1024} MB)` },
      };
    }

    // Content-type check — allow explicit whitelist plus any image/* or text/*
    const contentType = (file.type || "application/octet-stream").toLowerCase();
    if (!ALLOWED_MEDIA_TYPES.has(contentType) && !contentType.startsWith("image/") && !contentType.startsWith("text/")) {
      return { status: 415, body: { error: `Unsupported media type: ${contentType}` } };
    }

    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const mediaId = createMedia(
      file.name || "upload",
      file.type || "application/octet-stream",
      data,
      null,
      { size: file.size }
    );

    return { status: 200, body: { id: mediaId, filename: file.name, size: file.size } };
  }

  getMedia(id: number, thumbnail: boolean): { status: number; body: Blob; contentType?: string } {
    const media = getMediaById(id);
    if (!media) return { status: 404, body: new Blob([JSON.stringify({ error: "Media not found" })]) };

    const blob = thumbnail && media.thumbnail ? media.thumbnail : media.data;
    const buffer = blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength) as ArrayBuffer;
    const body = new Blob([buffer], { type: media.content_type });
    return { status: 200, body, contentType: media.content_type };
  }

  getInfo(id: number): { status: number; body: unknown } {
    const info = getMediaInfoById(id);
    if (!info) return { status: 404, body: { error: "Media not found" } };
    return { status: 200, body: info };
  }
}
