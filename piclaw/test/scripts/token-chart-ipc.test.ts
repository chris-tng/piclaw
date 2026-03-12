/**
 * test/scripts/token-chart-ipc.test.ts – Tests for token chart IPC integration.
 *
 * Verifies that the token-chart skill script creates IPC files with
 * the correct chart data payload for the web timeline.
 */

import { expect, test } from "bun:test";
import "../helpers.js";
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

test("token chart --ipc writes JSON message safely", () => {
  const base = join(tmpdir(), `piclaw-ipc-${Date.now()}`);
  const sessionsDir = join(base, "sessions");
  const dataDir = join(base, "data");
  mkdirSync(sessionsDir, { recursive: true });
  mkdirSync(dataDir, { recursive: true });

  const now = new Date();
  const entry = {
    type: "message",
    timestamp: now.toISOString(),
    message: {
      role: "assistant",
      usage: { input: 1000, output: 500, cacheRead: 200, cacheWrite: 100 },
      timestamp: Date.now(),
    },
  };

  writeFileSync(join(sessionsDir, "session.jsonl"), JSON.stringify(entry));

  const proc = Bun.spawnSync([
    "bun",
    "/workspace/piclaw/scripts/token-chart.ts",
    "--days",
    "1",
    "--sessions-dir",
    sessionsDir,
    "--ipc",
  ], {
    env: {
      ...process.env,
      PICLAW_DATA: dataDir,
    },
  });

  expect(proc.exitCode).toBe(0);

  const messagesDir = join(dataDir, "ipc", "messages");
  const files = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
  expect(files.length).toBe(1);
  const payload = JSON.parse(readFileSync(join(messagesDir, files[0]), "utf8"));
  expect(payload.type).toBe("message");
  expect(payload.chatJid).toBe("web:default");
  expect(payload.text).toContain("Token usage (all chats) — last 1 days");
  expect(Array.isArray(payload.media)).toBe(true);
  expect(payload.media).toHaveLength(1);
  expect(payload.media[0]).toMatchObject({
    content_type: "image/svg+xml",
    inline: true,
  });
  expect(typeof payload.media[0].path).toBe("string");
  expect(existsSync(payload.media[0].path)).toBe(true);
  expect(readFileSync(payload.media[0].path, "utf8")).toContain("<svg");

  rmSync(base, { recursive: true, force: true });
});
