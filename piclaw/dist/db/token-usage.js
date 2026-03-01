import { getDb } from "./connection.js";
export function storeTokenUsage(record) {
    const db = getDb();
    db.prepare(`INSERT INTO token_usage (
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(record.chat_jid, record.run_at, record.input_tokens, record.output_tokens, record.cache_read_tokens, record.cache_write_tokens, record.total_tokens, record.cost_input, record.cost_output, record.cost_cache_read, record.cost_cache_write, record.cost_total, record.model ?? null, record.provider ?? null, record.api ?? null, record.turns ?? null);
}
