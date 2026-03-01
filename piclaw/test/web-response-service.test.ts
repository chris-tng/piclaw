import { expect, test } from "bun:test";

import { ResponseService } from "../src/channels/web/response-service.js";


test("response service wraps json and static helpers", async () => {
  const service = new ResponseService();

  const json = service.json({ ok: true }, 201);
  expect(json.status).toBe(201);
  expect(await json.json()).toEqual({ ok: true });

  const clamped = service.clampInt("5", 1, 1, 4);
  expect(clamped).toBe(4);
  expect(service.parseOptionalInt("12")).toBe(12);
  expect(service.parseOptionalInt(null)).toBeNull();

  const staticRes = await service.serveStatic("index.html");
  expect(staticRes.status).toBe(200);
  expect(staticRes.headers.get("Content-Type")).toContain("text/html");
});
