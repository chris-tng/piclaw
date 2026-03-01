import { getDb } from "./connection.js";

export interface TokenUsageRecord {
  chat_jid: string;
  run_at: string;
  input_tokens: number;
  output_tokens: number;
  cache_read_tokens: number;
  cache_write_tokens: number;
  total_tokens: number;
  cost_input: number;
  cost_output: number;
  cost_cache_read: number;
  cost_cache_write: number;
  cost_total: number;
  model?: string | null;
  provider?: string | null;
  api?: string | null;
  turns?: number | null;
}

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
