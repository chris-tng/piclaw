/**
 * runtime.ts – Application lifecycle: startup, polling loop, and shutdown.
 *
 * This is the top-level orchestrator that wires together all subsystems:
 *   - Initialises the database (db/connection.ts).
 *   - Creates the AgentPool, AgentQueue, and RuntimeState.
 *   - Starts the WhatsApp channel (if configured), web channel, Pushover, IPC.
 *   - Runs the main message-polling loop and task scheduler.
 *   - Handles graceful shutdown (SIGINT/SIGTERM).
 *
 * Consumers:
 *   - index.ts calls startRuntime() as the entry point.
 */

import {
  ASSISTANT_NAME,
  DATA_DIR,
  POLL_INTERVAL,
  TRIGGER_PATTERN,
} from "./core/config.js";
import { AgentPool } from "./agent-pool.js";
import type { PushoverChannel } from "./channels/pushover.js";
import type { WebChannel } from "./channels/web.js";
import type { WhatsAppChannel } from "./channels/whatsapp.js";
import { stopIpcWatcher } from "./ipc.js";
import { AgentQueue } from "./queue.js";
import { processMessages, runMessageLoop } from "./runtime/message-loop.js";
import { registerOptionalProviders } from "./runtime/provider-bootstrap.js";
import { createShutdownHandler } from "./runtime/shutdown.js";
import { initializeRuntimeEnvironment, startOptionalPushoverChannel, startWebChannel, createWhatsAppChannel } from "./runtime/startup.js";
import { RuntimeState } from "./runtime/state.js";
import { createRuntimeSenders, startRuntimeWorkers } from "./runtime/wiring.js";
import { stopSchedulerLoop } from "./task-scheduler.js";

const queue = new AgentQueue();
const agentPool = new AgentPool();
let whatsapp: WhatsAppChannel;
let web: WebChannel;
let pushover: PushoverChannel | null = null;

const state = new RuntimeState(DATA_DIR);


/** Boot all subsystems (DB, channels, agent pool, scheduler) and enter the main loop. */
export async function main(): Promise<void> {
  initializeRuntimeEnvironment(state);
  registerOptionalProviders(agentPool);

  console.log("=== Piclaw - Pi Coding Agent Assistant ===");

  web = await startWebChannel(queue, agentPool);
  pushover = await startOptionalPushoverChannel();
  whatsapp = createWhatsAppChannel(state);

  const shutdown = createShutdownHandler({
    queue,
    agentPool,
    whatsapp,
    web,
    pushover,
    stopIpcWatcher,
    stopSchedulerLoop,
  });
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  const senders = createRuntimeSenders(web, whatsapp, pushover);
  startRuntimeWorkers(queue, agentPool, web, senders);

  await whatsapp.connect();

  runMessageLoop({
    queue,
    state,
    assistantName: ASSISTANT_NAME,
    pollIntervalMs: POLL_INTERVAL,
    processMessages: (chatJid) =>
      processMessages(chatJid, {
        agentPool,
        whatsapp,
        state,
        assistantName: ASSISTANT_NAME,
        triggerPattern: TRIGGER_PATTERN,
      }),
  });
}
