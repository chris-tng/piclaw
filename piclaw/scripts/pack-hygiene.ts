#!/usr/bin/env bun

const BLOCKED_PREFIXES = ["coverage/", "test/", "dist/"];
const BLOCKED_EXACT = new Set(["coverage/lcov.info"]);

export function extractPackedFiles(output: string): string[] {
  const files: string[] = [];
  for (const line of output.split(/\r?\n/)) {
    const match = line.match(/^packed\s+\S+\s+(.+)$/);
    if (!match) continue;
    files.push(match[1].trim());
  }
  return files;
}

export function findBlockedPackEntries(files: string[]): string[] {
  return files.filter((file) => {
    if (BLOCKED_EXACT.has(file)) return true;
    return BLOCKED_PREFIXES.some((prefix) => file.startsWith(prefix));
  });
}

export function runPackHygieneCheck(cwd = process.cwd()): { ok: boolean; blocked: string[]; files: string[]; error?: string } {
  const proc = Bun.spawnSync(["bun", "pm", "pack", "--dry-run"], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });

  const stdout = proc.stdout.toString();
  const stderr = proc.stderr.toString();
  if (proc.exitCode !== 0) {
    return {
      ok: false,
      blocked: [],
      files: [],
      error: stderr || stdout || `pack failed with code ${proc.exitCode}`,
    };
  }

  const files = extractPackedFiles(stdout);
  const blocked = findBlockedPackEntries(files);
  return { ok: blocked.length === 0, blocked, files };
}

if (import.meta.main) {
  const result = runPackHygieneCheck();
  if (!result.ok) {
    if (result.error) {
      console.error(`[pack-hygiene] ${result.error}`);
    } else {
      console.error("[pack-hygiene] blocked entries found in package tarball:");
      for (const file of result.blocked) {
        console.error(` - ${file}`);
      }
    }
    process.exit(1);
  }

  console.log(`[pack-hygiene] ok (${result.files.length} files checked)`);
}
