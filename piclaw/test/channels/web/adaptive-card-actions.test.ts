import { describe, expect, test } from "bun:test";
import {
  buildAdaptiveCardSubmissionText,
  buildAdaptiveCardSubmitBlock,
  getAdaptiveCardSubmitBehavior,
  getAdaptiveCardSubmitState,
  getAdaptiveCardTestFailure,
  markAdaptiveCardState,
  sanitizeAdaptiveCardActionPayload,
  sanitizeAdaptiveCardSubmissionData,
} from "../../../src/channels/web/adaptive-card-actions.js";

describe("adaptive card action helpers", () => {
  test("sanitizes payload fields", () => {
    const normalized = sanitizeAdaptiveCardActionPayload({
      post_id: "42",
      thread_id: "17",
      card_id: " card-1 ",
      chat_jid: " web:default ",
      action: { type: "Action.Submit", title: "Approve", data: { foo: "bar" }, url: "https://example.com" },
    });
    expect(normalized.postId).toBe(42);
    expect(normalized.threadId).toBe(17);
    expect(normalized.cardId).toBe("card-1");
    expect(normalized.chatJid).toBe("web:default");
    expect(normalized.actionType).toBe("Action.Submit");
    expect(normalized.actionTitle).toBe("Approve");
    expect(normalized.actionUrl).toBe("https://example.com");
  });

  test("builds readable submission text", () => {
    expect(buildAdaptiveCardSubmissionText("Approve", "card-1", { env: "prod", region: "eu", dryRun: false }))
      .toBe("Card submission: Approve — env: prod, region: eu, dryRun: no");
    expect(buildAdaptiveCardSubmissionText("", "card-1", "yes")).toBe("Card submission: card-1 — yes");
  });

  test("formats multi-choice and toggle-style values cleanly", () => {
    expect(buildAdaptiveCardSubmissionText("Submit choices", "card-1", {
      priority: "high",
      targets: ["docs", "tests"],
      confirm: true,
    })).toBe("Card submission: Submit choices — priority: high, targets: docs, tests, confirm: yes");
  });

  test("hides internal test-only fields from submission summaries", () => {
    expect(buildAdaptiveCardSubmissionText("Trigger", "card-1", {
      variant: "submit-error",
      __test_error: "submit",
    })).toBe("Card submission: Trigger — variant: submit-error");
  });

  test("sanitizes internal metadata recursively before persistence", () => {
    expect(sanitizeAdaptiveCardSubmissionData({
      variant: "approval",
      nested: { keep: true, __internal: "hidden" },
      items: [{ ok: 1, __secret: 2 }],
      __top: "hidden",
    })).toEqual({
      variant: "approval",
      nested: { keep: true },
      items: [{ ok: 1 }],
    });
  });

  test("builds submission block", () => {
    const block = buildAdaptiveCardSubmitBlock({
      cardId: "card-1",
      sourcePostId: 99,
      title: "Approve",
      data: { ok: true },
      submittedAt: "2026-03-15T00:00:00.000Z",
    });
    expect(block.type).toBe("adaptive_card_submission");
    expect(block.card_id).toBe("card-1");
    expect(block.source_post_id).toBe(99);
    expect(block.action_type).toBe("Action.Submit");
  });

  test("marks matching card with the requested terminal state", () => {
    const updated = markAdaptiveCardState([
      { type: "text", text: "hello" },
      { type: "adaptive_card", card_id: "card-1", state: "active", payload: {} },
    ], "card-1", "cancelled", "2026-03-15T00:00:00.000Z", { foo: "bar" });

    expect(updated).not.toBeNull();
    expect((updated?.[1] as any).state).toBe("cancelled");
    expect((updated?.[1] as any).last_submission).toEqual({ foo: "bar" });
  });

  test("detects built-in submit failure simulation for test cards only", () => {
    expect(getAdaptiveCardTestFailure("test-card-submit-error-abc", { __test_error: "submit" })).toBe(
      "Simulated /test-card submit failure.",
    );
    expect(getAdaptiveCardTestFailure("card-1", { __test_error: "submit" })).toBeNull();
  });

  test("detects keep-active submit behavior when declared on the card block", () => {
    expect(getAdaptiveCardSubmitBehavior([
      { type: "adaptive_card", card_id: "card-1", submit_behavior: "keep_active" },
    ], "card-1")).toBe("keep_active");
    expect(getAdaptiveCardSubmitBehavior([
      { type: "adaptive_card", card_id: "card-1" },
    ], "card-1")).toBe("complete");
  });

  test("derives submit terminal state from internal action metadata", () => {
    expect(getAdaptiveCardSubmitState({ __card_state: "cancelled" })).toBe("cancelled");
    expect(getAdaptiveCardSubmitState({ __card_state: "failed" })).toBe("failed");
    expect(getAdaptiveCardSubmitState({ __card_state: "completed" })).toBe("completed");
    expect(getAdaptiveCardSubmitState({ foo: "bar" })).toBe("completed");
  });
});
