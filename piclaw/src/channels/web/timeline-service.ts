import {
  deleteMessageByRowId,
  getMessageByRowId,
  getMessagesByHashtag,
  getTimeline,
  hasOlderMessages,
  searchMessages,
} from "../../db.js";

export function getTimelineResponse(
  chatJid: string,
  limit: number,
  before?: number
): { status: number; body: unknown } {
  const posts = getTimeline(chatJid, limit, before ?? undefined);
  const oldestId = posts.length > 0 ? posts[0].id : null;
  const hasMore = oldestId !== null && posts.length === limit && hasOlderMessages(chatJid, oldestId);
  return { status: 200, body: { posts, limit, has_more: hasMore } };
}

export function getHashtagResponse(
  chatJid: string,
  tag: string,
  limit: number,
  offset: number
): { status: number; body: unknown } {
  const posts = getMessagesByHashtag(chatJid, tag, limit, offset);
  return { status: 200, body: { hashtag: tag, posts, limit, offset } };
}

export function getSearchResponse(
  chatJid: string,
  query: string,
  limit: number,
  offset: number
): { status: number; body: unknown } {
  if (!query) return { status: 400, body: { error: "Missing 'q' parameter" } };
  const results = searchMessages(chatJid, query, limit, offset);
  return { status: 200, body: { query, results, limit, offset } };
}

export function getThreadResponse(chatJid: string, id: number | null): { status: number; body: unknown } {
  if (!id) return { status: 404, body: { error: "Thread not found" } };
  const thread = getMessageByRowId(chatJid, id);
  if (!thread) return { status: 404, body: { error: "Thread not found" } };
  return { status: 200, body: { thread: [thread] } };
}

export function deletePostResponse(chatJid: string, id: number | null): {
  status: number;
  body: unknown;
  deletedId?: number;
} {
  if (!id) return { status: 404, body: { error: "Post not found" } };
  const deleted = deleteMessageByRowId(chatJid, id);
  return {
    status: 200,
    body: { deleted: deleted ? 1 : 0, ids: deleted ? [id] : [] },
    deletedId: deleted ? id : undefined,
  };
}
