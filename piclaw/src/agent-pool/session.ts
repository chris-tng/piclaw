/**
 * agent-pool/session.ts – pi-agent session creation and directory management.
 *
 * Handles the setup of per-chat agent sessions:
 *   - Creates the session directory under SESSIONS_DIR for each chat JID.
 *   - Configures the resource loader with workspace extensions and skills.
 *   - Uses SessionManager.continueRecent() to resume from the most recent
 *     session tree leaf (conversation context persistence).
 *
 * Consumers:
 *   - agent-pool.ts calls createDefaultSession() to initialise or replace
 *     the agent session for a chat.
 *   - ensureSessionDir() is also used by agent-control/handlers/session.ts.
 */

import { mkdirSync, existsSync, symlinkSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import {
  type AgentSession,
  createAgentSession,
  DefaultResourceLoader,
  getAgentDir,
  SessionManager,
  type AuthStorage,
  type ModelRegistry,
  type SettingsManager,
  type Tool,
} from "@mariozechner/pi-coding-agent";

import { SESSIONS_DIR, WORKSPACE_DIR } from "../core/config.js";
import { builtinExtensionFactories } from "../extensions/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Bundled extension paths that are loaded when their activation env vars
 * are present.  The files live inside the piclaw package tree so that
 * node_modules resolution (for @mariozechner/pi-ai internals etc.) works.
 *
 * Because bun may hoist dependencies, we create a node_modules symlink
 * next to the extensions directory pointing to the nearest real
 * node_modules so that jiti's fallback resolution finds packages like
 * @mariozechner/pi-ai/dist/providers/*.
 */
const EXTENSIONS_DIR = resolve(__dirname, "../../extensions");

const OPTIONAL_EXTENSIONS: { path: string; envGate?: string }[] = [
  { path: resolve(EXTENSIONS_DIR, "azure-openai.ts"), envGate: "AOAI_BASE_URL" },
  { path: resolve(EXTENSIONS_DIR, "context-mode.ts") },
];

/** Walk up from startDir looking for a node_modules that contains @mariozechner/pi-ai. */
function findNodeModules(startDir: string): string | null {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, "node_modules");
    if (existsSync(join(candidate, "@mariozechner", "pi-ai"))) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function getBundledExtensionPaths(): string[] {
  const paths = OPTIONAL_EXTENSIONS
    .filter(({ envGate }) => !envGate || !!process.env[envGate])
    .map(({ path }) => path);
  if (paths.length === 0) return paths;

  // Ensure a node_modules symlink exists next to the extensions dir
  // so jiti can resolve deep package imports.
  const link = join(EXTENSIONS_DIR, "node_modules");
  if (!existsSync(link)) {
    const target = findNodeModules(EXTENSIONS_DIR);
    if (target) {
      try { symlinkSync(target, link); } catch { /* may already exist or read-only */ }
    }
  }
  return paths;
}

/** Ensure the session directory exists for a chat and return its path. */
export function ensureSessionDir(chatJid: string): string {
  const chatSessionDir = join(SESSIONS_DIR, sanitiseJid(chatJid));
  mkdirSync(chatSessionDir, { recursive: true });
  return chatSessionDir;
}

/**
 * Create a fully-configured pi-agent session for the given chat.
 * Loads workspace resources (AGENTS.md, skills, extensions, prompt templates)
 * and resumes the most recent session tree.
 */
export async function createDefaultSession(
  chatJid: string,
  options: {
    authStorage: AuthStorage;
    modelRegistry: ModelRegistry;
    settingsManager: SettingsManager;
    tools: Tool[];
  }
): Promise<AgentSession> {
  const chatSessionDir = ensureSessionDir(chatJid);
  const resourceLoader = new DefaultResourceLoader({
    cwd: WORKSPACE_DIR,
    agentDir: getAgentDir(),
    settingsManager: options.settingsManager,
    extensionFactories: builtinExtensionFactories,
    additionalExtensionPaths: getBundledExtensionPaths(),
  });
  await resourceLoader.reload();

  const { session } = await createAgentSession({
    cwd: WORKSPACE_DIR,
    agentDir: getAgentDir(),
    authStorage: options.authStorage,
    modelRegistry: options.modelRegistry,
    settingsManager: options.settingsManager,
    resourceLoader,
    sessionManager: SessionManager.continueRecent(WORKSPACE_DIR, chatSessionDir),
    tools: options.tools,
  });

  return session;
}

/** Replace characters that are unsafe for filesystem paths. */
export function sanitiseJid(jid: string): string {
  return jid.replace(/[^a-zA-Z0-9._-]/g, "_");
}
