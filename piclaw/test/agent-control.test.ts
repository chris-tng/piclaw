import { expect, test } from "bun:test";
import type { ThinkingLevel } from "@mariozechner/pi-agent-core";
import { applyControlCommand, parseControlCommand } from "../src/agent-control.js";

const modelReasoning = { provider: "openai", id: "gpt-test", reasoning: true } as any;
const modelSimple = { provider: "anthropic", id: "claude-test", reasoning: false } as any;

class StubSession {
  model: any = modelReasoning;
  thinkingLevel: ThinkingLevel = "low";
  reloadCalls = 0;
  abortCalls = 0;

  async setModel(model: any) {
    this.model = model;
  }

  async reload() {
    this.reloadCalls += 1;
  }

  async abort() {
    this.abortCalls += 1;
  }

  setThinkingLevel(level: ThinkingLevel) {
    const available = this.getAvailableThinkingLevels();
    this.thinkingLevel = available.includes(level) ? level : available[0];
  }

  supportsThinking() {
    return !!this.model?.reasoning;
  }

  getAvailableThinkingLevels(): ThinkingLevel[] {
    return this.supportsThinking()
      ? (["off", "low", "medium", "high"] as ThinkingLevel[])
      : (["off"] as ThinkingLevel[]);
  }
}

const registry = {
  refresh: () => {},
  getAll: () => [modelReasoning, modelSimple],
  getAvailable: () => [modelReasoning, modelSimple],
} as any;

test("parseControlCommand parses model and thinking commands", () => {
  const modelCmd = parseControlCommand("@PiClaw /model openai/gpt-test", /(?:^|\s)@PiClaw\b/i);
  expect(modelCmd?.type).toBe("model");
  expect(modelCmd && "provider" in modelCmd ? modelCmd.provider : null).toBe("openai");
  expect(modelCmd && "modelId" in modelCmd ? modelCmd.modelId : null).toBe("gpt-test");

  const thinkingCmd = parseControlCommand("/thinking high");
  expect(thinkingCmd?.type).toBe("thinking");
  expect(thinkingCmd && "level" in thinkingCmd ? thinkingCmd.level : null).toBe("high");

  const restartCmd = parseControlCommand("/restart");
  expect(restartCmd?.type).toBe("restart");
});

test("applyControlCommand switches model and thinking level", async () => {
  const session = new StubSession();
  session.model = modelSimple;
  session.thinkingLevel = "off";

  const modelResult = await applyControlCommand(session as any, registry, {
    type: "model",
    provider: "openai",
    modelId: "gpt-test",
    raw: "/model openai/gpt-test",
  });

  expect(modelResult.status).toBe("success");
  expect(session.model).toBe(modelReasoning);
  expect(modelResult.message).toContain("openai/gpt-test");
  expect(session.reloadCalls).toBe(1);

  const thinkingResult = await applyControlCommand(session as any, registry, {
    type: "thinking",
    level: "high",
    raw: "/thinking high",
  });

  expect(thinkingResult.status).toBe("success");
  expect(session.thinkingLevel).toBe("high");
  expect(session.reloadCalls).toBe(2);
});

test("applyControlCommand reports unsupported thinking", async () => {
  const session = new StubSession();
  session.model = modelSimple;

  const result = await applyControlCommand(session as any, registry, {
    type: "thinking",
    level: "high",
    raw: "/thinking high",
  });

  expect(result.status).toBe("error");
  expect(session.thinkingLevel).toBe("off");
});

test("applyControlCommand restarts agent", async () => {
  const session = new StubSession();

  const result = await applyControlCommand(session as any, registry, {
    type: "restart",
    raw: "/restart",
  });

  expect(result.status).toBe("success");
  expect(session.abortCalls).toBe(1);
  expect(session.reloadCalls).toBe(1);
  expect(result.message).toContain("Agent restarted");
});

test("applyControlCommand lists models when /model has no args", async () => {
  const session = new StubSession();

  const result = await applyControlCommand(session as any, registry, {
    type: "model",
    raw: "/model",
  });

  expect(result.status).toBe("success");
  expect(result.message).toContain("Available models:");
  expect(result.message).toContain("openai/gpt-test (current)");
});
