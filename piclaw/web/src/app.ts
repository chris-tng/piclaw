// @ts-nocheck
import { html, render, useState, useEffect, useCallback, useRef } from './vendor/preact-htm.js';
import { getTimeline, getPostsByHashtag, searchPosts, deletePost, getAgents, getAgentThought, setAgentThoughtVisibility, getAgentStatus, getWorkspaceFile, updateWorkspaceFile, SSEClient } from './api.js';
import { ComposeBox } from './components/compose-box.js';
import { AgentRequestModal, AgentStatus, ConnectionStatus } from './components/status.js';
import { Timeline } from './components/timeline.js';
import { WorkspaceExplorer } from './components/workspace-explorer.js';
import { WorkspaceEditor } from './components/editor.js';

function readSilenceOverride(key, fallback) {
    try {
        if (typeof window === 'undefined') return fallback;
        const overrides = window.__PICLAW_SILENCE || {};
        const directKey = `__PICLAW_SILENCE_${key.toUpperCase()}_MS`;
        const raw = overrides[key] ?? window[directKey];
        const value = Number(raw);
        return Number.isFinite(value) ? value : fallback;
    } catch {
        return fallback;
    }
}

const SILENCE_WARNING_MS = readSilenceOverride('warning', 30_000);
const SILENCE_FINALIZE_MS = readSilenceOverride('finalize', 120_000);
const SILENCE_REFRESH_MS = readSilenceOverride('refresh', 30_000);
const LAST_ACTIVITY_TTL_MS = 30_000;

// Configure marked for safe rendering
if (window.marked) {
    marked.setOptions({
        breaks: true,  // Convert \n to <br>
        gfm: true,     // GitHub Flavored Markdown
    });
}

function buildAgentsMap(data) {
    const map = {};
    (data?.agents || []).forEach((agent) => {
        map[agent.id] = agent;
    });
    return map;
}

/**
 * Detect iOS devices for layout adjustments.
 */
function isIOSDevice() {
    if (/iPad|iPhone/.test(navigator.userAgent)) {
        return true;
    }
    // iPadOS Safari (desktop mode) reports as MacIntel with touch points.
    return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

/**
 * Hook to force re-render for updating timestamps
 */
function useTimestampRefresh(intervalMs = 30000) {
    const [, setTick] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), intervalMs);
        return () => clearInterval(timer);
    }, [intervalMs]);
}

/**
 * Update browser theme color (affects mobile chrome and PWA title bar)
 */
function updateThemeColor(dark) {
    const color = dark ? '#000000' : '#ffffff';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', color);
    }
    const statusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (statusMeta) {
        statusMeta.setAttribute('content', dark ? 'black' : 'default');
    }
}

const dedupePosts = (items) => {
    const seen = new Set();
    return (items || []).filter((post) => {
        if (!post || seen.has(post.id)) return false;
        seen.add(post.id);
        return true;
    });
};

const estimatePreviewLines = (text, maxCharsPerLine = 160) => {
    const value = String(text || '').replace(/\r\n/g, '\n');
    if (!value) return 0;
    return value
        .split('\n')
        .reduce((acc, line) => acc + Math.max(1, Math.ceil(line.length / maxCharsPerLine)), 0);
};

/**
 * Main App component
 */
function App() {
    const [posts, setPosts] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [currentHashtag, setCurrentHashtag] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [fileRefs, setFileRefs] = useState([]);
    const [agentStatus, setAgentStatus] = useState(null);
    const [agentDraft, setAgentDraft] = useState({ text: '', totalLines: 0 });
    const [agentPlan, setAgentPlan] = useState('');
    const [agentThought, setAgentThought] = useState({ text: '', totalLines: 0 });
    const [pendingRequest, setPendingRequest] = useState(null);
    const [currentTurnId, setCurrentTurnId] = useState(null);
    const [steerQueuedTurnId, setSteerQueuedTurnId] = useState(null);
    const [agents, setAgents] = useState({});
    const [activeModel, setActiveModel] = useState(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState('default');
    const [removingPostIds, setRemovingPostIds] = useState(() => new Set());
    const [workspaceOpen, setWorkspaceOpen] = useState(() => {
        if (typeof window === 'undefined') return true;
        const stored = localStorage.getItem('workspaceOpen');
        return stored === null ? true : stored === 'true';
    });
    const [editorState, setEditorState] = useState({ open: false, path: null, content: '', loading: false, error: null, mtime: null, size: null });
    const [editorSaving, setEditorSaving] = useState(false);
    const [editorSaveError, setEditorSaveError] = useState(null);
    const [editorSavedAt, setEditorSavedAt] = useState(null);
    const [userProfile, setUserProfile] = useState({ name: 'You', avatar_url: null, avatar_background: null });
    const hasConnectedOnceRef = useRef(false);
    const agentsRef = useRef({});
    const userProfileRef = useRef({ name: null, avatar_url: null });
    const viewStateRef = useRef({ currentHashtag: null, searchQuery: null });
    const hasMoreRef = useRef(false);
    const loadMoreRef = useRef(null);
    const loadingMoreRef = useRef(false);
    const lastBeforeIdRef = useRef(null);
    const timelineRef = useRef(null);
    const lastAgentEventRef = useRef(null);
    const lastSilenceNoticeRef = useRef(0);
    const isAgentRunningRef = useRef(false);
    const draftBufferRef = useRef('');
    const thoughtBufferRef = useRef('');
    const pendingRequestRef = useRef(null);
    const stalledPostIdRef = useRef(null);
    const currentTurnIdRef = useRef(null);
    const steerQueuedTurnIdRef = useRef(null);
    const appShellRef = useRef(null);
    const sidebarWidthRef = useRef(0);
    const editorWidthRef = useRef(0);
    const thoughtExpandedRef = useRef(false);
    const draftExpandedRef = useRef(false);
    const notificationsEnabledRef = useRef(false);
    const lastNotifiedIdRef = useRef(null);
    const lastAgentResponseRef = useRef(null);
    const lastActivityTimerRef = useRef(null);
    const lastActivityTokenRef = useRef(0);
    const brandingRef = useRef({ title: null, avatarBase: null });

    // Refresh timestamps every 30 seconds
    useTimestampRefresh(30000);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = localStorage.getItem('notificationsEnabled');
        const enabled = stored === 'true';
        notificationsEnabledRef.current = enabled;
        setNotificationsEnabled(enabled);
        if (typeof Notification !== 'undefined') {
            setNotificationPermission(Notification.permission);
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = () => updateThemeColor(media.matches);
        applyTheme();
        if (media.addEventListener) {
            media.addEventListener('change', applyTheme);
        } else if (media.addListener) {
            media.addListener(applyTheme);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', applyTheme);
            } else if (media.removeListener) {
                media.removeListener(applyTheme);
            }
        };
    }, []);

    useEffect(() => {
        notificationsEnabledRef.current = notificationsEnabled;
    }, [notificationsEnabled]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('workspaceOpen', String(workspaceOpen));
    }, [workspaceOpen]);

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

    const clearFileRefs = useCallback(() => {
        setFileRefs([]);
    }, []);

    const noteAgentActivity = useCallback((options = {}) => {
        const now = Date.now();
        lastAgentEventRef.current = now;
        if (options.running) {
            isAgentRunningRef.current = true;
        }
        if (options.clearSilence) {
            lastSilenceNoticeRef.current = 0;
        }
    }, []);

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
        // Strip tool/intent details — only show a minimal "last active" hint
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
        lastAgentEventRef.current = null;
        lastSilenceNoticeRef.current = 0;
        draftBufferRef.current = '';
        thoughtBufferRef.current = '';
        pendingRequestRef.current = null;
        lastAgentResponseRef.current = null;
        currentTurnIdRef.current = null;
        steerQueuedTurnIdRef.current = null;
        clearLastActivityTimer();
        setCurrentTurnId(null);
        setSteerQueuedTurnId(null);
        thoughtExpandedRef.current = false;
        draftExpandedRef.current = false;
    }, [clearLastActivityTimer, setCurrentTurnId, setSteerQueuedTurnId]);

    const setActiveTurn = useCallback((turnId) => {
        if (!turnId) return;
        if (currentTurnIdRef.current === turnId) return;
        currentTurnIdRef.current = turnId;
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

    const requestNotificationPermission = useCallback(() => {
        if (typeof Notification === 'undefined') return Promise.resolve('denied');
        try {
            const result = Notification.requestPermission();
            if (result && typeof result.then === 'function') {
                return result;
            }
            return Promise.resolve(result);
        } catch {
            return Promise.resolve('default');
        }
    }, []);

    const handleToggleNotifications = useCallback(async () => {
        if (typeof window === 'undefined' || typeof Notification === 'undefined') return;
        if (!window.isSecureContext) {
            alert('Notifications require a secure context (HTTPS or installed app).');
            return;
        }
        if (Notification.permission === 'denied') {
            setNotificationPermission('denied');
            alert('Browser notifications are blocked. Enable them in your browser settings.');
            return;
        }
        if (Notification.permission === 'default') {
            const result = await requestNotificationPermission();
            setNotificationPermission(result || 'default');
            if (result !== 'granted') {
                notificationsEnabledRef.current = false;
                setNotificationsEnabled(false);
                localStorage.setItem('notificationsEnabled', 'false');
                return;
            }
        }
        const next = !notificationsEnabledRef.current;
        notificationsEnabledRef.current = next;
        setNotificationsEnabled(next);
        localStorage.setItem('notificationsEnabled', String(next));
    }, [requestNotificationPermission]);

    const notifyForFinalResponse = useCallback((turnId) => {
        if (!notificationsEnabledRef.current) return;
        if (typeof Notification === 'undefined') return;
        if (Notification.permission !== 'granted') return;
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
        try {
            const notification = new Notification(title, { body });
            notification.onclick = () => {
                try {
                    window.focus();
                } catch {
                    // ignore focus errors
                }
            };
        } catch {
            // ignore notification failures
        }
    }, []);

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

    const removeStalledPost = useCallback(() => {
        const stalledId = stalledPostIdRef.current;
        if (!stalledId) return;
        setPosts((prev) => (prev ? prev.filter((post) => post.id !== stalledId) : prev));
        stalledPostIdRef.current = null;
    }, []);

    // Scroll to bottom of timeline (column-reverse: bottom is scrollTop=0)
    const scrollToBottomRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.scrollTop = 0;
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
            setAgentStatus({ type: 'error', title: 'Response stalled — No content received' });
            return;
        }

        const warning = '\n\n⚠️ Response may be incomplete — the model stopped responding';
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

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

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
                finalizeStalledResponse();
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
                }
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [finalizeStalledResponse]);

    
    // Load timeline or hashtag posts
    const loadPosts = useCallback(async (hashtag = null) => {
        try {
            if (hashtag) {
                const result = await getPostsByHashtag(hashtag);
                setPosts(result.posts);
                setHasMore(false);
            } else {
                const result = await getTimeline(10);
                setPosts(result.posts);
                setHasMore(result.has_more);
            }
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    }, []);

    const refreshTimeline = useCallback(async () => {
        try {
            const result = await getTimeline(10);
            setPosts((prev) => {
                if (!prev || prev.length === 0) return result.posts;
                return dedupePosts([...result.posts, ...prev]);
            });
            setHasMore((prev) => prev || result.has_more);
        } catch (error) {
            console.error('Failed to refresh timeline:', error);
        }
    }, []);

    const refreshAgentStatus = useCallback(async () => {
        try {
            const res = await getAgentStatus('web:default');
            if (!res || res.status !== 'active' || !res.data) {
                clearAgentRunState();
                setAgentStatus(null);
                setAgentDraft({ text: '', totalLines: 0 });
                setAgentPlan('');
                setAgentThought({ text: '', totalLines: 0 });
                setPendingRequest(null);
                pendingRequestRef.current = null;
                return;
            }
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
        } catch (err) {
            console.warn('Failed to fetch agent status:', err);
        }
    }, [clearAgentRunState, clearLastActivityFlag, noteAgentActivity, setActiveTurn]);

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
    
    // Load older messages (prepend)
    const loadMore = useCallback(async (options = {}) => {
        if (!posts || posts.length === 0) return;
        if (loadingMoreRef.current) return;
        const { preserveScroll = true, preserveMode = 'top', allowRepeat = false } = options;
        const applyUpdate = (fn) => {
            if (!preserveScroll) {
                fn();
                return;
            }
            if (preserveMode === 'top') preserveTimelineScrollTop(fn);
            else preserveTimelineScroll(fn);
        };
        const sortedPosts = posts.slice().sort((a, b) => a.id - b.id);
        const oldestId = sortedPosts[0]?.id;
        if (!Number.isFinite(oldestId)) return;
        if (!allowRepeat && lastBeforeIdRef.current === oldestId) return;

        loadingMoreRef.current = true;
        lastBeforeIdRef.current = oldestId;
        try {
            const result = await getTimeline(10, oldestId);
            if (result.posts.length > 0) {
                applyUpdate(() => {
                    setPosts(prev => dedupePosts([...result.posts, ...(prev || [])]));
                    setHasMore(result.has_more);
                });
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load more posts:', error);
        } finally {
            loadingMoreRef.current = false;
        }
    }, [posts, preserveTimelineScroll, preserveTimelineScrollTop]);

    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);
    
    // Handle hashtag click
    const handleHashtagClick = useCallback(async (hashtag) => {
        setCurrentHashtag(hashtag);
        setPosts(null); // Show loading
        try {
            const result = await getPostsByHashtag(hashtag);
            setPosts(result.posts);
            setHasMore(false);
        } catch (error) {
            console.error('Failed to load hashtag posts:', error);
        }
    }, []);
    
    // Go back to timeline
    const handleBackToTimeline = useCallback(async () => {
        setCurrentHashtag(null);
        setSearchQuery(null);
        setPosts(null);
        try {
            const result = await getTimeline(10);
            setPosts(result.posts);
            setHasMore(result.has_more);
        } catch (error) {
            console.error('Failed to load timeline:', error);
        }
    }, []);

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
        const replyCount = posts?.filter((item) => item?.data?.thread_id === postId).length || 0;
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
    }, [applyBranding]);

    useEffect(() => {
        loadAgents();
        // Also apply saved sidebar width imperatively (no state → no re-render)
        const saved = parseInt(localStorage.getItem('sidebarWidth') || '', 10);
        const w = Number.isFinite(saved) ? Math.min(Math.max(saved, 160), 600) : 280;
        sidebarWidthRef.current = w;
        if (appShellRef.current) {
            appShellRef.current.style.setProperty('--sidebar-width', `${w}px`);
        }
    }, [loadAgents]);

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

    const handleSseEvent = useCallback((eventType, data) => {
        const turnId = data?.turn_id;

        updateAgentProfile(data);
        updateUserProfile(data);

        if (eventType?.startsWith('agent_')) {
            clearLastActivityFlag();
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
            return;
        }

        if (eventType === 'agent_status') {
            if (data.type === 'done' || data.type === 'error') {
                if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                    return;
                }
                if (data.type === 'done') {
                    notifyForFinalResponse(turnId || currentTurnIdRef.current);
                }
                clearAgentRunState();
                setAgentStatus(null);
                setAgentDraft({ text: '', totalLines: 0 });
                setAgentPlan('');
                setAgentThought({ text: '', totalLines: 0 });
                setPendingRequest(null);
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
                setAgentStatus(data);
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
            if (draftExpandedRef.current) {
                const fullText = draftBufferRef.current;
                setAgentDraft((prev) => ({
                    text: prev?.text || '',
                    totalLines: estimatePreviewLines(fullText),
                    fullText,
                }));
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
            if (thoughtExpandedRef.current) {
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
            if (data?.model) setActiveModel(data.model);
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
            setPosts(prev => {
                if (!prev) return [data];
                if (prev.some((post) => post.id === data.id)) return prev;
                return [...prev, data];
            });
            scrollToBottomRef.current?.();
        }
        // Update existing post (e.g., when link previews are fetched)
        if (eventType === 'interaction_updated') {
            setPosts(prev => prev ? prev.map(p => p.id === data.id ? data : p) : prev);
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
    }, [clearAgentRunState, clearLastActivityFlag, noteAgentActivity, notifyForFinalResponse, preserveTimelineScrollTop, removeStalledPost, setActiveTurn, showLastActivity, updateAgentProfile, updateUserProfile]);

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
    useEffect(() => {
        loadPosts();

        const sse = new SSEClient(handleSseEvent, handleConnectionStatusChange);

        sse.connect();

        const handleWindowFocus = () => {
            sse.reconnectIfNeeded();
        };
        window.addEventListener('focus', handleWindowFocus);
        document.addEventListener('visibilitychange', handleWindowFocus);

        return () => {
            window.removeEventListener('focus', handleWindowFocus);
            document.removeEventListener('visibilitychange', handleWindowFocus);
            sse.disconnect();
        };
    }, [handleConnectionStatusChange, handleSseEvent, loadPosts]);

    // Poll for latest posts periodically as a backstop (main timeline only).
    useEffect(() => {
        if (connectionStatus !== 'connected') return;
        const interval = setInterval(() => {
            const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current || {};
            if (!activeHashtag && !activeSearch) {
                refreshTimeline();
            }
            refreshAgentStatus();
        }, 60000);
        return () => clearInterval(interval);
    }, [connectionStatus, refreshAgentStatus, refreshTimeline]);

    // ── Splitter drag: zero re-renders, direct CSS var manipulation ───────────
    const handleSplitterMouseDown = useRef((e) => {
        e.preventDefault();
        const shell = appShellRef.current;
        if (!shell) return;
        const startX = e.clientX;
        const startW = sidebarWidthRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        let lastX = startX;
        const onMove = (me) => {
            lastX = me.clientX;
            const w = Math.min(Math.max(startW + (me.clientX - startX), 160), 600);
            shell.style.setProperty('--sidebar-width', `${w}px`);
            sidebarWidthRef.current = w;
        };
        const onUp = () => {
            const w = Math.min(Math.max(startW + (lastX - startX), 160), 600);
            sidebarWidthRef.current = w;
            splitter.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            localStorage.setItem('sidebarWidth', String(Math.round(w)));
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }).current;

    const handleSplitterTouchStart = useRef((e) => {
        e.preventDefault();
        const shell = appShellRef.current;
        if (!shell) return;
        const touch = e.touches[0];
        if (!touch) return;
        const startX = touch.clientX;
        const startW = sidebarWidthRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.userSelect = 'none';

        const onMove = (te) => {
            const t = te.touches[0];
            if (!t) return;
            te.preventDefault();
            const w = Math.min(Math.max(startW + (t.clientX - startX), 160), 600);
            shell.style.setProperty('--sidebar-width', `${w}px`);
            sidebarWidthRef.current = w;
        };
        const onUp = () => {
            splitter.classList.remove('dragging');
            document.body.style.userSelect = '';
            localStorage.setItem('sidebarWidth', String(Math.round(sidebarWidthRef.current || startW)));
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onUp);
            document.removeEventListener('touchcancel', onUp);
        };
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
        document.addEventListener('touchcancel', onUp);
    }).current;

    const handleEditorSplitterMouseDown = useRef((e) => {
        e.preventDefault();
        const shell = appShellRef.current;
        if (!shell) return;
        const startX = e.clientX;
        const startW = editorWidthRef.current || sidebarWidthRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        let lastX = startX;
        const onMove = (me) => {
            lastX = me.clientX;
            const w = Math.min(Math.max(startW + (me.clientX - startX), 200), 800);
            shell.style.setProperty('--editor-width', `${w}px`);
            editorWidthRef.current = w;
        };
        const onUp = () => {
            const w = Math.min(Math.max(startW + (lastX - startX), 200), 800);
            editorWidthRef.current = w;
            splitter.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            localStorage.setItem('editorWidth', String(Math.round(w)));
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }).current;

    const handleEditorSplitterTouchStart = useRef((e) => {
        e.preventDefault();
        const shell = appShellRef.current;
        if (!shell) return;
        const touch = e.touches[0];
        if (!touch) return;
        const startX = touch.clientX;
        const startW = editorWidthRef.current || sidebarWidthRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.userSelect = 'none';

        const onMove = (te) => {
            const t = te.touches[0];
            if (!t) return;
            te.preventDefault();
            const w = Math.min(Math.max(startW + (t.clientX - startX), 200), 800);
            shell.style.setProperty('--editor-width', `${w}px`);
            editorWidthRef.current = w;
        };
        const onUp = () => {
            splitter.classList.remove('dragging');
            document.body.style.userSelect = '';
            localStorage.setItem('editorWidth', String(Math.round(editorWidthRef.current || startW)));
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onUp);
            document.removeEventListener('touchcancel', onUp);
        };
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
        document.addEventListener('touchcancel', onUp);
    }).current;

    const toggleWorkspace = useCallback(() => {
        setWorkspaceOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        if (!editorState.open) return;
        if (typeof window === 'undefined') return;
        const shell = appShellRef.current;
        if (!shell) return;
        if (!editorWidthRef.current) {
            const stored = parseInt(localStorage.getItem('editorWidth') || '', 10);
            const fallback = sidebarWidthRef.current || 280;
            editorWidthRef.current = Number.isFinite(stored) ? stored : fallback;
        }
        shell.style.setProperty('--editor-width', `${editorWidthRef.current}px`);
    }, [editorState.open]);

    const EDITOR_MAX_BYTES = 256 * 1024;

    const openEditor = useCallback(async (path) => {
        if (!path) return;
        setEditorSaveError(null);
        setEditorSavedAt(null);
        setEditorState({ open: true, path, content: '', loading: true, error: null, mtime: null, size: null });
        try {
            const data = await getWorkspaceFile(path, EDITOR_MAX_BYTES, 'edit');
            if (data?.error) {
                setEditorState({ open: true, path, content: '', loading: false, error: data.error, mtime: null, size: null });
                return;
            }
            if (data?.kind && data.kind !== 'text') {
                setEditorState({ open: true, path, content: '', loading: false, error: 'File is not editable', mtime: data.mtime, size: data.size });
                return;
            }
            setEditorState({
                open: true,
                path,
                content: data?.text || '',
                loading: false,
                error: null,
                mtime: data?.mtime || null,
                size: data?.size || null,
            });
        } catch (err) {
            setEditorState({ open: true, path, content: '', loading: false, error: err.message || 'Failed to load file', mtime: null, size: null });
        }
    }, []);

    const closeEditor = useCallback(() => {
        setEditorState({ open: false, path: null, content: '', loading: false, error: null, mtime: null, size: null });
        setEditorSaveError(null);
        setEditorSavedAt(null);
    }, []);

    const handleEditorSave = useCallback(async (value) => {
        if (!editorState?.path || editorSaving) return;
        setEditorSaving(true);
        setEditorSaveError(null);
        try {
            const result = await updateWorkspaceFile(editorState.path, value);
            setEditorState((prev) => ({
                ...prev,
                content: value,
                mtime: result?.mtime || prev.mtime,
                size: result?.size || prev.size,
            }));
            setEditorSavedAt(Date.now());
        } catch (err) {
            setEditorSaveError(err.message || 'Failed to save file');
        } finally {
            setEditorSaving(false);
        }
    }, [editorState?.path, editorSaving]);

    const steerQueued = Boolean(steerQueuedTurnId && (steerQueuedTurnId === (agentStatus?.turn_id || currentTurnId)));
    const editorOpen = Boolean(editorState.open);

    return html`
        <div class=${`app-shell${workspaceOpen ? '' : ' workspace-collapsed'}${editorOpen ? ' editor-open' : ''}`} ref=${appShellRef}>
            <${WorkspaceExplorer} onFileSelect=${addFileRef} visible=${workspaceOpen} onOpenEditor=${openEditor} />
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
                <${WorkspaceEditor}
                    path=${editorState.path}
                    content=${editorState.content}
                    loading=${editorState.loading}
                    error=${editorState.error}
                    saving=${editorSaving}
                    saveError=${editorSaveError}
                    savedAt=${editorSavedAt}
                    onSave=${handleEditorSave}
                    onClose=${closeEditor}
                />
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
                    activeModel=${activeModel}
                    notificationsEnabled=${notificationsEnabled}
                    notificationPermission=${notificationPermission}
                    onToggleNotifications=${handleToggleNotifications}
                    onModelChange=${setActiveModel}
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
