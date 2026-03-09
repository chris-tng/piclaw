/**
 * web/workspace/file-service.ts – File read/write operations for the explorer.
 *
 * Provides file content retrieval, creation, directory listing, and file
 * writing with path safety validation (must be within workspace root).
 *
 * Consumers: web/handlers/workspace.ts delegates file operations here.
 */

import { existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";

import { Zip, ZipDeflate, ZipPassThrough } from "fflate";

import { createMedia } from "../../../db.js";
import { MAX_ATTACH_BYTES, MAX_EDIT_BYTES, MAX_PREVIEW_BYTES, MAX_UPLOAD_BYTES } from "./constants.js";
import { contentTypeForPath, detectBinary, formatMtime, isImageFile, isTextFile } from "./file-utils.js";
import { isHiddenPath, resolveWorkspacePath, shouldIgnorePath, toRelativePath } from "./paths.js";

/** File read/write service for the workspace explorer API. */
export class WorkspaceFileService {
  getFile(
    pathParam: string | null,
    maxParam?: string | null,
    modeParam?: string | null
  ): { status: number; body: unknown } {
    const targetPath = resolveWorkspacePath(pathParam);
    if (!targetPath) return { status: 400, body: { error: "Invalid path" } };

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
      const isEditMode = modeParam === "edit";
      const maxLimit = isEditMode ? MAX_EDIT_BYTES : MAX_PREVIEW_BYTES;
      const maxBytes = Number.isFinite(maxParsed)
        ? Math.min(Math.max(maxParsed, 1024), maxLimit)
        : isEditMode
          ? maxLimit
          : 20000;

      if (isEditMode && stats.size > MAX_EDIT_BYTES) {
        return { status: 400, body: { error: "File too large to edit" } };
      }

      const buffer = readFileSync(targetPath, { encoding: null }) as Buffer;
      const slice = buffer.subarray(0, maxBytes);
      const truncated = buffer.length > maxBytes;

      if (!isTextFile(targetPath) && detectBinary(slice)) {
        return {
          status: isEditMode ? 400 : 200,
          body: isEditMode
            ? { error: "Binary file cannot be edited" }
            : {
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
        } catch {
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
    } catch {
      return { status: 500, body: { error: "Failed to read file" } };
    }
  }

  getRaw(pathParam: string | null): { status: number; body: string | Blob; contentType?: string } {
    const targetPath = resolveWorkspacePath(pathParam);
    if (!targetPath) return { status: 400, body: "Invalid path" };

    try {
      const stats = statSync(targetPath);
      if (stats.isDirectory()) return { status: 400, body: "Path is a directory" };
      const contentType = contentTypeForPath(targetPath);
      const file = Bun.file(targetPath);
      return { status: 200, body: file, contentType };
    } catch {
      return { status: 404, body: "Not found" };
    }
  }

  attachFile(pathParam: string | null): { status: number; body: unknown } {
    const targetPath = resolveWorkspacePath(pathParam);
    if (!targetPath) return { status: 400, body: { error: "Invalid path" } };

    try {
      const stats = statSync(targetPath);
      if (stats.isDirectory()) return { status: 400, body: { error: "Path is a directory" } };
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
    } catch {
      return { status: 500, body: { error: "Failed to attach file" } };
    }
  }

  async uploadFile(
    pathParam: string | null,
    file: File,
    overwrite = false
  ): Promise<{ status: number; body: unknown }> {
    const targetDir = resolveWorkspacePath(pathParam);
    if (!targetDir) return { status: 400, body: { error: "Invalid path" } };

    try {
      const stats = statSync(targetDir);
      if (!stats.isDirectory()) {
        return { status: 400, body: { error: "Path is not a directory" } };
      }
    } catch {
      return { status: 404, body: { error: "Directory not found" } };
    }

    const rawName = typeof file?.name === "string" ? file.name : "";
    const filename = path.basename(rawName || `upload-${Date.now()}`);
    if (!filename) return { status: 400, body: { error: "Missing filename" } };

    const size = typeof file?.size === "number" ? file.size : 0;
    if (size > MAX_UPLOAD_BYTES) {
      return { status: 400, body: { error: "File too large to upload" } };
    }

    const destPath = path.join(targetDir, filename);
    const existed = existsSync(destPath);
    if (existed && !overwrite) {
      return { status: 409, body: { error: "File already exists", code: "file_exists" } };
    }
    if (existed) {
      const existing = statSync(destPath);
      if (existing.isDirectory()) {
        return { status: 400, body: { error: "Path is a directory" } };
      }
    }

    try {
      await Bun.write(destPath, file);
      const updated = statSync(destPath);
      if (updated.size > MAX_UPLOAD_BYTES) {
        try { unlinkSync(destPath); } catch {}
        return { status: 400, body: { error: "File too large to upload" } };
      }
      const relPath = toRelativePath(destPath);
      return {
        status: 200,
        body: {
          path: relPath,
          name: filename,
          size: updated.size,
          overwritten: existed,
        },
      };
    } catch {
      return { status: 500, body: { error: "Failed to upload file" } };
    }
  }

  updateFile(pathParam: string | null, content: string): { status: number; body: unknown } {
    const targetPath = resolveWorkspacePath(pathParam);
    if (!targetPath) return { status: 400, body: { error: "Invalid path" } };

    if (typeof content !== "string") {
      return { status: 400, body: { error: "Missing file content" } };
    }

    try {
      const stats = statSync(targetPath);
      if (stats.isDirectory()) {
        return { status: 400, body: { error: "Path is a directory" } };
      }
    } catch {
      return { status: 404, body: { error: "File not found" } };
    }

    const size = Buffer.byteLength(content, "utf-8");
    if (size > MAX_EDIT_BYTES) {
      return { status: 400, body: { error: "File too large to edit" } };
    }

    try {
      writeFileSync(targetPath, content, "utf-8");
      const updated = statSync(targetPath);
      const relPath = toRelativePath(targetPath);
      return {
        status: 200,
        body: {
          path: relPath,
          name: path.basename(targetPath),
          size: updated.size,
          mtime: formatMtime(updated),
        },
      };
    } catch {
      return { status: 500, body: { error: "Failed to write file" } };
    }
  }

  deleteFile(pathParam: string | null): { status: number; body: unknown } {
    const targetPath = resolveWorkspacePath(pathParam);
    if (!targetPath) return { status: 400, body: { error: "Invalid path" } };

    try {
      const stats = statSync(targetPath);
      if (stats.isDirectory()) {
        return { status: 400, body: { error: "Path is a directory" } };
      }
    } catch {
      return { status: 404, body: { error: "File not found" } };
    }

    try {
      unlinkSync(targetPath);
      const relPath = toRelativePath(targetPath);
      return {
        status: 200,
        body: {
          path: relPath,
          name: path.basename(targetPath),
          deleted: true,
        },
      };
    } catch {
      return { status: 500, body: { error: "Failed to delete file" } };
    }
  }

  async downloadZip(
    pathParam: string | null,
    includeHidden = false
  ): Promise<{ status: number; body: unknown; filename?: string }> {
    const targetDir = resolveWorkspacePath(pathParam);
    if (!targetDir) return { status: 400, body: { error: "Invalid path" } };

    try {
      const stats = statSync(targetDir);
      if (!stats.isDirectory()) {
        return { status: 400, body: { error: "Path is not a directory" } };
      }
    } catch {
      return { status: 404, body: { error: "Directory not found" } };
    }

    const rootName = path.basename(targetDir) || "workspace";
    const zipRoot = rootName.replace(/[\\/]+/g, "").trim() || "workspace";

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const zip = new Zip();
        zip.ondata = (err, data, final) => {
          if (err) {
            controller.error(err);
            return;
          }
          controller.enqueue(data);
          if (final) controller.close();
        };

        const addDir = async (absDir: string, zipBase: string) => {
          const entries = await readdir(absDir, { withFileTypes: true });
          for (const entry of entries) {
            const absPath = path.join(absDir, entry.name);
            if (shouldIgnorePath(absPath)) continue;
            if (!includeHidden && isHiddenPath(absPath)) continue;
            const zipPath = `${zipBase}/${entry.name}`;
            if (entry.isDirectory()) {
              const dirEntry = new ZipPassThrough(`${zipPath}/`);
              zip.add(dirEntry);
              dirEntry.push(new Uint8Array(), true);
              await addDir(absPath, zipPath);
            } else if (entry.isFile()) {
              const deflate = new ZipDeflate(zipPath);
              zip.add(deflate);
              const file = Bun.file(absPath);
              const fileStream = file.stream();
              for await (const chunk of fileStream) {
                const data = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk as ArrayBuffer);
                deflate.push(data, false);
              }
              deflate.push(new Uint8Array(), true);
            }
          }
        };

        try {
          const rootEntry = new ZipPassThrough(`${zipRoot}/`);
          zip.add(rootEntry);
          rootEntry.push(new Uint8Array(), true);
          await addDir(targetDir, zipRoot);
          zip.end();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return {
      status: 200,
      body: stream,
      filename: `${zipRoot}.zip`,
    };
  }
}
