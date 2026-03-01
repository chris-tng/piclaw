import { describe, test, expect } from "bun:test";
import { UiBridge } from "../../../src/channels/web/ui-bridge.js";
import { bindSessionUiContext, createUiContext } from "../../../src/channels/web/ui-context.js";

function makeChannel() {
  const events: Array<{ type: string; payload: any }> = [];
  const channel = {
    broadcastEvent: (type: string, payload: any) => events.push({ type, payload }),
  };
  const uiBridge = new UiBridge(channel as any);
  (channel as any).uiBridge = uiBridge;
  return { channel, events, uiBridge };
}

describe("ui-context", () => {
  test("createUiContext handles confirm/input/editor and editor updates", async () => {
    const { channel, events, uiBridge } = makeChannel();
    const ui = createUiContext(channel as any, "web:default");

    const confirmPromise = ui.confirm("Confirm", "Are you sure?", { timeout: 50 });
    let requestId = Array.from(uiBridge.pendingUiRequests.keys())[0] as string;
    let pending = uiBridge.pendingUiRequests.get(requestId)!;
    clearTimeout(pending.timeoutId);
    uiBridge.pendingUiRequests.delete(requestId);
    pending.resolve(true);
    expect(await confirmPromise).toBe(true);

    const inputPromise = ui.input("Input", "Type here", { timeout: 50 });
    requestId = Array.from(uiBridge.pendingUiRequests.keys())[0] as string;
    pending = uiBridge.pendingUiRequests.get(requestId)!;
    clearTimeout(pending.timeoutId);
    uiBridge.pendingUiRequests.delete(requestId);
    pending.resolve("hello");
    expect(await inputPromise).toBe("hello");

    const editorPromise = ui.editor("Editor", "prefill");
    requestId = Array.from(uiBridge.pendingUiRequests.keys())[0] as string;
    pending = uiBridge.pendingUiRequests.get(requestId)!;
    clearTimeout(pending.timeoutId);
    uiBridge.pendingUiRequests.delete(requestId);
    pending.resolve("edited");
    expect(await editorPromise).toBe("edited");

    ui.setStatus("key", "Working");
    ui.setWorkingMessage("Busy");
    ui.setTitle("Title");
    ui.setWidget("widget", [{ type: "text", text: "hi" }], { compact: true });

    ui.setEditorText("Alpha");
    expect(ui.getEditorText()).toBe("Alpha");
    ui.pasteToEditor("Beta");
    expect(ui.getEditorText()).toBe("AlphaBeta");

    const eventTypes = events.map((event) => event.type);
    expect(eventTypes).toContain("extension_ui_status");
    expect(eventTypes).toContain("extension_ui_working");
    expect(eventTypes).toContain("extension_ui_title");
    expect(eventTypes).toContain("extension_ui_widget");
    expect(eventTypes).toContain("extension_ui_editor_text");
  });

  test("createUiContext timeout resolves undefined", async () => {
    const { channel, events, uiBridge } = makeChannel();
    const ui = createUiContext(channel as any, "web:default");

    const selectPromise = ui.select("Pick", ["a", "b"], { timeout: 10 });
    await Bun.sleep(20);
    expect(await selectPromise).toBeUndefined();

    const timeoutEvent = events.find((event) => event.type === "extension_ui_timeout");
    expect(timeoutEvent).toBeDefined();
    expect(uiBridge.pendingUiRequests.size).toBe(0);
  });

  test("bindSessionUiContext wires command actions", async () => {
    const { channel, events } = makeChannel();
    let boundArgs: any = null;
    let reloadCalled = false;
    let subscribeCalled = false;

    const session = {
      isStreaming: true,
      subscribe: (cb: (event: any) => void) => {
        subscribeCalled = true;
        const timer = setTimeout(() => cb({ type: "agent_end" }), 0);
        return () => clearTimeout(timer);
      },
      bindExtensions: async (args: any) => {
        boundArgs = args;
      },
      newSession: async () => true,
      fork: async () => ({ cancelled: false }),
      navigateTree: async () => ({ cancelled: true }),
      switchSession: async () => false,
      reload: async () => {
        reloadCalled = true;
      },
    } as any;

    await bindSessionUiContext(channel as any, session, "web:default");
    expect(boundArgs).toBeDefined();

    const actions = boundArgs.commandContextActions;
    await actions.waitForIdle();
    expect(subscribeCalled).toBe(true);
    expect(await actions.newSession({})).toEqual({ cancelled: false });
    expect(await actions.fork("abc")).toEqual({ cancelled: false });
    expect(await actions.navigateTree("abc", {})).toEqual({ cancelled: true });
    expect(await actions.switchSession("path")).toEqual({ cancelled: true });
    await actions.reload();
    expect(reloadCalled).toBe(true);

    const originalError = console.error;
    console.error = () => {};
    boundArgs.onError(new Error("boom"));
    console.error = originalError;
    const errorEvent = events.find((event) => event.type === "extension_ui_error");
    expect(errorEvent).toBeDefined();
  });

  test("bindSessionUiContext ignores non-web chats", async () => {
    const { channel } = makeChannel();
    let bindCalled = false;
    const session = {
      isStreaming: false,
      bindExtensions: async () => {
        bindCalled = true;
      },
    } as any;

    await bindSessionUiContext(channel as any, session, "whatsapp:123");
    expect(bindCalled).toBe(false);
  });
});
