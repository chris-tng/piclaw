// @ts-nocheck
/**
 * use-editor-state.ts — Tab orchestration hook for the editor pane.
 *
 * Manages tab strip state (open/close/activate/pin/dirty), SSE
 * workspace-update file reload, rename sync, and beforeunload.
 *
 * File I/O and dirty tracking live in the StandaloneEditorInstance
 * (panes/editor-extension.ts). This hook coordinates tabs only.
 */

import { useState, useCallback, useRef, useEffect } from '../vendor/preact-htm.js';
import { paneRegistry, tabStore } from '../panes/index.js';

/**
 * Custom hook that manages editor tab orchestration.
 *
 * @returns Tab state, handlers, and active tab info.
 */
export function useEditorState({ onTabClosed } = {}) {
    // Store callback in ref so close handlers never re-create when the caller changes identity
    const onTabClosedRef = useRef(onTabClosed);
    onTabClosedRef.current = onTabClosed;

    // ── Tab strip state (driven by tabStore) ────────────────────
    const [tabStripTabs, setTabStripTabs] = useState(() => tabStore.getTabs());
    const [tabStripActiveId, setTabStripActiveId] = useState(() => tabStore.getActiveId());
    const [editorOpen, setEditorOpen] = useState(() => tabStore.getTabs().length > 0);

    useEffect(() => {
        return tabStore.onChange((tabs, activeId) => {
            setTabStripTabs(tabs);
            setTabStripActiveId(activeId);
            setEditorOpen(tabs.length > 0);
        });
    }, []);

    // ── Markdown preview state ────────────────────────────────
    const [previewTabs, setPreviewTabs] = useState(() => new Set());

    const handleTabTogglePreview = useCallback((id) => {
        setPreviewTabs((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    // Clean up preview state when tabs close — declared before tab
    // action callbacks so it can appear in their dependency arrays
    // without a temporal dead zone violation.
    const cleanupPreviewTab = useCallback((id) => {
        setPreviewTabs((prev) => {
            if (!prev.has(id)) return prev;
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, []);

    // ── Tab actions ─────────────────────────────────────────────

    /** Open a file in the editor. Creates a tab and sets it active. */
    const openEditor = useCallback((path) => {
        if (!path) return;
        // Verify there's a pane handler for this file type
        const context = { path, mode: 'edit' };
        try {
            const pane = paneRegistry.resolve(context);
            if (!pane) {
                const fallback = paneRegistry.get('editor');
                if (!fallback) {
                    console.warn(`[openEditor] No pane handler for: ${path}`);
                    return;
                }
            }
        } catch (err) {
            console.warn(`[openEditor] paneRegistry.resolve() error for "${path}":`, err);
        }
        tabStore.open(path);
    }, []);

    /** Close the active tab (with dirty confirmation). */
    const closeEditor = useCallback(() => {
        const activeId = tabStore.getActiveId();
        if (activeId) {
            const tab = tabStore.get(activeId);
            if (tab?.dirty) {
                const confirmed = window.confirm(`"${tab.label}" has unsaved changes. Close anyway?`);
                if (!confirmed) return;
            }
            tabStore.close(activeId);
            cleanupPreviewTab(activeId);
            onTabClosedRef.current?.(activeId);
        }
    }, [cleanupPreviewTab]);

    /** Close a specific tab (from tab strip). */
    const handleTabClose = useCallback((id) => {
        const tab = tabStore.get(id);
        if (tab?.dirty) {
            const confirmed = window.confirm(`"${tab.label}" has unsaved changes. Close anyway?`);
            if (!confirmed) return;
        }
        tabStore.close(id);
        cleanupPreviewTab(id);
        onTabClosedRef.current?.(id);
    }, [cleanupPreviewTab]);

    /** Activate a tab by id. */
    const handleTabActivate = useCallback((id) => {
        tabStore.activate(id);
    }, []);

    /** Close all other tabs. */
    const handleTabCloseOthers = useCallback((id) => {
        const others = tabStore.getTabs().filter(t => t.id !== id && !t.pinned);
        const dirtyCount = others.filter(t => t.dirty).length;
        if (dirtyCount > 0) {
            const confirmed = window.confirm(`${dirtyCount} unsaved tab${dirtyCount > 1 ? 's' : ''} will be closed. Continue?`);
            if (!confirmed) return;
        }
        const closedIds = others.map(t => t.id);
        tabStore.closeOthers(id);
        closedIds.forEach(cid => { cleanupPreviewTab(cid); onTabClosedRef.current?.(cid); });
    }, [cleanupPreviewTab]);

    /** Close all tabs. */
    const handleTabCloseAll = useCallback(() => {
        const tabs = tabStore.getTabs().filter(t => !t.pinned);
        const dirtyCount = tabs.filter(t => t.dirty).length;
        if (dirtyCount > 0) {
            const confirmed = window.confirm(`${dirtyCount} unsaved tab${dirtyCount > 1 ? 's' : ''} will be closed. Continue?`);
            if (!confirmed) return;
        }
        const closedIds = tabs.map(t => t.id);
        tabStore.closeAll();
        closedIds.forEach(cid => { cleanupPreviewTab(cid); onTabClosedRef.current?.(cid); });
    }, [cleanupPreviewTab]);

    /** Toggle pin on a tab. */
    const handleTabTogglePin = useCallback((id) => {
        tabStore.togglePin(id);
    }, []);

    /** Reveal active tab in workspace explorer. */
    const revealInExplorer = useCallback(() => {
        const activeId = tabStore.getActiveId();
        if (activeId) {
            window.dispatchEvent(new CustomEvent('workspace-reveal-path', { detail: { path: activeId } }));
        }
    }, []);

    // ── SSE rename sync ─────────────────────────────────────────
    useEffect(() => {
        const handleFileRenamed = (e) => {
            const { oldPath, newPath, type } = e.detail || {};
            if (!oldPath || !newPath) return;
            if (type === 'dir') {
                for (const tab of tabStore.getTabs()) {
                    if (tab.path === oldPath || tab.path.startsWith(`${oldPath}/`)) {
                        const updatedPath = `${newPath}${tab.path.slice(oldPath.length)}`;
                        tabStore.rename(tab.id, updatedPath);
                    }
                }
            } else {
                tabStore.rename(oldPath, newPath);
            }
        };
        window.addEventListener('workspace-file-renamed', handleFileRenamed);
        return () => window.removeEventListener('workspace-file-renamed', handleFileRenamed);
    }, []);

    // ── Warn on close with unsaved changes ──────────────────────
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (tabStore.hasUnsaved()) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return {
        // State
        editorOpen,
        tabStripTabs,
        tabStripActiveId,
        previewTabs,
        // Handlers
        openEditor,
        closeEditor,
        handleTabClose,
        handleTabActivate,
        handleTabCloseOthers,
        handleTabCloseAll,
        handleTabTogglePin,
        handleTabTogglePreview,
        revealInExplorer,
    };
}
