// @ts-nocheck
/**
 * app.ts - Main web UI entry point.
 *
 * This file is the root of the authenticated SPA. It imports all components,
 * the API client, and the markdown renderer, and is bundled to:
 *   web/static/dist/app.bundle.js
 *
 * Bundle split:
 *   - app.bundle.js   (authenticated web UI)
 *   - login.bundle.js (login page behavior only)
 *
 * Auth segmentation:
 *   request-router-service.ts only exposes login.bundle.js to unauthenticated
 *   visitors. app.bundle.js remains auth-gated.
 */
import { html, render, useState, useEffect, useCallback, useRef, useMemo } from './vendor/preact-htm.js';
import * as api from './api.js';
import { ComposeBox } from './components/compose-box.js';
import { AgentRequestModal, AgentStatus, ConnectionStatus } from './components/status.js';
import { Timeline } from './components/timeline.js';
import { WorkspaceExplorer } from './components/workspace-explorer.js';
import { TabStrip } from './components/tab-strip.js';
import { MarkdownPreview } from './components/markdown-preview.js';
import { paneRegistry, editorPaneExtension, preloadEditorBundle, terminalPaneExtension, workspacePreviewPaneExtension, workspaceMarkdownPreviewPaneExtension, tabStore } from './panes/index.js';
import { getLocalStorageBoolean, getLocalStorageNumber, setLocalStorageItem } from './utils/storage.js';
import { useSseConnection } from './ui/use-sse-connection.js';
import { useNotifications } from './ui/use-notifications.js';
import { useTimeline } from './ui/use-timeline.js';
import { dedupePosts } from './ui/timeline-utils.js';
import { useAgentState } from './ui/use-agent-state.js';
import { useSplitters } from './ui/use-splitters.js';
import { useEditorState } from './ui/use-editor-state.js';
import { initTheme, applyThemeFromEvent } from './ui/theme.js';
import {
    LAST_ACTIVITY_TTL_MS,
    SILENCE_FINALIZE_MS,
    SILENCE_REFRESH_MS,
    SILENCE_WARNING_MS,
    buildAgentsMap,
    estimatePreviewLines,
    isIOSDevice,
    useTimestampRefresh,
} from './ui/app-helpers.js';

function missingApi(name, fallback) {
    if (typeof window !== 'undefined') {
        console.warn(`[app] API export missing: ${name}. Using fallback behavior.`);
    }
    return async () => fallback;
}

const searchPosts = api.searchPosts;
const deletePost = api.deletePost;
const getAgents = api.getAgents;
const getAgentThought = api.getAgentThought;
const setAgentThoughtVisibility = api.setAgentThoughtVisibility;
const getAgentStatus = api.getAgentStatus;
const getAgentContext = typeof api.getAgentContext === 'function'
    ? api.getAgentContext
    : missingApi('getAgentContext', null);
const getAgentModels = typeof api.getAgentModels === 'function'
    ? api.getAgentModels
    : missingApi('getAgentModels', { current: null, models: [] });
const getAgentQueueState = typeof api.getAgentQueueState === 'function'
    ? api.getAgentQueueState
    : missingApi('getAgentQueueState', { count: 0 });
const steerAgentQueueItem = typeof api.steerAgentQueueItem === 'function'
    ? api.steerAgentQueueItem
    : missingApi('steerAgentQueueItem', { removed: false, queued: 'steer' });
const removeAgentQueueItem = typeof api.removeAgentQueueItem === 'function'
    ? api.removeAgentQueueItem
    : missingApi('removeAgentQueueItem', { removed: false });

// Configure marked for safe rendering
if (window.marked) {
    marked.setOptions({
        breaks: true,  // Convert \n to <br>
        gfm: true,     // GitHub Flavored Markdown
    });
}

/**
 * Main App component
 */
// Register built-in pane extensions
paneRegistry.register(editorPaneExtension);
paneRegistry.register(workspacePreviewPaneExtension);
paneRegistry.register(workspaceMarkdownPreviewPaneExtension);
// Preload the editor bundle in the background so first file open is instant
preloadEditorBundle();

// Terminal dock pane is behind a feature flag - opt in via localStorage
// or config. Editor pane is always registered as the default.
const EXPERIMENTAL_PANES = typeof localStorage !== 'undefined' && localStorage.getItem('experimentalPanes') === 'true';
if (EXPERIMENTAL_PANES) {
    paneRegistry.register(terminalPaneExtension);
}

function App() {
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [currentHashtag, setCurrentHashtag] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [fileRefs, setFileRefs] = useState([]);
    const [messageRefs, setMessageRefs] = useState([]);
    const [intentToast, setIntentToast] = useState(null);
    const {
        agentStatus,
        setAgentStatus,
        agentDraft,
        setAgentDraft,
        agentPlan,
        setAgentPlan,
        agentThought,
        setAgentThought,
        pendingRequest,
        setPendingRequest,
        currentTurnId,
        setCurrentTurnId,
        steerQueuedTurnId,
        setSteerQueuedTurnId,
        lastAgentEventRef,
        lastSilenceNoticeRef,
        isAgentRunningRef,
        draftBufferRef,
        thoughtBufferRef,
        pendingRequestRef,
        stalledPostIdRef,
        currentTurnIdRef,
        steerQueuedTurnIdRef,
        thoughtExpandedRef,
        draftExpandedRef,
    } = useAgentState();
    const [agents, setAgents] = useState({});
    const [activeModel, setActiveModel] = useState(null);
    const [activeThinkingLevel, setActiveThinkingLevel] = useState(null);
    const [supportsThinking, setSupportsThinking] = useState(false);
    const [activeModelUsage, setActiveModelUsage] = useState(null);
    const [contextUsage, setContextUsage] = useState(null);
    const [followupQueueItems, setFollowupQueueItems] = useState([]);
    const [isAgentTurnActive, setIsAgentTurnActive] = useState(false);
    const followupQueueCount = followupQueueItems.length;
    const followupQueueRowIdsRef = useRef(new Set());
    const followupQueueItemsRef = useRef([]);
    // Row IDs that were locally dismissed (e.g. injected as steering).
    // refreshQueueState filters these out so the server can't re-add them
    // before the placeholder is actually consumed server-side.
    const dismissedQueueRowIdsRef = useRef(new Set());
    const silentRecoveryRef = useRef({ inFlight: false, lastAttemptAt: 0, turnId: null });
    // Keep refs in sync during render for immediate access in stable callbacks
    followupQueueRowIdsRef.current = new Set(followupQueueItems.map((item) => item.row_id));
    followupQueueItemsRef.current = followupQueueItems;
    const {
        notificationsEnabled,
        notificationPermission,
        toggleNotifications: handleToggleNotifications,
        notify,
    } = useNotifications();
    const [removingPostIds, setRemovingPostIds] = useState(() => new Set());
    const [workspaceOpen, setWorkspaceOpen] = useState(() => getLocalStorageBoolean('workspaceOpen', true));

    // Stable ref so useEditorState can call removeFileRef without a forward-reference TDZ
    const removeFileRefRef = useRef(null);

    // Editor state hook (file load/save, tabs, dirty, view state, SSE sync)
    const {
        editorOpen, tabStripTabs, tabStripActiveId, previewTabs,
        openEditor, closeEditor, handleTabClose, handleTabActivate,
        handleTabCloseOthers, handleTabCloseAll, handleTabTogglePin,
        handleTabTogglePreview, revealInExplorer,
    } = useEditorState({ onTabClosed: (path) => removeFileRefRef.current?.(path) });

    // Editor extension container ref + instance tracking
    const editorContainerRef = useRef(null);
    const editorInstanceRef = useRef(null);

    // Mount/dispose editor extension instance when active tab changes
    useEffect(() => {
        const container = editorContainerRef.current;
        if (!container) return;

        // Dispose previous instance
        if (editorInstanceRef.current) {
            editorInstanceRef.current.dispose();
            editorInstanceRef.current = null;
        }

        const activeId = tabStripActiveId;
        if (!activeId) return;

        // Mount new instance
        const context = { path: activeId, mode: 'edit' };
        const ext = paneRegistry.resolve(context) || paneRegistry.get('editor');
        if (!ext) {
            // No pane extension available - show fallback message
            container.innerHTML = '<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';
            return;
        }

        const instance = ext.mount(container, context);
        editorInstanceRef.current = instance;

        // Wire PaneInstance callbacks
        instance.onDirtyChange?.((dirty) => {
            tabStore.setDirty(activeId, dirty);
        });

        instance.onSaveRequest?.(() => {
            // Save is handled internally by the extension now
        });

        instance.onClose?.(() => {
            closeEditor();
        });

        // Restore view state from tab store
        const viewState = tabStore.getViewState(activeId);
        if (viewState && typeof instance.restoreViewState === 'function') {
            // Wait for CodeMirror to settle
            requestAnimationFrame(() => instance.restoreViewState(viewState));
        }

        // Track view state changes
        if (typeof instance.onViewStateChange === 'function') {
            instance.onViewStateChange((state) => {
                tabStore.saveViewState(activeId, state);
            });
        }

        // Focus the editor
        requestAnimationFrame(() => instance.focus());

        return () => {
            if (editorInstanceRef.current === instance) {
                instance.dispose();
                editorInstanceRef.current = null;
            }
        };
    }, [tabStripActiveId, closeEditor]);

    const [userProfile, setUserProfile] = useState({ name: 'You', avatar_url: null, avatar_background: null });
    const hasConnectedOnceRef = useRef(false);
    const wasAgentActiveRef = useRef(false); // tracks active→idle transition for timeline refresh
    const agentStatusRef = useRef(null);
    const draftThrottleRef = useRef(0);
    const thoughtThrottleRef = useRef(0);
    const agentsRef = useRef({});
    const userProfileRef = useRef({ name: null, avatar_url: null });
    const viewStateRef = useRef({ currentHashtag: null, searchQuery: null });
    const timelineRef = useRef(null);
    const appShellRef = useRef(null);
    const sidebarWidthRef = useRef(0);
    const editorWidthRef = useRef(0);
    const dockHeightRef = useRef(0);
    const lastNotifiedIdRef = useRef(null);
    const lastAgentResponseRef = useRef(null);
    const lastActivityTimerRef = useRef(null);
    const lastActivityTokenRef = useRef(0);
    const brandingRef = useRef({ title: null, avatarBase: null });
    const intentToastTimerRef = useRef(null);

    const clearIntentToast = useCallback(() => {
        if (intentToastTimerRef.current) {
            clearTimeout(intentToastTimerRef.current);
            intentToastTimerRef.current = null;
        }
        setIntentToast(null);
    }, []);

    // Refresh timestamps every 30 seconds
    useTimestampRefresh(30000);

    useEffect(() => {
        return initTheme();
    }, []);

    useEffect(() => {
        setLocalStorageItem('workspaceOpen', String(workspaceOpen));
    }, [workspaceOpen]);

    useEffect(() => {
        return () => {
            clearIntentToast();
        };
    }, [clearIntentToast]);

    useEffect(() => {
        agentsRef.current = agents || {};
    }, [agents]);

    useEffect(() => {
        userProfileRef.current = userProfile || { name: 'You', avatar_url: null, avatar_background: null };
    }, [userProfile]);

    const applyBranding = useCallback((name, avatarUrl, avatarVersion = null) => {
        if (typeof document === 'undefined') return;
        const title = (name || '').trim() || 'PiClaw';
        if (brandingRef.current.title !== title) {
            document.title = title;
            const titleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
            if (titleMeta && titleMeta.getAttribute('content') !== title) {
                titleMeta.setAttribute('content', title);
            }
            brandingRef.current.title = title;
        }

        const favicon = document.getElementById('dynamic-favicon');
        if (!favicon) return;
        const defaultHref = favicon.getAttribute('data-default') || favicon.getAttribute('href') || '/favicon.ico';
        const baseHref = avatarUrl || defaultHref;
        const avatarKey = avatarUrl ? `${baseHref}|${avatarVersion || ''}` : baseHref;
        if (brandingRef.current.avatarBase !== avatarKey) {
            const cacheBust = avatarUrl ? `${baseHref}${baseHref.includes('?') ? '&' : '?'}v=${avatarVersion || Date.now()}` : baseHref;
            favicon.setAttribute('href', cacheBust);
            brandingRef.current.avatarBase = avatarKey;
        }
    }, []);

    const addFileRef = useCallback((path) => {
        if (!path) return;
        setFileRefs((prev) => (prev.includes(path) ? prev : [...prev, path]));
    }, []);

    const removeFileRef = useCallback((path) => {
        setFileRefs((prev) => prev.filter((item) => item !== path));
    }, []);
    removeFileRefRef.current = removeFileRef;

    const clearFileRefs = useCallback(() => {
        setFileRefs([]);
    }, []);

    // TDZ-safe hook ordering note:
    // - keep handler callbacks defined before they are passed downstream,
    // - avoid forward references to uninitialized const callbacks,
    // - use useRef.current for mutable forward refs when needed.
    // See notes/piclaw-web-frontend-safety.md for the full checklist.
    const showIntentToast = useCallback((title, detail = null, kind = 'info', durationMs = 3000) => {
        clearIntentToast();
        setIntentToast({ title, detail: detail || null, kind: kind || 'info' });
        intentToastTimerRef.current = setTimeout(() => {
            setIntentToast((current) => (current?.title === title ? null : current));
        }, durationMs);
    }, [clearIntentToast]);

    const openFileFromPill = useCallback((rawPath) => {
        if (typeof rawPath !== 'string') return;
        const path = rawPath.trim();
        if (!path) {
            showIntentToast('No file selected', 'Use a valid file path from a file pill.', 'warning');
            return;
        }

        if (!editorOpen) {
            showIntentToast('Editor pane is not open', 'Open the editor pane to open files from pills.', 'warning');
            return;
        }

        const protocolMatch = /^[a-z][a-z0-9+.-]*:/i.test(path);
        if (protocolMatch) {
            showIntentToast('Cannot open external path from file pill', 'Use an in-workspace file path.', 'warning');
            return;
        }

        const context = { path, mode: 'edit' };
        const editorExt = paneRegistry.resolve(context);
        if (!editorExt) {
            showIntentToast('No editor available', `No editor can open: ${path}`, 'warning');
            return;
        }

        openEditor(path);
    }, [editorOpen, openEditor, showIntentToast]);

    const attachActiveEditorFile = useCallback(() => {
        const activeId = tabStripActiveId;
        if (activeId) addFileRef(activeId);
    }, [tabStripActiveId, addFileRef]);

    const addMessageRef = useCallback((id) => {
        if (!id) return;
        setMessageRefs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    /** Scroll to a message by ID; fetch and inject if not in current timeline. */
    const scrollToMessage = useCallback(async (id) => {
        // Helper to highlight after scroll
        const highlight = (el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('post-highlight');
            setTimeout(() => el.classList.remove('post-highlight'), 2000);
        };
        // Try to find it in the DOM first
        const existing = document.getElementById('post-' + id);
        if (existing) { highlight(existing); return; }
        // Not in DOM - fetch via API and inject into posts
        try {
            const result = await api.getThread(id);
            const msg = result?.thread?.[0];
            if (!msg) return;
            setPosts((prev) => {
                if (!prev) return [msg];
                if (prev.some((p) => p.id === msg.id)) return prev;
                return [...prev, msg];
            });
            // Wait for render, then scroll
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const el = document.getElementById('post-' + id);
                    if (el) highlight(el);
                }, 50);
            });
        } catch (err) {
            console.error('[scrollToMessage] Failed to fetch message', id, err);
        }
    }, []);

    const removeMessageRef = useCallback((id) => {
        setMessageRefs((prev) => prev.filter((item) => item !== id));
    }, []);

    const clearMessageRefs = useCallback(() => {
        setMessageRefs([]);
    }, []);

    const noteAgentActivity = useCallback((options = {}) => {
        const now = Date.now();
        lastAgentEventRef.current = now;
        if (options.running) {
            isAgentRunningRef.current = true;
            // Only update state if not already active to avoid redundant re-renders
            setIsAgentTurnActive((prev) => prev ? prev : true);
        }
        if (options.clearSilence) {
            lastSilenceNoticeRef.current = 0;
        }
    }, [setIsAgentTurnActive]);

    const clearLastActivityTimer = useCallback(() => {
        if (lastActivityTimerRef.current) {
            clearTimeout(lastActivityTimerRef.current);
            lastActivityTimerRef.current = null;
        }
        lastActivityTokenRef.current = 0;
    }, []);

    // Cleanup: cancel any pending last-activity timer on unmount.
    // Placed after clearLastActivityTimer definition to avoid TDZ errors.
    useEffect(() => () => {
        clearLastActivityTimer();
    }, [clearLastActivityTimer]);

    const clearLastActivityFlag = useCallback(() => {
        clearLastActivityTimer();
        setAgentStatus((prev) => {
            if (!prev) return prev;
            if (!(prev.last_activity || prev.lastActivity)) return prev;
            const { last_activity, lastActivity, ...rest } = prev;
            return rest;
        });
    }, [clearLastActivityTimer]);

    const showLastActivity = useCallback((payload) => {
        if (!payload) return;
        clearLastActivityTimer();
        const token = Date.now();
        lastActivityTokenRef.current = token;
        // Strip tool/intent details - only show a minimal "last active" hint
        setAgentStatus({ type: payload.type || 'active', last_activity: true });
        lastActivityTimerRef.current = setTimeout(() => {
            if (lastActivityTokenRef.current !== token) return;
            setAgentStatus((prev) => {
                if (!prev || !(prev.last_activity || prev.lastActivity)) return prev;
                return null;
            });
        }, LAST_ACTIVITY_TTL_MS);
    }, [clearLastActivityTimer]);

    const clearAgentRunState = useCallback(() => {
        isAgentRunningRef.current = false;
        setIsAgentTurnActive(false);
        lastAgentEventRef.current = null;
        lastSilenceNoticeRef.current = 0;
        draftBufferRef.current = '';
        thoughtBufferRef.current = '';
        pendingRequestRef.current = null;
        lastAgentResponseRef.current = null;
        currentTurnIdRef.current = null;
        steerQueuedTurnIdRef.current = null;
        silentRecoveryRef.current = { inFlight: false, lastAttemptAt: 0, turnId: null };
        clearLastActivityTimer();
        setCurrentTurnId(null);
        setSteerQueuedTurnId(null);
        thoughtExpandedRef.current = false;
        draftExpandedRef.current = false;
    }, [clearLastActivityTimer, setCurrentTurnId, setSteerQueuedTurnId, setIsAgentTurnActive]);

    const setActiveTurn = useCallback((turnId) => {
        if (!turnId) return;
        if (currentTurnIdRef.current === turnId) return;
        currentTurnIdRef.current = turnId;
        silentRecoveryRef.current = { inFlight: false, lastAttemptAt: 0, turnId };
        setCurrentTurnId(turnId);
        steerQueuedTurnIdRef.current = null;
        setSteerQueuedTurnId(null);
        draftBufferRef.current = '';
        thoughtBufferRef.current = '';
        setAgentDraft({ text: '', totalLines: 0 });
        setAgentPlan('');
        setAgentThought({ text: '', totalLines: 0 });
        setPendingRequest(null);
        pendingRequestRef.current = null;
        lastAgentResponseRef.current = null;
        thoughtExpandedRef.current = false;
        draftExpandedRef.current = false;
    }, [setCurrentTurnId, setSteerQueuedTurnId]);


    const notifyForFinalResponse = useCallback((turnId) => {
        if (typeof document !== 'undefined') {
            const hasFocus = typeof document.hasFocus === 'function' ? document.hasFocus() : true;
            if (!document.hidden && hasFocus) return;
        }
        const entry = lastAgentResponseRef.current;
        if (!entry || !entry.post) return;
        if (turnId && entry.turnId && entry.turnId !== turnId) return;
        const post = entry.post;
        if (post.id && lastNotifiedIdRef.current === post.id) return;
        const content = String(post?.data?.content || '').trim();
        if (!content) return;
        lastNotifiedIdRef.current = post.id || lastNotifiedIdRef.current;
        lastAgentResponseRef.current = null;
        const body = content.replace(/\s+/g, ' ').slice(0, 200);
        const agentsMap = agentsRef.current || {};
        const agent = post?.data?.agent_id ? agentsMap[post.data.agent_id] : null;
        const title = agent?.name || 'Pi';
        notify(title, body);
    }, [notify]);

    const handlePanelToggle = useCallback(async (panelKey, expanded) => {
        if (panelKey !== 'thought' && panelKey !== 'draft') return;
        const turnId = currentTurnIdRef.current;
        if (panelKey === 'thought') {
            thoughtExpandedRef.current = expanded;
            if (turnId) {
                try {
                    await setAgentThoughtVisibility(turnId, 'thought', expanded);
                } catch (error) {
                    console.warn('Failed to update thought visibility:', error);
                }
            }
            if (!expanded) return;
            try {
                const data = turnId ? await getAgentThought(turnId, 'thought') : null;
                if (data?.text) {
                    thoughtBufferRef.current = data.text;
                }
                setAgentThought((prev) => ({
                    ...(prev || { text: '', totalLines: 0 }),
                    fullText: thoughtBufferRef.current || prev?.fullText || '',
                    totalLines: Number.isFinite(data?.total_lines) ? data.total_lines : prev?.totalLines || 0,
                }));
            } catch (error) {
                console.warn('Failed to fetch full thought:', error);
            }
            return;
        }
        draftExpandedRef.current = expanded;
        if (turnId) {
            try {
                await setAgentThoughtVisibility(turnId, 'draft', expanded);
            } catch (error) {
                console.warn('Failed to update draft visibility:', error);
            }
        }
        if (!expanded) return;
        try {
            const data = turnId ? await getAgentThought(turnId, 'draft') : null;
            if (data?.text) {
                draftBufferRef.current = data.text;
            }
            setAgentDraft((prev) => ({
                ...(prev || { text: '', totalLines: 0 }),
                fullText: draftBufferRef.current || prev?.fullText || '',
                totalLines: Number.isFinite(data?.total_lines) ? data.total_lines : prev?.totalLines || 0,
            }));
        } catch (error) {
            console.warn('Failed to fetch full draft:', error);
        }
    }, []);


    // Scroll to bottom of timeline (column-reverse: bottom is scrollTop=0)
    // Only auto-scroll if user is already near the bottom (within 150px).
    const scrollToBottomRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        const el = timelineRef.current;
        if (!el) return;
        // column-reverse: scrollTop=0 is bottom, negative values mean scrolled up
        const scrolledUp = Math.abs(el.scrollTop) > 150;
        if (!scrolledUp) {
            el.scrollTop = 0;
        }
    }, []);
    scrollToBottomRef.current = scrollToBottom;

    const preserveTimelineScroll = useCallback((mutate) => {
        const container = timelineRef.current;
        if (!container || typeof mutate !== 'function') {
            mutate?.();
            return;
        }
        const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current || {};
        const reverseTimeline = !(activeSearch && !activeHashtag);
        const anchor = reverseTimeline
            ? container.scrollHeight - container.scrollTop
            : container.scrollTop;
        mutate();
        requestAnimationFrame(() => {
            const target = timelineRef.current;
            if (!target) return;
            if (reverseTimeline) {
                const nextTop = Math.max(target.scrollHeight - anchor, 0);
                target.scrollTop = nextTop;
            } else {
                const maxScroll = Math.max(target.scrollHeight - target.clientHeight, 0);
                const nextTop = Math.min(anchor, maxScroll);
                target.scrollTop = nextTop;
            }
        });
    }, []);

    const preserveTimelineScrollTop = useCallback((mutate) => {
        const container = timelineRef.current;
        if (!container || typeof mutate !== 'function') {
            mutate?.();
            return;
        }
        const anchor = container.scrollTop;
        mutate();
        requestAnimationFrame(() => {
            const target = timelineRef.current;
            if (!target) return;
            const maxScroll = Math.max(target.scrollHeight - target.clientHeight, 0);
            target.scrollTop = Math.min(anchor, maxScroll);
        });
    }, []);

    /** Ref-stable filter: hides placeholder rows and their parent user messages.
     *  Reads from refs so callback identity never changes — this breaks the
     *  re-render cascade that previously destabilised handleSseEvent → SSE.
     *  Returns the same array reference when nothing is filtered. */
    const LEGACY_QUEUE_STATUS = 'Queued as a follow-up (one-at-a-time).';
    const QUEUE_PLACEHOLDER_MARKER = '\u2063';
    const filterQueuedPosts = useCallback((items) => {
        if (!items || !Array.isArray(items)) return items;
        const queueRowIds = followupQueueRowIdsRef.current;
        const hiddenIds = new Set(queueRowIds);
        const queueItems = followupQueueItemsRef.current;
        for (const qi of queueItems) {
            if (qi?.thread_id != null) hiddenIds.add(qi.thread_id);
        }

        const filtered = items.filter((post) => {
            if (hiddenIds.has(post?.id)) return false;
            // Hide queue placeholder rows from timeline permanently.
            if (post?.data?.is_bot_message) {
                const content = post?.data?.content;
                if (content === LEGACY_QUEUE_STATUS || content === QUEUE_PLACEHOLDER_MARKER) return false;
            }
            return true;
        });
        return filtered.length === items.length ? items : filtered;
    }, []);

    const {
        posts: rawPosts,
        setPosts,
        hasMore,
        setHasMore,
        hasMoreRef,
        loadPosts,
        refreshTimeline,
        loadMore,
        loadMoreRef,
    } = useTimeline({ preserveTimelineScroll, preserveTimelineScrollTop });

    // Derive filtered posts: placeholder rows and their parent user messages
    // are hidden.  Recomputes when rawPosts or followupQueueItems change;
    // filterQueuedPosts is identity-stable (empty deps) so it never
    // triggers a cascade through handleSseEvent → SSE reconnection.
    const posts = useMemo(() => filterQueuedPosts(rawPosts), [rawPosts, followupQueueItems, filterQueuedPosts]);

    const removeStalledPost = useCallback(() => {
        const stalledId = stalledPostIdRef.current;
        if (!stalledId) return;
        setPosts((prev) => (prev ? prev.filter((post) => post.id !== stalledId) : prev));
        stalledPostIdRef.current = null;
    }, [setPosts]);


    const {
        handleSplitterMouseDown,
        handleSplitterTouchStart,
        handleEditorSplitterMouseDown,
        handleEditorSplitterTouchStart,
        handleDockSplitterMouseDown,
        handleDockSplitterTouchStart,
    } = useSplitters({ appShellRef, sidebarWidthRef, editorWidthRef, dockHeightRef });

    const finalizeStalledResponse = useCallback(() => {
        if (!isAgentRunningRef.current) return;
        isAgentRunningRef.current = false;
        lastSilenceNoticeRef.current = 0;
        lastAgentEventRef.current = null;
        currentTurnIdRef.current = null;
        setCurrentTurnId(null);
        thoughtExpandedRef.current = false;
        draftExpandedRef.current = false;

        const partial = (draftBufferRef.current || '').trim();
        draftBufferRef.current = '';
        thoughtBufferRef.current = '';
        setAgentDraft({ text: '', totalLines: 0 });
        setAgentPlan('');
        setAgentThought({ text: '', totalLines: 0 });
        setPendingRequest(null);
        pendingRequestRef.current = null;
        lastAgentResponseRef.current = null;

        if (!partial) {
            setAgentStatus({ type: 'error', title: 'Response stalled - No content received' });
            return;
        }

        const warning = '\n\n⚠️ Response may be incomplete - the model stopped responding';
        const content = `${partial}${warning}`;
        const id = Date.now();
        const timestamp = new Date().toISOString();
        const localPost = {
            id,
            timestamp,
            data: {
                type: 'agent_response',
                content,
                agent_id: 'default',
                is_local_stall: true,
            },
        };

        stalledPostIdRef.current = id;
        setPosts((prev) => (prev ? dedupePosts([...prev, localPost]) : [localPost]));
        scrollToBottomRef.current?.();
        setAgentStatus(null);
    }, [setCurrentTurnId]);

    useEffect(() => {
        viewStateRef.current = { currentHashtag, searchQuery };
    }, [currentHashtag, searchQuery]);


    const refreshQueueState = useCallback(() => {
        getAgentQueueState()
            .then((payload) => {
                const dismissed = dismissedQueueRowIdsRef.current;
                const items = Array.isArray(payload?.items)
                    ? payload.items
                        .map((item) => ({ ...item }))
                        .filter((item) => !dismissed.has(item.row_id))
                    : [];
                if (items.length) {
                    setFollowupQueueItems((prev) => {
                        if (prev.length === items.length && prev.every((p, i) => p.row_id === items[i].row_id)) return prev;
                        return items;
                    });
                    return;
                }

                // Server queue is empty (after filtering dismissed) — clear dismissed set
                dismissed.clear();
                setFollowupQueueItems((prev) => prev.length === 0 ? prev : []);
            })
            .catch(() => {
                setFollowupQueueItems((prev) => prev.length === 0 ? prev : []);
            });
    }, [setFollowupQueueItems]);

    const refreshContextUsage = useCallback(async () => {
        try {
            const ctx = await getAgentContext();
            if (ctx) setContextUsage(ctx);
        } catch (err) {
            console.warn('Failed to fetch agent context:', err);
        }
    }, []);

    const refreshAgentStatus = useCallback(async () => {
        try {
            const res = await getAgentStatus('web:default');
            if (!res || res.status !== 'active' || !res.data) {
                // If the agent just transitioned active → idle, refresh the timeline
                // to catch any final response that arrived while SSE was gapped.
                if (wasAgentActiveRef.current) {
                    const { currentHashtag: ah, searchQuery: sq } = viewStateRef.current || {};
                    if (!ah && !sq) refreshTimeline();
                }
                wasAgentActiveRef.current = false;
                clearAgentRunState();
                setAgentStatus(null);
                setAgentDraft({ text: '', totalLines: 0 });
                setAgentPlan('');
                setAgentThought({ text: '', totalLines: 0 });
                setPendingRequest(null);
                pendingRequestRef.current = null;
                return res ?? null;
            }
            wasAgentActiveRef.current = true;
            const payload = res.data;
            const activeTurn = payload.turn_id || payload.turnId;
            if (activeTurn) setActiveTurn(activeTurn);
            noteAgentActivity({ running: true, clearSilence: true });
            clearLastActivityFlag();
            setAgentStatus(payload);

            // Restore draft/thought buffers if the server has them and the
            // client doesn't (e.g. after reconnect or SSE gap).
            if (res.thought && res.thought.text) {
                setAgentThought((prev) => {
                    if (prev && prev.text && prev.text.length >= res.thought.text.length) return prev;
                    thoughtBufferRef.current = res.thought.text;
                    return { text: res.thought.text, totalLines: res.thought.totalLines || 0 };
                });
            }
            if (res.draft && res.draft.text) {
                setAgentDraft((prev) => {
                    if (prev && prev.text && prev.text.length >= res.draft.text.length) return prev;
                    draftBufferRef.current = res.draft.text;
                    return { text: res.draft.text, totalLines: res.draft.totalLines || 0 };
                });
            }
            return res;
        } catch (err) {
            console.warn('Failed to fetch agent status:', err);
            return null;
        }
    }, [clearAgentRunState, clearLastActivityFlag, noteAgentActivity, refreshTimeline, setActiveTurn]);

    const reconcileSilentTurn = useCallback(async () => {
        if (!isAgentRunningRef.current) return null;
        if (pendingRequestRef.current) return null;

        const activeTurnId = currentTurnIdRef.current || null;
        const probe = silentRecoveryRef.current;
        const now = Date.now();
        if (probe.inFlight) return null;
        if (probe.turnId === activeTurnId && now - probe.lastAttemptAt < SILENCE_REFRESH_MS) {
            return null;
        }

        probe.inFlight = true;
        probe.lastAttemptAt = now;
        probe.turnId = activeTurnId;

        try {
            const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current || {};
            if (!activeHashtag && !activeSearch) {
                await refreshTimeline();
            }
            await refreshQueueState();
            return await refreshAgentStatus();
        } finally {
            probe.inFlight = false;
        }
    }, [refreshAgentStatus, refreshQueueState, refreshTimeline]);

    // Silence watchdog — detects when the agent stream goes quiet and
    // triggers a server re-sync to surface missed terminal replies.
    // Depends on reconcileSilentTurn which is defined above.
    useEffect(() => {
        const intervalMs = Math.min(1000, Math.max(100, Math.floor(SILENCE_WARNING_MS / 2)));
        const interval = setInterval(() => {
            if (!isAgentRunningRef.current) return;
            if (pendingRequestRef.current) return;
            const lastEvent = lastAgentEventRef.current;
            if (!lastEvent) return;
            const now = Date.now();
            const silenceMs = now - lastEvent;

            if (silenceMs >= SILENCE_FINALIZE_MS) {
                setAgentStatus({
                    type: 'waiting',
                    title: 'Re-syncing after a quiet period…',
                });
                void reconcileSilentTurn();
                return;
            }

            if (silenceMs >= SILENCE_WARNING_MS) {
                if (now - lastSilenceNoticeRef.current >= SILENCE_REFRESH_MS) {
                    const seconds = Math.floor(silenceMs / 1000);
                    setAgentStatus({
                        type: 'waiting',
                        title: `Waiting for model… No events for ${seconds}s`,
                    });
                    lastSilenceNoticeRef.current = now;
                    void reconcileSilentTurn();
                }
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [reconcileSilentTurn]);

    const handleConnectionStatusChange = useCallback((status) => {
        setConnectionStatus(status);
        if (status !== 'connected') {
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();
            return;
        }
        if (!hasConnectedOnceRef.current) {
            hasConnectedOnceRef.current = true;
            // On initial page load, fetch agent status immediately so any
            // in-progress turn (e.g. auto-compaction) is shown right away.
            refreshAgentStatus();
            return;
        }
        // On reconnect: refresh timeline for any missed posts and restore
        // in-progress agent state (status + draft/thought buffers).
        const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
        if (!activeHashtag && !activeSearch) {
            refreshTimeline();
        }
        refreshAgentStatus();
    }, [clearAgentRunState, refreshTimeline, refreshAgentStatus]);


    // Handle hashtag click
    const handleHashtagClick = useCallback(async (hashtag) => {
        setCurrentHashtag(hashtag);
        setPosts(null); // Show loading
        await loadPosts(hashtag);
    }, [loadPosts]);

    // Go back to timeline
    const handleBackToTimeline = useCallback(async () => {
        setCurrentHashtag(null);
        setSearchQuery(null);
        setPosts(null);
        await loadPosts();
    }, [loadPosts]);

    // Handle search
    const handleSearch = useCallback(async (query) => {
        if (!query || !query.trim()) return;
        setSearchQuery(query.trim());
        setCurrentHashtag(null);
        setPosts(null);
        try {
            const result = await searchPosts(query.trim());
            setPosts(result.results);
            setHasMore(false);
        } catch (error) {
            console.error('Failed to search:', error);
            setPosts([]);
        }
    }, []);

    const enterSearchMode = useCallback(() => {
        setSearchOpen(true);
        setSearchQuery(null);
        setCurrentHashtag(null);
        setPosts([]);
    }, []);

    const exitSearchMode = useCallback(() => {
        setSearchOpen(false);
        setSearchQuery(null);
        loadPosts();
    }, [loadPosts]);

    const navigateToSearchResult = useCallback(() => {}, []);

    const handleDeletePost = useCallback(async (post) => {
        if (!post) return;
        const postId = post.id;
        const replyCount = posts?.filter((item) => item?.data?.thread_id === postId && item?.id !== postId).length || 0;
        if (replyCount > 0) {
            const confirmed = window.confirm(`Delete this message and its ${replyCount} replies?`);
            if (!confirmed) return;
        }

        const scheduleRemoval = (ids) => {
            if (!ids.length) return;
            setRemovingPostIds((prev) => {
                const next = new Set(prev);
                ids.forEach((id) => next.add(id));
                return next;
            });
            const delayMs = 180;
            setTimeout(() => {
                preserveTimelineScrollTop(() => {
                    setPosts((prev) => (prev ? prev.filter((item) => !ids.includes(item.id)) : prev));
                });
                setRemovingPostIds((prev) => {
                    const next = new Set(prev);
                    ids.forEach((id) => next.delete(id));
                    return next;
                });
                if (hasMoreRef.current) {
                    loadMoreRef.current?.({ preserveScroll: true, preserveMode: 'top' });
                }
            }, delayMs);
        };

        try {
            const result = await deletePost(postId, replyCount > 0);
            if (result?.ids?.length) {
                scheduleRemoval(result.ids);
            }
        } catch (error) {
            const errorMessage = error?.message || '';
            if (replyCount === 0 && errorMessage.includes('Replies exist')) {
                const confirmed = window.confirm('Delete this message and its replies?');
                if (!confirmed) return;
                const result = await deletePost(postId, true);
                if (result?.ids?.length) {
                    scheduleRemoval(result.ids);
                }
                return;
            }
            console.error('Failed to delete post:', error);
            alert(`Failed to delete message: ${errorMessage}`);
        }
    }, [posts, preserveTimelineScrollTop]);

    const loadAgents = useCallback(async () => {
        try {
            const data = await getAgents();
            setAgents(buildAgentsMap(data));
            const nextUser = data?.user || {};
            setUserProfile((prev) => {
                const nextName = typeof nextUser.name === 'string' && nextUser.name.trim() ? nextUser.name.trim() : 'You';
                const nextAvatar = typeof nextUser.avatar_url === 'string' ? nextUser.avatar_url.trim() : null;
                const nextBg = typeof nextUser.avatar_background === 'string' && nextUser.avatar_background.trim()
                    ? nextUser.avatar_background.trim()
                    : null;
                if (prev.name === nextName && prev.avatar_url === nextAvatar && prev.avatar_background === nextBg) return prev;
                return { name: nextName, avatar_url: nextAvatar, avatar_background: nextBg };
            });
            // Pick up the current model from the default agent entry
            const defaultAgent = (data?.agents || []).find((a) => a.id === 'default');
            if (defaultAgent?.model) setActiveModel(defaultAgent.model);
            applyBranding(defaultAgent?.name, defaultAgent?.avatar_url);
        } catch (e) {
            console.warn('Failed to load agents:', e);
        }
        // Fetch initial context usage for the pie chart indicator
        try {
            const ctx = await getAgentContext();
            if (ctx) setContextUsage(ctx);
        } catch {}
    }, [applyBranding]);

    useEffect(() => {
        loadAgents();
        // Also apply saved sidebar width imperatively (no state → no re-render)
        const saved = getLocalStorageNumber('sidebarWidth', null);
        const w = Number.isFinite(saved) ? Math.min(Math.max(saved, 160), 600) : 280;
        sidebarWidthRef.current = w;
        if (appShellRef.current) {
            appShellRef.current.style.setProperty('--sidebar-width', `${w}px`);
        }
    }, [loadAgents]);

    const isComposeBoxAgentActive = isAgentTurnActive || agentStatus !== null;

    const updateAgentProfile = useCallback((payload) => {
        if (!payload || typeof payload !== 'object') return;
        const agentId = payload.agent_id;
        if (!agentId) return;
        const nextName = payload.agent_name;
        const nextAvatar = payload.agent_avatar;
        if (!nextName && nextAvatar === undefined) return;

        const current = agentsRef.current?.[agentId] || { id: agentId };
        let resolvedName = current.name || null;
        let resolvedAvatar = current.avatar_url ?? current.avatarUrl ?? current.avatar ?? null;
        let avatarChanged = false;
        let nameChanged = false;

        if (nextName && nextName !== current.name) {
            resolvedName = nextName;
            nameChanged = true;
        }

        if (nextAvatar !== undefined) {
            const normalizedAvatar = typeof nextAvatar === 'string' ? nextAvatar.trim() : null;
            const normalizedCurrent = typeof resolvedAvatar === 'string' ? resolvedAvatar.trim() : null;
            const nextValue = normalizedAvatar || null;
            const currentValue = normalizedCurrent || null;
            if (nextValue !== currentValue) {
                resolvedAvatar = nextValue;
                avatarChanged = true;
            }
        }

        if (!nameChanged && !avatarChanged) return;

        setAgents((prev) => {
            const currentEntry = prev[agentId] || { id: agentId };
            const updated = { ...currentEntry };
            if (nameChanged) updated.name = resolvedName;
            if (avatarChanged) updated.avatar_url = resolvedAvatar;
            return { ...prev, [agentId]: updated };
        });

        if (agentId === 'default') {
            applyBranding(resolvedName, resolvedAvatar, avatarChanged ? Date.now() : null);
        }
    }, [applyBranding]);

    const updateUserProfile = useCallback((payload) => {
        if (!payload || typeof payload !== 'object') return;
        const nextName = payload.user_name ?? payload.userName;
        const nextAvatar = payload.user_avatar ?? payload.userAvatar;
        const nextBg = payload.user_avatar_background ?? payload.userAvatarBackground;
        if (nextName === undefined && nextAvatar === undefined && nextBg === undefined) return;

        setUserProfile((prev) => {
            const resolvedName = typeof nextName === 'string' && nextName.trim()
                ? nextName.trim()
                : prev.name || 'You';
            const resolvedAvatar = nextAvatar === undefined
                ? prev.avatar_url
                : (typeof nextAvatar === 'string' && nextAvatar.trim() ? nextAvatar.trim() : null);
            const resolvedBg = nextBg === undefined
                ? prev.avatar_background
                : (typeof nextBg === 'string' && nextBg.trim() ? nextBg.trim() : null);
            if (
                prev.name === resolvedName
                && prev.avatar_url === resolvedAvatar
                && prev.avatar_background === resolvedBg
            ) return prev;
            return { name: resolvedName, avatar_url: resolvedAvatar, avatar_background: resolvedBg };
        });
    }, []);

    const applyModelState = useCallback((payload) => {
        if (!payload || typeof payload !== 'object') return;
        const nextModel = payload.model ?? payload.current;
        if (nextModel !== undefined) setActiveModel(nextModel);
        if (payload.thinking_level !== undefined) setActiveThinkingLevel(payload.thinking_level ?? null);
        if (payload.supports_thinking !== undefined) setSupportsThinking(Boolean(payload.supports_thinking));
        if (payload.provider_usage !== undefined) setActiveModelUsage(payload.provider_usage ?? null);
    }, []);

    const refreshModelState = useCallback(() => {
        getAgentModels()
            .then((payload) => {
                if (payload) applyModelState(payload);
            })
            .catch(() => {});
    }, [applyModelState]);
    const handleInjectQueuedFollowup = useCallback((queuedItem) => {
        const rowId = queuedItem?.row_id;
        if (rowId == null) return;
        // Optimistic removal
        dismissedQueueRowIdsRef.current.add(rowId);
        setFollowupQueueItems((current) => current.filter((item) => item?.row_id !== rowId));

        // Atomically remove the queued item server-side and convert it into
        // steering (or an immediate send if the active stream already ended).
        steerAgentQueueItem(rowId)
            .then(() => {
                void refreshQueueState();
            })
            .catch((error) => {
                console.warn('[queue] Failed to steer queued item:', error);
                showIntentToast('Failed to steer message', 'The queued message could not be sent as steering.', 'warning');
                dismissedQueueRowIdsRef.current.delete(rowId);
                void refreshQueueState();
            });
    }, [refreshQueueState, setFollowupQueueItems, showIntentToast]);

    const handleRemoveQueuedFollowup = useCallback((queuedItem) => {
        const rowId = queuedItem?.row_id;
        if (rowId == null) return;
        // Optimistic removal
        dismissedQueueRowIdsRef.current.add(rowId);
        setFollowupQueueItems((current) => current.filter((item) => item?.row_id !== rowId));

        // Remove the queued item server-side without sending it as steering
        // or converting it into a message.
        removeAgentQueueItem(rowId)
            .then(() => {
                void refreshQueueState();
            })
            .catch((error) => {
                console.warn('[queue] Failed to remove queued item:', error);
                showIntentToast('Failed to remove message', 'The queued message could not be removed.', 'warning');
                dismissedQueueRowIdsRef.current.delete(rowId);
                void refreshQueueState();
            });
    }, [refreshQueueState, setFollowupQueueItems, showIntentToast]);

    const handleMessageResponse = useCallback((response) => {
        if (!response || typeof response !== "object") return;

        if (response?.queued === "followup" || response?.queued === "steer") {
            refreshQueueState();
            return;
        }

        const commandResult = response?.command;
        if (commandResult && typeof commandResult === "object" && (
            commandResult?.queued_followup || commandResult?.queued_steer
        )) {
            refreshQueueState();
        }
    }, [refreshQueueState]);

    const refreshModelAndQueueState = useCallback(() => {
        refreshModelState();
        refreshQueueState();
    }, [refreshModelState, refreshQueueState]);

    useEffect(() => {
        refreshModelAndQueueState();
        const interval = setInterval(() => {
            refreshModelState();
            refreshQueueState();
        }, 60_000);
        return () => clearInterval(interval);
    }, [refreshModelAndQueueState, refreshModelState, refreshQueueState]);

    const handleSseEvent = useCallback((eventType, data) => {
        const turnId = data?.turn_id;

        updateAgentProfile(data);
        updateUserProfile(data);

        if (eventType === 'ui_theme') {
            applyThemeFromEvent(data);
            return;
        }

        if (eventType?.startsWith('agent_')) {
            const noisyAgentEvent =
                eventType === 'agent_draft_delta' ||
                eventType === 'agent_thought_delta' ||
                eventType === 'agent_draft' ||
                eventType === 'agent_thought';
            if (!noisyAgentEvent) {
                clearLastActivityFlag();
            }
        }

        // Handle agent status updates
        if (eventType === 'connected') {
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();

            getAgentStatus('web:default')
                .then((res) => {
                    if (!res || res.status !== 'active' || !res.data) return;
                    const payload = res.data;
                    const activeTurn = payload.turn_id || payload.turnId;
                    if (activeTurn) setActiveTurn(activeTurn);
                    noteAgentActivity({ clearSilence: true });
                    showLastActivity(payload);

                    // Restore draft/thought buffers from enriched status
                    if (res.thought && res.thought.text) {
                        thoughtBufferRef.current = res.thought.text;
                        setAgentThought({ text: res.thought.text, totalLines: res.thought.totalLines || 0 });
                    }
                    if (res.draft && res.draft.text) {
                        draftBufferRef.current = res.draft.text;
                        setAgentDraft({ text: res.draft.text, totalLines: res.draft.totalLines || 0 });
                    }
                })
                .catch((err) => {
                    console.warn('Failed to fetch agent status:', err);
                });
            const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current || {};
            if (!activeHashtag && !activeSearch) {
                // One immediate timeline resync on SSE connect closes the race
                // where the client restores draft/status state after a restart
                // but misses already-persisted assistant posts from the same turn.
                refreshTimeline();
            }
            refreshModelAndQueueState();
            return;
        }

        if (eventType === 'agent_status') {
            if (data.type === 'done' || data.type === 'error') {
                if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                    return;
                }
                if (data.type === 'done') {
                    notifyForFinalResponse(turnId || currentTurnIdRef.current);
                    // Refresh timeline to surface any final response that arrived
                    // during an SSE gap (agent_response event may have been missed).
                    const { currentHashtag: ah, searchQuery: sq } = viewStateRef.current || {};
                    if (!ah && !sq) refreshTimeline();
                    // Update context usage indicator from the done event payload
                    if (data.context_usage) setContextUsage(data.context_usage);
                }
                wasAgentActiveRef.current = false;
                clearAgentRunState();
                // Re-sync queue state from the server on terminal transitions.
                // This preserves any queued follow-ups that still remain after
                // an error or multi-step drain instead of blanking the stack
                // optimistically and waiting for a later incidental refresh.
                dismissedQueueRowIdsRef.current.clear();
                void refreshQueueState();
                setAgentDraft({ text: '', totalLines: 0 });
                setAgentPlan('');
                setAgentThought({ text: '', totalLines: 0 });
                setPendingRequest(null);
                if (data.type === 'error') {
                    // Show error status briefly so the user sees what failed
                    setAgentStatus({ type: 'error', title: data.title || 'Agent error' });
                    setTimeout(() => setAgentStatus(null), 8000);
                } else {
                    setAgentStatus(null);
                }
            } else {
                if (turnId) setActiveTurn(turnId);
                noteAgentActivity({ running: true, clearSilence: true });
                if (data.type === 'thinking') {
                    draftBufferRef.current = '';
                    thoughtBufferRef.current = '';
                    setAgentDraft({ text: '', totalLines: 0 });
                    setAgentPlan('');
                    setAgentThought({ text: '', totalLines: 0 });
                }
                // Throttle intermediate status updates to avoid re-render storms.
                // Only update state if the status type changed (e.g. intent→tool_call→thinking).
                agentStatusRef.current = data;
                setAgentStatus((prev) => {
                    if (prev && prev.type === data.type && prev.title === data.title) return prev;
                    return data;
                });
            }
            return;
        }

        if (eventType === 'agent_steer_queued') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            const targetTurn = turnId || currentTurnIdRef.current;
            if (!targetTurn) return;
            steerQueuedTurnIdRef.current = targetTurn;
            setSteerQueuedTurnId(targetTurn);
            return;
        }

        if (eventType === 'agent_followup_queued') {
            const rowId = data?.row_id;
            const content = data?.content;
            if (rowId != null && typeof content === 'string' && content.trim()) {
                setFollowupQueueItems((current) => {
                    if (current.some((item) => item?.row_id === rowId)) {
                        return current;
                    }
                    return [
                        ...current,
                        {
                            row_id: rowId,
                            content,
                            timestamp: data?.timestamp || null,
                            thread_id: data?.thread_id ?? null,
                        },
                    ];
                });
            }
            void refreshQueueState();
            return;
        }

        if (eventType === 'agent_followup_consumed') {
            const rowId = data?.row_id;
            if (rowId != null) {
                setFollowupQueueItems((current) => current.filter((item) => item.row_id !== rowId));
            }
            void refreshQueueState();
            // Refresh timeline so the replaced placeholder (now the real response)
            // appears immediately — it was filtered out while queued.
            void refreshTimeline();
            return;
        }

        if (eventType === 'agent_followup_removed') {
            const rowId = data?.row_id;
            if (rowId != null) {
                dismissedQueueRowIdsRef.current.add(rowId);
                setFollowupQueueItems((current) => current.filter((item) => item.row_id !== rowId));
            }
            void refreshQueueState();
            return;
        }

        if (eventType === 'agent_draft_delta') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            if (data?.reset) {
                draftBufferRef.current = '';
            }
            if (data?.delta) {
                draftBufferRef.current += data.delta;
            }
            // Throttle draft state updates to ~10fps to avoid re-render storms
            const now = Date.now();
            if (!draftThrottleRef.current || now - draftThrottleRef.current >= 100) {
                draftThrottleRef.current = now;
                const fullText = draftBufferRef.current;
                const totalLines = estimatePreviewLines(fullText);
                if (draftExpandedRef.current) {
                    setAgentDraft((prev) => ({
                        text: prev?.text || '',
                        totalLines,
                        fullText,
                    }));
                } else {
                    setAgentDraft({ text: fullText, totalLines });
                }
            }
            return;
        }

        if (eventType === 'agent_draft') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            const text = data.text || '';
            const mode = data.mode || (data.kind === 'plan' ? 'replace' : 'append');
            const inferredTotal = Number.isFinite(data.total_lines)
                ? data.total_lines
                : (text ? text.replace(/\r\n/g, '\n').split('\n').length : 0);

            if (data.kind === 'plan') {
                if (mode === 'replace') setAgentPlan(text);
                else setAgentPlan((prev) => (prev || '') + text);
            } else if (!draftExpandedRef.current) {
                draftBufferRef.current = text;
                setAgentDraft({ text, totalLines: inferredTotal });
            }
            return;
        }

        if (eventType === 'agent_thought_delta') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            if (data?.reset) {
                thoughtBufferRef.current = '';
            }
            if (typeof data?.delta === 'string') {
                thoughtBufferRef.current += data.delta;
            }
            // Throttle thought state updates to ~10fps
            const now = Date.now();
            if (thoughtExpandedRef.current && (!thoughtThrottleRef.current || now - thoughtThrottleRef.current >= 100)) {
                thoughtThrottleRef.current = now;
                const fullText = thoughtBufferRef.current;
                setAgentThought((prev) => ({
                    text: prev?.text || '',
                    totalLines: estimatePreviewLines(fullText),
                    fullText,
                }));
            }
            return;
        }

        if (eventType === 'agent_thought') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            const text = data.text || '';
            const inferredTotal = Number.isFinite(data.total_lines)
                ? data.total_lines
                : (text ? text.replace(/\r\n/g, '\n').split('\n').length : 0);
            if (!thoughtExpandedRef.current) {
                thoughtBufferRef.current = text;
                setAgentThought({ text, totalLines: inferredTotal });
            }
            return;
        }

        // Handle agent requests (permission, choices)
        if (eventType === 'agent_request') {
            console.log('Agent request:', data);
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId) setActiveTurn(turnId);
            noteAgentActivity({ running: true, clearSilence: true });
            setPendingRequest(data);
            pendingRequestRef.current = data;
            return;
        }

        if (eventType === 'agent_request_timeout') {
            console.log('Agent request timeout:', data);
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();
            setAgentStatus({ type: 'error', title: 'Permission request timed out' });
            return;
        }

        if (eventType === 'model_changed') {
            if (data?.model !== undefined) setActiveModel(data.model);
            if (data?.thinking_level !== undefined) setActiveThinkingLevel(data.thinking_level ?? null);
            if (data?.supports_thinking !== undefined) setSupportsThinking(Boolean(data.supports_thinking));
            // Refresh context usage - the context window size changes with the model
            getAgentContext().then((ctx) => { if (ctx) setContextUsage(ctx); }).catch(() => {});
            return;
        }

        if (eventType === 'workspace_update') {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('workspace-update', { detail: data }));
            }
            return;
        }

        // Add new posts/replies to timeline (only when on main timeline) - append at end for chat style
        const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
        if (eventType === 'agent_response') {
            removeStalledPost();
            lastAgentResponseRef.current = {
                post: data,
                turnId: currentTurnIdRef.current,
            };
        }
        if (!activeHashtag && !activeSearch && (eventType === 'new_post' || eventType === 'agent_response')) {
            setPosts((prev) => {
                if (!prev) return [data];
                if (prev.some((post) => post.id === data.id)) return prev;
                return [...prev, data];
            });
            scrollToBottomRef.current?.();
        }
        // Update existing post (e.g., when link previews are fetched)
        if (eventType === 'interaction_updated') {
            setPosts(prev => {
                if (!prev) return prev;
                if (!prev.some((p) => p.id === data.id)) return prev;
                return prev.map((p) => (p.id === data.id ? data : p));
            });
        }
        if (eventType === 'interaction_deleted') {
            const ids = data?.ids || [];
            if (ids.length) {
                preserveTimelineScrollTop(() => {
                    setPosts(prev => prev ? prev.filter(p => !ids.includes(p.id)) : prev);
                });
                const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
                if (hasMoreRef.current && !activeHashtag && !activeSearch) {
                    loadMoreRef.current?.({ preserveScroll: true, preserveMode: 'top' });
                }
            }
        }
    }, [
        clearAgentRunState,
        clearLastActivityFlag,
        loadMoreRef,
        noteAgentActivity,
        notifyForFinalResponse,
        preserveTimelineScrollTop,
        refreshTimeline,
        removeStalledPost,
        setActiveTurn,
        showLastActivity,
        updateAgentProfile,
        updateUserProfile,
        refreshModelState,
        refreshQueueState,
        setFollowupQueueItems,
    ]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const api = window.__PICLAW_TEST_API || {};
        api.emit = handleSseEvent;
        api.reset = () => {
            removeStalledPost();
            clearAgentRunState();
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
        };
        api.finalize = () => finalizeStalledResponse();
        window.__PICLAW_TEST_API = api;
        return () => {
            if (window.__PICLAW_TEST_API === api) {
                window.__PICLAW_TEST_API = undefined;
            }
        };
    }, [clearAgentRunState, finalizeStalledResponse, handleSseEvent, removeStalledPost]);

    // Set up SSE connection
    useSseConnection({ handleSseEvent, handleConnectionStatusChange, loadPosts });

    // Scroll to hash-linked message on load (e.g. #msg-123)
    useEffect(() => {
        if (!posts || posts.length === 0) return;
        const hash = location.hash;
        if (!hash || !hash.startsWith('#msg-')) return;
        const msgId = hash.slice(5); // strip '#msg-'
        scrollToMessage(msgId);
        // Clear hash after scroll so it doesn't re-trigger
        history.replaceState(null, '', location.pathname + location.search);
    }, [posts, scrollToMessage]);

    // Adaptive backstop poller - SSE is the primary event source; this is
    // a safety net only. 15 s when a turn is active (keeps compaction status
    // visible and catches SSE-gap missed turn completion or timeline updates,
    // including recovery/resume turns). 60 s when idle (timeline + status
    // refresh as a general backstop).
    const isAgentActive = agentStatus !== null;
    useEffect(() => {
        if (connectionStatus !== 'connected') return;
        const intervalMs = isAgentActive ? 15000 : 60000;
        const interval = setInterval(() => {
            const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current || {};
            const onMainTimeline = !activeHashtag && !activeSearch;

            if (isAgentActive) {
                // Active turns still need an occasional timeline resync. This
                // catches cases where the client saw draft/thought activity but
                // missed the eventual persisted assistant posts during an SSE
                // gap or restart-recovery window.
                if (onMainTimeline) {
                    refreshTimeline();
                }
                refreshQueueState();
                refreshAgentStatus();
                refreshContextUsage();
            } else {
                if (onMainTimeline) {
                    refreshTimeline();
                }
                refreshAgentStatus();
                refreshContextUsage();
            }
        }, intervalMs);
        return () => clearInterval(interval);
    }, [connectionStatus, isAgentActive, refreshAgentStatus, refreshContextUsage, refreshQueueState, refreshTimeline]);

    const toggleWorkspace = useCallback(() => {
        setWorkspaceOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        if (!editorOpen) return;
        if (typeof window === 'undefined') return;
        const shell = appShellRef.current;
        if (!shell) return;
        if (!editorWidthRef.current) {
            const stored = getLocalStorageNumber('editorWidth', null);
            const fallback = sidebarWidthRef.current || 280;
            editorWidthRef.current = Number.isFinite(stored) ? stored : fallback;
        }
        shell.style.setProperty('--editor-width', `${editorWidthRef.current}px`);
        if (!dockHeightRef.current) {
            const stored = getLocalStorageNumber('dockHeight', null);
            dockHeightRef.current = Number.isFinite(stored) ? stored : 200;
        }
        shell.style.setProperty('--dock-height', `${dockHeightRef.current}px`);
    }, [editorOpen]);


    // Dock (terminal) toggle state - only available when dock panes registered
    const hasDockPanes = paneRegistry.getDockPanes().length > 0;
    const [dockVisible, setDockVisible] = useState(false);
    const toggleDock = useCallback(() => setDockVisible((v) => !v), []);

    // Keyboard shortcut: Ctrl+` to toggle dock (only when dock panes exist)
    useEffect(() => {
        if (!hasDockPanes) return;
        const onKeyDown = (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                toggleDock();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [toggleDock, hasDockPanes]);

    const steerQueued = Boolean(steerQueuedTurnId && (steerQueuedTurnId === (agentStatus?.turn_id || currentTurnId)));

    return html`
        <div class=${`app-shell${workspaceOpen ? '' : ' workspace-collapsed'}${editorOpen ? ' editor-open' : ''}`} ref=${appShellRef}>
            <${WorkspaceExplorer}
                onFileSelect=${addFileRef}
                visible=${workspaceOpen}
                active=${workspaceOpen || editorOpen}
                onOpenEditor=${openEditor}
            />
            <button
                class=${`workspace-toggle-tab${workspaceOpen ? ' open' : ' closed'}`}
                onClick=${toggleWorkspace}
                title=${workspaceOpen ? 'Hide workspace' : 'Show workspace'}
                aria-label=${workspaceOpen ? 'Hide workspace' : 'Show workspace'}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${handleSplitterMouseDown} onTouchStart=${handleSplitterTouchStart}></div>
            ${editorOpen && html`
                <div class="editor-pane-container">
                    <${TabStrip}
                        tabs=${tabStripTabs}
                        activeId=${tabStripActiveId}
                        onActivate=${handleTabActivate}
                        onClose=${handleTabClose}
                        onCloseOthers=${handleTabCloseOthers}
                        onCloseAll=${handleTabCloseAll}
                        onTogglePin=${handleTabTogglePin}
                        onTogglePreview=${handleTabTogglePreview}
                        previewTabs=${previewTabs}
                        onToggleDock=${hasDockPanes ? toggleDock : undefined}
                        dockVisible=${hasDockPanes && dockVisible}
                    />
                    <div class="editor-pane-host" ref=${editorContainerRef}></div>
                    ${tabStripActiveId && previewTabs.has(tabStripActiveId) && html`
                        <${MarkdownPreview}
                            getContent=${() => editorInstanceRef.current?.getContent?.()}
                            path=${tabStripActiveId}
                            onClose=${() => handleTabTogglePreview(tabStripActiveId)}
                        />
                    `}
                    ${hasDockPanes && dockVisible && html`<div class="dock-splitter" onMouseDown=${handleDockSplitterMouseDown} onTouchStart=${handleDockSplitterTouchStart}></div>`}
                    ${hasDockPanes && html`<div class=${`dock-panel${dockVisible ? '' : ' hidden'}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${toggleDock} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending - xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${handleEditorSplitterMouseDown} onTouchStart=${handleEditorSplitterTouchStart}></div>
            `}
            <div class="container">
                ${searchQuery && isIOSDevice() && html`<div class="search-results-spacer"></div>`}
                ${(currentHashtag || searchQuery) && html`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${handleBackToTimeline}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${currentHashtag ? `#${currentHashtag}` : `Search: ${searchQuery}`}</span>
                    </div>
                `}
                <${Timeline}
                    posts=${posts}
                    hasMore=${hasMore}
                    onLoadMore=${loadMore}
                    timelineRef=${timelineRef}
                    onHashtagClick=${handleHashtagClick}
                    onMessageRef=${addMessageRef}
                    onScrollToMessage=${scrollToMessage}
                    onFileRef=${openFileFromPill}
                    onPostClick=${undefined}
                    onDeletePost=${handleDeletePost}
                    emptyMessage=${currentHashtag ? `No posts with #${currentHashtag}` : searchQuery ? `No results for "${searchQuery}"` : undefined}
                    agents=${agents}
                    user=${userProfile}
                    reverse=${!(searchQuery && !currentHashtag)}
                    removingPostIds=${removingPostIds}
                    searchQuery=${searchQuery}
                />
                <${AgentStatus}
                    status=${agentStatus}
                    draft=${agentDraft}
                    plan=${agentPlan}
                    thought=${agentThought}
                    pendingRequest=${pendingRequest}
                    intent=${intentToast}
                    turnId=${currentTurnId}
                    steerQueued=${steerQueued}
                    onPanelToggle=${handlePanelToggle}
                />
                <${ComposeBox}
                    onPost=${() => { loadPosts(); scrollToBottom(); }}
                    onFocus=${scrollToBottom}
                    searchMode=${searchOpen}
                    onSearch=${handleSearch}
                    onEnterSearch=${enterSearchMode}
                    onExitSearch=${exitSearchMode}
                    fileRefs=${fileRefs}
                    onRemoveFileRef=${removeFileRef}
                    onClearFileRefs=${clearFileRefs}
                    messageRefs=${messageRefs}
                    onRemoveMessageRef=${removeMessageRef}
                    onClearMessageRefs=${clearMessageRefs}
                    activeEditorPath=${tabStripActiveId}
                    onAttachEditorFile=${attachActiveEditorFile}
                    onOpenFilePill=${openFileFromPill}
                    followupQueueCount=${followupQueueCount}
                    followupQueueItems=${followupQueueItems}
                    onInjectQueuedFollowup=${handleInjectQueuedFollowup}
                    onRemoveQueuedFollowup=${handleRemoveQueuedFollowup}
                    onMessageResponse=${handleMessageResponse}
                    isAgentActive=${isComposeBoxAgentActive}
                    activeModel=${activeModel}
                    modelUsage=${activeModelUsage}
                    thinkingLevel=${activeThinkingLevel}
                    supportsThinking=${supportsThinking}
                    contextUsage=${contextUsage}
                    notificationsEnabled=${notificationsEnabled}
                    notificationPermission=${notificationPermission}
                    onToggleNotifications=${handleToggleNotifications}
                    onModelChange=${setActiveModel}
                    onModelStateChange=${applyModelState}
                />
                <${ConnectionStatus} status=${connectionStatus} />
                <${AgentRequestModal}
                    request=${pendingRequest}
                    onRespond=${() => {
                        setPendingRequest(null);
                        pendingRequestRef.current = null;
                    }}
                />
            </div>
        </div>
    `;
}

// Mount the app
render(html`<${App} />`, document.getElementById('app'));
