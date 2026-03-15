/**
 * test/web/adaptive-card-renderer.test.ts – Tests for Adaptive Card block extraction and validation.
 */
import { expect, test, describe } from "bun:test";
import {
  isAdaptiveCardBlock,
  isSupportedVersion,
  extractCardBlocks,
  normalizeAdaptiveCardAction,
  describeAdaptiveCardState,
} from "../../web/src/ui/adaptive-card-renderer.js";

describe("isAdaptiveCardBlock", () => {
  test("accepts valid card block", () => {
    expect(isAdaptiveCardBlock({
      type: "adaptive_card",
      card_id: "abc-123",
      schema_version: "1.5",
      state: "active",
      payload: { type: "AdaptiveCard", version: "1.5", body: [] },
    })).toBe(true);
  });

  test("rejects missing type", () => {
    expect(isAdaptiveCardBlock({
      card_id: "abc",
      schema_version: "1.5",
      state: "active",
      payload: {},
    })).toBe(false);
  });

  test("rejects wrong type", () => {
    expect(isAdaptiveCardBlock({ type: "image", card_id: "x" })).toBe(false);
  });

  test("rejects null payload", () => {
    expect(isAdaptiveCardBlock({
      type: "adaptive_card",
      card_id: "x",
      schema_version: "1.5",
      state: "active",
      payload: null,
    })).toBe(false);
  });

  test("rejects non-object", () => {
    expect(isAdaptiveCardBlock("string")).toBe(false);
    expect(isAdaptiveCardBlock(null)).toBe(false);
    expect(isAdaptiveCardBlock(undefined)).toBe(false);
  });
});

describe("isSupportedVersion", () => {
  test("accepts supported versions", () => {
    expect(isSupportedVersion("1.0")).toBe(true);
    expect(isSupportedVersion("1.3")).toBe(true);
    expect(isSupportedVersion("1.5")).toBe(true);
    expect(isSupportedVersion("1.6")).toBe(true);
  });

  test("rejects unsupported versions", () => {
    expect(isSupportedVersion("2.0")).toBe(false);
    expect(isSupportedVersion("0.9")).toBe(false);
    expect(isSupportedVersion("")).toBe(false);
  });
});

describe("extractCardBlocks", () => {
  test("extracts card blocks from mixed content_blocks", () => {
    const blocks = [
      { type: "text", text: "hello" },
      {
        type: "adaptive_card",
        card_id: "card-1",
        schema_version: "1.5",
        state: "active",
        payload: { type: "AdaptiveCard", version: "1.5", body: [] },
      },
      { type: "image" },
      {
        type: "adaptive_card",
        card_id: "card-2",
        schema_version: "1.5",
        state: "completed",
        payload: { type: "AdaptiveCard", version: "1.5", body: [] },
      },
    ];
    const cards = extractCardBlocks(blocks);
    expect(cards).toHaveLength(2);
    expect(cards[0].card_id).toBe("card-1");
    expect(cards[1].card_id).toBe("card-2");
  });

  test("returns empty for no card blocks", () => {
    expect(extractCardBlocks([{ type: "text" }])).toHaveLength(0);
  });

  test("returns empty for non-array", () => {
    expect(extractCardBlocks(null)).toHaveLength(0);
    expect(extractCardBlocks(undefined)).toHaveLength(0);
    expect(extractCardBlocks("string")).toHaveLength(0);
  });
});

describe("normalizeAdaptiveCardAction", () => {
  test("normalizes submit actions from JSON-like objects", () => {
    const action = normalizeAdaptiveCardAction({
      getJsonTypeName: () => "Action.Submit",
      title: "Approve",
      data: { ok: true },
      toJSON: () => ({ type: "Action.Submit", title: "Approve", data: { ok: true } }),
    });
    expect(action.type).toBe("Action.Submit");
    expect(action.title).toBe("Approve");
    expect(action.data).toEqual({ ok: true });
  });

  test("normalizes open url actions", () => {
    const action = normalizeAdaptiveCardAction({
      getJsonTypeName: () => "Action.OpenUrl",
      title: "Docs",
      url: "https://adaptivecards.io/",
    });
    expect(action.type).toBe("Action.OpenUrl");
    expect(action.url).toBe("https://adaptivecards.io/");
  });
});

describe("describeAdaptiveCardState", () => {
  test("returns null for active cards", () => {
    expect(describeAdaptiveCardState({
      type: "adaptive_card",
      card_id: "card-1",
      schema_version: "1.5",
      state: "active",
      payload: {},
    })).toBeNull();
  });

  test("describes completed cards with submission summary", () => {
    const meta = describeAdaptiveCardState({
      type: "adaptive_card",
      card_id: "card-1",
      schema_version: "1.5",
      state: "completed",
      payload: {},
      last_submission: {
        title: "Submit choices",
        data: { priority: "high", targets: ["docs", "tests"] },
      },
    });
    expect(meta?.label).toBe("Submitted");
    expect(meta?.detail).toContain("Submit choices");
    expect(meta?.detail).toContain("priority: high");
  });
});
