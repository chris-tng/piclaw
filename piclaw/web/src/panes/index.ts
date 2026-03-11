// @ts-nocheck
/**
 * panes/index.ts — Pane system barrel export.
 *
 * Re-exports types, registry, and built-in pane extensions.
 */

export type { PanePlacement, PaneCapability, PaneContext, PaneInstance, WebPaneExtension } from './pane-types.js';
export { paneRegistry } from './pane-registry.js';
export { editorPaneExtension } from './editor-extension.js';
export { terminalPaneExtension } from './terminal-pane.js';
export type { TabState, TabViewState } from './tab-store.js';
export { tabStore } from './tab-store.js';
export type { EditorPaneInstance } from './editor-extension.js';
