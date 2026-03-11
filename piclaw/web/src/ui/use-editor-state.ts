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

import { useState, useCallback, useMemo, useEffect } from '../vendor/preact-htm.js';
import { paneRegistry, tabStore } from '../panes/index.js';

/**
 * Custom hook that manages editor tab orchestration.
 *
 * @returns Tab state, handlers, and active tab info.
 */
export function useEditorState() {
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
        }
    }, []);

    /** Close a specific tab (from tab strip). */
    const handleTabClose = useCallback((id) => {
        const tab = tabStore.get(id);
        if (tab?.dirty) {
            const confirmed = window.confirm(`"${tab.label}" has unsaved changes. Close anyway?`);
            if (!confirmed) return;
        }
        tabStore.close(id);
    }, []);

    /** Activate a tab by id. */
    const handleTabActivate = useCallback((id) => {
        tabStore.activate(id);
    }, []);

    /** Close all other tabs. */
    const handleTabCloseOthers = useCallback((id) => {
        tabStore.closeOthers(id);
    }, []);

    /** Close all tabs. */
    const handleTabCloseAll = useCallback(() => {
        tabStore.closeAll();
    }, []);

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
        // Handlers
        openEditor,
        closeEditor,
        handleTabClose,
        handleTabActivate,
        handleTabCloseOthers,
        handleTabCloseAll,
        handleTabTogglePin,
        revealInExplorer,
    };
}
