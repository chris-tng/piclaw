import { expect, test } from "bun:test";

import { getChatChannel, getChatContext, getChatJid, withChatContext } from "../../src/core/chat-context.js";

test("chat context scopes values", async () => {
  expect(getChatContext()).toBeNull();
  expect(getChatJid()).toBe("web:default");
  expect(getChatChannel()).toBe("web");

  await withChatContext("web:test", "web", async () => {
    expect(getChatJid()).toBe("web:test");
    expect(getChatChannel()).toBe("web");
  });

  expect(getChatContext()).toBeNull();
  expect(getChatJid("fallback")).toBe("fallback");
});
