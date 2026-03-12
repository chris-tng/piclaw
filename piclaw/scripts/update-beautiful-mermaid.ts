#!/usr/bin/env bun
/**
 * Rebuild or upgrade the vendored beautiful-mermaid browser bundle in a
 * reproducible way.
 *
 * Usage:
 *   bun run scripts/update-beautiful-mermaid.ts
 *   bun run scripts/update-beautiful-mermaid.ts --version 1.1.3
 */

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
const version = getArg("--version");
const cacheDir = process.env.BUN_INSTALL_CACHE_DIR || "/workspace/.cache/bun";

if (version) {
  const install = Bun.spawnSync(["bun", "add", "--exact", `beautiful-mermaid@${version}`], {
    cwd: projectDir,
    stdout: "inherit",
    stderr: "inherit",
    env: {
      ...process.env,
      BUN_INSTALL_CACHE_DIR: cacheDir,
    },
  });

  if (install.exitCode !== 0) {
    process.exit(install.exitCode || 1);
  }
}

const build = Bun.spawnSync(["bun", "run", "scripts/build-beautiful-mermaid-vendor.ts"], {
  cwd: projectDir,
  stdout: "inherit",
  stderr: "inherit",
  env: {
    ...process.env,
    BUN_INSTALL_CACHE_DIR: cacheDir,
  },
});

process.exit(build.exitCode || 0);
