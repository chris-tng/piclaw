/**
 * db/tool-outputs.ts – Storage and retrieval of large tool invocation outputs.
 *
 * When a tool call (bash, read, etc.) produces output that is too large to
 * inline in the conversation, tool-output.ts stores the full content here
 * and places only a summary/reference in the interaction.
 *
 * The FTS5 virtual table `tool_outputs_fts` allows the agent to search
 * through previously stored outputs (used by extensions/workspace-search.ts
 * and context-tools.ts).
 *
 * Automatic cleanup of old records is driven by the retention settings in
 * core/config.ts (TOOL_OUTPUT_RETENTION_DAYS / TOOL_OUTPUT_CLEANUP_INTERVAL_MS).
 *
 * Consumers:
 *   - tool-output.ts calls storeToolOutput() + insertToolOutputChunk().
 *   - tools/context-tools.ts calls getToolOutputById() / searchToolOutputSnippets().
 *   - runtime.ts schedules periodic deleteToolOutputsBefore() calls.
 */

import { getDb } from "./connection.js";
import type { ToolOutputRecord } from "./types.js";
import { prepareFtsQuery } from "../utils/fts-query.js";

/** Insert or replace a tool output metadata record (without FTS content). */
export function storeToolOutput(record: ToolOutputRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT OR REPLACE INTO tool_outputs (id, created_at, source, size_bytes, line_count, summary, path)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    record.id,
    record.created_at,
    record.source ?? null,
    record.size_bytes ?? null,
    record.line_count ?? null,
    record.summary ?? null,
    record.path ?? null
  );
}

/**
 * Insert a chunk of tool output content into the FTS5 index.
 * Large outputs are split into chunks so FTS can index them incrementally.
 */
export function insertToolOutputChunk(outputId: string, content: string): void {
  const db = getDb();
  db.prepare("INSERT INTO tool_outputs_fts (content, output_id) VALUES (?, ?)")
    .run(content, outputId);
}

/** Retrieve a tool output metadata record by its UUID. */
export function getToolOutputById(id: string): ToolOutputRecord | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM tool_outputs WHERE id = ?").get(id) as ToolOutputRecord | undefined;
}

/** Delete a tool output and its FTS entries by ID. */
export function deleteToolOutputById(id: string): void {
  const db = getDb();
  db.prepare("DELETE FROM tool_outputs WHERE id = ?").run(id);
  db.prepare("DELETE FROM tool_outputs_fts WHERE output_id = ?").run(id);
}

/**
 * Delete all tool outputs created before `cutoffIso` (ISO-8601 timestamp).
 * Returns the deleted records. Used by the periodic retention cleanup.
 */
export function deleteToolOutputsBefore(cutoffIso: string): ToolOutputRecord[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM tool_outputs WHERE created_at < ?")
    .all(cutoffIso) as ToolOutputRecord[];
  for (const row of rows) {
    deleteToolOutputById(row.id);
  }
  return rows;
}

/**
 * Search the FTS index for a specific tool output, returning highlighted
 * snippet strings. Used by context-tools.ts to locate relevant sections
 * of a large output for the agent.
 */
export function searchToolOutputSnippets(outputId: string, query: string, limit = 5): string[] {
  const db = getDb();
  const ftsQuery = prepareFtsQuery(query);
  if (!ftsQuery) return [];
  try {
    const stmt = db.prepare(
      "SELECT snippet(tool_outputs_fts, 0, '[', ']', '…', 12) as snippet FROM tool_outputs_fts WHERE tool_outputs_fts MATCH ? AND output_id = ? LIMIT ?"
    );
    const rows = stmt.all(ftsQuery, outputId, limit) as Array<{ snippet: string }>;
    return rows.map((row) => row.snippet);
  } catch {
    // FTS query still failed after sanitization — fall back to LIKE
    try {
      const pattern = `%${query.replace(/%/g, "").trim()}%`;
      const stmt = db.prepare(
        "SELECT substr(content, 1, 400) as snippet FROM tool_outputs_fts WHERE content LIKE ? AND output_id = ? LIMIT ?"
      );
      const rows = stmt.all(pattern, outputId, limit) as Array<{ snippet: string }>;
      return rows.map((row) => row.snippet);
    } catch {
      return [];
    }
  }
}
