import { expect, test } from "bun:test";
import { mkdirSync, writeFileSync, readdirSync, readFileSync, rmSync } from "fs";
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
  expect(payload.text).toContain("![token-chart](data:image/svg+xml;base64,");

  rmSync(base, { recursive: true, force: true });
});
