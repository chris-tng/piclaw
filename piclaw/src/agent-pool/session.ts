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
} from "@mariozechner/pi-coding-agent";

import { SESSIONS_DIR, WORKSPACE_DIR } from "../core/config.js";
import { builtinExtensionFactories } from "../extensions/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

type AgentSessionCreateOptions = NonNullable<Parameters<typeof createAgentSession>[0]>;

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

let startupDiagnosticsLogged = false;

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

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function configuredProviders(settingsManager: SettingsManager): string[] {
  const providers = new Set<string>();
  const defaultProvider = settingsManager.getDefaultProvider();
  if (defaultProvider) providers.add(defaultProvider);

  const enabledModels = settingsManager.getEnabledModels() ?? [];
  for (const entry of enabledModels) {
    const slash = entry.indexOf("/");
    if (slash > 0) {
      providers.add(entry.slice(0, slash));
    }
  }

  return uniqueSorted(Array.from(providers));
}

function logStartupDiagnosticsOnce(
  resourceLoader: DefaultResourceLoader,
  session: AgentSession,
  settingsManager: SettingsManager,
): void {
  if (startupDiagnosticsLogged) return;
  startupDiagnosticsLogged = true;

  const extensions = resourceLoader.getExtensions();
  const loadedCount = extensions.extensions.length;
  const errorCount = extensions.errors.length;
  const pendingProviders = uniqueSorted(extensions.runtime.pendingProviderRegistrations.map((entry) => entry.name));

  console.log(
    `[provider-observability] extensions loaded=${loadedCount} errors=${errorCount} pending_provider_registrations=${pendingProviders.length}`,
  );
  if (pendingProviders.length > 0) {
    console.log(`[provider-observability] pending providers: ${pendingProviders.join(", ")}`);
  }

  if (errorCount > 0) {
    const sample = extensions.errors.slice(0, 5);
    for (const item of sample) {
      const reason = String(item.error ?? "unknown error").split("\n")[0] ?? "unknown error";
      console.warn(`[provider-observability] extension load error: ${item.path} :: ${reason}`);
    }
    if (errorCount > sample.length) {
      console.warn(`[provider-observability] extension load errors truncated: showing ${sample.length} of ${errorCount}`);
    }
  }

  const registry = (session as AgentSession & { modelRegistry?: ModelRegistry }).modelRegistry;
  const allProviders = uniqueSorted((registry?.getAll() ?? []).map((model) => model.provider));
  const availableProviders = uniqueSorted((registry?.getAvailable() ?? []).map((model) => model.provider));
  console.log(
    `[provider-observability] providers total=${allProviders.length} available=${availableProviders.length}`,
  );
  if (availableProviders.length > 0) {
    console.log(`[provider-observability] available providers: ${availableProviders.join(", ")}`);
  }

  const configured = configuredProviders(settingsManager);
  const missingConfigured = configured.filter((provider) => !allProviders.includes(provider));
  if (missingConfigured.length > 0) {
    console.warn(
      `[provider-observability] configured providers not registered: ${missingConfigured.join(", ")}`,
    );
  }

  const unresolvedPending = pendingProviders.filter((provider) => !allProviders.includes(provider));
  if (unresolvedPending.length > 0) {
    console.warn(
      `[provider-observability] pending providers not present after session init: ${unresolvedPending.join(", ")}`,
    );
  }
}

/** Ensure the session directory exists for a chat and return its path. */
export function ensureSessionDir(chatJid: string): string {
  const chatSessionDir = join(SESSIONS_DIR, sanitiseJid(chatJid));
  mkdirSync(chatSessionDir, { recursive: true });
  return chatSessionDir;
}

/** Ensure a named auxiliary session directory exists for a chat and return its path. */
export function ensureNamedSessionDir(chatJid: string, name: string): string {
  const dir = join(SESSIONS_DIR, `${sanitiseJid(chatJid)}__${sanitiseJid(name)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Create a fully-configured pi-agent session for the given chat.
 * Loads workspace resources (AGENTS.md, skills, extensions, prompt templates)
 * and resumes the most recent session tree.
 */
export async function createSessionInDir(
  sessionDir: string,
  options: {
    authStorage: AuthStorage;
    modelRegistry: ModelRegistry;
    settingsManager: SettingsManager;
    tools: NonNullable<AgentSessionCreateOptions["tools"]>;
  }
): Promise<AgentSession> {
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
    sessionManager: SessionManager.continueRecent(WORKSPACE_DIR, sessionDir),
    tools: options.tools,
  });

  logStartupDiagnosticsOnce(resourceLoader, session, options.settingsManager);

  return session;
}

export async function createDefaultSession(
  chatJid: string,
  options: {
    authStorage: AuthStorage;
    modelRegistry: ModelRegistry;
    settingsManager: SettingsManager;
    tools: NonNullable<AgentSessionCreateOptions["tools"]>;
  }
): Promise<AgentSession> {
  const chatSessionDir = ensureSessionDir(chatJid);
  return createSessionInDir(chatSessionDir, options);
}

/** Replace characters that are unsafe for filesystem paths. */
export function sanitiseJid(jid: string): string {
  return jid.replace(/[^a-zA-Z0-9._-]/g, "_");
}
