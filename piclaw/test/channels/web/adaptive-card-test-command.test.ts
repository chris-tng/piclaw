import { describe, expect, test } from "bun:test";
import { handleAdaptiveCardTestCommand } from "../../../src/channels/web/adaptive-card-test-command.js";

describe("adaptive card test command", () => {
  test("emits basic card by default", () => {
    const result = handleAdaptiveCardTestCommand("/test-card");
    expect(result?.status).toBe("success");
    expect(result?.variant).toBe("basic");
    expect(result?.contentBlocks?.[0]?.type).toBe("adaptive_card");
  });

  test("supports approval variant with multiple submit actions", () => {
    const result = handleAdaptiveCardTestCommand("/test-card approval");
    expect(result?.status).toBe("success");
    expect(result?.variant).toBe("approval");
    expect(((result?.contentBlocks?.[0] as any)?.payload?.actions ?? []).length).toBe(3);
  });

  test("supports completed variant with completed state", () => {
    const result = handleAdaptiveCardTestCommand("/test-card completed");
    expect(result?.status).toBe("success");
    expect(result?.variant).toBe("completed");
    expect((result?.contentBlocks?.[0] as any)?.state).toBe("completed");
    expect((result?.contentBlocks?.[0] as any)?.last_submission).toBeDefined();
  });

  test("supports failed and cancelled variants", () => {
    expect((handleAdaptiveCardTestCommand("/test-card failed")?.contentBlocks?.[0] as any)?.state).toBe("failed");
    expect((handleAdaptiveCardTestCommand("/test-card cancelled")?.contentBlocks?.[0] as any)?.state).toBe("cancelled");
  });

  test("supports built-in error-path validation variants", () => {
    const badUrl = handleAdaptiveCardTestCommand("/test-card bad-url");
    expect(badUrl?.variant).toBe("bad-url");
    expect(((badUrl?.contentBlocks?.[0] as any)?.payload?.actions ?? [])[0]?.type).toBe("Action.OpenUrl");

    const submitError = handleAdaptiveCardTestCommand("/test-card submit-error");
    expect(submitError?.variant).toBe("submit-error");
    expect(((submitError?.contentBlocks?.[0] as any)?.payload?.actions ?? [])[0]?.data?.__test_error).toBe("submit");

    const stayOpen = handleAdaptiveCardTestCommand("/test-card stay-open");
    expect(stayOpen?.variant).toBe("stay-open");
    expect((stayOpen?.contentBlocks?.[0] as any)?.submit_behavior).toBe("keep_active");

    const terminalActions = handleAdaptiveCardTestCommand("/test-card terminal-actions");
    expect(terminalActions?.variant).toBe("terminal-actions");
    expect(((terminalActions?.contentBlocks?.[0] as any)?.payload?.actions ?? []).length).toBe(3);
  });

  test("supports list/help without emitting a card", () => {
    const result = handleAdaptiveCardTestCommand("/test-card list");
    expect(result?.status).toBe("success");
    expect(result?.emit).toBe(false);
    expect(result?.message).toContain("Available /test-card variants");
  });

  test("returns helpful error for unknown variant", () => {
    const result = handleAdaptiveCardTestCommand("/test-card unknown");
    expect(result?.status).toBe("error");
    expect(result?.message).toContain("Usage: /test-card");
  });
});
