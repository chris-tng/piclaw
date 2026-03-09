import { describe, expect, test } from "bun:test";
import {
  base64UrlToBuffer,
  bufferToBase64Url,
  resolveWebauthnRpInfo,
  WebauthnChallengeTracker,
} from "../../../src/channels/web/webauthn-challenges.js";

describe("webauthn challenge tracker", () => {
  test("tracks and consumes login/registration challenges", () => {
    const tracker = new WebauthnChallengeTracker(1000);

    tracker.trackLogin("login-token", { challenge: "c1", rpId: "example.com", userId: "u1" }, 1000);
    tracker.trackRegistration("reg-token", { challenge: "c2", rpId: "example.com", userId: "u1" }, 1000);

    const login = tracker.consumeLogin("login-token", 1100);
    expect(login?.challenge).toBe("c1");
    expect(tracker.consumeLogin("login-token", 1101)).toBeNull();

    const reg = tracker.consumeRegistration("reg-token", 1100);
    expect(reg?.challenge).toBe("c2");
    expect(tracker.consumeRegistration("reg-token", 1101)).toBeNull();
  });

  test("prunes expired challenges", () => {
    const tracker = new WebauthnChallengeTracker(100);

    tracker.trackLogin("old", { challenge: "old", rpId: "example.com", userId: "u1" }, 1000);
    tracker.trackLogin("new", { challenge: "new", rpId: "example.com", userId: "u1" }, 1200);

    expect(tracker.consumeLogin("old", 1200)).toBeNull();
    expect(tracker.consumeLogin("new", 1200)?.challenge).toBe("new");
  });
});

describe("webauthn helpers", () => {
  test("resolveWebauthnRpInfo prefers valid Origin header", () => {
    const req = new Request("https://ignored.example/path", {
      headers: { origin: "https://auth.example.com" },
    });

    const info = resolveWebauthnRpInfo(req);
    expect(info.rpId).toBe("auth.example.com");
    expect(info.origin).toBe("https://auth.example.com");
  });

  test("resolveWebauthnRpInfo falls back to request URL when Origin is invalid", () => {
    const req = new Request("http://example.com:8080/path", {
      headers: { origin: "not-a-url" },
    });

    const info = resolveWebauthnRpInfo(req);
    expect(info.rpId).toBe("example.com");
    expect(info.origin).toBe("http://example.com:8080");
  });

  test("base64url helpers round-trip byte data", () => {
    const source = new Uint8Array([1, 2, 3, 254, 255]);
    const encoded = bufferToBase64Url(source);
    const decoded = base64UrlToBuffer(encoded);

    expect(Array.from(decoded)).toEqual(Array.from(source));
  });
});
