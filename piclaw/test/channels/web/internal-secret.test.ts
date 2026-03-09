import { describe, expect, test } from "bun:test";
import { isInternalSecretRequestAuthorized } from "../../../src/channels/web/internal-secret.js";

describe("internal secret authorization", () => {
  test("accepts x-piclaw-internal-secret header", () => {
    const req = new Request("http://example.com", {
      headers: { "x-piclaw-internal-secret": "secret123" },
    });
    expect(isInternalSecretRequestAuthorized(req, "secret123")).toBeTrue();
  });

  test("accepts bearer authorization token", () => {
    const req = new Request("http://example.com", {
      headers: { authorization: "Bearer secret123" },
    });
    expect(isInternalSecretRequestAuthorized(req, "secret123")).toBeTrue();
  });

  test("rejects missing or mismatched secrets", () => {
    const missing = new Request("http://example.com");
    expect(isInternalSecretRequestAuthorized(missing, "secret123")).toBeFalse();

    const wrong = new Request("http://example.com", {
      headers: { "x-piclaw-internal-secret": "nope" },
    });
    expect(isInternalSecretRequestAuthorized(wrong, "secret123")).toBeFalse();

    expect(isInternalSecretRequestAuthorized(missing, "")).toBeFalse();
  });
});
