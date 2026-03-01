import { expect, test } from "bun:test";

import { executeSlashCommand } from "../../src/agent-pool/slash-command.js";

class SlashSession {
  listeners: Array<(event: any) => void> = [];
  resourceLoader = {
    getSkills: () => ({ skills: [{ name: "demo", description: "Demo skill" }] }),
  };
  promptTemplates = [{ name: "template", description: "Template" }];
  extensionRunner = {
    getCommand: (name: string) => (name === "ext" ? { name: "ext" } : null),
  };
  aborted = false;

  subscribe(fn: (event: any) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== fn);
    };
  }

  async prompt(_rawText: string) {
    for (const listener of this.listeners) {
      listener({
        type: "message_update",
        assistantMessageEvent: { type: "text_delta", delta: "Hello " },
      });
      listener({
        type: "message_end",
        message: { role: "assistant", content: [{ type: "text", text: "Hello world" }] },
      });
    }
  }

  async abort() {
    this.aborted = true;
  }
}

test("executeSlashCommand runs known extension command", async () => {
  const session = new SlashSession();
  const result = await executeSlashCommand(session as any, "web:default", "/ext");
  expect(result.status).toBe("success");
  expect(result.message).toContain("Hello world");
});

test("executeSlashCommand rejects unknown command", async () => {
  const session = new SlashSession();
  const result = await executeSlashCommand(session as any, "web:default", "/unknown");
  expect(result.status).toBe("error");
  expect(result.message).toContain("Unknown command");
});

test("executeSlashCommand validates skill commands", async () => {
  const session = new SlashSession();
  const result = await executeSlashCommand(session as any, "web:default", "/skill:demo");
  expect(result.status).toBe("success");
  expect(result.message).toContain("Hello world");

  const bad = await executeSlashCommand(session as any, "web:default", "/skill:missing");
  expect(bad.status).toBe("error");
  expect(bad.message).toContain("Unknown skill");
});
