/**
 * test/scripts/beautiful-mermaid-vendor.test.ts – Smoke tests for the
 * checked-in beautiful-mermaid vendor build path.
 */

import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("beautiful-mermaid vendor build script writes bundle + metadata deterministically", () => {
  const base = join(tmpdir(), `piclaw-mermaid-vendor-${Date.now()}`);
  const outFile = join(base, "beautiful-mermaid.js");
  const metaFile = join(base, "beautiful-mermaid.meta.json");
  mkdirSync(base, { recursive: true });

  const proc = Bun.spawnSync(
    [
      "bun",
      "/workspace/piclaw/piclaw/scripts/build-beautiful-mermaid-vendor.ts",
      "--outfile",
      outFile,
      "--meta-out",
      metaFile,
    ],
    {
      cwd: "/workspace/piclaw/piclaw",
      stdout: "pipe",
      stderr: "pipe",
    },
  );

  if (proc.exitCode !== 0) {
    throw new Error(`${proc.stdout.toString()}\n${proc.stderr.toString()}`.trim());
  }

  expect(existsSync(outFile)).toBe(true);
  expect(existsSync(metaFile)).toBe(true);

  const bundle = readFileSync(outFile);
  const meta = JSON.parse(readFileSync(metaFile, "utf8")) as {
    package_name: string;
    package_version: string;
    output_file: string;
    source_entry: string;
    sha256: string;
    size_bytes: number;
  };

  const installed = JSON.parse(
    readFileSync("/workspace/piclaw/piclaw/node_modules/beautiful-mermaid/package.json", "utf8"),
  ) as { version: string };

  expect(meta.package_name).toBe("beautiful-mermaid");
  expect(meta.package_version).toBe(installed.version);
  expect(meta.source_entry).toBe("web/src/vendor/mermaid-entry.ts");
  expect(meta.output_file.endsWith("beautiful-mermaid.js")).toBe(true);
  expect(meta.size_bytes).toBe(bundle.byteLength);
  expect(meta.sha256).toBe(createHash("sha256").update(bundle).digest("hex"));
  expect(bundle.toString("utf8")).toContain("globalThis.beautifulMermaid");

  rmSync(base, { recursive: true, force: true });
});
