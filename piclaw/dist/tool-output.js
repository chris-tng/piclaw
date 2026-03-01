import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { DATA_DIR } from "./core/config.js";
import { createUuid } from "./utils/ids.js";
import { storeToolOutput, insertToolOutputChunk, getToolOutputById, deleteToolOutputsBefore, searchToolOutputSnippets, } from "./db.js";
import { buildPreviewLines } from "./utils/preview.js";
const TOOL_OUTPUT_DIR = join(DATA_DIR, "tool-output");
const DEFAULT_CHUNK_SIZE = 4000;
export function buildPreview(text, maxLines = 12, maxLineLength = 200) {
    const { preview } = buildPreviewLines(text, {
        maxLines,
        maxLineLength,
        includeOmittedLine: true,
    });
    return preview;
}
function chunkText(text, chunkSize = DEFAULT_CHUNK_SIZE) {
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const chunks = [];
    let buffer = "";
    for (const line of lines) {
        const next = buffer ? `${buffer}\n${line}` : line;
        if (next.length > chunkSize && buffer) {
            chunks.push(buffer);
            buffer = line;
            continue;
        }
        buffer = next;
    }
    if (buffer)
        chunks.push(buffer);
    return chunks;
}
export function saveToolOutput(text, options = {}) {
    mkdirSync(TOOL_OUTPUT_DIR, { recursive: true });
    const id = options.id ?? createUuid("out");
    const createdAt = options.createdAt ?? new Date().toISOString();
    const path = join(TOOL_OUTPUT_DIR, `${id}.log`);
    writeFileSync(path, text ?? "", "utf8");
    const sizeBytes = Buffer.byteLength(text ?? "", "utf8");
    const lineCount = text ? text.replace(/\r\n/g, "\n").split("\n").length : 0;
    const summary = options.summary ?? buildPreview(text ?? "");
    const record = {
        id,
        created_at: createdAt,
        source: options.source ?? null,
        size_bytes: sizeBytes,
        line_count: lineCount,
        summary,
        path,
    };
    storeToolOutput(record);
    const chunks = chunkText(text ?? "");
    for (const chunk of chunks) {
        if (chunk.trim())
            insertToolOutputChunk(id, chunk);
    }
    return { id, path, summary, sizeBytes, lineCount };
}
export function getToolOutput(handle) {
    return getToolOutputById(handle);
}
export function searchToolOutput(handle, query, limit = 5) {
    return searchToolOutputSnippets(handle, query, limit);
}
export function pruneToolOutputs(maxAgeDays = 30) {
    const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000).toISOString();
    const rows = deleteToolOutputsBefore(cutoff);
    for (const row of rows) {
        if (row.path && existsSync(row.path)) {
            try {
                unlinkSync(row.path);
            }
            catch { }
        }
    }
    return rows.length;
}
let cleanupStarted = false;
export function startToolOutputCleanup(maxAgeDays = 30, intervalMs = 12 * 60 * 60 * 1000) {
    if (cleanupStarted)
        return;
    cleanupStarted = true;
    pruneToolOutputs(maxAgeDays);
    setInterval(() => pruneToolOutputs(maxAgeDays), intervalMs).unref();
}
export function readToolOutputFile(path) {
    try {
        return readFileSync(path, "utf8");
    }
    catch {
        return null;
    }
}
