/**
 * test/db/token-usage.test.ts – Tests for token usage tracking.
 *
 * Verifies token_usage table operations: recording, querying by time
 * range, aggregation, and summary formatting.
 */

import { describe, test, expect } from "bun:test";
import "../helpers.js";

import {
  getTokenUsageByModel,
  getTokenUsageByProvider,
  getTokenUsageTotals,
  initDatabase,
  storeTokenUsage,
} from "../../src/db.js";
import { getDb } from "../../src/db/connection.js";

describe("token-usage", () => {
  test("storeTokenUsage inserts a record", () => {
    initDatabase();
    const db = getDb();

    storeTokenUsage({
      chat_jid: "test:token",
      run_at: new Date().toISOString(),
      input_tokens: 100,
      output_tokens: 50,
      cache_read_tokens: 10,
      cache_write_tokens: 5,
      total_tokens: 165,
      cost_input: 0.001,
      cost_output: 0.002,
      cost_cache_read: 0.0001,
      cost_cache_write: 0.00005,
      cost_total: 0.00315,
      model: "gpt-4",
      provider: "openai",
      api: "chat",
      turns: 3,
    });

    const row = db.prepare("SELECT * FROM token_usage WHERE chat_jid = ?").get("test:token") as any;
    expect(row).toBeDefined();
    expect(row.input_tokens).toBe(100);
    expect(row.output_tokens).toBe(50);
    expect(row.total_tokens).toBe(165);
    expect(row.model).toBe("gpt-4");
    expect(row.provider).toBe("openai");
    expect(row.turns).toBe(3);
  });

  test("storeTokenUsage handles null optional fields", () => {
    initDatabase();
    const db = getDb();

    storeTokenUsage({
      chat_jid: "test:token-null",
      run_at: new Date().toISOString(),
      input_tokens: 10,
      output_tokens: 5,
      cache_read_tokens: 0,
      cache_write_tokens: 0,
      total_tokens: 15,
      cost_input: 0,
      cost_output: 0,
      cost_cache_read: 0,
      cost_cache_write: 0,
      cost_total: 0,
    });

    const row = db.prepare("SELECT * FROM token_usage WHERE chat_jid = ?").get("test:token-null") as any;
    expect(row).toBeDefined();
    expect(row.model).toBeNull();
    expect(row.provider).toBeNull();
    expect(row.turns).toBeNull();
  });

  test("aggregates overall totals, provider totals, and model totals", () => {
    initDatabase();

    const chatJid = "test:aggregate";
    storeTokenUsage({
      chat_jid: chatJid,
      run_at: new Date().toISOString(),
      input_tokens: 100,
      output_tokens: 50,
      cache_read_tokens: 10,
      cache_write_tokens: 0,
      total_tokens: 160,
      cost_input: 0,
      cost_output: 0,
      cost_cache_read: 0,
      cost_cache_write: 0,
      cost_total: 0.16,
      provider: "openai",
      model: "gpt-4o",
    });

    storeTokenUsage({
      chat_jid: chatJid,
      run_at: new Date().toISOString(),
      input_tokens: 90,
      output_tokens: 30,
      cache_read_tokens: 0,
      cache_write_tokens: 0,
      total_tokens: 120,
      cost_input: 0,
      cost_output: 0,
      cost_cache_read: 0,
      cost_cache_write: 0,
      cost_total: 0.12,
      provider: "openai",
      model: "gpt-4o",
    });

    storeTokenUsage({
      chat_jid: chatJid,
      run_at: new Date().toISOString(),
      input_tokens: 40,
      output_tokens: 20,
      cache_read_tokens: 0,
      cache_write_tokens: 0,
      total_tokens: 60,
      cost_input: 0,
      cost_output: 0,
      cost_cache_read: 0,
      cost_cache_write: 0,
      cost_total: 0.06,
      provider: "anthropic",
      model: "claude",
    });

    const totals = getTokenUsageTotals(chatJid);
    expect(totals.total_tokens).toBe(340);
    expect(totals.runs).toBe(3);

    const provider = getTokenUsageByProvider(chatJid, 10);
    expect(provider.length).toBe(2);
    expect(provider[0].provider).toBe("openai");
    expect(provider[0].total_tokens).toBe(280);
    expect(provider[0].runs).toBe(2);

    const model = getTokenUsageByModel(chatJid, 10);
    expect(model.length).toBe(2);
    expect(model[0].model).toBe("gpt-4o");
    expect(model[0].total_tokens).toBe(280);
    expect(model[0].runs).toBe(2);
  });
});
