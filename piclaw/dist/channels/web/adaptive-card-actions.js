/**
 * channels/web/adaptive-card-actions.ts – Helpers for Adaptive Card action handling.
 *
 * Phase 2: structured card submissions and card lifecycle transitions.
 */
export function sanitizeAdaptiveCardActionPayload(input) {
    const postIdRaw = typeof input.post_id === "string" ? Number(input.post_id) : input.post_id;
    const threadIdRaw = typeof input.thread_id === "string" ? Number(input.thread_id) : input.thread_id;
    const cardId = typeof input.card_id === "string" ? input.card_id.trim() : "";
    const chatJid = typeof input.chat_jid === "string" && input.chat_jid.trim() ? input.chat_jid.trim() : null;
    const actionType = typeof input.action?.type === "string" ? input.action.type.trim() : "";
    const actionTitle = typeof input.action?.title === "string" ? input.action.title.trim() : "";
    const actionUrl = typeof input.action?.url === "string" ? input.action.url.trim() : "";
    return {
        postId: Number.isFinite(postIdRaw) ? Number(postIdRaw) : null,
        threadId: threadIdRaw == null ? null : (Number.isFinite(threadIdRaw) ? Number(threadIdRaw) : null),
        cardId,
        chatJid,
        actionType,
        actionTitle,
        actionData: input.action?.data,
        actionUrl,
    };
}
function formatAdaptiveCardValue(value) {
    if (value == null)
        return "";
    if (typeof value === "string")
        return value.trim();
    if (typeof value === "number")
        return String(value);
    if (typeof value === "boolean")
        return value ? "yes" : "no";
    if (Array.isArray(value)) {
        return value.map((item) => formatAdaptiveCardValue(item)).filter(Boolean).join(", ");
    }
    if (typeof value === "object") {
        const entries = Object.entries(value)
            .filter(([key]) => !key.startsWith("__"))
            .map(([key, inner]) => `${key}: ${formatAdaptiveCardValue(inner)}`)
            .filter((entry) => !entry.endsWith(": "));
        return entries.join(", ");
    }
    return String(value).trim();
}
export function sanitizeAdaptiveCardSubmissionData(data) {
    if (Array.isArray(data)) {
        return data.map((value) => sanitizeAdaptiveCardSubmissionData(value));
    }
    if (!data || typeof data !== "object") {
        return data;
    }
    const sanitizedEntries = Object.entries(data)
        .filter(([key]) => !key.startsWith("__"))
        .map(([key, value]) => [key, sanitizeAdaptiveCardSubmissionData(value)]);
    return Object.fromEntries(sanitizedEntries);
}
export function buildAdaptiveCardSubmissionText(title, cardId, data) {
    const label = title || cardId || "card";
    const sanitizedData = sanitizeAdaptiveCardSubmissionData(data);
    if (sanitizedData == null)
        return `Card submission: ${label}`;
    if (typeof sanitizedData === "string" || typeof sanitizedData === "number" || typeof sanitizedData === "boolean") {
        const formatted = formatAdaptiveCardValue(sanitizedData);
        return formatted ? `Card submission: ${label} — ${formatted}` : `Card submission: ${label}`;
    }
    if (typeof sanitizedData === "object") {
        const entries = Object.entries(sanitizedData)
            .map(([key, value]) => ({ key, value: formatAdaptiveCardValue(value) }))
            .filter((entry) => entry.value)
            .slice(0, 4)
            .map(({ key, value }) => `${key}: ${value}`);
        return entries.length > 0
            ? `Card submission: ${label} — ${entries.join(", ")}`
            : `Card submission: ${label}`;
    }
    return `Card submission: ${label}`;
}
export function buildAdaptiveCardSubmitBlock(params) {
    return {
        type: "adaptive_card_submission",
        card_id: params.cardId,
        source_post_id: params.sourcePostId,
        submitted_at: params.submittedAt,
        action_type: "Action.Submit",
        ...(params.title ? { title: params.title } : {}),
        ...(params.data !== undefined ? { data: params.data } : {}),
    };
}
export function getAdaptiveCardSubmitBehavior(contentBlocks, cardId) {
    if (!Array.isArray(contentBlocks))
        return "complete";
    for (const block of contentBlocks) {
        if (!block || typeof block !== "object")
            continue;
        const candidate = block;
        if (candidate.type !== "adaptive_card" || candidate.card_id !== cardId)
            continue;
        return candidate.submit_behavior === "keep_active" ? "keep_active" : "complete";
    }
    return "complete";
}
export function getAdaptiveCardSubmitState(data) {
    if (!data || typeof data !== "object")
        return "completed";
    const raw = typeof data.__card_state === "string"
        ? String(data.__card_state).trim().toLowerCase()
        : "";
    if (raw === "cancelled" || raw === "failed")
        return raw;
    return "completed";
}
export function getAdaptiveCardTestFailure(cardId, data) {
    if (!cardId.startsWith("test-card-"))
        return null;
    if (!data || typeof data !== "object")
        return null;
    const mode = typeof data.__test_error === "string"
        ? String(data.__test_error).trim().toLowerCase()
        : "";
    if (mode === "submit")
        return "Simulated /test-card submit failure.";
    return null;
}
export function markAdaptiveCardState(contentBlocks, cardId, nextState, submittedAt, submission) {
    if (!Array.isArray(contentBlocks))
        return null;
    let changed = false;
    const updated = contentBlocks.map((block) => {
        if (!block || typeof block !== "object")
            return block;
        const candidate = block;
        if (candidate.type !== "adaptive_card" || candidate.card_id !== cardId)
            return block;
        const state = typeof candidate.state === "string" ? candidate.state : "active";
        if (state !== "active")
            return block;
        changed = true;
        return {
            ...candidate,
            state: nextState,
            completed_at: submittedAt,
            last_submission: submission,
        };
    });
    return changed ? updated : null;
}
