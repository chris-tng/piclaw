/**
 * test/channels/web/web-build.test.ts – Build verification tests.
 *
 * Confirms that the web/static output directory contains the expected
 * JS, CSS, and HTML files after a build.
 */

import { expect, test } from "bun:test";
import "../../helpers.js";
import { existsSync } from "fs";
import { join } from "path";

function projectRoot(): string {
  return join(import.meta.dir, "..", "..", "..");
}

test("build:web produces bundle assets", async () => {
  const root = projectRoot();
  const proc = Bun.spawn(["bun", "run", "build:web"], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  });

  const exitCode = await proc.exited;
  expect(exitCode).toBe(0);

  const appBundlePath = join(root, "web", "static", "dist", "app.bundle.js");
  const appMapPath = join(root, "web", "static", "dist", "app.bundle.js.map");
  const loginBundlePath = join(root, "web", "static", "dist", "login.bundle.js");
  const loginMapPath = join(root, "web", "static", "dist", "login.bundle.js.map");

  expect(existsSync(appBundlePath)).toBe(true);
  expect(existsSync(appMapPath)).toBe(true);
  expect(existsSync(loginBundlePath)).toBe(true);
  expect(existsSync(loginMapPath)).toBe(true);
});
