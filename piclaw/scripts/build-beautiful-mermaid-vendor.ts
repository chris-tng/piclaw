#!/usr/bin/env bun
/**
 * Build the vendored beautiful-mermaid browser bundle and write deterministic
 * metadata alongside it so the checked-in artifact can be audited and updated
 * reproducibly.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);

/** Read a CLI argument by flag name. */
function getArg(name: string): string | undefined {
  const index = args.indexOf(name);
  if (index >= 0 && index + 1 < args.length) {
    const value = args[index + 1];
    if (!value.startsWith("--")) return value;
  }
  return undefined;
}

const projectDir = process.cwd();
const entryFile = join(projectDir, "web/src/vendor/mermaid-entry.ts");
const packageFile = join(projectDir, "node_modules/beautiful-mermaid/package.json");
const outFile = resolve(projectDir, getArg("--outfile") || "web/static/js/vendor/beautiful-mermaid.js");
const metaFile = resolve(projectDir, getArg("--meta-out") || "web/static/js/vendor/beautiful-mermaid.meta.json");

if (!existsSync(entryFile)) {
  console.error(`[mermaid-vendor] Missing entry file: ${entryFile}`);
  process.exit(1);
}

if (!existsSync(packageFile)) {
  console.error("[mermaid-vendor] beautiful-mermaid is not installed.");
  console.error("[mermaid-vendor] Run `BUN_INSTALL_CACHE_DIR=/workspace/.cache/bun bun install` or `bun run update:vendor:mermaid --version <version>`.");
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packageFile, "utf8")) as {
  name?: string;
  version?: string;
  license?: string;
  repository?: string | { url?: string };
  homepage?: string;
};

mkdirSync(dirname(outFile), { recursive: true });
mkdirSync(dirname(metaFile), { recursive: true });

const buildArgs = [
  "bun",
  "build",
  relative(projectDir, entryFile),
  "--target=browser",
  "--minify",
  "--outfile",
  outFile,
];

const build = Bun.spawnSync(buildArgs, {
  cwd: projectDir,
  stdout: "pipe",
  stderr: "pipe",
  env: process.env,
});

const stdout = build.stdout.toString();
const stderr = build.stderr.toString();
if (build.exitCode !== 0) {
  process.stderr.write(stdout);
  process.stderr.write(stderr);
  process.exit(build.exitCode || 1);
}

const bundle = readFileSync(outFile);
const sha256 = createHash("sha256").update(bundle).digest("hex");
const metadata = {
  package_name: packageJson.name || "beautiful-mermaid",
  package_version: packageJson.version || "unknown",
  package_license: packageJson.license || "unknown",
  package_repository:
    typeof packageJson.repository === "string"
      ? packageJson.repository
      : packageJson.repository?.url || packageJson.homepage || null,
  source_entry: relative(projectDir, entryFile),
  output_file: relative(projectDir, outFile),
  build_command: [
    "bun",
    "build",
    relative(projectDir, entryFile),
    "--target=browser",
    "--minify",
    "--outfile",
    relative(projectDir, outFile),
  ],
  sha256,
  size_bytes: bundle.byteLength,
};

writeFileSync(metaFile, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
process.stdout.write(
  [
    `[mermaid-vendor] built ${relative(projectDir, outFile)}`,
    `[mermaid-vendor] version ${metadata.package_version}`,
    `[mermaid-vendor] sha256 ${sha256}`,
    `[mermaid-vendor] metadata ${relative(projectDir, metaFile)}`,
  ].join("\n"),
);
