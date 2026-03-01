import { afterEach, expect, test } from "bun:test";

import { getTestWorkspace, importFresh, setEnv } from "../../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("workspace tree cache reuses responses briefly", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const { WorkspaceService } = await importFresh<typeof import("../src/channels/web/workspace/service.js")>(
    "../src/channels/web/workspace/service.js"
  );

  const service = new WorkspaceService();
  const first = service.getTree("", "2", false);
  const second = service.getTree("", "2", false);
  expect(first.status).toBe(200);
  expect(second.status).toBe(200);
  expect(second.body).toBe(first.body);

  await new Promise((resolve) => setTimeout(resolve, 1100));
  const third = service.getTree("", "2", false);
  expect(third.status).toBe(200);
  expect(third.body).not.toBe(first.body);
});

test("workspace update throttle delays bursts", async () => {
  const { createWorkspaceUpdateThrottle } = await import(
    "../../../src/channels/web/workspace/service.js"
  );

  const updates: Array<Array<{ path: string }>> = [];
  const throttler = createWorkspaceUpdateThrottle((batch) => {
    updates.push(batch as Array<{ path: string }>);
  }, 50);

  throttler.schedule([{ path: "a", root: {}, truncated: false }]);
  throttler.schedule([{ path: "b", root: {}, truncated: false }]);

  expect(updates.length).toBe(1);
  expect(updates[0][0].path).toBe("a");

  await new Promise((resolve) => setTimeout(resolve, 80));
  expect(updates.length).toBe(2);
  expect(updates[1][0].path).toBe("b");

  throttler.clear();
});
