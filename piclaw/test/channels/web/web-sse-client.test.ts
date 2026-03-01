import { expect, test } from "bun:test";

import { SSEClient } from "../../../web/src/api.ts";

test("SSEClient scheduleReconnect triggers cooldown", () => {
  const client = new SSEClient(() => {}, () => {});

  const originalSetTimeout = globalThis.setTimeout;
  const originalNow = Date.now;
  let scheduledDelay = 0;

  globalThis.setTimeout = ((_, delay) => {
    scheduledDelay = Number(delay);
    return 1 as unknown as ReturnType<typeof setTimeout>;
  }) as typeof setTimeout;
  Date.now = () => 1000;

  client.reconnectAttempts = 10;
  client.scheduleReconnect();

  expect(client.cooldownUntil).toBe(61000);
  expect(scheduledDelay).toBe(60000);

  globalThis.setTimeout = originalSetTimeout;
  Date.now = originalNow;
});

test("SSEClient reconnectIfNeeded respects cooldown", () => {
  const client = new SSEClient(() => {}, () => {});
  let connected = false;
  client.connect = () => {
    connected = true;
  };

  client.status = "disconnected";
  client.cooldownUntil = Date.now() + 10000;
  client.reconnectIfNeeded();

  expect(connected).toBe(false);
});
