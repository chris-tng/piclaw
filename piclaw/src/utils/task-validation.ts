/**
 * task-validation.ts – validation helpers for scheduled tasks.
 *
 * Provides shared validation for shell commands and working directories
 * used by the scheduler, IPC layer, and internal scheduling tool.
 */
import { existsSync } from "fs";
import { resolve } from "path";
import { WORKSPACE_DIR } from "../core/config.js";

const MAX_COMMAND_LENGTH = 2000;

const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\brm\s+-rf\s+\//i, reason: "destructive rm -rf /" },
  { pattern: /\bmkfs\b/i, reason: "filesystem formatting" },
  { pattern: /\bshutdown\b/i, reason: "shutdown" },
  { pattern: /\breboot\b/i, reason: "reboot" },
  { pattern: /\bpoweroff\b/i, reason: "poweroff" },
  { pattern: /\bhalt\b/i, reason: "halt" },
  { pattern: /\bdd\s+if=\/(dev|proc|sys)/i, reason: "raw device access" },
];

export function validateShellCommand(input: unknown): { ok: boolean; command?: string; error?: string } {
  if (typeof input !== "string") {
    return { ok: false, error: "Command must be a string." };
  }
  const command = input.trim();
  if (!command) {
    return { ok: false, error: "Command cannot be empty." };
  }
  if (command.length > MAX_COMMAND_LENGTH) {
    return { ok: false, error: `Command is too long (max ${MAX_COMMAND_LENGTH} chars).` };
  }
  if (/[\r\n]/.test(command)) {
    return { ok: false, error: "Command cannot contain newlines." };
  }
  if (command.includes("\0")) {
    return { ok: false, error: "Command contains invalid null byte." };
  }
  const lower = command.toLowerCase();
  for (const rule of FORBIDDEN_PATTERNS) {
    if (rule.pattern.test(lower)) {
      return { ok: false, error: `Command rejected (${rule.reason}).` };
    }
  }
  return { ok: true, command };
}

export function validateShellCwd(input: unknown): { ok: boolean; cwd: string; error?: string } {
  if (input === undefined || input === null || input === "") {
    return { ok: true, cwd: WORKSPACE_DIR };
  }
  if (typeof input !== "string") {
    return { ok: false, cwd: WORKSPACE_DIR, error: "cwd must be a string." };
  }
  const resolved = resolve(WORKSPACE_DIR, input);
  if (!resolved.startsWith(WORKSPACE_DIR)) {
    return { ok: false, cwd: WORKSPACE_DIR, error: "cwd must stay within the workspace." };
  }
  if (!existsSync(resolved)) {
    return { ok: false, cwd: WORKSPACE_DIR, error: "cwd does not exist." };
  }
  return { ok: true, cwd: resolved };
}
