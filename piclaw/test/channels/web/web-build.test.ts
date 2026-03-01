import { expect, test } from "bun:test";
import { existsSync } from "fs";
import { join } from "path";

function projectRoot(): string {
  return join(import.meta.dir, "..", "..", "..");
}

test("build:web produces static assets", async () => {
  const root = projectRoot();
  const proc = Bun.spawn(["bun", "run", "build:web"], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  });

  const exitCode = await proc.exited;
  expect(exitCode).toBe(0);

  const appPath = join(root, "web", "static", "js", "app.js");
  const apiPath = join(root, "web", "static", "js", "api.js");
  expect(existsSync(appPath)).toBe(true);
  expect(existsSync(apiPath)).toBe(true);
});
