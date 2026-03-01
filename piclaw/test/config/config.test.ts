import { expect, test, afterEach } from "bun:test";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv, importFresh } from "../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("loads pushover config from .piclaw/config.json", async () => {
  const ws = getTestWorkspace();

  const configDir = join(ws.workspace, ".piclaw");
  mkdirSync(configDir, { recursive: true });
  writeFileSync(
    join(configDir, "config.json"),
    JSON.stringify({
      pushover: {
        appToken: "app-token",
        userKey: "user-key",
        device: "device-1",
        priority: 2,
        sound: "ping",
      },
    }),
    "utf8"
  );

  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
    ASSISTANT_NAME: "",
  });

  await importFresh("../src/core/config.js");

  const cfg = await importFresh<typeof import("../src/core/config.js")>("../src/core/config.js");
  expect(cfg.PUSHOVER_APP_TOKEN).toBe("app-token");
  expect(cfg.PUSHOVER_USER_KEY).toBe("user-key");
  expect(cfg.PUSHOVER_DEVICE).toBe("device-1");
  expect(cfg.PUSHOVER_PRIORITY).toBe(2);
  expect(cfg.PUSHOVER_SOUND).toBe("ping");
});

test("env overrides config.json values", async () => {
  const ws = getTestWorkspace();

  const configDir = join(ws.workspace, ".piclaw");
  mkdirSync(configDir, { recursive: true });
  writeFileSync(
    join(configDir, "config.json"),
    JSON.stringify({
      PUSHOVER_APP_TOKEN: "config-token",
      PUSHOVER_USER_KEY: "config-user",
    }),
    "utf8"
  );

  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
    PUSHOVER_APP_TOKEN: "env-token",
    PUSHOVER_USER_KEY: "env-user",
  });

  const cfg = await importFresh<typeof import("../src/core/config.js")>("../src/core/config.js");
  expect(cfg.PUSHOVER_APP_TOKEN).toBe("env-token");
  expect(cfg.PUSHOVER_USER_KEY).toBe("env-user");
});
