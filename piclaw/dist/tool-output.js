/**
 * tool-output.ts – High-level API for persisting and querying large tool outputs.
 *
 * When a tool call (bash, read, etc.) produces output too large to include
 * inline in the conversation, this module:
 *   1. Writes the full content to a log file on disk.
 *   2. Stores metadata in the `tool_outputs` DB table.
 *   3. Indexes the content in FTS5 for later searching.
 *   4. Returns a short preview/summary for the agent's context window.
 *
 * Also manages automatic retention cleanup (pruneToolOutputs).
 *
 * Consumers:
 *   - tools/tracked-bash.ts calls saveToolOutput() for large bash outputs.
 *   - tools/context-tools.ts calls getToolOutput() / searchToolOutput().
 *   - runtime.ts calls startToolOutputCleanup() at startup.
 *   - agent-pool.ts may call readToolOutputFile() to fetch full content.
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { DATA_DIR } from "./core/config.js";
import { createUuid } from "./utils/ids.js";
import { storeToolOutput, insertToolOutputChunk, getToolOutputById, deleteToolOutputsBefore, searchToolOutputSnippets, } from "./db.js";
import { buildPreviewLines } from "./utils/preview.js";
/** Directory where tool output log files are stored on disk. */
const TOOL_OUTPUT_DIR = join(DATA_DIR, "tool-output");
/** Default chunk size (characters) for FTS indexing. */
const DEFAULT_CHUNK_SIZE = 4000;
/**
 * Generate a short text preview of the first N lines of content.
 * Used as the default summary when none is provided.
 */
export function buildPreview(text, maxLines = 12, maxLineLength = 200) {
    const { preview } = buildPreviewLines(text, {
        maxLines,
        maxLineLength,
        includeOmittedLine: true,
    });
    return preview;
}
/**
 * Split text into line-aware chunks for FTS indexing.
 * Avoids splitting mid-line when possible.
 */
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
/**
 * Persist a tool output: write to disk, store metadata in SQLite, and
 * index content chunks in FTS5. Returns a summary result.
 */
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
    // Index content in FTS5 in chunks for efficient full-text search.
    const chunks = chunkText(text ?? "");
    for (const chunk of chunks) {
        if (chunk.trim())
            insertToolOutputChunk(id, chunk);
    }
    return { id, path, summary, sizeBytes, lineCount };
}
/** Retrieve a tool output record by its UUID handle. */
export function getToolOutput(handle) {
    return getToolOutputById(handle);
}
/** Search the FTS index for a tool output, returning snippet strings. */
export function searchToolOutput(handle, query, limit = 5) {
    const trimmed = query?.trim?.() ?? "";
    if (!trimmed)
        return [];
    return searchToolOutputSnippets(handle, trimmed, limit);
}
/**
 * Delete tool outputs older than `maxAgeDays`. Removes both the DB records
 * and the on-disk log files. Returns the number of records pruned.
 */
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
/** Guard to ensure the cleanup interval is only started once. */
let cleanupStarted = false;
/**
 * Start a periodic timer that prunes old tool outputs.
 * Called once by runtime.ts during startup.
 */
export function startToolOutputCleanup(maxAgeDays = 30, intervalMs = 12 * 60 * 60 * 1000) {
    if (cleanupStarted)
        return;
    cleanupStarted = true;
    // Run an initial prune immediately, then on a recurring interval.
    pruneToolOutputs(maxAgeDays);
    setInterval(() => pruneToolOutputs(maxAgeDays), intervalMs).unref();
}
/**
 * Read the full content of a tool output log file from disk.
 * Returns null if the file doesn't exist or is unreadable.
 */
export function readToolOutputFile(path) {
    try {
        return readFileSync(path, "utf8");
    }
    catch {
        return null;
    }
}
