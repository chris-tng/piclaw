/**
 * channels/web/post-mutations.ts – Post update/internal-post endpoint orchestration.
 */

import type { InteractionRow } from "../../db.js";

/** Context contract consumed by post update/internal-post mutation handlers. */
export interface PostMutationsContext {
  defaultChatJid: string;
  lastCommandInteractionId: number | null;
  json(payload: unknown, status?: number): Response;
  replaceMessageContent(chatJid: string, id: number, content: string): InteractionRow | null;
  setThreadId(messageId: number, threadId: number): void;
  broadcastInteractionUpdated(interaction: InteractionRow): void;
  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options?: { threadId?: number }
  ): InteractionRow | null;
  broadcastAgentResponse(interaction: InteractionRow): void;
}

/** PATCH /post/:id orchestration. */
export async function handleUpdatePostRequest(
  req: Request,
  id: number | null,
  ctx: PostMutationsContext
): Promise<Response> {
  if (!id || id < 1) return ctx.json({ error: "Missing or invalid post id" }, 400);

  let body: { content?: string; thread_id?: number };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  if (!body.content && body.content !== "") {
    return ctx.json({ error: "Missing content" }, 400);
  }
  if (typeof body.content === "string" && body.content.length > 100 * 1024) {
    return ctx.json({ error: "Content too large (max 100 KB)" }, 400);
  }

  const updated = ctx.replaceMessageContent(ctx.defaultChatJid, id, body.content!);
  if (!updated) return ctx.json({ error: "Post not found" }, 404);

  if (body.thread_id) {
    if (typeof body.thread_id !== "number" || !Number.isInteger(body.thread_id) || body.thread_id < 1) {
      return ctx.json({ error: "Invalid thread_id" }, 400);
    }
    ctx.setThreadId(id, body.thread_id);
    (updated.data as unknown as Record<string, unknown>).thread_id = body.thread_id;
  }

  ctx.broadcastInteractionUpdated(updated);
  return ctx.json({ ok: true, id: updated.id });
}

/** POST /internal/post orchestration. */
export async function handleInternalPostRequest(req: Request, ctx: PostMutationsContext): Promise<Response> {
  let body: { content?: string; thread_id?: number };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  if (!body.content) return ctx.json({ error: "Missing content" }, 400);
  if (body.content.length > 100 * 1024) {
    return ctx.json({ error: "Content too large (max 100 KB)" }, 400);
  }

  const threadId = body.thread_id || ctx.lastCommandInteractionId || undefined;
  const interaction = ctx.storeMessage(
    ctx.defaultChatJid,
    body.content,
    true,
    [],
    threadId ? { threadId } : undefined
  );
  if (!interaction) return ctx.json({ error: "Failed to store" }, 500);

  ctx.broadcastAgentResponse(interaction);
  return ctx.json({ ok: true, id: interaction.id }, 201);
}
