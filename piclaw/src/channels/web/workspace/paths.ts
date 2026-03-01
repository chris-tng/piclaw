import path from "path";

import { WORKSPACE_DIR } from "../../../core/config.js";
import { EXCLUDE_DIRS } from "./constants.js";

export function resolveWorkspacePath(input: string | null): string | null {
  const raw = (input || "").trim();
  const resolved = path.resolve(WORKSPACE_DIR, raw);
  const rel = path.relative(WORKSPACE_DIR, resolved);
  if (!rel || rel === ".") return WORKSPACE_DIR;
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  return resolved;
}

export function toRelativePath(absPath: string): string {
  const rel = path.relative(WORKSPACE_DIR, absPath) || ".";
  return rel.split(path.sep).join("/");
}

export function shouldExcludeDir(name: string): boolean {
  return EXCLUDE_DIRS.has(name);
}

export function shouldIgnorePath(absPath: string): boolean {
  const rel = path.relative(WORKSPACE_DIR, absPath);
  if (!rel || rel === ".") return false;
  if (rel.startsWith("..") || path.isAbsolute(rel)) return true;
  const parts = rel.split(path.sep);
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (EXCLUDE_DIRS.has(part)) return true;
  }
  return false;
}

export function isHiddenPath(absPath: string): boolean {
  const rel = path.relative(WORKSPACE_DIR, absPath);
  if (!rel || rel === ".") return false;
  if (rel.startsWith("..") || path.isAbsolute(rel)) return false;
  const parts = rel.split(path.sep);
  return parts.some((part) => part.startsWith(".") && part !== "." && part !== "..");
}
