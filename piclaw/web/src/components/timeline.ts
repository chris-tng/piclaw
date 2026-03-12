// @ts-nocheck
import { html, useCallback, useEffect, useRef, useState } from '../vendor/preact-htm.js';
import { Post } from './post.js';
import { getAgentAvatarUrl, getAgentName } from '../ui/agent-utils.js';

/**
 * Timeline component
 */
export function Timeline({ posts, hasMore, onLoadMore, onPostClick, onHashtagClick, onMessageRef, onScrollToMessage, onFileRef, emptyMessage, timelineRef, agents, user, onDeletePost, reverse = true, removingPostIds, searchQuery }) {
    const [loadingMore, setLoadingMore] = useState(false);
    const sentinelRef = useRef(null);
    const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

    const triggerLoadMore = useCallback(async () => {
        if (!onLoadMore || !hasMore || loadingMore) return;
        setLoadingMore(true);
        try {
            await onLoadMore({ preserveScroll: true, preserveMode: 'top' });
        } finally {
            setLoadingMore(false);
        }
    }, [hasMore, loadingMore, onLoadMore]);

    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const distanceFromTop = reverse ? (scrollHeight - clientHeight - scrollTop) : scrollTop;
        const prefetchThreshold = Math.max(300, clientHeight);

        if (distanceFromTop < prefetchThreshold) {
            triggerLoadMore();
        }
    }, [reverse, triggerLoadMore]);

    useEffect(() => {
        if (!hasIntersectionObserver) return;

        const sentinel = sentinelRef.current;
        const root = timelineRef?.current;
        if (!sentinel || !root) return;

        const prefetchThreshold = 300;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    triggerLoadMore();
                }
            },
            {
                root,
                rootMargin: `${prefetchThreshold}px 0px ${prefetchThreshold}px 0px`,
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasIntersectionObserver, hasMore, onLoadMore, timelineRef, triggerLoadMore]);

    useEffect(() => {
        if (hasIntersectionObserver) return;
        if (!timelineRef?.current) return;
        const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
        const distanceFromTop = reverse ? (scrollHeight - clientHeight - scrollTop) : scrollTop;
        const prefetchThreshold = Math.max(300, clientHeight);

        if (distanceFromTop < prefetchThreshold) {
            triggerLoadMore();
        }
    }, [hasIntersectionObserver, posts, hasMore, reverse, timelineRef, triggerLoadMore]);

    useEffect(() => {
        if (!timelineRef?.current) return;
        if (!hasMore || loadingMore) return;
        const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
        const distanceFromTop = reverse ? (scrollHeight - clientHeight - scrollTop) : scrollTop;
        const prefetchThreshold = Math.max(300, clientHeight);
        if (scrollHeight <= clientHeight + 1 || distanceFromTop < prefetchThreshold) {
            triggerLoadMore();
        }
    }, [posts, hasMore, loadingMore, reverse, timelineRef, triggerLoadMore]);

    if (!posts) {
        return html`<div class="loading"><div class="spinner"></div></div>`;
    }

    if (posts.length === 0) {
        return html`
            <div class="timeline" ref=${timelineRef}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${emptyMessage || 'No messages yet. Start a conversation!'}
                    </div>
                </div>
            </div>
        `;
    }

    // Sort posts by id (oldest first)
    const displayPosts = posts.slice().sort((a, b) => a.id - b.id);

    const sentinel = html`<div class="timeline-sentinel" ref=${sentinelRef}></div>`;

    return html`
        <div class="timeline ${reverse ? 'reverse' : 'normal'}" ref=${timelineRef} onScroll=${handleScroll}>
            <div class="timeline-content">
                ${reverse ? sentinel : null}
                ${displayPosts.map(post => {
                    const isThreadReply = Boolean(post.data?.thread_id && post.data.thread_id !== post.id);
                    const isRemoving = removingPostIds?.has?.(post.id);
                    return html`
                    <${Post}
                        key=${post.id}
                        post=${post}
                        isThreadReply=${isThreadReply}
                        isRemoving=${isRemoving}
                        highlightQuery=${searchQuery}
                        agentName=${getAgentName(post.data?.agent_id, agents || {})}
                        agentAvatarUrl=${getAgentAvatarUrl(post.data?.agent_id, agents || {})}
                        userName=${user?.name || user?.user_name}
                        userAvatarUrl=${user?.avatar_url || user?.avatarUrl || user?.avatar}
                        userAvatarBackground=${user?.avatar_background || user?.avatarBackground}
                        onClick=${() => onPostClick?.(post)}
                        onHashtagClick=${onHashtagClick}
                        onMessageRef=${onMessageRef}
                        onScrollToMessage=${onScrollToMessage}
                        onFileRef=${onFileRef}
                        onDelete=${onDeletePost}
                    />
                `})}
                ${reverse ? null : sentinel}
            </div>
        </div>
    `;
}
