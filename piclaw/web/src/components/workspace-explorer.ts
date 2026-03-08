// @ts-nocheck
import { html, useCallback, useEffect, useMemo, useRef, useState } from '../vendor/preact-htm.js';
import { getLocalStorageBoolean, getLocalStorageNumber, setLocalStorageItem } from '../utils/storage.js';
import {
    attachWorkspaceFile,
    deleteWorkspaceFile,
    getMediaInfo,
    getMediaUrl,
    getWorkspaceDownloadUrl,
    getWorkspaceFile,
    getWorkspaceRawUrl,
    getWorkspaceTree,
    setWorkspaceVisibility,
    uploadWorkspaceFile,
} from '../api.js';
import { formatFileSize, formatTimestamp } from '../utils/format.js';
import { renderMarkdown } from '../markdown.js';

const INDENT = 16;
const REFRESH_INTERVAL_MS = 60000;

const isHiddenNode = (node) => {
    if (!node || !node.name) return false;
    if (node.path === '.') return false;
    return node.name.startsWith('.');
};

function rewriteMarkdownImagePath(src, markdownPath) {
    const raw = String(src || '').trim();
    if (!raw) return raw;

    // Keep explicit protocols and data/blob URLs untouched.
    if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(raw) || raw.startsWith('#') || raw.startsWith('data:') || raw.startsWith('blob:')) {
        return raw;
    }

    const match = raw.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
    const relPath = match?.[1] || raw;
    const query = match?.[2] || '';
    const hash = match?.[3] || '';

    const baseDir = String(markdownPath || '')
        .split('/')
        .slice(0, -1)
        .join('/');

    const isAbsolute = relPath.startsWith('/');
    const combined = isAbsolute
        ? relPath
        : `${baseDir ? `${baseDir}/` : ''}${relPath}`;

    const normalized = [];
    for (const segment of combined.split('/')) {
        if (!segment || segment === '.') continue;
        if (segment === '..') {
            if (normalized.length > 0) normalized.pop();
            continue;
        }
        normalized.push(segment);
    }

    const workspacePath = normalized.join('/');
    return `${getWorkspaceRawUrl(workspacePath)}${query}${hash}`;
}

// ── Tree data helpers ─────────────────────────────────────────────────────────

function flattenTree(node, expanded, showHidden, depth = 0, rows = []) {
    if (!showHidden && isHiddenNode(node)) return rows;
    if (!node) return rows;
    rows.push({ node, depth });
    if (node.type === 'dir' && node.children && expanded.has(node.path)) {
        for (const child of node.children) flattenTree(child, expanded, showHidden, depth + 1, rows);
    }
    return rows;
}

/**
 * Signature of *visible* structure only: path + type for expanded nodes.
 * Ignores mtime/size so file modifications alone don't trigger a redraw.
 */
function treeSignature(node, expanded, showHidden) {
    if (!node) return '';
    const parts = [];
    const walk = (item) => {
        if (!showHidden && isHiddenNode(item)) return;
        parts.push(item.type === 'dir' ? `d:${item.path}` : `f:${item.path}`);
        if (item.children && expanded?.has(item.path)) {
            for (const child of item.children) walk(child);
        }
    };
    walk(node);
    return parts.join('|');
}

/**
 * Deep-merge two tree snapshots, preserving object identity for unchanged
 * subtrees so Preact's keyed diffing can skip unchanged rows entirely.
 */
function mergeTree(prev, next) {
    if (!next) return null;
    if (!prev) return next;
    if (prev.path !== next.path || prev.type !== next.type) return next;

    const prevKids = Array.isArray(prev.children) ? prev.children : null;
    const nextKids = Array.isArray(next.children) ? next.children : null;

    // Server hit depth limit and returned no children – keep what we had.
    if (!nextKids) return prev;

    const prevMap = prevKids ? new Map(prevKids.map(c => [c?.path, c])) : new Map();
    let changed = !prevKids || prevKids.length !== nextKids.length;
    const merged = nextKids.map(child => {
        const m = mergeTree(prevMap.get(child.path), child);
        if (m !== prevMap.get(child.path)) changed = true;
        return m;
    });
    return changed ? { ...next, children: merged } : prev;
}

// Replace a subtree at path with a new node (merged to preserve identity).
function replaceNodeAtPath(node, targetPath, nextNode) {
    if (!node) return node;
    if (node.path === targetPath) return mergeTree(node, nextNode);
    if (!Array.isArray(node.children)) return node;
    let changed = false;
    const children = node.children.map(child => {
        const updated = replaceNodeAtPath(child, targetPath, nextNode);
        if (updated !== child) changed = true;
        return updated;
    });
    return changed ? { ...node, children } : node;
}

// ── FileAttachmentCard ────────────────────────────────────────────────────────

function FileAttachmentCard({ mediaId }) {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        if (!mediaId) return;
        getMediaInfo(mediaId).then(setInfo).catch(() => {});
    }, [mediaId]);
    if (!info) return null;
    const filename = info.filename || 'file';
    const sizeStr = info.metadata?.size ? formatFileSize(info.metadata.size) : '';
    return html`
        <a href=${getMediaUrl(mediaId)} download=${filename} class="file-attachment"
            onClick=${(e) => e.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${filename}</span>
                ${sizeStr && html`<span class="file-size">${sizeStr}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `;
}

// ── WorkspaceExplorer ─────────────────────────────────────────────────────────

/** Preact component: file tree explorer with upload, rename, and preview. */
export function WorkspaceExplorer({ onFileSelect, visible = true, active = undefined, onOpenEditor }) {
    const [tree,          setTree]          = useState(null);
    const [expanded,      setExpanded]      = useState(new Set(['.']));
    const [selectedPath,  setSelectedPath]  = useState(null);
    const [preview,       setPreview]       = useState(null);
    const [downloadId,    setDownloadId]    = useState(null);
    const [initialLoad,   setInitialLoad]   = useState(true);
    const [loadingPreview,setLoadingPreview]= useState(false);
    const [error,         setError]         = useState(null);
    const [showHidden,    setShowHidden]    = useState(() => getLocalStorageBoolean('workspaceShowHidden', false));
    const [dragActive,   setDragActive]    = useState(false);
    const [dropTarget,   setDropTarget]    = useState(null);
    const [uploading,    setUploading]     = useState(false);

    // ── Stable refs (never trigger re-renders) ────────────────────────────────
    const expandedRef     = useRef(expanded);
    const lastSigRef      = useRef('');
    const pendingRootRef  = useRef(null);
    const rafRef          = useRef(0);
    const pendingSubtreeRef = useRef(new Set());
    // KEY FIX: keep a ref to the latest loadTree so the setInterval never
    // holds a stale closure over the initial tree=null state.
    const loadTreeFnRef   = useRef(null);
    const nodeMapRef      = useRef(new Map());
    const onFileSelectRef = useRef(onFileSelect);
    const onOpenEditorRef = useRef(onOpenEditor);
    const loadPreviewRef  = useRef(null);
    const loadSubtreeRef  = useRef(null);
    const sidebarRef      = useRef(null);
    const treeListRef     = useRef(null);
    const uploadInputRef  = useRef(null);
    const uploadTargetRef = useRef('.');
    const longPressTimerRef = useRef(null);
    const previewHeightRef= useRef(0);
    const showHiddenRef   = useRef(showHidden);
    const visibleRef      = useRef(visible);
    const activeRef       = useRef(active ?? visible);
    const dragDepthRef    = useRef(0);
    const dropTargetRef   = useRef(dropTarget);
    const dragActiveRef   = useRef(dragActive);
    const selectedPathRef = useRef(selectedPath);
    const previewRef      = useRef(preview);

    // Sync mutable refs each render
    onFileSelectRef.current = onFileSelect;
    onOpenEditorRef.current = onOpenEditor;
    useEffect(() => { expandedRef.current = expanded; }, [expanded]);
    useEffect(() => { showHiddenRef.current = showHidden; }, [showHidden]);
    useEffect(() => { visibleRef.current = visible; }, [visible]);
    useEffect(() => { activeRef.current = active ?? visible; }, [active, visible]);
    useEffect(() => { dropTargetRef.current = dropTarget; }, [dropTarget]);
    useEffect(() => { dragActiveRef.current = dragActive; }, [dragActive]);
    useEffect(() => { selectedPathRef.current = selectedPath; }, [selectedPath]);
    useEffect(() => { previewRef.current = preview; }, [preview]);

    // ── loadPreview ───────────────────────────────────────────────────────────
    const loadPreview = async (path) => {
        setLoadingPreview(true);
        setPreview(null);
        setDownloadId(null);
        try {
            const data = await getWorkspaceFile(path, 20000);
            setPreview(data);
        } catch (err) {
            setPreview({ error: err.message || 'Failed to load preview' });
        } finally {
            setLoadingPreview(false);
        }
    };
    loadPreviewRef.current = loadPreview;

    // ── loadTree ──────────────────────────────────────────────────────────────
    const loadTree = async () => {
        if (!visibleRef.current) return;
        try {
            // Use depth 1 for root to avoid scanning huge workspaces upfront.
            // Individual folders are expanded on-demand via loadSubtree().
            const data = await getWorkspaceTree('', 1, showHiddenRef.current);
            const sig = treeSignature(data.root, expandedRef.current, showHiddenRef.current);
            if (sig === lastSigRef.current) {
                // Structure unchanged – just clear the initial spinner if needed.
                setInitialLoad(false);
                return;
            }
            lastSigRef.current = sig;
            pendingRootRef.current = data.root;
            // Batch the DOM update into a single rAF; coalesce rapid calls.
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = 0;
                    // mergeTree returns prev unchanged when content is identical,
                    // so Preact skips diffing rows that didn't change.
                    setTree(prev => mergeTree(prev, pendingRootRef.current));
                    setInitialLoad(false);
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to load workspace');
            setInitialLoad(false);
        }
    };

    const loadSubtree = async (path) => {
        if (!path) return;
        if (pendingSubtreeRef.current.has(path)) return;
        pendingSubtreeRef.current.add(path);
        try {
            const data = await getWorkspaceTree(path, 1, showHiddenRef.current);
            setTree(prev => replaceNodeAtPath(prev, path, data.root));
        } catch (err) {
            setError(err.message || 'Failed to load workspace');
        } finally {
            pendingSubtreeRef.current.delete(path);
        }
    };
    loadSubtreeRef.current = loadSubtree;

    const resolveDropTargetPath = useCallback(() => {
        const selected = selectedPath;
        if (!selected) return '.';
        const node = nodeMapRef.current?.get(selected);
        if (node && node.type === 'dir') return node.path;
        if (selected === '.' || !selected.includes('/')) return '.';
        const parts = selected.split('/');
        parts.pop();
        const parent = parts.join('/');
        return parent || '.';
    }, [selectedPath]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handler = (event) => {
            const updates = event?.detail?.updates || [];
            if (!Array.isArray(updates) || updates.length === 0) return;
            setTree(prev => {
                let next = prev;
                for (const update of updates) {
                    if (!update?.root) continue;
                    if (!next || update.path === '.' || !update.path) {
                        next = update.root;
                    } else {
                        next = replaceNodeAtPath(next, update.path, update.root);
                    }
                }
                if (next) {
                    lastSigRef.current = treeSignature(next, expandedRef.current, showHiddenRef.current);
                }
                setInitialLoad(false);
                return next;
            });

            // If the selected file changed on disk, refresh the preview.
            const selected = selectedPathRef.current;
            if (!selected || !previewRef.current) return;
            const node = nodeMapRef.current?.get(selected);
            if (node && node.type === 'dir') return;
            const shouldRefresh = updates.some((update) => {
                const path = update?.path || '';
                if (!path || path === '.') return true;
                return selected === path || selected.startsWith(`${path}/`);
            });
            if (shouldRefresh) {
                loadPreviewRef.current?.(selected);
            }
        };
        window.addEventListener('workspace-update', handler);
        return () => window.removeEventListener('workspace-update', handler);
    }, []);

    // Always point at the freshest loadTree — interval calls this ref,
    // so it always has the current closure (tree, expanded, etc.).
    loadTreeFnRef.current = loadTree;

    const updateVisibility = useRef(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia('(min-width: 1024px) and (orientation: landscape)');
        const active = activeRef.current ?? visibleRef.current;
        const visible = document.visibilityState !== 'hidden'
            && (active || (media.matches && visibleRef.current));
        setWorkspaceVisibility(visible, showHiddenRef.current).catch(() => {});
    }).current;

    const debouncedVisibilityRef = useRef(0);
    const scheduleVisibilityUpdate = useRef(() => {
        if (debouncedVisibilityRef.current) {
            clearTimeout(debouncedVisibilityRef.current);
        }
        debouncedVisibilityRef.current = setTimeout(() => {
            debouncedVisibilityRef.current = 0;
            updateVisibility();
        }, 250);
    }).current;

    useEffect(() => {
        if (visibleRef.current) {
            loadTreeFnRef.current?.();
        }
        scheduleVisibilityUpdate();
    }, [visible, active]);

    // Mount once; interval always calls the ref, never a stale copy.
    useEffect(() => {
        loadTreeFnRef.current();
        updateVisibility();
        const timer = setInterval(() => loadTreeFnRef.current(), REFRESH_INTERVAL_MS);
        // Apply saved preview height
        const saved = getLocalStorageNumber('previewHeight', null);
        const h = Number.isFinite(saved) ? Math.min(Math.max(saved, 80), 600) : 280;
        previewHeightRef.current = h;
        if (sidebarRef.current) {
            sidebarRef.current.style.setProperty('--preview-height', `${h}px`);
        }

        const media = window.matchMedia('(min-width: 1024px) and (orientation: landscape)');
        const onVisibilityChange = () => scheduleVisibilityUpdate();
        if (media.addEventListener) {
            media.addEventListener('change', onVisibilityChange);
        } else if (media.addListener) {
            media.addListener(onVisibilityChange);
        }
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            clearInterval(timer);
            if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
            if (media.removeEventListener) {
                media.removeEventListener('change', onVisibilityChange);
            } else if (media.removeListener) {
                media.removeListener(onVisibilityChange);
            }
            document.removeEventListener('visibilitychange', onVisibilityChange);
            if (debouncedVisibilityRef.current) {
                clearTimeout(debouncedVisibilityRef.current);
                debouncedVisibilityRef.current = 0;
            }
            if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
            }
            setWorkspaceVisibility(false, showHiddenRef.current).catch(() => {});
        };
    }, []);

    // ── Flattened visible rows ────────────────────────────────────────────────
    const rows = useMemo(() => flattenTree(tree, expanded, showHidden), [tree, expanded, showHidden]);
    const nodeMap = useMemo(() => new Map(rows.map(r => [r.node.path, r.node])), [rows]);
    nodeMapRef.current = nodeMap;
    const selectedNode = selectedPath ? nodeMapRef.current.get(selectedPath) : null;
    const selectedIsDir = selectedNode?.type === 'dir';
    const canEdit = Boolean(preview && preview.kind === 'text' && !selectedIsDir && (!preview.size || preview.size <= 256 * 1024));
    const editTitle = canEdit
        ? 'Open in editor'
        : preview?.size > 256 * 1024
            ? 'File too large to edit'
            : 'File is not editable';

    // ── Single stable click handler via event delegation ──────────────────────
    // Created once; reads live state through refs so it never needs recreation.
    const handleTreeClick = useRef((e) => {
        const rowEl = e.target.closest('[data-path]');
        treeListRef.current?.focus?.();
        if (!rowEl) return;
        const clickedPath = rowEl.dataset.path;
        const clickedType = rowEl.dataset.type;
        if (clickedType === 'dir') {
            setSelectedPath(clickedPath);
            setPreview(null);
            setDownloadId(null);
            setLoadingPreview(false);
            const wasExpanded = expandedRef.current.has(clickedPath);
            if (!wasExpanded) loadSubtreeRef.current?.(clickedPath);
            setExpanded(prev => {
                const next = new Set(prev);
                if (next.has(clickedPath)) next.delete(clickedPath);
                else next.add(clickedPath);
                return next;
            });
        } else {
            setSelectedPath(clickedPath);
            const node = nodeMapRef.current.get(clickedPath);
            if (node) onFileSelectRef.current?.(node.path, node);
            loadPreviewRef.current?.(clickedPath);
        }
    }).current;

    // Refresh button: force-invalidate signature so a changed tree is picked up
    // even if the visible signature hasn't changed (e.g. mtime-only updates).
    const handleRefreshClick = useRef(() => {
        lastSigRef.current = '';
        loadTreeFnRef.current();
        const openPaths = Array.from(expandedRef.current || []).filter((p) => p && p !== '.');
        openPaths.forEach((p) => loadSubtreeRef.current?.(p));
    }).current;

    const clearSelection = useRef(() => {
        setSelectedPath(null);
        setPreview(null);
        setDownloadId(null);
        setLoadingPreview(false);
    }).current;

    const handleToggleHidden = useRef(() => {
        setShowHidden((prev) => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                setLocalStorageItem('workspaceShowHidden', String(next));
            }
            showHiddenRef.current = next;
            setWorkspaceVisibility(true, next).catch(() => {});
            lastSigRef.current = '';
            loadTreeFnRef.current?.();
            const openPaths = Array.from(expandedRef.current || []).filter((p) => p && p !== '.');
            openPaths.forEach((p) => loadSubtreeRef.current?.(p));
            return next;
        });
    }).current;

    const handleBackgroundClick = useRef((e) => {
        if (e.target.closest('[data-path]')) return;
        clearSelection();
    }).current;

    const deleteFileAtPath = useCallback(async (path) => {
        if (!path) return;
        const filename = path.split('/').pop() || path;
        const confirmed = window.confirm(`Delete "${filename}"? This cannot be undone.`);
        if (!confirmed) return;

        try {
            await deleteWorkspaceFile(path);
            const parent = path.includes('/') ? (path.split('/').slice(0, -1).join('/') || '.') : '.';
            if (selectedPathRef.current === path) {
                clearSelection();
            }
            loadSubtreeRef.current?.(parent);
            setError(null);
        } catch (err) {
            setPreview(prev => ({ ...(prev || {}), error: err.message || 'Failed to delete file' }));
        }
    }, [clearSelection]);

    const scrollRowIntoView = useCallback((path) => {
        const container = treeListRef.current;
        if (!container || !path || typeof CSS === 'undefined' || typeof CSS.escape !== 'function') return;
        const el = container.querySelector(`[data-path="${CSS.escape(path)}"]`);
        el?.scrollIntoView?.({ block: 'nearest' });
    }, []);

    const handleTreeKeyDown = useCallback((e) => {
        const currentRows = rows;
        if (!currentRows || currentRows.length === 0) return;
        const currentIndex = selectedPath
            ? currentRows.findIndex((r) => r.node.path === selectedPath)
            : -1;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = Math.min(currentIndex + 1, currentRows.length - 1);
            const row = currentRows[next];
            if (!row) return;
            setSelectedPath(row.node.path);
            if (row.node.type !== 'dir') {
                onFileSelectRef.current?.(row.node.path, row.node);
                loadPreviewRef.current?.(row.node.path);
            } else { setPreview(null); setLoadingPreview(false); setDownloadId(null); }
            scrollRowIntoView(row.node.path);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const next = currentIndex <= 0 ? 0 : currentIndex - 1;
            const row = currentRows[next];
            if (!row) return;
            setSelectedPath(row.node.path);
            if (row.node.type !== 'dir') {
                onFileSelectRef.current?.(row.node.path, row.node);
                loadPreviewRef.current?.(row.node.path);
            } else { setPreview(null); setLoadingPreview(false); setDownloadId(null); }
            scrollRowIntoView(row.node.path);
            return;
        }

        if (e.key === 'ArrowRight' && currentIndex >= 0) {
            const row = currentRows[currentIndex];
            if (row?.node?.type === 'dir' && !expanded.has(row.node.path)) {
                e.preventDefault();
                loadSubtreeRef.current?.(row.node.path);
                setExpanded((prev) => new Set([...prev, row.node.path]));
            }
            return;
        }

        if (e.key === 'ArrowLeft' && currentIndex >= 0) {
            const row = currentRows[currentIndex];
            if (row?.node?.type === 'dir' && expanded.has(row.node.path)) {
                e.preventDefault();
                setExpanded((prev) => {
                    const next = new Set(prev);
                    next.delete(row.node.path);
                    return next;
                });
            }
            return;
        }

        if (e.key === 'Enter' && currentIndex >= 0) {
            e.preventDefault();
            const row = currentRows[currentIndex];
            if (!row) return;
            const path = row.node.path;
            if (row.node.type === 'dir') {
                const wasExpanded = expandedRef.current.has(path);
                if (!wasExpanded) loadSubtreeRef.current?.(path);
                setExpanded((prev) => {
                    const next = new Set(prev);
                    if (next.has(path)) next.delete(path);
                    else next.add(path);
                    return next;
                });
                setPreview(null);
                setDownloadId(null);
                setLoadingPreview(false);
            } else {
                onFileSelectRef.current?.(path, row.node);
                loadPreviewRef.current?.(path);
            }
            return;
        }

        if ((e.key === 'Delete' || e.key === 'Backspace') && currentIndex >= 0) {
            const row = currentRows[currentIndex];
            if (!row || row.node.type === 'dir') return;
            e.preventDefault();
            deleteFileAtPath(row.node.path);
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            clearSelection();
        }
    }, [clearSelection, deleteFileAtPath, expanded, rows, scrollRowIntoView, selectedPath]);

    const handleRowTouchStart = useCallback((event) => {
        const row = event?.target?.closest?.('.workspace-row');
        if (!row) return;
        const type = row.dataset.type;
        const path = row.dataset.path;
        if (type !== 'file' || !path) return;
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = setTimeout(() => {
            longPressTimerRef.current = null;
            deleteFileAtPath(path);
        }, 600);
    }, [deleteFileAtPath]);

    const handleRowTouchEnd = useCallback(() => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    }, []);

    const handleRowTouchMove = useCallback(() => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    }, []);

    // ── Preview-pane vertical resize — zero re-renders ────────────────────────
    const handlePreviewSplitterMouseDown = useRef((e) => {
        e.preventDefault();
        const sidebar = sidebarRef.current;
        if (!sidebar) return;
        const startY  = e.clientY;
        const startH  = previewHeightRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';

        let lastY = startY;
        const onMove = (me) => {
            lastY = me.clientY;
            // dragging up (negative delta) grows the preview; down shrinks it
            const maxH = sidebar.clientHeight - 80;
            const h = Math.min(Math.max(startH - (me.clientY - startY), 80), maxH);
            sidebar.style.setProperty('--preview-height', `${h}px`);
            previewHeightRef.current = h;
        };
        const onUp = () => {
            const maxH = sidebar.clientHeight - 80;
            const h = Math.min(Math.max(startH - (lastY - startY), 80), maxH);
            previewHeightRef.current = h;
            splitter.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            setLocalStorageItem('previewHeight', String(Math.round(h)));
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }).current;

    const handlePreviewSplitterTouchStart = useRef((e) => {
        e.preventDefault();
        const sidebar = sidebarRef.current;
        if (!sidebar) return;
        const touch = e.touches[0];
        if (!touch) return;
        const startY = touch.clientY;
        const startH = previewHeightRef.current || 280;
        const splitter = e.currentTarget;
        splitter.classList.add('dragging');
        document.body.style.userSelect = 'none';

        const onMove = (te) => {
            const t = te.touches[0];
            if (!t) return;
            te.preventDefault();
            const maxH = sidebar.clientHeight - 80;
            const h = Math.min(Math.max(startH - (t.clientY - startY), 80), maxH);
            sidebar.style.setProperty('--preview-height', `${h}px`);
            previewHeightRef.current = h;
        };
        const onUp = () => {
            splitter.classList.remove('dragging');
            document.body.style.userSelect = '';
            setLocalStorageItem('previewHeight', String(Math.round(previewHeightRef.current || startH)));
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onUp);
            document.removeEventListener('touchcancel', onUp);
        };
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
        document.addEventListener('touchcancel', onUp);
    }).current;

    const handleDownload = async () => {
        if (!selectedPath) return;
        try {
            const res = await attachWorkspaceFile(selectedPath);
            if (res.media_id) setDownloadId(res.media_id);
        } catch (err) {
            setPreview(prev => ({ ...(prev || {}), error: err.message || 'Failed to attach' }));
        }
    };

    const handleDeleteFile = async () => {
        if (!selectedPath || selectedIsDir) return;
        await deleteFileAtPath(selectedPath);
    };

    const isFileDrag = (event) => {
        const types = Array.from(event?.dataTransfer?.types || []);
        return types.includes('Files');
    };

    const resolveDropTargetFromEvent = useCallback((event) => {
        const row = event?.target?.closest?.('.workspace-row');
        if (!row) return null;
        const path = row.dataset.path;
        const type = row.dataset.type;
        if (!path) return null;
        if (type === 'dir') return path;
        if (path.includes('/')) {
            const parts = path.split('/');
            parts.pop();
            return parts.join('/') || '.';
        }
        return '.';
    }, []);

    const handleDragEnter = useCallback((event) => {
        if (!isFileDrag(event)) return;
        event.preventDefault();
        dragDepthRef.current += 1;
        if (!dragActiveRef.current) setDragActive(true);
        const target = resolveDropTargetFromEvent(event) || resolveDropTargetPath();
        setDropTarget(target);
    }, [resolveDropTargetPath, resolveDropTargetFromEvent]);

    const handleDragOver = useCallback((event) => {
        if (!isFileDrag(event)) return;
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
        if (!dragActiveRef.current) setDragActive(true);
        const target = resolveDropTargetFromEvent(event) || resolveDropTargetPath();
        if (dropTargetRef.current !== target) setDropTarget(target);
    }, [resolveDropTargetPath, resolveDropTargetFromEvent]);

    const handleDragLeave = useCallback((event) => {
        if (!isFileDrag(event)) return;
        event.preventDefault();
        dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
        if (dragDepthRef.current === 0) {
            setDragActive(false);
            setDropTarget(null);
        }
    }, []);

    const uploadFilesToTarget = useCallback(async (files, targetPath = '.') => {
        const list = Array.from(files || []);
        if (list.length === 0) return;
        const target = targetPath && targetPath !== '' ? targetPath : '.';
        const targetLabel = target !== '.' ? target : 'workspace root';
        setUploading(true);
        try {
            let lastResult = null;
            for (const file of list) {
                try {
                    lastResult = await uploadWorkspaceFile(file, target);
                } catch (err) {
                    const status = err?.status;
                    const code = err?.code;
                    if (status === 409 || code === 'file_exists') {
                        const name = file?.name || 'file';
                        const confirmOverwrite = window.confirm(`"${name}" already exists in ${targetLabel}. Overwrite?`);
                        if (!confirmOverwrite) continue;
                        lastResult = await uploadWorkspaceFile(file, target, { overwrite: true });
                    } else {
                        throw err;
                    }
                }
            }
            if (lastResult?.path) {
                setSelectedPath(lastResult.path);
                loadPreviewRef.current?.(lastResult.path);
            }
            loadSubtreeRef.current?.(target);
        } catch (err) {
            setError(err.message || 'Failed to upload file');
        } finally {
            setUploading(false);
        }
    }, []);

    const handleDrop = useCallback(async (event) => {
        if (!isFileDrag(event)) return;
        event.preventDefault();
        dragDepthRef.current = 0;
        setDragActive(false);
        setDropTarget(null);
        const files = Array.from(event?.dataTransfer?.files || []);
        if (files.length === 0) return;
        const target = dropTargetRef.current || resolveDropTargetFromEvent(event) || resolveDropTargetPath();
        await uploadFilesToTarget(files, target);
    }, [resolveDropTargetPath, resolveDropTargetFromEvent, uploadFilesToTarget]);

    const handleFolderUploadClick = useCallback((event) => {
        event?.stopPropagation?.();
        if (uploading) return;
        const target = event?.currentTarget?.dataset?.uploadTarget || '.';
        uploadTargetRef.current = target;
        uploadInputRef.current?.click();
    }, [uploading]);

    const handleUploadButtonClick = useCallback(() => {
        if (uploading) return;
        const selected = selectedPathRef.current;
        const selectedNode = selected ? nodeMapRef.current?.get(selected) : null;
        uploadTargetRef.current = selectedNode?.type === 'dir' ? selectedNode.path : '.';
        uploadInputRef.current?.click();
    }, [uploading]);

    const handleUploadInputChange = useCallback(async (event) => {
        const files = Array.from(event?.target?.files || []);
        if (files.length === 0) return;
        const target = uploadTargetRef.current || '.';
        await uploadFilesToTarget(files, target);
        uploadTargetRef.current = '.';
        if (event?.target) event.target.value = '';
    }, [uploadFilesToTarget]);

    // ── Render ────────────────────────────────────────────────────────────────
    return html`
        <aside
            class=${`workspace-sidebar${dragActive ? ' workspace-drop-active' : ''}`}
            ref=${sidebarRef}
            onDragEnter=${handleDragEnter}
            onDragOver=${handleDragOver}
            onDragLeave=${handleDragLeave}
            onDrop=${handleDrop}
        >
            <input type="file" multiple style="display:none" ref=${uploadInputRef} onChange=${handleUploadInputChange} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-refresh" onClick=${handleRefreshClick} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${showHidden ? ' active' : ''}`}
                        onClick=${handleToggleHidden}
                        title=${showHidden ? 'Hide hidden files' : 'Show hidden files'}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!showHidden && html`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${handleBackgroundClick}>
                ${dragActive && html`<div class="workspace-drop-hint">Drop to upload to ${dropTarget || '.'}</div>`}
                ${uploading && html`<div class="workspace-drop-hint">Uploading…</div>`}
                ${initialLoad && html`<div class="workspace-loading">Loading…</div>`}
                ${error && html`<div class="workspace-error">${error}</div>`}
                ${tree && html`
                    <div
                        class="workspace-tree-list"
                        ref=${treeListRef}
                        tabIndex="0"
                        onClick=${handleTreeClick}
                        onKeyDown=${handleTreeKeyDown}
                        onTouchStart=${handleRowTouchStart}
                        onTouchEnd=${handleRowTouchEnd}
                        onTouchMove=${handleRowTouchMove}
                        onTouchCancel=${handleRowTouchEnd}
                    >
                        ${rows.map(({ node, depth }) => {
                            const isDir     = node.type === 'dir';
                            const isSelected= node.path === selectedPath;
                            const isOpen    = isDir && expanded.has(node.path);
                            const isDropTarget = dropTarget && node.path === dropTarget;
                            const childCount = Array.isArray(node.children) && node.children.length > 0
                                ? node.children.length
                                : (Number(node.child_count) || 0);
                            return html`
                                <div
                                    key=${node.path}
                                    class=${`workspace-row${isSelected ? ' selected' : ''}${isDropTarget ? ' drop-target' : ''}`}
                                    style=${{ paddingLeft: `${8 + depth * INDENT}px` }}
                                    data-path=${node.path}
                                    data-type=${node.type}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${isDir
                                            ? (isOpen
                                                ? html`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`
                                                : html`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`)
                                            : null}
                                    </span>
                                    <svg class=${`workspace-node-icon${isDir ? ' folder' : ''}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${isDir
                                            ? html`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`
                                            : html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    <span class="workspace-label">${node.name}</span>
                                    ${isDir && !isOpen && childCount > 0 && html`
                                        <span class="workspace-count">${childCount}</span>
                                    `}
                                    ${isDir && html`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${node.path}
                                            title="Upload files to this folder"
                                            onClick=${handleFolderUploadClick}
                                            disabled=${uploading}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 8 12 3 17 8"/>
                                                <line x1="12" y1="3" x2="12" y2="15"/>
                                            </svg>
                                        </button>
                                    `}
                                </div>
                            `;
                        })}
                    </div>
                `}
            </div>
            ${selectedPath && html`
                <div class="workspace-preview-splitter-h" onMouseDown=${handlePreviewSplitterMouseDown} onTouchStart=${handlePreviewSplitterTouchStart}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${selectedPath}</span>
                        <div class="workspace-preview-actions">
                            ${!selectedIsDir && html`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${() => canEdit && onOpenEditorRef.current?.(selectedPath, preview)}
                                    title=${editTitle}
                                    disabled=${!canEdit}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${handleDeleteFile}
                                    title="Delete file"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            `}
                            ${selectedIsDir
                                ? html`
                                    <button class="workspace-download" onClick=${handleUploadButtonClick}
                                        title="Upload files to this folder" disabled=${uploading}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${getWorkspaceDownloadUrl(selectedPath, showHidden)}
                                        title="Download folder as zip" onClick=${(e) => e.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`
                                : html`<button class="workspace-download" onClick=${handleDownload} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${loadingPreview && html`<div class="workspace-loading">Loading preview…</div>`}
                    ${preview?.error && html`<div class="workspace-error">${preview.error}</div>`}
                    ${selectedIsDir && html`
                        <div class="workspace-preview-text">Folder selected — upload files or download as zip.</div>
                    `}
                    ${preview && !preview.error && !selectedIsDir && html`
                        <div class="workspace-preview-meta">
                            ${preview.size  ? html`<span>${formatFileSize(preview.size)}</span>` : ''}
                            ${preview.mtime ? html`<span>${formatTimestamp(preview.mtime)}</span>` : ''}
                            ${preview.truncated ? html`<span>truncated</span>` : ''}
                        </div>
                        ${preview.kind === 'image' && html`
                            <div class="workspace-preview-image">
                                <img src=${preview.url || getWorkspaceRawUrl(preview.path)} alt="preview" />
                            </div>
                        `}
                        ${preview.kind === 'text' && html`
                            ${preview.content_type === 'text/markdown'
                                ? html`<div class="workspace-preview-text"
                                    dangerouslySetInnerHTML=${{ __html: renderMarkdown(preview.text || '', null, {
                                        rewriteImageSrc: (src) => rewriteMarkdownImagePath(src, preview.path || selectedPath),
                                    }) }} />`
                                : html`<pre class="workspace-preview-text"><code>${preview.text || ''}</code></pre>`}
                        `}
                        ${preview.kind === 'binary' && html`
                            <div class="workspace-preview-text">Binary file — download to view.</div>
                        `}
                    `}
                    ${downloadId && html`
                        <div class="workspace-download-card">
                            <${FileAttachmentCard} mediaId=${downloadId} />
                        </div>
                    `}
                </div>
            `}
        </aside>
    `;
}
