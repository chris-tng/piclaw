#!/usr/bin/env bun

import { spawnSync } from "bun";

/** Baseline unused-export entries accepted until upstream/dynamic loading catches up. */
const ALLOWED_UNUSED_EXPORTS = new Set([
  "src/channels/web/http/client.ts:9 - firstHeaderValue",
  "src/channels/web/http/rate-limit.ts:54 - resetRateLimiterStateForTests",
  "src/channels/web/ui-context.ts:23 - bindSessionUiContext",
  "src/channels/web/workspace/service.ts:14 - createWorkspaceUpdateThrottle",
  "src/channels/web/workspace/service.ts:15 - WorkspaceUpdate",
  "src/core/chat-context.ts:49 - getChatContext",
  "src/db.ts:102 - deleteWebSession",
  "src/db.ts:106 - ChatInfo",
  "src/db.ts:107 - InteractionContentMeta",
  "src/db.ts:108 - InteractionData",
  "src/db.ts:110 - MediaRecord",
  "src/db.ts:107 - deleteWebSession",
  "src/db.ts:111 - ChatInfo",
  "src/db.ts:112 - InteractionContentMeta",
  "src/db.ts:113 - InteractionData",
  "src/db.ts:115 - MediaRecord",
  "src/db.ts:31 - getMediaIdsForMessage",
  "src/db.ts:44 - getTaskRunLogs",
  "src/db.ts:50 - deleteToolOutputById",
  "src/db.ts:70 - FailedRunRecord",
  "src/db.ts:73 - upsertRemotePeer",
  "src/db.ts:74 - getRemotePeer",
  "src/db.ts:75 - updateRemotePeer",
  "src/db.ts:76 - createPairRequest",
  "src/db.ts:77 - getPairRequestById",
  "src/db.ts:78 - getPendingPairRequest",
  "src/db.ts:79 - updatePairRequestStatus",
  "src/db.ts:80 - storeRemoteRequest",
  "src/db.ts:81 - updateRemoteRequest",
  "src/db.ts:82 - getRemoteRequestById",
  "src/db.ts:83 - logRemoteAudit",
  "src/db.ts:86 - DEFAULT_PASSKEY_USER_ID",
  "src/db.ts:78 - upsertRemotePeer",
  "src/db.ts:79 - getRemotePeer",
  "src/db.ts:80 - updateRemotePeer",
  "src/db.ts:81 - createPairRequest",
  "src/db.ts:82 - getPairRequestById",
  "src/db.ts:83 - getPendingPairRequest",
  "src/db.ts:84 - updatePairRequestStatus",
  "src/db.ts:85 - storeRemoteRequest",
  "src/db.ts:86 - updateRemoteRequest",
  "src/db.ts:87 - getRemoteRequestById",
  "src/db.ts:88 - logRemoteAudit",
  "src/db.ts:91 - DEFAULT_PASSKEY_USER_ID",
  "src/db/router-state.ts:33 - deleteRouterState",
  "src/extensions/azure-openai-api.ts:14 - applyToolCallLimit",
  "src/secure/keychain.ts:96 - setKeyMaterialProviderForTests",
  "src/extensions/azure-openai-api.ts:51 - buildBaseOptions",
  "src/extensions/azure-openai-api.ts:71 - clampReasoning",
  "src/extensions/context-mode-api.ts:10 - createToolOutputSearchTool",
  "src/extensions/context-mode-api.ts:14 - buildPreview",
  "src/extensions/context-mode-api.ts:15 - readToolOutputFile",
  "src/extensions/context-mode-api.ts:16 - saveToolOutput",
  "src/extensions/context-mode-api.ts:17 - startToolOutputCleanup",
  "src/extensions/context-mode-api.ts:9 - createBatchExecTool",
  "src/remote/identity.ts:88 - resetInteropIdentityForTests",
  "src/remote/identity.ts:93 - exportPublicKey",
  "src/remote/limits.ts:13 - DEFAULT_MAX_TOOL_CALLS_RESTRICTED",
  "src/remote/limits.ts:15 - DEFAULT_MAX_TOOL_CALLS_FULL",
  "src/remote/limits.ts:17 - DEFAULT_MAX_EXECUTION_SEC_RESTRICTED",
  "src/remote/limits.ts:19 - DEFAULT_MAX_EXECUTION_SEC_FULL",
  "src/remote/signature.ts:48 - signRequest",
  "src/task-scheduler.ts:67 - getSchedulerMetrics",
  "src/task-scheduler.ts:72 - resetSchedulerMetricsForTests",
  "src/types.ts:15 - ChatConfig",
  "src/utils/ids.ts:20 - createId",
  "src/utils/process-tracker.ts:37 - listTrackedProcesses",
]);

export function parseUnusedExports(tsPruneOutput: string): string[] {
  return tsPruneOutput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.includes("(used in module)"))
    .sort();
}

export function findUnexpectedUnusedExports(entries: string[]): string[] {
  return entries.filter((entry) => !ALLOWED_UNUSED_EXPORTS.has(entry)).sort();
}

if (import.meta.main) {
  const proc = spawnSync(["bunx", "ts-prune", "-p", "tsconfig.json"], {
    stdout: "pipe",
    stderr: "pipe",
  });

  if (proc.exitCode !== 0) {
    console.error("[unused-exports] ts-prune failed:");
    console.error(proc.stderr.toString());
    process.exit(proc.exitCode ?? 1);
  }

  const entries = parseUnusedExports(proc.stdout.toString());
  const unexpected = findUnexpectedUnusedExports(entries);

  if (unexpected.length > 0) {
    console.error("[unused-exports] unexpected unused exports detected:");
    for (const entry of unexpected) {
      console.error(` - ${entry}`);
    }
    process.exit(1);
  }

  console.log(`[unused-exports] ok (${entries.length} allowlisted entries)`);
}
