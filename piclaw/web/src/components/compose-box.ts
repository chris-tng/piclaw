// @ts-nocheck
import { html, useRef, useState, useEffect, useCallback } from '../vendor/preact-htm.js';
import { getAgentModels, sendAgentMessage, uploadMedia } from '../api.js';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage.js';
import { FilePill } from './file-pill.js';

/**
 * Slash command definitions for autocomplete.
 * Kept in sync with agent-control/command-registry.ts.
 */
const SLASH_COMMANDS = [
  { name: "/model", description: "Select model or list available models" },
  { name: "/cycle-model", description: "Cycle to the next available model" },
  { name: "/thinking", description: "Show or set thinking level" },
  { name: "/cycle-thinking", description: "Cycle thinking level" },
  { name: "/theme", description: "Set UI theme (use /theme list for options)" },
  { name: "/tint", description: "Tint default light/dark UI (usage: /tint #hex or /tint off)" },
  { name: "/state", description: "Show current session state" },
  { name: "/stats", description: "Show session token and cost stats" },
  { name: "/context", description: "Show context window usage" },
  { name: "/last", description: "Show last assistant response" },
  { name: "/compact", description: "Manually compact the session" },
  { name: "/auto-compact", description: "Toggle auto-compaction" },
  { name: "/auto-retry", description: "Toggle auto-retry" },
  { name: "/abort", description: "Abort the current response" },
  { name: "/abort-retry", description: "Abort retry backoff" },
  { name: "/abort-bash", description: "Abort running bash command" },
  { name: "/shell", description: "Run a shell command and return output" },
  { name: "/bash", description: "Run a shell command and add output to context" },
  { name: "/queue", description: "Queue a follow-up message (one-at-a-time)" },
  { name: "/queue-all", description: "Queue a follow-up message (batch all)" },
  { name: "/steer", description: "Steer the current response" },
  { name: "/steering-mode", description: "Set steering mode (all|one)" },
  { name: "/followup-mode", description: "Set follow-up mode (all|one)" },
  { name: "/session-name", description: "Set or show the session name" },
  { name: "/new-session", description: "Start a new session" },
  { name: "/switch-session", description: "Switch to a session file" },
  { name: "/fork", description: "Fork from a previous message" },
  { name: "/forks", description: "List forkable messages" },
  { name: "/tree", description: "List the session tree" },
  { name: "/label", description: "Set or clear a label on a tree entry" },
  { name: "/labels", description: "List labeled entries" },
  { name: "/agent-name", description: "Set or show the agent display name" },
  { name: "/agent-avatar", description: "Set or show the agent avatar URL" },
  { name: "/user-name", description: "Set or show your display name" },
  { name: "/user-avatar", description: "Set or show your avatar URL" },
  { name: "/user-github", description: "Set name/avatar from GitHub profile" },
  { name: "/export-html", description: "Export session to HTML" },
  { name: "/passkey", description: "Manage passkeys (enrol/list/delete)" },
  { name: "/totp", description: "Show a TOTP enrolment QR code" },
  { name: "/qr", description: "Generate a QR code for text or URL" },
  { name: "/search", description: "Search notes and skills in the workspace" },
  { name: "/restart", description: "Restart the agent and stop subprocesses" },
  { name: "/commands", description: "List available commands" },
];

/**
 * Tiny SVG pie chart showing context window usage.
 * Green when <75%, amber 75–90%, red >90%. Tooltip shows exact numbers.
 */
function ContextPie({ usage }) {
    const pct = Math.min(100, Math.max(0, usage.percent || 0));
    const tokens = usage.tokens;
    const window = usage.contextWindow;
    const label = tokens != null
        ? `Context: ${formatK(tokens)} / ${formatK(window)} tokens (${pct.toFixed(0)}%)`
        : `Context: ${pct.toFixed(0)}%`;

    // Pie arc: SVG circle with stroke-dasharray trick.
    // Circle circumference = 2πr = 2π×7 ≈ 43.98
    const r = 7;
    const circ = 2 * Math.PI * r;
    const filled = (pct / 100) * circ;

    const color = pct > 90 ? 'var(--context-red, #ef4444)'
                : pct > 75 ? 'var(--context-amber, #f59e0b)'
                : 'var(--context-green, #22c55e)';

    return html`
        <span class="compose-context-pie icon-btn" title=${label}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${r}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${r}
                    fill="none"
                    stroke=${color}
                    stroke-width="2.5"
                    stroke-dasharray=${`${filled} ${circ}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `;
}

function formatK(n) {
    if (n == null) return '?';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return String(n);
}

/**
 * Compose box component
 */
export function ComposeBox({
    onPost,
    onFocus,
    searchMode,
    onSearch,
    onEnterSearch,
    onExitSearch,
    fileRefs = [],
    onRemoveFileRef,
    onClearFileRefs,
    messageRefs = [],
    onRemoveMessageRef,
    onClearMessageRefs,
    activeModel = null,
    modelUsage = null,
    thinkingLevel = null,
    supportsThinking = false,
    contextUsage = null,
    notificationsEnabled = false,
    notificationPermission = 'default',
    onToggleNotifications,
    onModelChange,
    onModelStateChange,
    activeEditorPath = null,
    onAttachEditorFile,
    onOpenFilePill,
    followupQueueItems = [],
    onInjectQueuedFollowup,
    onRemoveQueuedFollowup,
    onMessageResponse,
    isAgentActive = false,
}) {
    const [content, setContent] = useState('');
    const [searchText, setSearchText] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const [slashMatches, setSlashMatches] = useState([]);
    const [slashIndex, setSlashIndex] = useState(0);
    const [showSlash, setShowSlash] = useState(false);
    const [switchingModel, setSwitchingModel] = useState(false);
    const [showModelPopup, setShowModelPopup] = useState(false);
    const [modelOptions, setModelOptions] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const textareaRef = useRef(null);
    const slashRef = useRef(null);
    const modelPopupRef = useRef(null);
    const modelHintRef = useRef(null);
    const dragCounterRef = useRef(0);
    const historyMax = 200;
    const normaliseHistory = (items) => {
        const seen = new Set();
        const cleaned = [];
        for (const item of items || []) {
            if (typeof item !== 'string') continue;
            const trimmed = item.trim();
            if (!trimmed || seen.has(trimmed)) continue;
            seen.add(trimmed);
            cleaned.push(trimmed);
        }
        return cleaned;
    };
    const loadHistory = () => {
        const raw = getLocalStorageItem('piclaw_compose_history');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return normaliseHistory(parsed);
        } catch {
            return [];
        }
    };
    const saveHistory = (history) => {
        setLocalStorageItem('piclaw_compose_history', JSON.stringify(history));
    };
    const historyRef = useRef(loadHistory());
    const historyIndexRef = useRef(-1);
    const historyDraftRef = useRef('');
    const canSend = content.trim() || mediaFiles.length > 0 || fileRefs.length > 0 || messageRefs.length > 0;
    const canShareLocation = typeof window !== 'undefined'
        && typeof navigator !== 'undefined'
        && Boolean(navigator.geolocation)
        && Boolean(window.isSecureContext);
    const notificationsSupported = typeof window !== 'undefined' && typeof Notification !== 'undefined';
    const notificationsSecure = typeof window !== 'undefined' ? Boolean(window.isSecureContext) : false;
    const notificationDenied = notificationPermission === 'denied';
    const notificationsAvailable = notificationsSupported && notificationsSecure && !notificationDenied;
    const notificationActive = notificationPermission === 'granted' && notificationsEnabled;
    const notificationTitle = notificationActive ? 'Disable notifications' : 'Enable notifications';

    const modelHintLabel = activeModel || '';
    const modelHintSuffix = supportsThinking && thinkingLevel ? ` (${thinkingLevel})` : '';
    const modelThinkingLabel = modelHintSuffix.trim() ? `${thinkingLevel}` : '';
    const modelUsageLabel = typeof modelUsage?.hint_short === 'string' ? modelUsage.hint_short.trim() : '';
    const modelUsageSectionLabel = [
        modelThinkingLabel || null,
        modelUsageLabel || null,
    ].filter(Boolean).join(' • ');
    const modelUsageTitleParts = [
        modelHintLabel ? `Current model: ${modelHintLabel}${modelHintSuffix}` : null,
        modelUsage?.plan ? `Plan: ${modelUsage.plan}` : null,
        modelUsageLabel || null,
        modelUsage?.primary?.reset_description || null,
        modelUsage?.secondary?.reset_description || null,
    ].filter(Boolean);
    const modelHintTitle = switchingModel
        ? 'Switching model…'
        : (modelUsageTitleParts.join(' • ') || `Current model: ${modelHintLabel}${modelHintSuffix} (tap to open model picker)`);

    const emitModelState = (payload) => {
        if (!payload || typeof payload !== 'object') return;
        const modelLabel = payload.model ?? payload.current;
        if (typeof onModelStateChange === 'function') {
            onModelStateChange({
                model: modelLabel ?? null,
                thinking_level: payload.thinking_level ?? null,
                supports_thinking: payload.supports_thinking,
                provider_usage: payload.provider_usage ?? null,
            });
        }
        if (modelLabel && typeof onModelChange === 'function') {
            onModelChange(modelLabel);
        }
    };

    const resizeTextarea = (target) => {
        const textarea = target || textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
    };


    /** Update slash autocomplete matches based on current input. */
    const updateSlashAutocomplete = (value) => {
        // Only trigger when the entire input is a slash command (starts with /)
        // and contains no newlines (single-line command)
        if (!value.startsWith('/') || value.includes('\n')) {
            setShowSlash(false);
            setSlashMatches([]);
            return;
        }
        const prefix = value.toLowerCase().split(' ')[0]; // only match the command part
        if (prefix.length < 1) {
            setShowSlash(false);
            setSlashMatches([]);
            return;
        }
        const matches = SLASH_COMMANDS.filter(cmd =>
            cmd.name.startsWith(prefix) || cmd.name.replace(/-/g, '').startsWith(prefix.replace(/-/g, ''))
        );
        if (matches.length > 0 && !(matches.length === 1 && matches[0].name === prefix)) {
            setSlashMatches(matches);
            setSlashIndex(0);
            setShowSlash(true);
        } else {
            setShowSlash(false);
            setSlashMatches([]);
        }
    };

    /** Accept the currently highlighted slash command. */
    const acceptSlashCommand = (cmd) => {
        const current = content;
        // Replace the command portion, keep any args after a space
        const spaceIdx = current.indexOf(' ');
        const args = spaceIdx >= 0 ? current.slice(spaceIdx) : '';
        const newVal = cmd.name + args;
        setContent(newVal);
        setShowSlash(false);
        setSlashMatches([]);
        requestAnimationFrame(() => {
            const textarea = textareaRef.current;
            if (!textarea) return;
            // Place cursor at end
            const len = newVal.length;
            textarea.selectionStart = len;
            textarea.selectionEnd = len;
            textarea.focus();
        });
    };

    const updateValue = (value) => {
        if (searchMode) {
            setSearchText(value);
        } else {
            setContent(value);
            updateSlashAutocomplete(value);
        }
        requestAnimationFrame(() => resizeTextarea());
    };

    const appendToValue = (snippet) => {
        const current = searchMode ? searchText : content;
        const prefix = current && !current.endsWith('\n') ? '\n' : '';
        const next = `${current}${prefix}${snippet}`.trimStart();
        updateValue(next);
    };

    const extractCurrentModel = (response) => {
        const fromLabel = response?.command?.model_label;
        if (fromLabel) return fromLabel;
        const message = response?.command?.message;
        if (typeof message === 'string') {
            const currentMatch = message.match(/•\s+([^\n]+?)\s+\(current\)/);
            if (currentMatch?.[1]) return currentMatch[1].trim();
        }
        return null;
    };

    const runModelCommand = async (commandText) => {
        if (searchMode || switchingModel) return;

        setSwitchingModel(true);
        try {
            const response = await sendAgentMessage('default', commandText, null, []);
            const nextModel = extractCurrentModel(response);
            emitModelState({
                model: nextModel ?? activeModel ?? null,
                thinking_level: response?.command?.thinking_level,
                supports_thinking: response?.command?.supports_thinking,
            });
            try {
                const latest = await getAgentModels();
                if (latest) emitModelState(latest);
            } catch {}
            onPost?.();
            return true;
        } catch (error) {
            console.error('Failed to switch model:', error);
            alert('Failed to switch model: ' + error.message);
            return false;
        } finally {
            setSwitchingModel(false);
        }
    };

    const handleCycleModel = async () => {
        await runModelCommand('/cycle-model');
    };

    const handleSelectModel = async (modelLabel) => {
        if (!modelLabel || switchingModel) return;
        const ok = await runModelCommand(`/model ${modelLabel}`);
        if (ok) setShowModelPopup(false);
    };

    const toggleModelPopup = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowModelPopup((prev) => !prev);
    };

    const resolveSubmitMode = (mode) => {
        if (mode === 'queue' || mode === 'steer' || mode === 'auto') {
            return mode;
        }
        return isAgentActive ? 'queue' : null;
    };

    const handleSubmit = async (overrideContent, submitMode, submitOptions = {}) => {
        const {
            includeMedia = true,
            includeFileRefs = true,
            includeMessageRefs = true,
            clearAfterSubmit = true,
            recordHistory = true,
        } = submitOptions || {};

        const inferred = typeof overrideContent === 'string'
            ? overrideContent
            : (overrideContent && typeof overrideContent?.target?.value === 'string'
                ? overrideContent.target.value
                : content);
        const currentContent = typeof inferred === 'string' ? inferred : '';
        if (
            !currentContent.trim() &&
            (includeMedia ? mediaFiles.length === 0 : true) &&
            (includeFileRefs ? fileRefs.length === 0 : true) &&
            (includeMessageRefs ? messageRefs.length === 0 : true)
        ) return;

        setShowSlash(false);
        setSlashMatches([]);

        // Capture media/refs before clearing so the async send can use them
        const capturedMediaFiles = includeMedia ? [...mediaFiles] : [];
        const capturedFileRefs = includeFileRefs ? [...fileRefs] : [];
        const capturedMessageRefs = includeMessageRefs ? [...messageRefs] : [];
        const baseContent = currentContent.trim();

        // Record history synchronously
        if (recordHistory && baseContent) {
            const current = historyRef.current;
            const deduped = normaliseHistory(current.filter((item) => item !== baseContent));
            deduped.push(baseContent);
            if (deduped.length > historyMax) {
                deduped.splice(0, deduped.length - historyMax);
            }
            historyRef.current = deduped;
            saveHistory(deduped);
            historyIndexRef.current = -1;
            historyDraftRef.current = '';
        }

        // Clear compose box immediately so user can keep typing
        if (clearAfterSubmit) {
            setContent('');
            setMediaFiles([]);
            onClearFileRefs?.();
            onClearMessageRefs?.();
        }

        // Fire-and-forget: send in background, never block the compose box
        (async () => {
            try {
                // Upload media files first
                const mediaIds = [];
                for (const file of capturedMediaFiles) {
                    const result = await uploadMedia(file);
                    mediaIds.push(result.id);
                }

                const fileBlock = capturedFileRefs.length
                    ? `Files:\n${capturedFileRefs.map((path) => `- ${path}`).join('\n')}`
                    : '';
                const messageRefBlock = capturedMessageRefs.length
                    ? `Referenced messages:\n${capturedMessageRefs.map((id) => `- message:${id}`).join('\n')}`
                    : '';
                const mediaBlock = mediaIds.length
                    ? `Images:\n${mediaIds.map((id, index) => {
                        const file = capturedMediaFiles[index];
                        const label = file?.name || `image-${index + 1}`;
                        return `- attachment:${id} (${label})`;
                    }).join('\n')}`
                    : '';
                const message = [baseContent, fileBlock, messageRefBlock, mediaBlock].filter(Boolean).join('\n\n');
                const response = await sendAgentMessage('default', message, null, mediaIds, resolveSubmitMode(submitMode));
                onMessageResponse?.(response);

                if (response?.command) {
                    emitModelState({
                        model: response.command.model_label ?? activeModel ?? null,
                        thinking_level: response.command.thinking_level,
                        supports_thinking: response.command.supports_thinking,
                    });
                    try {
                        const latest = await getAgentModels();
                        if (latest) emitModelState(latest);
                    } catch {}
                }

                onPost?.();
            } catch (error) {
                console.error('Failed to post:', error);
            }
        })();
    };

    const handleInjectQueuedFollowup = (queuedItem) => {
        // Queue-item steering is backend-authoritative: the server removes the
        // queued item and either converts it into steering or immediately sends
        // it if the active stream already ended. Avoid a second client-side
        // submit here so removal + steering stay atomic.
        onInjectQueuedFollowup?.(queuedItem);
    };

    const handleKeyDown = (e) => {
        if (e.isComposing) return;
        if (searchMode && e.key === 'Escape') {
            e.preventDefault();
            setSearchText('');
            onExitSearch?.();
            return;
        }
        // Slash autocomplete navigation
        if (showSlash && slashMatches.length > 0) {
            const slashValue = textareaRef.current?.value ?? (searchMode ? searchText : content);
            if (!String(slashValue || '').startsWith('/')) {
                // Stale slash popup; hide and continue with normal key handling.
                setShowSlash(false);
                setSlashMatches([]);
            } else {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSlashIndex(i => (i + 1) % slashMatches.length);
                    return;
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSlashIndex(i => (i - 1 + slashMatches.length) % slashMatches.length);
                    return;
                }
                if (e.key === 'Tab') {
                    e.preventDefault();
                    acceptSlashCommand(slashMatches[slashIndex]);
                    return;
                }
                if (e.key === 'Enter' && !e.shiftKey) {
                    const currentValue = textareaRef.current?.value ?? (searchMode ? searchText : content);
                    const hasArgs = currentValue.includes(' ');
                    if (!hasArgs) {
                        e.preventDefault();
                        const cmd = slashMatches[slashIndex];
                        setShowSlash(false);
                        setSlashMatches([]);
                        // If the user hits Enter with only a command fragment, accept
                        // the match and submit in one step to avoid double-Enter.
                        void handleSubmit(cmd.name);
                        return;
                    }
                    // When args are present, allow Enter to fall through to submit.
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    setShowSlash(false);
                    setSlashMatches([]);
                    return;
                }
            }
        }
        if (!searchMode && (e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const textarea = textareaRef.current;
            if (!textarea) return;
            const value = textarea.value || '';
            const atStart = textarea.selectionStart === 0 && textarea.selectionEnd === 0;
            const atEnd = textarea.selectionStart === value.length && textarea.selectionEnd === value.length;
            if ((e.key === 'ArrowUp' && atStart) || (e.key === 'ArrowDown' && atEnd)) {
                const history = historyRef.current;
                if (!history.length) return;
                e.preventDefault();
                let idx = historyIndexRef.current;
                if (e.key === 'ArrowUp') {
                    if (idx === -1) {
                        historyDraftRef.current = value;
                        idx = history.length - 1;
                    } else if (idx > 0) {
                        idx -= 1;
                    }
                    historyIndexRef.current = idx;
                    updateValue(history[idx] || '');
                } else {
                    if (idx === -1) return;
                    if (idx < history.length - 1) {
                        idx += 1;
                        historyIndexRef.current = idx;
                        updateValue(history[idx] || '');
                    } else {
                        historyIndexRef.current = -1;
                        updateValue(historyDraftRef.current || '');
                        historyDraftRef.current = '';
                    }
                }
                requestAnimationFrame(() => {
                    const target = textareaRef.current;
                    if (!target) return;
                    const len = target.value.length;
                    target.selectionStart = len;
                    target.selectionEnd = len;
                });
                return;
            }
        }
        if (e.key === 'Enter' && !e.shiftKey && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            const currentValue = textareaRef.current?.value ?? (searchMode ? searchText : content);
            if (searchMode) {
                if (currentValue.trim()) {
                    onSearch?.(currentValue.trim());
                }
            } else {
                void handleSubmit(currentValue, "steer");
            }
            return;
        }

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const currentValue = textareaRef.current?.value ?? (searchMode ? searchText : content);
            if (searchMode) {
                if (currentValue.trim()) {
                    onSearch?.(currentValue.trim());
                }
            } else {
                void handleSubmit(currentValue);
            }
        }
    };

    const addMediaFiles = (files) => {
        const list = Array.from(files || []).filter((file) => file && file.type && file.type.startsWith('image/'));
        if (!list.length) return;
        setMediaFiles((current) => [...current, ...list]);
    };

    const handleFileChange = (e) => {
        addMediaFiles(e.target.files);
        e.target.value = '';
    };

    const handleDragEnter = (e) => {
        if (searchMode) return;
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current += 1;
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        if (searchMode) return;
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = Math.max(0, dragCounterRef.current - 1);
        if (dragCounterRef.current === 0) setIsDragActive(false);
    };

    const handleDragOver = (e) => {
        if (searchMode) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        setIsDragActive(true);
    };

    const handleDrop = (e) => {
        if (searchMode) return;
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragActive(false);
        addMediaFiles(e.dataTransfer?.files || []);
    };

    const handlePaste = (e) => {
        if (searchMode) return;
        const items = e.clipboardData?.items;
        if (!items || !items.length) return;
        const files = [];
        for (const item of items) {
            if (item.kind !== 'file') continue;
            const file = item.getAsFile?.();
            if (file) files.push(file);
        }
        if (files.length > 0) {
            e.preventDefault();
            addMediaFiles(files);
        }
    };

    const removeMediaFile = (index) => {
        setMediaFiles((current) => current.filter((_, idx) => idx !== index));
    };

    const handleLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not available in this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                const coords = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                const accuracyLabel = Number.isFinite(accuracy) ? ` ±${Math.round(accuracy)}m` : '';
                const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
                const snippet = `Location: ${coords}${accuracyLabel} ${mapLink}`;
                appendToValue(snippet);
            },
            (err) => {
                const message = err?.message || 'Unable to retrieve location.';
                alert(`Location error: ${message}`);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    useEffect(() => {
        if (!showModelPopup) return;

        setLoadingModels(true);
        getAgentModels()
            .then((payload) => {
                const models = Array.isArray(payload?.models)
                    ? payload.models.filter((model) => typeof model === 'string' && model.trim().length > 0)
                    : [];
                setModelOptions(models);
                emitModelState(payload);
            })
            .catch((error) => {
                console.warn('Failed to load model list:', error);
                setModelOptions([]);
            })
            .finally(() => {
                setLoadingModels(false);
            });
    }, [showModelPopup, activeModel]);

    useEffect(() => {
        if (searchMode) setShowModelPopup(false);
    }, [searchMode]);

    useEffect(() => {
        if (!showModelPopup) return;

        const onPointerDown = (event) => {
            const popup = modelPopupRef.current;
            const hint = modelHintRef.current;
            const target = event.target;
            if (popup && popup.contains(target)) return;
            if (hint && hint.contains(target)) return;
            setShowModelPopup(false);
        };

        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [showModelPopup]);

    // Auto-resize textarea
    const handleInput = (e) => {
        const value = e.target.value;
        resizeTextarea(e.target);
        updateValue(value);
    };

    useEffect(() => {
        requestAnimationFrame(() => resizeTextarea());
    }, [content, searchText, searchMode]);


    return html`
        <div class="compose-box">
            ${!searchMode && followupQueueItems.length > 0 && html`
                <div class="compose-queue-stack">
                    ${followupQueueItems.map((item) => {
                        const rowText = typeof item?.content === 'string' ? item.content : '';
                        if (!rowText.trim()) return null;
                        return html`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${rowText}>
                                    ${rowText}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${() => handleInjectQueuedFollowup(item)}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4 20h12a2 2 0 0 0 2-2V8" />
                                        <polyline points="14 12 18 8 22 12" />
                                    </svg>
                                    <span>Steer</span>
                                </button>
                                <button
                                    class="compose-queue-stack-close-btn"
                                    type="button"
                                    title="Cancel queued message"
                                    onClick=${() => onRemoveQueuedFollowup?.(item)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        `;
                    })}
                </div>
            `}
            <div
                class=${`compose-input-wrapper${isDragActive ? ' drag-active' : ''}`}
                onDragEnter=${handleDragEnter}
                onDragOver=${handleDragOver}
                onDragLeave=${handleDragLeave}
                onDrop=${handleDrop}
            >
                <div class="compose-input-main">
                    ${(fileRefs.length > 0 || mediaFiles.length > 0 || messageRefs.length > 0) && html`
                        <div class="compose-file-refs">
                            ${messageRefs.map((id) => {
                                return html`
                                    <${FilePill}
                                        key=${'msg-' + id}
                                        prefix="compose"
                                        label=${'msg:' + id}
                                        title=${'Message reference: ' + id}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${() => onRemoveMessageRef?.(id)}
                                    />
                                `;
                            })}
                            ${fileRefs.map((path) => {
                                const label = path.split('/').pop() || path;
                                return html`
                                    <${FilePill}
                                        prefix="compose"
                                        label=${label}
                                        title=${path}
                                        onClick=${() => onOpenFilePill?.(path)}
                                        removeTitle="Remove file"
                                        onRemove=${() => onRemoveFileRef?.(path)}
                                    />
                                `;
                            })}
                            ${mediaFiles.map((file, index) => {
                                const label = file?.name || `image-${index + 1}`;
                                return html`
                                    <${FilePill}
                                        key=${label + index}
                                        prefix="compose"
                                        label=${label}
                                        title=${label}
                                        removeTitle="Remove image"
                                        onRemove=${() => removeMediaFile(index)}
                                    />
                                `;
                            })}
                        </div>
                    `}
                    <textarea
                        ref=${textareaRef}
                        placeholder=${searchMode ? "Search (Enter to run)..." : "Message (Enter to send, Shift+Enter for newline)..."}
                        value=${searchMode ? searchText : content}
                        onInput=${handleInput}
                        onKeyDown=${handleKeyDown}
                        onPaste=${handlePaste}
                        onFocus=${onFocus}
                        onClick=${onFocus}
                        rows="1"
                    />
                    ${showSlash && slashMatches.length > 0 && html`
                        <div class="slash-autocomplete" ref=${slashRef}>
                            ${slashMatches.map((cmd, i) => html`
                                <div
                                    key=${cmd.name}
                                    class=${`slash-item${i === slashIndex ? ' active' : ''}`}
                                    onMouseDown=${(e) => { e.preventDefault(); acceptSlashCommand(cmd); }}
                                    onMouseEnter=${() => setSlashIndex(i)}
                                >
                                    <span class="slash-name">${cmd.name}</span>
                                    <span class="slash-desc">${cmd.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${showModelPopup && !searchMode && html`
                        <div class="compose-model-popup" ref=${modelPopupRef}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${loadingModels && html`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!loadingModels && modelOptions.length === 0 && html`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!loadingModels && modelOptions.map((modelLabel) => html`
                                    <button
                                        key=${modelLabel}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${activeModel === modelLabel ? ' active' : ''}`}
                                        onClick=${() => { void handleSelectModel(modelLabel); }}
                                        disabled=${switchingModel}
                                    >
                                        ${modelLabel}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${() => { void handleCycleModel(); }}
                                    disabled=${switchingModel}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!searchMode && activeModel && html`
                    <div class="compose-meta-row">
                        ${!searchMode && activeModel && html`
                            <div class="compose-model-meta">
                                <button
                                    ref=${modelHintRef}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${modelHintTitle}
                                    aria-label="Open model picker"
                                    onClick=${toggleModelPopup}
                                    disabled=${switchingModel}
                                >
                                    ${switchingModel ? 'Switching…' : modelHintLabel}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!switchingModel && modelUsageSectionLabel && html`
                                        <span class="compose-model-usage-hint" title=${modelHintTitle}>
                                            ${modelUsageSectionLabel}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${searchMode ? 'search-mode' : ''}">
                    ${!searchMode && contextUsage && contextUsage.percent != null && html`
                        <${ContextPie} usage=${contextUsage} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${searchMode ? onExitSearch : onEnterSearch}
                        title=${searchMode ? "Close search" : "Search"}
                    >
                        ${searchMode ? html`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        ` : html`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${canShareLocation && !searchMode && html`
                        <button
                            class="icon-btn location-btn"
                            onClick=${handleLocation}
                            title="Share location"
                            type="button"
                            disabled=${false}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${notificationsAvailable && !searchMode && html`
                        <button
                            class=${`icon-btn notification-btn${notificationActive ? ' active' : ''}`}
                            onClick=${onToggleNotifications}
                            title=${notificationTitle}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!searchMode && html`
                        ${activeEditorPath && onAttachEditorFile && html`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${onAttachEditorFile}
                                title=${`Attach open file: ${activeEditorPath}`}
                                type="button"
                                disabled=${fileRefs.includes(activeEditorPath)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${handleFileChange} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${() => { void handleSubmit(); }}
                            disabled=${!canSend}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `;
}
