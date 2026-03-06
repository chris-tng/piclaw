/**
 * test/channels/web/auth.test.ts
 *
 * Meaningful crypto/auth coverage: TOTP verification windowing, constant-time
 * compare helper behavior, and session token generation shape.
 */

import { afterEach, expect, test } from "bun:test";
import { createHmac } from "node:crypto";

import { randomSessionToken, safeEqual, verifyTotp } from "../../../src/channels/web/auth.js";

function decodeBase32(value: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = value.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let buffer = 0;
  const bytes: number[] = [];
  for (const ch of clean) {
    const index = alphabet.indexOf(ch);
    if (index < 0) continue;
    buffer = (buffer << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }
  return Buffer.from(bytes);
}

function totpAtTime(secretBase32: string, timeMs: number, digits = 6, stepSeconds = 30): string {
  const key = decodeBase32(secretBase32);
  const counter = Math.floor(timeMs / 1000 / stepSeconds);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(code % 10 ** digits).padStart(digits, "0");
}

const originalNow = Date.now;
afterEach(() => {
  Date.now = originalNow;
});

test("verifyTotp accepts valid code at current timestep", () => {
  const secret = "JBSWY3DPEHPK3PXP"; // stable base32 secret
  const now = 1_700_000_000_000;
  Date.now = () => now;

  const code = totpAtTime(secret, now);
  expect(verifyTotp(secret, code, 0)).toBe(true);
  expect(verifyTotp(secret, "000000", 0)).toBe(false);
});

test("verifyTotp honors ±window timesteps", () => {
  const secret = "JBSWY3DPEHPK3PXP";
  const now = 1_700_000_000_000;
  Date.now = () => now;

  const previousWindowCode = totpAtTime(secret, now - 30_000);
  expect(verifyTotp(secret, previousWindowCode, 1)).toBe(true);
  expect(verifyTotp(secret, previousWindowCode, 0)).toBe(false);
});

test("safeEqual compares strings safely", () => {
  expect(safeEqual("abc", "abc")).toBe(true);
  expect(safeEqual("abc", "abd")).toBe(false);
  expect(safeEqual("abc", "ab")).toBe(false);
});

test("randomSessionToken produces URL-safe random value", () => {
  const a = randomSessionToken();
  const b = randomSessionToken();

  expect(a).not.toBe(b);
  expect(a.length).toBeGreaterThanOrEqual(32);
  expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
});
