/**
 * runtime/shutdown.ts – Graceful shutdown orchestration helpers.
 */

/** Runtime resources required to perform graceful shutdown. */
export type ShutdownDeps = {
  queue: { shutdown: (timeoutMs?: number) => Promise<unknown> };
  agentPool: { shutdown: () => Promise<unknown> };
  whatsapp: { disconnect: () => Promise<unknown> };
  web: { stop: () => Promise<unknown> };
  pushover?: { stop: () => Promise<unknown> } | null;
  stopIpcWatcher: () => void;
  stopSchedulerLoop: () => void;
};

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T | null> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<null>((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`[piclaw] ${label} timed out after ${ms}ms`);
      resolve(null);
    }, ms);
  });

  try {
    const result = await Promise.race([promise.then((value) => ({ value })), timeout]);
    if (result && typeof result === "object" && "value" in result) {
      return (result as { value: T }).value;
    }
    return null;
  } catch (err) {
    console.error(`[piclaw] ${label} failed:`, err);
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Build a signal handler that performs graceful shutdown exactly once.
 */
export function createShutdownHandler(deps: ShutdownDeps): (signal: string) => Promise<void> {
  let shuttingDown = false;

  return async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`[piclaw] ${signal} received, shutting down...`);
    const forceExit = setTimeout(() => {
      console.warn("[piclaw] Forcing shutdown after 15000ms");
      process.exit(0);
    }, 15000);

    deps.stopIpcWatcher();
    deps.stopSchedulerLoop();
    await withTimeout(deps.queue.shutdown(5000), 7000, "queue shutdown");
    await withTimeout(deps.agentPool.shutdown(), 8000, "agent pool shutdown");
    await withTimeout(deps.whatsapp.disconnect(), 8000, "whatsapp disconnect");
    await withTimeout(deps.web.stop(), 4000, "web stop");
    await withTimeout(deps.pushover?.stop() ?? Promise.resolve(), 4000, "pushover stop");

    clearTimeout(forceExit);
    process.exit(0);
  };
}
