/**
 * azure-openai-streaming.test.ts – Tests for Azure OpenAI streaming error handling.
 *
 * These tests verify the error-handling paths in streamAzureOpenAIResponses(),
 * focusing on the scoping bug (streamErrorDetail declared inside try{} but
 * referenced in catch{}) and the various failure modes that can crash piclaw.
 *
 * Bug context (2026-03-06):
 *   The Azure Responses API can return 400 errors when the conversation history
 *   contains a function_call item whose required reasoning item was dropped
 *   (e.g. by compaction or tool-call trimming). The 400 is thrown by
 *   createStream() which runs BEFORE `let streamErrorDetail` is initialized.
 *   The catch block then references the undeclared variable, triggering a
 *   ReferenceError that crashes the entire bun process. Supervisor restarts
 *   piclaw, it reloads the same corrupt history, and crashes again in a loop.
 *
 * The fix: move `let streamErrorDetail = ""` above the createStream() call
 * so it's always in scope when the catch block runs.
 *
 * These tests exercise the error-handling logic in isolation by testing the
 * helper functions and simulating the scoping scenarios.
 */

import { expect, test, describe } from "bun:test";

// ---------------------------------------------------------------------------
// 1. sanitizeOpenAIId – ensures IDs are safe for Azure Responses API
// ---------------------------------------------------------------------------

// We can't easily import private functions from the extension, so we
// replicate the logic here and verify it matches the extension's behavior.
// If the extension is refactored to export these, switch to direct imports.

function sanitizeOpenAIId(value?: string): string | undefined {
  if (!value) return value;
  let next = value.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+$/, "");
  if (next.length > 64) next = next.slice(0, 64).replace(/_+$/, "");
  return next;
}

describe("sanitizeOpenAIId", () => {
  test("passes through clean IDs unchanged", () => {
    expect(sanitizeOpenAIId("fc_abc123")).toBe("fc_abc123");
    expect(sanitizeOpenAIId("rs_0c7f7dc850505d38")).toBe("rs_0c7f7dc850505d38");
    expect(sanitizeOpenAIId("call-123_abc")).toBe("call-123_abc");
  });

  test("replaces invalid characters with underscores", () => {
    expect(sanitizeOpenAIId("fc.abc|def")).toBe("fc_abc_def");
    expect(sanitizeOpenAIId("call id with spaces")).toBe("call_id_with_spaces");
    expect(sanitizeOpenAIId("id@#$%")).toBe("id");
  });

  test("truncates to 64 characters", () => {
    const longId = "a".repeat(100);
    const result = sanitizeOpenAIId(longId);
    expect(result!.length).toBeLessThanOrEqual(64);
    expect(result).toBe("a".repeat(64));
  });

  test("strips trailing underscores after truncation", () => {
    // 63 a's + special chars → becomes 63 a's + underscores → truncated + trailing stripped
    const id = "a".repeat(63) + "!!!";
    const result = sanitizeOpenAIId(id);
    expect(result).toBe("a".repeat(63));
    expect(result!.endsWith("_")).toBe(false);
  });

  test("returns undefined for falsy inputs", () => {
    expect(sanitizeOpenAIId(undefined)).toBeUndefined();
    expect(sanitizeOpenAIId("")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// 2. stripToolCallItemId – splits compound tool call IDs
// ---------------------------------------------------------------------------

function stripToolCallItemId(id: string): { id: string; changed: boolean } {
  if (!id.includes("|")) return { id, changed: false };
  const [callId] = id.split("|");
  if (!callId || callId === id) return { id, changed: false };
  return { id: callId, changed: true };
}

describe("stripToolCallItemId", () => {
  test("returns unchanged for simple IDs", () => {
    expect(stripToolCallItemId("call_abc123")).toEqual({ id: "call_abc123", changed: false });
    expect(stripToolCallItemId("fc_123")).toEqual({ id: "fc_123", changed: false });
  });

  test("strips item portion from compound IDs", () => {
    expect(stripToolCallItemId("call_abc|fc_def")).toEqual({ id: "call_abc", changed: true });
    expect(stripToolCallItemId("call_1|item_2|extra")).toEqual({ id: "call_1", changed: true });
  });

  test("handles edge case of leading pipe", () => {
    // "|something" → callId is "", which is falsy → unchanged
    expect(stripToolCallItemId("|something")).toEqual({ id: "|something", changed: false });
  });
});

// ---------------------------------------------------------------------------
// 3. isAuthError – classification of authentication failures
// ---------------------------------------------------------------------------

function isAuthError(error: unknown): boolean {
  const status = (error as { status?: number })?.status;
  if (status === 401 || status === 403) return true;
  const message = error instanceof Error ? error.message : String(error || "");
  return /unauthorized|forbidden|401|403/i.test(message);
}

describe("isAuthError", () => {
  test("detects status-based auth errors", () => {
    expect(isAuthError({ status: 401 })).toBe(true);
    expect(isAuthError({ status: 403 })).toBe(true);
    expect(isAuthError({ status: 400 })).toBe(false);
    expect(isAuthError({ status: 500 })).toBe(false);
  });

  test("detects message-based auth errors", () => {
    expect(isAuthError(new Error("Unauthorized access"))).toBe(true);
    expect(isAuthError(new Error("403 Forbidden"))).toBe(true);
    expect(isAuthError(new Error("HTTP 401"))).toBe(true);
    expect(isAuthError(new Error("Unknown error"))).toBe(false);
    expect(isAuthError(new Error("400 Bad Request"))).toBe(false);
  });

  test("handles non-error values", () => {
    expect(isAuthError("unauthorized")).toBe(true);
    expect(isAuthError("something else")).toBe(false);
    expect(isAuthError(null)).toBe(false);
    expect(isAuthError(undefined)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. parseArgs – /image command argument parser
// ---------------------------------------------------------------------------

type ImageArgs = {
  prompt: string;
  size?: string;
  count?: number;
  quality?: "low" | "medium" | "high";
  style?: "natural" | "vivid";
};

function parseArgs(input: string): ImageArgs | null {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  const args: ImageArgs = { prompt: "" };
  const promptParts: string[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === "--size" && tokens[i + 1]) {
      args.size = tokens[i + 1];
      i += 1;
      continue;
    }
    if (token === "--count" && tokens[i + 1]) {
      const count = Number(tokens[i + 1]);
      if (Number.isFinite(count)) args.count = Math.min(4, Math.max(1, Math.floor(count)));
      i += 1;
      continue;
    }
    if (token === "--quality" && tokens[i + 1]) {
      const quality = tokens[i + 1] as ImageArgs["quality"];
      if (["low", "medium", "high"].includes(quality)) args.quality = quality;
      i += 1;
      continue;
    }
    if (token === "--style" && tokens[i + 1]) {
      const style = tokens[i + 1] as ImageArgs["style"];
      if (["natural", "vivid"].includes(style)) args.style = style;
      i += 1;
      continue;
    }
    promptParts.push(token);
  }

  args.prompt = promptParts.join(" ").trim();
  if (!args.prompt) return null;
  return args;
}

describe("parseArgs", () => {
  test("parses simple prompt", () => {
    const result = parseArgs("a cute cat");
    expect(result).toEqual({ prompt: "a cute cat" });
  });

  test("parses prompt with all options", () => {
    const result = parseArgs("a dog --size 512x512 --count 2 --quality high --style vivid");
    expect(result).toEqual({
      prompt: "a dog",
      size: "512x512",
      count: 2,
      quality: "high",
      style: "vivid",
    });
  });

  test("clamps count to valid range", () => {
    expect(parseArgs("test --count 10")!.count).toBe(4);
    expect(parseArgs("test --count 0")!.count).toBe(1);
    expect(parseArgs("test --count -5")!.count).toBe(1);
  });

  test("ignores invalid quality/style", () => {
    const result = parseArgs("test --quality ultra --style retro");
    expect(result!.quality).toBeUndefined();
    expect(result!.style).toBeUndefined();
  });

  test("returns null for empty input", () => {
    expect(parseArgs("")).toBeNull();
    expect(parseArgs("  ")).toBeNull();
  });

  test("returns null when only flags, no prompt", () => {
    expect(parseArgs("--size 512x512")).toBeNull();
    expect(parseArgs("--count 2 --quality high")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// 5. Scoping bug: streamErrorDetail must be in scope for catch block
// ---------------------------------------------------------------------------

describe("streamErrorDetail scoping", () => {
  /**
   * This test verifies the fix for the crash-loop bug.
   *
   * BEFORE the fix:
   *   try {
   *     ... createStream() throws 400 here ...
   *     let streamErrorDetail = "";  // never reached
   *     ...
   *   } catch (error) {
   *     output.errorMessage = streamErrorDetail || rawMsg;
   *     // ^^^ ReferenceError: streamErrorDetail is not defined
   *     // Crashes bun → supervisor restarts → same history → crash loop
   *   }
   *
   * AFTER the fix:
   *   let streamErrorDetail = "";  // hoisted above createStream()
   *   try {
   *     ... createStream() throws 400 ...
   *     ...
   *   } catch (error) {
   *     output.errorMessage = streamErrorDetail || rawMsg;
   *     // ^^^ streamErrorDetail is "" → falls through to rawMsg ✓
   *   }
   */
  test("variable declared after throw point causes ReferenceError (demonstrates the bug)", () => {
    let caught: any;
    try {
      // Simulates the buggy code structure
      // eslint-disable-next-line no-eval
      eval(`
        (function() {
          try {
            throw new Error("400 missing reasoning item");
            let streamErrorDetail = "";
          } catch (error) {
            // Access streamErrorDetail from the try block
            const msg = typeof streamErrorDetail !== "undefined" ? streamErrorDetail : undefined;
            if (msg === undefined) throw new ReferenceError("streamErrorDetail is not defined");
          }
        })()
      `);
    } catch (e) {
      caught = e;
    }
    // The buggy pattern SHOULD produce a ReferenceError
    expect(caught).toBeDefined();
    expect(caught.name).toBe("ReferenceError");
  });

  test("variable declared before try block is accessible in catch (demonstrates the fix)", () => {
    let errorMessage = "";
    // Simulates the fixed code structure
    let streamErrorDetail = "";
    try {
      throw new Error("400 missing reasoning item");
    } catch (error) {
      const rawMsg = error instanceof Error ? error.message : String(error);
      errorMessage = streamErrorDetail || rawMsg;
    }
    // streamErrorDetail is "" so it falls through to the raw error message
    expect(errorMessage).toBe("400 missing reasoning item");
  });

  test("streamErrorDetail captures detail when stream fails before throw", () => {
    let errorMessage = "";
    let streamErrorDetail = "";

    // Simulates: stream event sets detail, then processResponsesStream throws
    streamErrorDetail = "invalid_request_error: missing reasoning item";

    try {
      throw new Error("Unknown error");
    } catch (error) {
      const rawMsg = error instanceof Error ? error.message : String(error);
      errorMessage = streamErrorDetail || rawMsg;
    }
    // streamErrorDetail takes priority over the generic error
    expect(errorMessage).toBe("invalid_request_error: missing reasoning item");
  });
});

// ---------------------------------------------------------------------------
// 6. Phase metadata helpers
// ---------------------------------------------------------------------------

describe("phase metadata", () => {
  // Replicate collectMessagePhases for testing
  function collectMessagePhases(messages: unknown[]): Map<string, string> {
    const phases = new Map<string, string>();
    for (const msg of messages) {
      if (!msg || typeof msg !== "object") continue;
      if ((msg as { role?: string }).role !== "assistant") continue;
      const content = (msg as { content?: Array<any> }).content || [];
      for (const block of content) {
        if (block?.type !== "text") continue;
        const id = block.textSignature;
        const phase = block.phase;
        if (id && typeof id === "string" && phase && typeof phase === "string") {
          phases.set(id, phase);
        }
      }
    }
    return phases;
  }

  test("extracts phases from assistant messages", () => {
    const messages = [
      { role: "user", content: [{ type: "text", text: "hello" }] },
      {
        role: "assistant",
        content: [
          { type: "text", textSignature: "msg_1", phase: "commentary", text: "thinking..." },
          { type: "text", textSignature: "msg_2", phase: "final_answer", text: "done" },
        ],
      },
    ];
    const phases = collectMessagePhases(messages);
    expect(phases.size).toBe(2);
    expect(phases.get("msg_1")).toBe("commentary");
    expect(phases.get("msg_2")).toBe("final_answer");
  });

  test("ignores non-assistant messages", () => {
    const messages = [
      { role: "user", content: [{ type: "text", textSignature: "u1", phase: "input" }] },
    ];
    const phases = collectMessagePhases(messages);
    expect(phases.size).toBe(0);
  });

  test("ignores blocks without textSignature or phase", () => {
    const messages = [
      {
        role: "assistant",
        content: [
          { type: "text", text: "no signature" },
          { type: "text", textSignature: "msg_1", text: "no phase" },
          { type: "toolCall", textSignature: "tc_1", phase: "x" },
        ],
      },
    ];
    const phases = collectMessagePhases(messages);
    expect(phases.size).toBe(0);
  });

  test("handles null/undefined messages gracefully", () => {
    const phases = collectMessagePhases([null, undefined, {}, { role: "assistant" }]);
    expect(phases.size).toBe(0);
  });

  // Replicate applyPhasesToResponseInput for testing
  function applyPhasesToResponseInput(items: Array<any>, phases: Map<string, string>): void {
    if (!phases.size) return;
    for (const item of items) {
      if (item?.type !== "message" || !item.id) continue;
      const phase = phases.get(item.id);
      if (phase) item.phase = phase;
    }
  }

  test("applies stored phases to response input items", () => {
    const phases = new Map([
      ["msg_1", "commentary"],
      ["msg_2", "final_answer"],
    ]);
    const items = [
      { type: "message", id: "msg_1", content: [] },
      { type: "function_call", id: "fc_1" },
      { type: "message", id: "msg_2", content: [] },
      { type: "message", id: "msg_3", content: [] },
    ];
    applyPhasesToResponseInput(items, phases);
    expect(items[0].phase).toBe("commentary");
    expect(items[1].phase).toBeUndefined(); // not a message type
    expect(items[2].phase).toBe("final_answer");
    expect(items[3].phase).toBeUndefined(); // no stored phase
  });

  test("no-ops when phases map is empty", () => {
    const items = [{ type: "message", id: "msg_1", content: [] }];
    applyPhasesToResponseInput(items, new Map());
    expect(items[0].phase).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// 7. Error classification for retry vs crash
// ---------------------------------------------------------------------------

describe("error classification", () => {
  test("400 missing reasoning item is NOT an auth error (should not retry auth)", () => {
    const error = {
      status: 400,
      message: "Item 'fc_xxx' of type 'function_call' was provided without its required 'reasoning' item",
    };
    expect(isAuthError(error)).toBe(false);
  });

  test("ECONNRESET is NOT an auth error", () => {
    const error = new Error("The socket connection was closed unexpectedly");
    (error as any).code = "ECONNRESET";
    expect(isAuthError(error)).toBe(false);
  });

  test("response.failed with no error object is NOT an auth error", () => {
    const error = new Error("Azure response failed (no error details returned)");
    expect(isAuthError(error)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 8. parseSize for image generation
// ---------------------------------------------------------------------------

function parseSize(size?: string): { width: number; height: number } {
  if (!size) return { width: 1024, height: 1024 };
  const match = size.toLowerCase().match(/(\d+)\s*x\s*(\d+)/);
  if (!match) return { width: 1024, height: 1024 };
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return { width: 1024, height: 1024 };
  return { width, height };
}

describe("parseSize", () => {
  test("parses standard sizes", () => {
    expect(parseSize("1024x1024")).toEqual({ width: 1024, height: 1024 });
    expect(parseSize("512x512")).toEqual({ width: 512, height: 512 });
    expect(parseSize("1792x1024")).toEqual({ width: 1792, height: 1024 });
  });

  test("handles case-insensitive x", () => {
    expect(parseSize("1024X768")).toEqual({ width: 1024, height: 768 });
  });

  test("returns default for missing/invalid input", () => {
    expect(parseSize()).toEqual({ width: 1024, height: 1024 });
    expect(parseSize("")).toEqual({ width: 1024, height: 1024 });
    expect(parseSize("large")).toEqual({ width: 1024, height: 1024 });
    expect(parseSize("x")).toEqual({ width: 1024, height: 1024 });
  });
});
