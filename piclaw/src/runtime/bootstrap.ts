/**
 * runtime/bootstrap.ts – Runtime bootstrap orchestration and default dependency wiring.
 */

import {
  ASSISTANT_NAME,
  POLL_INTERVAL,
  TRIGGER_PATTERN,
} from "../core/config.js";
import { stopIpcWatcher } from "../ipc.js";
import type { SchedulerDeps } from "../task-scheduler.js";
import { stopSchedulerLoop } from "../task-scheduler.js";
import type { RuntimeCoreServices, RuntimeSignalRegistrar } from "./composition.js";
import { registerRuntimeShutdownSignals } from "./composition.js";
import { startRuntimeLoop, type StartRuntimeLoopDeps } from "./coordinator.js";
import { registerOptionalProviders } from "./provider-bootstrap.js";
import { createShutdownHandler, type ShutdownDeps } from "./shutdown.js";
import {
  createWhatsAppChannel,
  initializeRuntimeEnvironment,
  startOptionalPushoverChannel,
  startWebChannel,
} from "./startup.js";
import {
  createRuntimeSenders,
  startRuntimeWorkers,
  type RuntimeModelResolver,
  type RuntimePushoverWorkerChannel,
  type RuntimeSenders,
  type RuntimeWebWorkerChannel,
  type RuntimeWhatsAppWorkerChannel,
} from "./wiring.js";

export type RuntimeBootstrapQueue =
  & StartRuntimeLoopDeps["queue"]
  & SchedulerDeps["queue"]
  & ShutdownDeps["queue"];

export type RuntimeBootstrapAgentPool =
  & StartRuntimeLoopDeps["agentPool"]
  & SchedulerDeps["agentPool"]
  & RuntimeModelResolver
  & ShutdownDeps["agentPool"];

export type RuntimeBootstrapState = StartRuntimeLoopDeps["state"];

export type RuntimeBootstrapWeb = RuntimeWebWorkerChannel & ShutdownDeps["web"];

export type RuntimeBootstrapWhatsApp =
  & StartRuntimeLoopDeps["whatsapp"]
  & RuntimeWhatsAppWorkerChannel
  & ShutdownDeps["whatsapp"]
  & { connect: () => Promise<unknown> };

export type RuntimeBootstrapPushover = RuntimePushoverWorkerChannel & NonNullable<ShutdownDeps["pushover"]>;

export interface RuntimeBootstrapDeps {
  core: RuntimeCoreServices;
  assistantName: string;
  triggerPattern: RegExp;
  pollIntervalMs: number;
  signalRegistrar: RuntimeSignalRegistrar;
  initializeRuntimeEnvironment(state: RuntimeBootstrapState): void;
  registerOptionalProviders(agentPool: RuntimeBootstrapAgentPool): void;
  startWebChannel(queue: RuntimeBootstrapQueue, agentPool: RuntimeBootstrapAgentPool): Promise<RuntimeBootstrapWeb>;
  startOptionalPushoverChannel(): Promise<RuntimeBootstrapPushover | null>;
  createWhatsAppChannel(state: RuntimeBootstrapState): RuntimeBootstrapWhatsApp;
  createShutdownHandler(deps: ShutdownDeps): (signal: string) => Promise<void>;
  registerRuntimeShutdownSignals(
    registrar: RuntimeSignalRegistrar,
    shutdown: (signal: string) => Promise<void>
  ): void;
  createRuntimeSenders(
    web: RuntimeBootstrapWeb,
    whatsapp: RuntimeBootstrapWhatsApp,
    pushover: RuntimeBootstrapPushover | null
  ): RuntimeSenders;
  startRuntimeWorkers(
    queue: RuntimeBootstrapQueue,
    agentPool: RuntimeBootstrapAgentPool,
    web: RuntimeBootstrapWeb,
    senders: RuntimeSenders
  ): void;
  startRuntimeLoop(deps: StartRuntimeLoopDeps): Promise<void>;
  log(message: string): void;
  stopIpcWatcher(): void;
  stopSchedulerLoop(): void;
}

/**
 * Build default runtime bootstrap dependencies from production modules.
 */
export function createDefaultRuntimeBootstrapDeps(core: RuntimeCoreServices): RuntimeBootstrapDeps {
  return {
    core,
    assistantName: ASSISTANT_NAME,
    triggerPattern: TRIGGER_PATTERN,
    pollIntervalMs: POLL_INTERVAL,
    signalRegistrar: process,
    initializeRuntimeEnvironment: (state) => initializeRuntimeEnvironment(state as RuntimeCoreServices["state"]),
    registerOptionalProviders: (agentPool) => registerOptionalProviders(agentPool as RuntimeCoreServices["agentPool"]),
    startWebChannel: (queue, agentPool) =>
      startWebChannel(
        queue as RuntimeCoreServices["queue"],
        agentPool as RuntimeCoreServices["agentPool"]
      ) as Promise<RuntimeBootstrapWeb>,
    startOptionalPushoverChannel: () => startOptionalPushoverChannel() as Promise<RuntimeBootstrapPushover | null>,
    createWhatsAppChannel: (state) => createWhatsAppChannel(state as RuntimeCoreServices["state"]) as RuntimeBootstrapWhatsApp,
    createShutdownHandler,
    registerRuntimeShutdownSignals,
    createRuntimeSenders: (web, whatsapp, pushover) => createRuntimeSenders(web, whatsapp, pushover),
    startRuntimeWorkers: (queue, agentPool, web, senders) => startRuntimeWorkers(queue, agentPool, web, senders),
    startRuntimeLoop,
    log: (message) => console.log(message),
    stopIpcWatcher,
    stopSchedulerLoop,
  };
}

/**
 * Bootstrap and run all runtime subsystems in production order.
 */
export async function bootstrapRuntime(deps: RuntimeBootstrapDeps): Promise<void> {
  const { queue, agentPool, state } = deps.core;

  deps.initializeRuntimeEnvironment(state as RuntimeBootstrapState);
  deps.registerOptionalProviders(agentPool as RuntimeBootstrapAgentPool);
  deps.log("=== Piclaw - Pi Coding Agent Assistant ===");

  const web = await deps.startWebChannel(queue as RuntimeBootstrapQueue, agentPool as RuntimeBootstrapAgentPool);
  const pushover = await deps.startOptionalPushoverChannel();
  const whatsapp = deps.createWhatsAppChannel(state as RuntimeBootstrapState);

  const shutdown = deps.createShutdownHandler({
    queue,
    agentPool,
    whatsapp,
    web,
    pushover,
    stopIpcWatcher: deps.stopIpcWatcher,
    stopSchedulerLoop: deps.stopSchedulerLoop,
  });
  deps.registerRuntimeShutdownSignals(deps.signalRegistrar, shutdown);

  const senders = deps.createRuntimeSenders(web, whatsapp, pushover);
  deps.startRuntimeWorkers(queue as RuntimeBootstrapQueue, agentPool as RuntimeBootstrapAgentPool, web, senders);

  await whatsapp.connect();

  await deps.startRuntimeLoop({
    queue,
    state,
    agentPool,
    whatsapp,
    assistantName: deps.assistantName,
    triggerPattern: deps.triggerPattern,
    pollIntervalMs: deps.pollIntervalMs,
  });
}
