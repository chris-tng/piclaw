/**
 * test/web/terminal-pane.test.ts – Tests for terminal pane extension + file routing.
 */

import { describe, expect, test, beforeEach } from "bun:test";

// --- Inline types (same as pane-types.ts, for Bun test runner) ---

type PanePlacement = "tabs" | "dock";
type PaneCapability = "edit" | "readonly" | "terminal" | "preview";

interface PaneContext {
    path?: string;
    content?: string;
    mtime?: string;
    size?: number;
    mode: "edit" | "view";
}

interface PaneInstance {
    getContent(): string | undefined;
    isDirty(): boolean;
    setContent?(content: string, mtime: string): void;
    focus(): void;
    resize?(): void;
    dispose(): void;
    onDirtyChange?(cb: (dirty: boolean) => void): void;
    onSaveRequest?(cb: (content: string) => void): void;
    onClose?(cb: () => void): void;
}

interface WebPaneExtension {
    id: string;
    label: string;
    icon?: string;
    capabilities: PaneCapability[];
    placement: PanePlacement;
    canHandle?(context: PaneContext): boolean | number;
    mount(container: HTMLElement, context: PaneContext): PaneInstance;
}

// --- Inline PaneRegistry (pure logic copy) ---

class PaneRegistryImpl {
    private extensions: Map<string, WebPaneExtension> = new Map();

    register(ext: WebPaneExtension): void {
        this.extensions.set(ext.id, ext);
    }

    unregister(id: string): void {
        this.extensions.delete(id);
    }

    resolve(context: PaneContext): WebPaneExtension | undefined {
        let best: WebPaneExtension | undefined;
        let bestPriority = -Infinity;

        for (const ext of this.extensions.values()) {
            if (ext.placement !== 'tabs') continue;
            if (!ext.canHandle) continue;

            try {
                const result = ext.canHandle(context);
                if (result === false || result === 0) continue;
                const priority = result === true ? 0 : (typeof result === 'number' ? result : 0);
                if (priority > bestPriority) {
                    bestPriority = priority;
                    best = ext;
                }
            } catch {
                // skip
            }
        }

        return best;
    }

    list(): WebPaneExtension[] {
        return Array.from(this.extensions.values());
    }

    getDockPanes(): WebPaneExtension[] {
        return Array.from(this.extensions.values()).filter(ext => ext.placement === 'dock');
    }

    getTabPanes(): WebPaneExtension[] {
        return Array.from(this.extensions.values()).filter(ext => ext.placement === 'tabs');
    }

    get(id: string): WebPaneExtension | undefined {
        return this.extensions.get(id);
    }

    get size(): number {
        return this.extensions.size;
    }
}

// --- Mock pane extensions ---

const mockMount = (_c: any, _ctx: PaneContext): PaneInstance => ({
    getContent: () => undefined,
    isDirty: () => false,
    focus: () => {},
    dispose: () => {},
});

/** Editor pane (tabs, priority 1 — fallback for all files) */
const editorExt: WebPaneExtension = {
    id: 'editor',
    label: 'Editor',
    capabilities: ['edit'],
    placement: 'tabs',
    canHandle: (ctx) => ctx.path ? 1 : false,
    mount: mockMount,
};

/** Markdown previewer (tabs, priority 10 for .md files) */
const markdownPreviewExt: WebPaneExtension = {
    id: 'markdown-preview',
    label: 'Markdown Preview',
    capabilities: ['preview'],
    placement: 'tabs',
    canHandle: (ctx) => {
        if (!ctx.path) return false;
        return ctx.path.endsWith('.md') ? 10 : false;
    },
    mount: mockMount,
};

/** Image viewer (tabs, priority 10 for image files) */
const imageViewerExt: WebPaneExtension = {
    id: 'image-viewer',
    label: 'Image Viewer',
    capabilities: ['readonly'],
    placement: 'tabs',
    canHandle: (ctx) => {
        if (!ctx.path) return false;
        const lower = ctx.path.toLowerCase();
        return /\.(png|jpg|jpeg|gif|webp|svg)$/.test(lower) ? 10 : false;
    },
    mount: mockMount,
};

/** Terminal pane (dock) */
const terminalExt: WebPaneExtension = {
    id: 'terminal',
    label: 'Terminal',
    capabilities: ['terminal'],
    placement: 'dock',
    mount: mockMount,
};

// --- Tests ---

describe('Terminal pane extension', () => {
    test('has dock placement', () => {
        expect(terminalExt.placement).toBe('dock');
    });

    test('has terminal capability', () => {
        expect(terminalExt.capabilities).toContain('terminal');
    });

    test('mount returns a PaneInstance', () => {
        const instance = terminalExt.mount(null as any, { mode: 'view' });
        expect(instance.getContent()).toBeUndefined();
        expect(instance.isDirty()).toBe(false);
        instance.dispose();
    });
});

describe('File-type routing', () => {
    let registry: PaneRegistryImpl;

    beforeEach(() => {
        registry = new PaneRegistryImpl();
        registry.register(editorExt);
        registry.register(markdownPreviewExt);
        registry.register(imageViewerExt);
        registry.register(terminalExt);
    });

    test('resolves editor for .ts files', () => {
        const pane = registry.resolve({ path: 'src/app.ts', mode: 'edit' });
        expect(pane?.id).toBe('editor');
    });

    test('resolves editor for .js files', () => {
        const pane = registry.resolve({ path: 'index.js', mode: 'edit' });
        expect(pane?.id).toBe('editor');
    });

    test('resolves markdown preview for .md files (higher priority)', () => {
        const pane = registry.resolve({ path: 'README.md', mode: 'edit' });
        expect(pane?.id).toBe('markdown-preview');
    });

    test('resolves image viewer for image files', () => {
        const pane = registry.resolve({ path: 'logo.png', mode: 'view' });
        expect(pane?.id).toBe('image-viewer');
    });

    test('resolves image viewer for .svg', () => {
        const pane = registry.resolve({ path: 'diagram.svg', mode: 'view' });
        expect(pane?.id).toBe('image-viewer');
    });

    test('resolves editor for .json files (no specialized handler)', () => {
        const pane = registry.resolve({ path: 'config.json', mode: 'edit' });
        expect(pane?.id).toBe('editor');
    });

    test('returns undefined when no path', () => {
        const pane = registry.resolve({ mode: 'edit' });
        expect(pane).toBeUndefined();
    });

    test('dock panes are not returned by resolve', () => {
        const pane = registry.resolve({ path: 'terminal', mode: 'view' });
        // Should return editor (it handles any path), not terminal
        expect(pane?.id).toBe('editor');
    });

    test('getDockPanes returns only terminal', () => {
        const docks = registry.getDockPanes();
        expect(docks.length).toBe(1);
        expect(docks[0].id).toBe('terminal');
    });

    test('getTabPanes returns editor, markdown-preview, image-viewer', () => {
        const tabs = registry.getTabPanes();
        expect(tabs.length).toBe(3);
        const ids = tabs.map(t => t.id).sort();
        expect(ids).toEqual(['editor', 'image-viewer', 'markdown-preview']);
    });

    test('highest priority wins when multiple match', () => {
        // Register another markdown handler with even higher priority
        registry.register({
            id: 'super-md',
            label: 'Super MD',
            capabilities: ['preview'],
            placement: 'tabs',
            canHandle: (ctx) => ctx.path?.endsWith('.md') ? 100 : false,
            mount: mockMount,
        });
        const pane = registry.resolve({ path: 'notes.md', mode: 'view' });
        expect(pane?.id).toBe('super-md');
    });

    test('editor handles unknown extensions as fallback', () => {
        const pane = registry.resolve({ path: 'Makefile', mode: 'edit' });
        expect(pane?.id).toBe('editor');
    });

    test('editor handles dotfiles', () => {
        const pane = registry.resolve({ path: '.gitignore', mode: 'edit' });
        expect(pane?.id).toBe('editor');
    });

    test('case insensitive image matching', () => {
        const pane = registry.resolve({ path: 'Photo.JPG', mode: 'view' });
        expect(pane?.id).toBe('image-viewer');
    });
});
