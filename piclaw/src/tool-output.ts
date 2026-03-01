import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { randomBytes } from "crypto";

import { DATA_DIR } from "./config.js";
import {
  storeToolOutput,
  insertToolOutputChunk,
  getToolOutputById,
  deleteToolOutputsBefore,
  searchToolOutputSnippets,
  type ToolOutputRecord,
} from "./db.js";

const TOOL_OUTPUT_DIR = join(DATA_DIR, "tool-output");
const DEFAULT_CHUNK_SIZE = 4000;

export interface ToolOutputSaveOptions {
  id?: string;
  source?: string | null;
  summary?: string | null;
  createdAt?: string;
}

export interface ToolOutputSaveResult {
  id: string;
  path: string;
  summary: string;
  sizeBytes: number;
  lineCount: number;
}

export function buildPreview(text: string, maxLines = 12, maxLineLength = 200): string {
  if (!text) return "";
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const previewLines = lines.slice(0, maxLines).map((line) => {
    if (line.length <= maxLineLength) return line;
    return `${line.slice(0, maxLineLength)}…`;
  });
  const omitted = Math.max(lines.length - maxLines, 0);
  if (omitted > 0) {
    previewLines.push(`… (${omitted} more lines)`);
  }
  return previewLines.join("\n");
}

function chunkText(text: string, chunkSize = DEFAULT_CHUNK_SIZE): string[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const chunks: string[] = [];
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
  if (buffer) chunks.push(buffer);
  return chunks;
}

export function saveToolOutput(text: string, options: ToolOutputSaveOptions = {}): ToolOutputSaveResult {
  mkdirSync(TOOL_OUTPUT_DIR, { recursive: true });
  const id = options.id ?? `out_${Date.now()}_${randomBytes(4).toString("hex")}`;
  const createdAt = options.createdAt ?? new Date().toISOString();
  const path = join(TOOL_OUTPUT_DIR, `${id}.log`);
  writeFileSync(path, text ?? "", "utf8");

  const sizeBytes = Buffer.byteLength(text ?? "", "utf8");
  const lineCount = text ? text.replace(/\r\n/g, "\n").split("\n").length : 0;
  const summary = options.summary ?? buildPreview(text ?? "");

  const record: ToolOutputRecord = {
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
    if (chunk.trim()) insertToolOutputChunk(id, chunk);
  }

  return { id, path, summary, sizeBytes, lineCount };
}

export function getToolOutput(handle: string): ToolOutputRecord | undefined {
  return getToolOutputById(handle);
}

export function searchToolOutput(handle: string, query: string, limit = 5): string[] {
  return searchToolOutputSnippets(handle, query, limit);
}

export function pruneToolOutputs(maxAgeDays = 30): number {
  const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000).toISOString();
  const rows = deleteToolOutputsBefore(cutoff);
  for (const row of rows) {
    if (row.path && existsSync(row.path)) {
      try { unlinkSync(row.path); } catch {}
    }
  }
  return rows.length;
}

let cleanupStarted = false;

export function startToolOutputCleanup(maxAgeDays = 30, intervalMs = 12 * 60 * 60 * 1000): void {
  if (cleanupStarted) return;
  cleanupStarted = true;
  pruneToolOutputs(maxAgeDays);
  setInterval(() => pruneToolOutputs(maxAgeDays), intervalMs).unref();
}

export function readToolOutputFile(path: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}
