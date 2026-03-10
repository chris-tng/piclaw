/**
 * db/token-usage.ts – Records LLM token consumption and cost per agent run.
 *
 * After each agent turn completes, the agent pool (agent-pool/usage.ts)
 * calls storeTokenUsage() to persist the token counts, cost breakdown, and
 * model/provider metadata.
 *
 * Consumers:
 *   - agent-pool/usage.ts calls storeTokenUsage() after every agent run.
 *   - agent-control/handlers/info.ts queries the table for `/usage` reports.
 *   - The token-chart skill reads the table to generate usage visualisations.
 */

import { getDb } from "./connection.js";

/** Overall token/cost totals for a chat across all runs. */
export interface TokenUsageTotalsSummary {
  input_tokens: number;
  output_tokens: number;
  cache_read_tokens: number;
  cache_write_tokens: number;
  total_tokens: number;
  cost_total: number;
  runs: number;
}

/** Aggregated token/cost totals grouped by provider for a chat. */
export interface TokenUsageByProviderSummary extends TokenUsageTotalsSummary {
  provider: string | null;
}

/** Aggregated token/cost totals grouped by model for a chat. */
export interface TokenUsageByModelSummary extends TokenUsageTotalsSummary {
  model: string | null;
}

/**
 * Shape of a single token-usage record to be persisted.
 * Maps 1:1 to the `token_usage` table columns.
 */
export interface TokenUsageRecord {
  /** Chat JID the agent run belonged to. */
  chat_jid: string;
  /** ISO-8601 timestamp of the agent run. */
  run_at: string;
  /** Number of input (prompt) tokens consumed. */
  input_tokens: number;
  /** Number of output (completion) tokens generated. */
  output_tokens: number;
  /** Tokens served from the provider's prompt cache. */
  cache_read_tokens: number;
  /** Tokens written into the provider's prompt cache. */
  cache_write_tokens: number;
  /** Sum of all token categories. */
  total_tokens: number;
  /** Dollar cost attributed to input tokens. */
  cost_input: number;
  /** Dollar cost attributed to output tokens. */
  cost_output: number;
  /** Dollar cost attributed to cache-read tokens. */
  cost_cache_read: number;
  /** Dollar cost attributed to cache-write tokens. */
  cost_cache_write: number;
  /** Total dollar cost for the run. */
  cost_total: number;
  /** Model identifier (e.g. "claude-sonnet-4-20250514"). */
  model?: string | null;
  /** Provider name (e.g. "anthropic"). */
  provider?: string | null;
  /** API variant used (e.g. "messages", "chat"). */
  api?: string | null;
  /** Number of conversational turns in the run. */
  turns?: number | null;
}

/** Insert a token-usage record for a completed agent run. */
export function storeTokenUsage(record: TokenUsageRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO token_usage (
      chat_jid,
      run_at,
      input_tokens,
      output_tokens,
      cache_read_tokens,
      cache_write_tokens,
      total_tokens,
      cost_input,
      cost_output,
      cost_cache_read,
      cost_cache_write,
      cost_total,
      model,
      provider,
      api,
      turns
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    record.chat_jid,
    record.run_at,
    record.input_tokens,
    record.output_tokens,
    record.cache_read_tokens,
    record.cache_write_tokens,
    record.total_tokens,
    record.cost_input,
    record.cost_output,
    record.cost_cache_read,
    record.cost_cache_write,
    record.cost_total,
    record.model ?? null,
    record.provider ?? null,
    record.api ?? null,
    record.turns ?? null
  );
}

function normalizeLimit(limit: number): number {
  return Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 5;
}

/** Return overall token and cost totals for a chat. */
export function getTokenUsageTotals(chatJid: string): TokenUsageTotalsSummary {
  const db = getDb();
  const row = db.prepare(
    `SELECT
      COALESCE(SUM(input_tokens), 0) AS input_tokens,
      COALESCE(SUM(output_tokens), 0) AS output_tokens,
      COALESCE(SUM(cache_read_tokens), 0) AS cache_read_tokens,
      COALESCE(SUM(cache_write_tokens), 0) AS cache_write_tokens,
      COALESCE(SUM(total_tokens), 0) AS total_tokens,
      COALESCE(SUM(cost_total), 0) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?`
  ).get(chatJid) as TokenUsageTotalsSummary | undefined;

  return row ?? {
    input_tokens: 0,
    output_tokens: 0,
    cache_read_tokens: 0,
    cache_write_tokens: 0,
    total_tokens: 0,
    cost_total: 0,
    runs: 0,
  };
}

/** Return per-provider token and cost totals for a chat, sorted by total tokens. */
export function getTokenUsageByProvider(chatJid: string, limit = 5): TokenUsageByProviderSummary[] {
  const db = getDb();
  return db.prepare(
    `SELECT
      provider,
      SUM(input_tokens) AS input_tokens,
      SUM(output_tokens) AS output_tokens,
      SUM(cache_read_tokens) AS cache_read_tokens,
      SUM(cache_write_tokens) AS cache_write_tokens,
      SUM(total_tokens) AS total_tokens,
      SUM(cost_total) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?
     GROUP BY provider
     ORDER BY total_tokens DESC
     LIMIT ?`
  ).all(chatJid, normalizeLimit(limit)) as TokenUsageByProviderSummary[];
}

/** Return per-model token and cost totals for a chat, sorted by total tokens. */
export function getTokenUsageByModel(chatJid: string, limit = 5): TokenUsageByModelSummary[] {
  const db = getDb();
  return db.prepare(
    `SELECT
      model,
      SUM(input_tokens) AS input_tokens,
      SUM(output_tokens) AS output_tokens,
      SUM(cache_read_tokens) AS cache_read_tokens,
      SUM(cache_write_tokens) AS cache_write_tokens,
      SUM(total_tokens) AS total_tokens,
      SUM(cost_total) AS cost_total,
      COUNT(*) AS runs
     FROM token_usage
     WHERE chat_jid = ?
     GROUP BY model
     ORDER BY total_tokens DESC
     LIMIT ?`
  ).all(chatJid, normalizeLimit(limit)) as TokenUsageByModelSummary[];
}
