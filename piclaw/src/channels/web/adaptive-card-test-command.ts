/**
 * web/adaptive-card-test-command.ts – Local /test-card command for web validation.
 *
 * Emits built-in Adaptive Card examples without routing through the agent.
 */

function makeCardId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export interface AdaptiveCardTestCommandResult {
  status: "success" | "error";
  message: string;
  variant?: string;
  emit?: boolean;
  content: string;
  contentBlocks?: Array<Record<string, unknown>>;
}

function buildBasicCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-basic");
  return {
    status: "success",
    variant: "basic",
    message: "Emitted basic Adaptive Card test message.",
    content: "Adaptive Card test: basic.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: basic.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Adaptive Card test", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Basic validation card emitted by /test-card.", wrap: true },
            {
              type: "FactSet",
              facts: [
                { title: "Variant", value: "basic" },
                { title: "Purpose", value: "persistent validation" },
              ],
            },
          ],
          actions: [
            { type: "Action.Submit", title: "Primary action", data: { variant: "basic", choice: "primary" } },
            { type: "Action.OpenUrl", title: "Docs", url: "https://adaptivecards.io/" },
          ],
        },
      },
    ],
  };
}

function buildChoicesCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-choices");
  return {
    status: "success",
    variant: "choices",
    message: "Emitted multi-choice Adaptive Card test message.",
    content: "Adaptive Card test: choices.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: choices.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Choice test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate multi-choice styling and structured submit payloads.", wrap: true },
            {
              type: "Input.ChoiceSet",
              id: "priority",
              label: "Priority",
              style: "expanded",
              choices: [
                { title: "Low", value: "low" },
                { title: "Medium", value: "medium" },
                { title: "High", value: "high" },
              ],
            },
            {
              type: "Input.ChoiceSet",
              id: "targets",
              label: "Targets",
              isMultiSelect: true,
              style: "expanded",
              choices: [
                { title: "Docs", value: "docs" },
                { title: "Tests", value: "tests" },
                { title: "Release", value: "release" },
              ],
            },
            {
              type: "Input.Toggle",
              id: "confirm",
              title: "I understand this will submit structured card data",
              value: "yes",
            },
          ],
          actions: [
            { type: "Action.Submit", title: "Submit choices", data: { variant: "choices" } },
          ],
        },
      },
    ],
  };
}

function buildApprovalCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-approval");
  return {
    status: "success",
    variant: "approval",
    message: "Emitted multi-action approval Adaptive Card test message.",
    content: "Adaptive Card test: approval.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: approval.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Approval test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate multiple Action.Submit buttons in a single card.", wrap: true },
          ],
          actions: [
            { type: "Action.Submit", title: "Approve", data: { variant: "approval", decision: "approve" } },
            { type: "Action.Submit", title: "Reject", data: { variant: "approval", decision: "reject" } },
            { type: "Action.Submit", title: "Revise", data: { variant: "approval", decision: "revise" } },
          ],
        },
      },
    ],
  };
}

function buildCompletedCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-completed");
  return {
    status: "success",
    variant: "completed",
    message: "Emitted completed Adaptive Card test message.",
    content: "Adaptive Card test: completed.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "completed",
        completed_at: new Date().toISOString(),
        last_submission: {
          title: "Submit choices",
          data: { priority: "high", targets: ["docs", "tests"], confirm: true },
        },
        fallback_text: "Adaptive Card test: completed.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Completed card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate completed-state styling and banners.", wrap: true },
          ],
          actions: [
            { type: "Action.Submit", title: "This should be hidden", data: { variant: "completed" } },
          ],
        },
      },
    ],
  };
}

function buildFailedCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-failed");
  return {
    status: "success",
    variant: "failed",
    message: "Emitted failed Adaptive Card test message.",
    content: "Adaptive Card test: failed.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "failed",
        last_submission: {
          title: "Submit choices",
          data: { priority: "medium", targets: ["release"] },
        },
        fallback_text: "Adaptive Card test: failed.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Failed card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate failed-state styling.", wrap: true },
          ],
        },
      },
    ],
  };
}

function buildCancelledCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-cancelled");
  return {
    status: "success",
    variant: "cancelled",
    message: "Emitted cancelled Adaptive Card test message.",
    content: "Adaptive Card test: cancelled.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "cancelled",
        last_submission: {
          title: "Cancel",
          data: { reason: "user cancelled" },
        },
        fallback_text: "Adaptive Card test: cancelled.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Cancelled card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate cancelled-state styling.", wrap: true },
          ],
        },
      },
    ],
  };
}

function buildBadUrlCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-bad-url");
  return {
    status: "success",
    variant: "bad-url",
    message: "Emitted bad-url Adaptive Card test message.",
    content: "Adaptive Card test: bad-url.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: bad-url.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Bad URL test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate inline error handling for invalid Action.OpenUrl links.", wrap: true },
          ],
          actions: [
            { type: "Action.OpenUrl", title: "Open invalid URL", url: "javascript:alert(1)" },
          ],
        },
      },
    ],
  };
}

function buildSubmitErrorCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-submit-error");
  return {
    status: "success",
    variant: "submit-error",
    message: "Emitted submit-error Adaptive Card test message.",
    content: "Adaptive Card test: submit-error.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: submit-error.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Submit error test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate inline error handling for failed Action.Submit requests.", wrap: true },
          ],
          actions: [
            {
              type: "Action.Submit",
              title: "Trigger submit error",
              data: { variant: "submit-error", __test_error: "submit" },
            },
          ],
        },
      },
    ],
  };
}

function buildStayOpenCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-stay-open");
  return {
    status: "success",
    variant: "stay-open",
    message: "Emitted stay-open Adaptive Card test message.",
    content: "Adaptive Card test: stay-open.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        submit_behavior: "keep_active",
        fallback_text: "Adaptive Card test: stay-open.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Stay-open test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate Action.Submit flows that should not auto-complete the card.", wrap: true },
            {
              type: "Input.Text",
              id: "note",
              label: "Optional note",
              placeholder: "Keeps the card active after submit",
            },
          ],
          actions: [
            {
              type: "Action.Submit",
              title: "Submit without closing",
              data: { variant: "stay-open" },
            },
          ],
        },
      },
    ],
  };
}

function buildTerminalActionsCard(): AdaptiveCardTestCommandResult {
  const cardId = makeCardId("test-card-terminal-actions");
  return {
    status: "success",
    variant: "terminal-actions",
    message: "Emitted terminal-actions Adaptive Card test message.",
    content: "Adaptive Card test: terminal-actions.",
    contentBlocks: [
      {
        type: "adaptive_card",
        card_id: cardId,
        schema_version: "1.5",
        state: "active",
        fallback_text: "Adaptive Card test: terminal-actions.",
        payload: {
          type: "AdaptiveCard",
          version: "1.5",
          body: [
            { type: "TextBlock", text: "Terminal state test card", weight: "Bolder", size: "Medium" },
            { type: "TextBlock", text: "Use this to validate completed/cancelled/failed transitions from live Action.Submit buttons.", wrap: true },
          ],
          actions: [
            { type: "Action.Submit", title: "Complete", data: { variant: "terminal-actions" } },
            { type: "Action.Submit", title: "Cancel", data: { variant: "terminal-actions", __card_state: "cancelled" } },
            { type: "Action.Submit", title: "Fail", data: { variant: "terminal-actions", __card_state: "failed" } },
          ],
        },
      },
    ],
  };
}

function buildHelpResult(): AdaptiveCardTestCommandResult {
  return {
    status: "success",
    variant: "list",
    emit: false,
    message: [
      "Available /test-card variants:",
      "• basic — simple action + link card",
      "• choices — multi-choice + toggle form card",
      "• approval — multiple Action.Submit buttons",
      "• completed — completed-state card with submission summary",
      "• failed — failed-state card styling sample",
      "• cancelled — cancelled-state card styling sample",
      "• bad-url — invalid Action.OpenUrl notice path",
      "• submit-error — failed Action.Submit notice path",
      "• stay-open — Action.Submit that keeps the card active",
      "• terminal-actions — live completed/cancelled/failed transitions",
      "",
      "Usage: /test-card <variant>",
    ].join("\n"),
    content: "Adaptive Card test command help.",
  };
}

const USAGE = "Usage: /test-card [basic|choices|approval|completed|failed|cancelled|bad-url|submit-error|stay-open|terminal-actions|list]";

export function handleAdaptiveCardTestCommand(rawText: string): AdaptiveCardTestCommandResult | null {
  const trimmed = rawText.trim();
  if (!trimmed.startsWith("/test-card")) return null;
  const [, ...rest] = trimmed.split(/\s+/);
  const variant = (rest[0] || "basic").trim().toLowerCase();

  if (variant === "list" || variant === "help") return buildHelpResult();
  if (variant === "basic") return buildBasicCard();
  if (variant === "choices") return buildChoicesCard();
  if (variant === "approval") return buildApprovalCard();
  if (variant === "completed") return buildCompletedCard();
  if (variant === "failed") return buildFailedCard();
  if (variant === "cancelled") return buildCancelledCard();
  if (variant === "bad-url") return buildBadUrlCard();
  if (variant === "submit-error") return buildSubmitErrorCard();
  if (variant === "stay-open") return buildStayOpenCard();
  if (variant === "terminal-actions") return buildTerminalActionsCard();

  return {
    status: "error",
    message: `Unknown test card variant: ${variant}. ${USAGE}`,
    content: "Adaptive Card test command error.",
  };
}
