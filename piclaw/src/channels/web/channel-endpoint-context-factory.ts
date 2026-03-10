/**
 * channels/web/channel-endpoint-context-factory.ts – Builds endpoint contexts for WebChannel handlers.
 */

import { getDb, replaceMessageContent } from "../../db.js";
import type { WebChannel } from "../web.js";
import type { AuthEndpointsContext } from "./auth-endpoints.js";
import {
  createAgentStatusContext,
  createAgentsEndpointContext,
  createAvatarEndpointContext,
  createContentEndpointsContext,
  createPostMutationsContext,
  createUiEndpointsContext,
} from "./endpoint-contexts.js";
import type { AgentStatusContext } from "./agent-status.js";
import type { ContentEndpointsContext } from "./content-endpoints.js";
import type { AgentsEndpointContext, AvatarEndpointContext } from "./identity-endpoints.js";
import type { PostMutationsContext } from "./post-mutations.js";
import type { UiEndpointsContext } from "./ui-endpoints.js";

/** Immutable options needed to build channel endpoint contexts. */
export interface WebChannelEndpointFactoryOptions {
  defaultChatJid: string;
  defaultAgentId: string;
  agentName: string;
  agentAvatar: string | null;
  userName: string | null;
  userAvatar: string | null;
  userAvatarBackground: string | null;
  assistantAvatarRaw: string | null;
  userAvatarRaw: string | null;
}

/** Lazily built endpoint contexts consumed by WebChannel handlers. */
export interface WebChannelEndpointContexts {
  postMutations(): PostMutationsContext;
  agentStatus(): AgentStatusContext;
  content(): ContentEndpointsContext;
  ui(): UiEndpointsContext;
  agents(): AgentsEndpointContext;
  avatar(): AvatarEndpointContext;
  auth(): AuthEndpointsContext;
}

/** Create endpoint-context builders bound to the current WebChannel instance. */
export function createWebChannelEndpointContexts(
  channel: WebChannel,
  options: WebChannelEndpointFactoryOptions
): WebChannelEndpointContexts {
  return {
    postMutations: () => createPostMutationsContext({
      defaultChatJid: options.defaultChatJid,
      getLastCommandInteractionId: () => channel.lastCommandInteractionId,
      json: (payload, status = 200) => channel.json(payload, status),
      replaceMessageContent: (chatJid, id, content) => replaceMessageContent(chatJid, id, content, {}) ?? null,
      setThreadId: (messageId, threadId) => {
        getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(threadId, messageId);
      },
      broadcastInteractionUpdated: (interaction) => {
        channel.interactionBroadcaster.broadcastInteractionUpdated(interaction);
      },
      storeMessage: (chatJid, content, isBot, mediaIds, storeOptions = {}) =>
        channel.storeMessage(chatJid, content, isBot, mediaIds, storeOptions),
      broadcastAgentResponse: (interaction) => {
        channel.interactionBroadcaster.broadcastAgentResponse(interaction);
      },
    }),

    agentStatus: () => createAgentStatusContext({
      defaultChatJid: options.defaultChatJid,
      json: (payload, status = 200) => channel.json(payload, status),
      getAgentStatus: (chatJid) => channel.getAgentStatus(chatJid),
      getBuffer: (turnId, panel) => channel.getBuffer(turnId, panel),
      getContextUsageForChat: (chatJid) => channel.agentPool.getContextUsageForChat(chatJid),
      getAvailableModels: (chatJid) => channel.agentPool.getAvailableModels(chatJid),
    }),

    content: () => createContentEndpointsContext({
      defaultChatJid: options.defaultChatJid,
      json: (payload, status = 200) => channel.json(payload, status),
      getBuffer: (turnId, panel) => channel.getBuffer(turnId, panel),
    }),

    ui: () => createUiEndpointsContext({
      json: (payload, status = 200) => channel.json(payload, status),
      getWorkspaceVisible: () => channel.workspaceVisible,
      setWorkspaceVisible: (value) => {
        channel.workspaceVisible = value;
      },
      getWorkspaceShowHidden: () => channel.workspaceShowHidden,
      setWorkspaceShowHidden: (value) => {
        channel.workspaceShowHidden = value;
      },
      setPanelExpanded: (turnId, panel, expanded) => {
        channel.setPanelExpanded(turnId, panel, expanded);
      },
      handleUiResponse: (requestId, outcome) => channel.uiBridge.handleUiResponse(requestId, outcome),
    }),

    agents: () => createAgentsEndpointContext({
      agentPool: channel.agentPool,
      defaultChatJid: options.defaultChatJid,
      defaultAgentId: options.defaultAgentId,
      agentName: options.agentName,
      agentAvatar: options.agentAvatar,
      userName: options.userName,
      userAvatar: options.userAvatar,
      userAvatarBackground: options.userAvatarBackground,
      json: (payload, status = 200) => channel.json(payload, status),
    }),

    avatar: () => createAvatarEndpointContext({
      assistantAvatar: options.assistantAvatarRaw,
      userAvatar: options.userAvatarRaw,
      json: (payload, status = 200) => channel.json(payload, status),
    }),

    auth: () => ({
      createTotpContext: () => channel.authGateway.createTotpContext(),
      createWebauthnContext: () => channel.authGateway.createWebauthnContext(),
      createWebauthnEnrolPageContext: () => channel.authGateway.createWebauthnEnrolPageContext(),
      serveStatic: (relPath) => channel.serveStatic(relPath),
    }),
  };
}
