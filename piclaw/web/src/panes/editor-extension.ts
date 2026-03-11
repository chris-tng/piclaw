// @ts-nocheck
/**
 * editor-extension.ts — Standalone editor pane extension.
 *
 * Creates and manages a CodeMirror 6 editor directly — no Preact wrapper.
 * Owns its own DOM lifecycle (mount/dispose), dirty tracking, file I/O,
 * vim/whitespace toggles, theming, and status bar.
 *
 * Communicates with the host exclusively via the PaneInstance contract:
 *   Host → Extension: setContent(), focus(), resize()
 *   Extension → Host: onDirtyChange(), onSaveRequest(), onClose()
 */

import {
    EditorState,
    EditorView,
    Compartment,
    minimalSetup,
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightWhitespace,
    scrollPastEnd,
    showPanel,
    javascript,
    python,
    markdown,
    go,
    json,
    css,
    html as htmlLang,
    yaml,
    sql,
    xml,
    StreamLanguage,
    HighlightStyle,
    syntaxHighlighting,
    indentOnInput,
    indentUnit,
    tags,
    classHighlighter,
    shell,
    keymap,
    indentWithTab,
    search,
    searchKeymap,
    highlightSelectionMatches,
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap,
    vim,
    indentationMarkers,
    githubLight,
    githubDark,
} from '../vendor/codemirror.js';
import { getWorkspaceFile, updateWorkspaceFile } from '../api.js';
import type { WebPaneExtension, PaneContext, PaneInstance, PaneCapability } from './pane-types.js';

// ── Constants ───────────────────────────────────────────────────

const MONO_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const EDITOR_MAX_BYTES = 256 * 1024;

const shellLanguage = StreamLanguage.define(shell);

const headingStyle = HighlightStyle.define([
    { tag: tags.heading1, fontWeight: 'bold', fontSize: '1.3em', textDecoration: 'none' },
    { tag: tags.heading2, fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'none' },
    { tag: tags.heading3, fontWeight: 'bold', fontSize: '1.1em', textDecoration: 'none' },
    { tag: tags.heading4, fontWeight: 'bold', textDecoration: 'none' },
    { tag: tags.heading5, fontWeight: 'bold', textDecoration: 'none' },
    { tag: tags.heading6, fontWeight: 'bold', textDecoration: 'none' },
]);

// ── Helpers ─────────────────────────────────────────────────────

function getThemeMode(): 'dark' | 'light' {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getLocalBool(key: string, fallback: boolean): boolean {
    try {
        const v = localStorage.getItem(key);
        if (v === 'true') return true;
        if (v === 'false') return false;
    } catch {}
    return fallback;
}

function setLocalBool(key: string, value: boolean): void {
    try { localStorage.setItem(key, value ? 'true' : 'false'); } catch {}
}

/** Map file extension → CodeMirror language extension. */
function languageForPath(path: string) {
    const lower = String(path || '').toLowerCase();
    if (lower.endsWith('.py')) return python();
    if (lower.endsWith('.ts') || lower.endsWith('.tsx')) return javascript({ typescript: true, jsx: lower.endsWith('.tsx') });
    if (lower.endsWith('.js') || lower.endsWith('.jsx')) return javascript({ jsx: lower.endsWith('.jsx') });
    if (lower.endsWith('.md') || lower.endsWith('.markdown')) return markdown();
    if (lower.endsWith('.go')) return go();
    if (lower.endsWith('.json') || lower.endsWith('.jsonl')) return json();
    if (lower.endsWith('.css') || lower.endsWith('.scss')) return css();
    if (lower.endsWith('.html') || lower.endsWith('.htm')) return htmlLang();
    if (lower.endsWith('.yaml') || lower.endsWith('.yml')) return yaml();
    if (lower.endsWith('.sql') || lower.endsWith('.sqlite')) return sql();
    if (lower.endsWith('.xml') || lower.endsWith('.svg') || lower.endsWith('.plist')) return xml();
    if (lower.endsWith('.sh') || lower.endsWith('.bash') || lower.endsWith('.zsh')) return shellLanguage;
    return null;
}

// ── Status bar panel ────────────────────────────────────────────

function createStatusPanel(vimEnabledRef: { current: boolean }) {
    return (view: EditorView) => {
        const dom = document.createElement('div');
        dom.className = 'cm-statusbar';

        const left = document.createElement('div');
        left.className = 'cm-statusbar-left';

        const right = document.createElement('div');
        right.className = 'cm-statusbar-right';

        dom.append(left, right);

        const update = () => {
            const state = view.state;
            const pos = state.selection.main.head;
            const line = state.doc.lineAt(pos);
            const col = pos - line.from + 1;
            const unit = state.facet(indentUnit) || '  ';
            const indentLabel = unit === '\t' ? 'Tabs' : `Spaces:${unit.length}`;
            left.textContent = `Ln ${line.number}, Col ${col}`;
            const vimLabel = vimEnabledRef.current ? 'Vim' : 'Insert';
            right.textContent = `${indentLabel} • ${vimLabel}`;
        };

        update();

        return {
            dom,
            update: (updateEvent: any) => {
                if (updateEvent.docChanged || updateEvent.selectionSet || updateEvent.viewportChanged) {
                    update();
                }
            },
            destroy: () => {},
        };
    };
}

// ── EditorPaneInstance ──────────────────────────────────────────

/**
 * Self-contained editor pane instance. Creates CodeMirror directly,
 * manages file I/O, dirty tracking, and theming internally.
 */
class StandaloneEditorInstance implements PaneInstance {
    // DOM
    private container: HTMLElement;
    private paneEl: HTMLElement;
    private headerEl: HTMLElement;
    private bodyEl: HTMLElement;
    private cmHost: HTMLElement;
    private statusEl: HTMLElement;

    // CodeMirror
    private view: EditorView | null = null;
    private vimCompartment = new Compartment();
    private themeCompartment = new Compartment();
    private whitespaceCompartment = new Compartment();

    // State
    private path: string;
    private initialContent = '';
    private currentMtime: string | null = null;
    private dirty = false;
    private saving = false;
    private disposed = false;
    private vimEnabled: boolean;
    private showWhitespace: boolean;
    private vimEnabledRef: { current: boolean };

    // Callbacks (PaneInstance contract)
    private dirtyChangeCb: ((dirty: boolean) => void) | null = null;
    private saveRequestCb: ((content: string) => void) | null = null;
    private closeCb: (() => void) | null = null;
    private viewStateChangeCb: ((state: { cursorLine: number; cursorCol: number; scrollTop: number }) => void) | null = null;

    constructor(container: HTMLElement, context: PaneContext) {
        this.container = container;
        this.path = context.path || '';

        this.vimEnabled = getLocalBool('piclaw_vim_mode', false);
        this.showWhitespace = getLocalBool('piclaw_show_whitespace', true);
        this.vimEnabledRef = { current: this.vimEnabled };

        // Build DOM
        this.paneEl = document.createElement('div');
        this.paneEl.className = 'editor-pane';

        this.headerEl = this.buildHeader();
        this.bodyEl = document.createElement('div');
        this.bodyEl.className = 'editor-body';

        this.cmHost = document.createElement('div');
        this.cmHost.className = 'editor-codemirror';
        this.bodyEl.appendChild(this.cmHost);

        this.statusEl = this.buildStatusBar();

        this.paneEl.appendChild(this.headerEl);
        this.paneEl.appendChild(this.bodyEl);
        this.paneEl.appendChild(this.statusEl);
        container.appendChild(this.paneEl);

        // If content was provided in context, mount immediately
        if (context.content !== undefined) {
            this.mountEditor(context.content, context.mtime);
        } else {
            // Load from API
            this.loadFile();
        }

        // Theme listener
        this.handleThemeChange = this.handleThemeChange.bind(this);
        window.addEventListener('piclaw-theme-change', this.handleThemeChange);

        // Global keyboard shortcuts
        this.handleGlobalKeydown = this.handleGlobalKeydown.bind(this);
        document.addEventListener('keydown', this.handleGlobalKeydown);
    }

    // ── DOM builders ────────────────────────────────────────────

    private buildHeader(): HTMLElement {
        const header = document.createElement('div');
        header.className = 'editor-header';

        const title = document.createElement('div');
        title.className = 'editor-title';
        title.title = this.path;
        title.textContent = this.path || 'Untitled file';

        const actions = document.createElement('div');
        actions.className = 'editor-actions';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'editor-button';
        closeBtn.textContent = 'Close';
        closeBtn.title = 'Close editor';
        closeBtn.addEventListener('click', () => this.closeCb?.());

        const saveBtn = document.createElement('button');
        saveBtn.className = 'editor-button primary';
        saveBtn.textContent = 'Save';
        saveBtn.title = 'Save changes';
        saveBtn.addEventListener('click', () => this.handleSave());
        this._saveBtn = saveBtn;

        actions.appendChild(closeBtn);
        actions.appendChild(saveBtn);
        header.appendChild(title);
        header.appendChild(actions);
        return header;
    }
    private _saveBtn: HTMLButtonElement | null = null;

    private buildStatusBar(): HTMLElement {
        const row = document.createElement('div');
        row.className = 'editor-status editor-status-row';

        const text = document.createElement('span');
        text.className = 'editor-status-text';
        text.textContent = 'Ready';
        this._statusText = text;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'editor-status-actions';

        const wsBtn = document.createElement('button');
        wsBtn.className = `editor-status-button${this.showWhitespace ? ' active' : ''}`;
        wsBtn.title = 'Toggle whitespace (Alt+W)';
        wsBtn.textContent = 'Whitespace';
        wsBtn.addEventListener('click', () => this.toggleWhitespace());
        this._wsBtn = wsBtn;

        const vimBtn = document.createElement('button');
        vimBtn.className = `editor-status-button${this.vimEnabled ? ' active' : ''}`;
        vimBtn.title = 'Toggle Vim mode (Alt+V)';
        vimBtn.textContent = 'Vim';
        vimBtn.addEventListener('click', () => this.toggleVim());
        this._vimBtn = vimBtn;

        actionsDiv.appendChild(wsBtn);
        actionsDiv.appendChild(vimBtn);
        row.appendChild(text);
        row.appendChild(actionsDiv);
        return row;
    }
    private _statusText: HTMLElement | null = null;
    private _wsBtn: HTMLButtonElement | null = null;
    private _vimBtn: HTMLButtonElement | null = null;

    // ── File I/O ────────────────────────────────────────────────

    /** Load file content from the workspace API. */
    private async loadFile(): Promise<void> {
        this.setLoadingUI(true);
        try {
            const data = await getWorkspaceFile(this.path, EDITOR_MAX_BYTES, 'edit');
            if (this.disposed) return;

            if (data?.error) {
                this.setErrorUI(data.error);
                return;
            }
            if (data?.kind && data.kind !== 'text') {
                this.setErrorUI('File is not editable');
                return;
            }

            this.mountEditor(data?.text || '', data?.mtime || null);
        } catch (err: any) {
            if (!this.disposed) {
                this.setErrorUI(err.message || 'Failed to load file');
            }
        }
    }

    /** Save current content to disk via workspace API. */
    private async handleSave(): Promise<void> {
        if (this.saving || !this.view || !this.dirty) return;

        const value = this.view.state.doc.toString();
        this.saving = true;
        this.updateSaveButton();
        this.updateStatusText('Saving…');

        // Notify host about save attempt (content for the tab store)
        this.saveRequestCb?.(value);

        try {
            const result = await updateWorkspaceFile(this.path, value);
            if (this.disposed) return;

            this.initialContent = value;
            this.currentMtime = result?.mtime || this.currentMtime;
            this.setDirty(false);
            this.saving = false;
            this.updateSaveButton();
            this.updateStatusText('All changes saved');
        } catch (err: any) {
            if (this.disposed) return;
            this.saving = false;
            this.updateSaveButton();
            this.updateStatusText(`Save failed: ${err.message || 'Unknown error'}`);
        }
    }

    // ── CodeMirror lifecycle ────────────────────────────────────

    /** Create the CodeMirror editor with content. */
    private mountEditor(content: string, mtime?: string | null): void {
        if (this.view) {
            this.view.destroy();
            this.view = null;
        }

        this.initialContent = content;
        this.currentMtime = mtime || null;
        this.setLoadingUI(false);

        const isDark = getThemeMode() === 'dark';
        const lang = languageForPath(this.path);

        const extensions: any[] = [
            minimalSetup,
            lineNumbers(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            this.whitespaceCompartment.of(this.showWhitespace ? highlightWhitespace() : []),
            EditorView.lineWrapping,
            scrollPastEnd(),
            indentOnInput(),
            closeBrackets(),
            autocompletion(),
            highlightSelectionMatches(),
            indentationMarkers(),
            syntaxHighlighting(headingStyle),
            syntaxHighlighting(classHighlighter),
            search(),
            this.vimCompartment.of(this.vimEnabled ? vim() : []),
            this.themeCompartment.of(isDark ? githubDark : githubLight),
            showPanel.of(createStatusPanel(this.vimEnabledRef)),
            keymap.of([
                ...searchKeymap,
                ...completionKeymap,
                ...closeBracketsKeymap,
                indentWithTab,
                { key: 'Mod-s', run: () => { this.handleSave(); return true; } },
            ]),
            EditorView.updateListener.of((update: any) => {
                if (update.docChanged) this.checkDirty();
                if ((update.selectionSet || update.docChanged) && this.viewStateChangeCb) {
                    const pos = update.state.selection.main.head;
                    const line = update.state.doc.lineAt(pos);
                    const col = pos - line.from + 1;
                    const scrollTop = update.view.scrollDOM?.scrollTop || 0;
                    this.viewStateChangeCb({ cursorLine: line.number, cursorCol: col, scrollTop });
                }
            }),
            EditorView.theme({
                '&': { height: '100%', fontFamily: MONO_STACK },
                '.cm-scroller': { fontFamily: MONO_STACK },
                '.cm-content': { fontFamily: MONO_STACK, fontSize: '12px' },
                '.cm-gutters': { fontFamily: MONO_STACK },
            }),
        ];

        if (lang) extensions.push(lang);

        const state = EditorState.create({ doc: content, extensions });
        this.view = new EditorView({ state, parent: this.cmHost });
        this.setDirty(false);

        // Update gutter width CSS var
        this.updateGutterWidth();
    }

    /** Compare content to baseline and update dirty state. */
    private checkDirty(): void {
        if (!this.view) return;
        const current = this.view.state.doc.toString();
        this.setDirty(current !== this.initialContent);
    }

    private setDirty(dirty: boolean): void {
        if (this.dirty === dirty) return;
        this.dirty = dirty;
        this.dirtyChangeCb?.(dirty);
        this.updateSaveButton();
        this.updateStatusText(dirty ? 'Unsaved changes' : 'All changes saved');
    }

    // ── Toggle features ─────────────────────────────────────────

    private toggleVim(): void {
        this.vimEnabled = !this.vimEnabled;
        this.vimEnabledRef.current = this.vimEnabled;
        setLocalBool('piclaw_vim_mode', this.vimEnabled);
        if (this._vimBtn) this._vimBtn.className = `editor-status-button${this.vimEnabled ? ' active' : ''}`;
        this.view?.dispatch({
            effects: this.vimCompartment.reconfigure(this.vimEnabled ? vim() : []),
        });
    }

    private toggleWhitespace(): void {
        this.showWhitespace = !this.showWhitespace;
        setLocalBool('piclaw_show_whitespace', this.showWhitespace);
        if (this._wsBtn) this._wsBtn.className = `editor-status-button${this.showWhitespace ? ' active' : ''}`;
        this.view?.dispatch({
            effects: this.whitespaceCompartment.reconfigure(this.showWhitespace ? highlightWhitespace() : []),
        });
    }

    // ── Theme ───────────────────────────────────────────────────

    private handleThemeChange(): void {
        if (!this.view || this.disposed) return;
        const isDark = getThemeMode() === 'dark';
        this.view.dispatch({
            effects: this.themeCompartment.reconfigure(isDark ? githubDark : githubLight),
        });
    }

    // ── Keyboard shortcuts ──────────────────────────────────────

    private handleGlobalKeydown(e: KeyboardEvent): void {
        // Mod+S → save
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            this.handleSave();
            return;
        }

        const isAltOnly = e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey;
        if (isAltOnly && (e.key === 'w' || e.key === 'W')) {
            e.preventDefault();
            e.stopPropagation();
            this.toggleWhitespace();
            return;
        }
        if (isAltOnly && (e.key === 'v' || e.key === 'V')) {
            e.preventDefault();
            e.stopPropagation();
            this.toggleVim();
            return;
        }
        if (isAltOnly && (e.key === 'q' || e.key === 'Q')) {
            e.preventDefault();
            e.stopPropagation();
            this.closeCb?.();
            return;
        }
        if (e.key === 'Escape' && !e.defaultPrevented && !this.dirty) {
            this.closeCb?.();
        }
    }

    // ── UI updates ──────────────────────────────────────────────

    private setLoadingUI(loading: boolean): void {
        if (loading) {
            this.bodyEl.classList.add('disabled');
            this.updateStatusText('Loading…');
        } else {
            this.bodyEl.classList.remove('disabled');
        }
    }

    private setErrorUI(message: string): void {
        this.bodyEl.classList.add('disabled');
        // Insert error element before body
        let errEl = this.paneEl.querySelector('.editor-error');
        if (!errEl) {
            errEl = document.createElement('div');
            errEl.className = 'editor-error';
            this.paneEl.insertBefore(errEl, this.bodyEl);
        }
        errEl.textContent = message;
    }

    private updateSaveButton(): void {
        if (!this._saveBtn) return;
        this._saveBtn.disabled = !this.dirty || this.saving;
        this._saveBtn.textContent = this.saving ? 'Saving…' : 'Save';
        this._saveBtn.title = this.dirty ? 'Save changes' : 'No changes to save';
    }

    private updateStatusText(text: string): void {
        if (this._statusText) this._statusText.textContent = text;
    }

    private updateGutterWidth(): void {
        if (!this.view) return;
        const gutters = this.view.dom.querySelector('.cm-gutters');
        if (!gutters) return;
        const width = Math.max(32, Math.round(gutters.getBoundingClientRect().width));
        this.paneEl.style.setProperty('--cm-gutter-width', `${width}px`);
    }

    // ── PaneInstance contract ────────────────────────────────────

    getContent(): string | undefined {
        return this.view?.state.doc.toString();
    }

    isDirty(): boolean {
        return this.dirty;
    }

    setContent(content: string, mtime: string): void {
        if (this.view) {
            // Update content in existing editor
            const current = this.view.state.doc.toString();
            if (current !== content) {
                this.view.dispatch({
                    changes: { from: 0, to: this.view.state.doc.length, insert: content },
                });
            }
        } else {
            // No editor yet — mount fresh
            this.mountEditor(content, mtime);
            return;
        }
        this.initialContent = content;
        this.currentMtime = mtime;
        this.setDirty(false);
    }

    focus(): void {
        const cm = this.view?.contentDOM;
        if (cm) cm.focus();
    }

    resize(): void {
        // CodeMirror handles resize internally
        this.updateGutterWidth();
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        window.removeEventListener('piclaw-theme-change', this.handleThemeChange);
        document.removeEventListener('keydown', this.handleGlobalKeydown);
        if (this.view) {
            this.view.destroy();
            this.view = null;
        }
        this.container.innerHTML = '';
        this.dirtyChangeCb = null;
        this.saveRequestCb = null;
        this.closeCb = null;
        this.viewStateChangeCb = null;
    }

    onDirtyChange(cb: (dirty: boolean) => void): void {
        this.dirtyChangeCb = cb;
    }

    onSaveRequest(cb: (content: string) => void): void {
        this.saveRequestCb = cb;
    }

    onClose(cb: () => void): void {
        this.closeCb = cb;
    }

    // ── Extended PaneInstance methods ────────────────────────────

    /** Register callback for view state changes (cursor, scroll). */
    onViewStateChange(cb: (state: { cursorLine: number; cursorCol: number; scrollTop: number }) => void): void {
        this.viewStateChangeCb = cb;
    }

    /** Restore view state (cursor position + scroll). */
    restoreViewState(viewState: { cursorLine?: number; cursorCol?: number; scrollTop?: number } | null): void {
        if (!viewState || !this.view) return;
        try {
            const { cursorLine, cursorCol, scrollTop } = viewState;
            if (cursorLine && cursorLine > 0 && cursorLine <= this.view.state.doc.lines) {
                const line = this.view.state.doc.line(cursorLine);
                const col = Math.min(cursorCol || 1, line.length + 1);
                const pos = line.from + col - 1;
                this.view.dispatch({ selection: { anchor: pos } });
            }
            if (typeof scrollTop === 'number' && scrollTop > 0) {
                requestAnimationFrame(() => {
                    if (this.view?.scrollDOM) this.view.scrollDOM.scrollTop = scrollTop;
                });
            }
        } catch {}
    }

    /** Get the file path this instance is editing. */
    getPath(): string {
        return this.path;
    }

    /** Update the file path (after rename). */
    setPath(newPath: string): void {
        this.path = newPath;
        const title = this.headerEl.querySelector('.editor-title');
        if (title) {
            title.textContent = newPath;
            (title as HTMLElement).title = newPath;
        }
    }
}

// ── Extension registration ──────────────────────────────────────

/**
 * Standalone editor pane extension. Handles all text files.
 * Creates CodeMirror directly — no Preact component intermediary.
 */
export const editorPaneExtension: WebPaneExtension = {
    id: 'editor',
    label: 'Editor',
    icon: 'edit',
    capabilities: ['edit'] as PaneCapability[],
    placement: 'tabs',

    canHandle(context: PaneContext): boolean | number {
        // Default/fallback pane for all files with a path.
        // Low priority (1) so specialized viewers can override.
        if (!context.path) return false;
        return 1;
    },

    mount(container: HTMLElement, context: PaneContext): PaneInstance {
        return new StandaloneEditorInstance(container, context);
    },
};

/** Type alias for host-side access to extended methods. */
export type { StandaloneEditorInstance as EditorPaneInstance };
