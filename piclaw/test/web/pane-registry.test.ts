/**
 * test/web/pane-registry.test.ts – Tests for PaneRegistry and pane contract.
 */

import { describe, expect, test, beforeEach } from "bun:test";

// We can't import the browser modules directly (they use preact/htm),
// so we replicate the registry logic for testing. The registry is pure
// logic with no DOM or framework dependencies.

// --- Inline copy of core types and registry (no browser imports) ---

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
                // canHandle() threw — skip silently
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

// --- Mock pane helpers ---

function mockPaneInstance(): PaneInstance {
    let dirty = false;
    let content: string | undefined = '';
    return {
        getContent: () => content,
        isDirty: () => dirty,
        setContent: (c: string) => { content = c; dirty = false; },
        focus: () => {},
        resize: () => {},
        dispose: () => {},
        onDirtyChange: () => {},
        onSaveRequest: () => {},
        onClose: () => {},
    };
}

function makeTabPane(id: string, canHandleResult: boolean | number = true): WebPaneExtension {
    return {
        id,
        label: id,
        capabilities: ['edit'],
        placement: 'tabs',
        canHandle: () => canHandleResult,
        mount: () => mockPaneInstance(),
    };
}

function makeDockPane(id: string): WebPaneExtension {
    return {
        id,
        label: id,
        capabilities: ['terminal'],
        placement: 'dock',
        mount: () => mockPaneInstance(),
    };
}

// --- Tests ---

describe('PaneRegistry', () => {
    let registry: PaneRegistryImpl;

    beforeEach(() => {
        registry = new PaneRegistryImpl();
    });

    test('starts empty', () => {
        expect(registry.size).toBe(0);
        expect(registry.list()).toEqual([]);
    });

    test('register and list', () => {
        const pane = makeTabPane('editor');
        registry.register(pane);
        expect(registry.size).toBe(1);
        expect(registry.list()).toEqual([pane]);
    });

    test('register overwrites existing id', () => {
        const pane1 = makeTabPane('editor');
        const pane2 = makeTabPane('editor');
        pane2.label = 'Editor v2';
        registry.register(pane1);
        registry.register(pane2);
        expect(registry.size).toBe(1);
        expect(registry.get('editor')?.label).toBe('Editor v2');
    });

    test('unregister removes by id', () => {
        registry.register(makeTabPane('editor'));
        registry.register(makeTabPane('viewer'));
        expect(registry.size).toBe(2);
        registry.unregister('editor');
        expect(registry.size).toBe(1);
        expect(registry.get('editor')).toBeUndefined();
        expect(registry.get('viewer')).toBeDefined();
    });

    test('unregister non-existent id is a no-op', () => {
        registry.unregister('nope');
        expect(registry.size).toBe(0);
    });

    test('get returns extension by id', () => {
        const pane = makeTabPane('editor');
        registry.register(pane);
        expect(registry.get('editor')).toBe(pane);
        expect(registry.get('other')).toBeUndefined();
    });

    describe('resolve', () => {
        const ctx: PaneContext = { path: 'test.ts', mode: 'edit' };

        test('returns undefined when no panes registered', () => {
            expect(registry.resolve(ctx)).toBeUndefined();
        });

        test('returns undefined when no panes can handle context', () => {
            registry.register(makeTabPane('editor', false));
            expect(registry.resolve(ctx)).toBeUndefined();
        });

        test('returns pane that returns true', () => {
            const pane = makeTabPane('editor', true);
            registry.register(pane);
            expect(registry.resolve(ctx)).toBe(pane);
        });

        test('returns pane with higher numeric priority', () => {
            const fallback = makeTabPane('editor', 1);
            const specialized = makeTabPane('md-preview', 10);
            registry.register(fallback);
            registry.register(specialized);
            expect(registry.resolve(ctx)).toBe(specialized);
        });

        test('true counts as priority 0', () => {
            const truePane = makeTabPane('generic', true);  // priority 0
            const numPane = makeTabPane('specific', 1);       // priority 1
            registry.register(truePane);
            registry.register(numPane);
            expect(registry.resolve(ctx)).toBe(numPane);
        });

        test('skips panes that return 0', () => {
            const zero = makeTabPane('zero', 0);
            const one = makeTabPane('one', 1);
            registry.register(zero);
            registry.register(one);
            expect(registry.resolve(ctx)).toBe(one);
        });

        test('skips dock panes during resolve', () => {
            const dock = makeDockPane('terminal');
            registry.register(dock);
            expect(registry.resolve(ctx)).toBeUndefined();
        });

        test('skips panes without canHandle', () => {
            const noHandle: WebPaneExtension = {
                id: 'bare',
                label: 'Bare',
                capabilities: ['edit'],
                placement: 'tabs',
                mount: () => mockPaneInstance(),
            };
            registry.register(noHandle);
            expect(registry.resolve(ctx)).toBeUndefined();
        });

        test('catches canHandle exceptions and skips', () => {
            const throwing: WebPaneExtension = {
                id: 'broken',
                label: 'Broken',
                capabilities: ['edit'],
                placement: 'tabs',
                canHandle: () => { throw new Error('boom'); },
                mount: () => mockPaneInstance(),
            };
            const good = makeTabPane('editor', 1);
            registry.register(throwing);
            registry.register(good);
            // Should not throw and should resolve to the good pane
            expect(registry.resolve(ctx)).toBe(good);
        });

        test('when only a throwing pane exists, returns undefined', () => {
            const throwing: WebPaneExtension = {
                id: 'broken',
                label: 'Broken',
                capabilities: ['edit'],
                placement: 'tabs',
                canHandle: () => { throw new Error('boom'); },
                mount: () => mockPaneInstance(),
            };
            registry.register(throwing);
            expect(registry.resolve(ctx)).toBeUndefined();
        });
    });

    describe('getDockPanes / getTabPanes', () => {
        test('filters by placement', () => {
            registry.register(makeTabPane('editor'));
            registry.register(makeDockPane('terminal'));
            registry.register(makeTabPane('viewer'));

            const tabs = registry.getTabPanes();
            const docks = registry.getDockPanes();

            expect(tabs.length).toBe(2);
            expect(tabs.every(p => p.placement === 'tabs')).toBe(true);
            expect(docks.length).toBe(1);
            expect(docks[0].id).toBe('terminal');
        });

        test('returns empty arrays when no matching panes', () => {
            registry.register(makeTabPane('editor'));
            expect(registry.getDockPanes()).toEqual([]);

            const reg2 = new PaneRegistryImpl();
            reg2.register(makeDockPane('terminal'));
            expect(reg2.getTabPanes()).toEqual([]);
        });
    });
});

describe('PaneInstance contract', () => {
    test('mock instance satisfies interface', () => {
        const instance = mockPaneInstance();
        expect(instance.getContent()).toBe('');
        expect(instance.isDirty()).toBe(false);

        instance.setContent!('hello', '2026-01-01');
        expect(instance.getContent()).toBe('hello');
        expect(instance.isDirty()).toBe(false);
    });

    test('mount returns a valid PaneInstance', () => {
        const pane = makeTabPane('editor');
        const ctx: PaneContext = { path: 'test.ts', content: 'code', mode: 'edit' };

        // Simulate mount (our mock doesn't need a real DOM element)
        const instance = pane.mount(null as any, ctx);
        expect(typeof instance.getContent).toBe('function');
        expect(typeof instance.isDirty).toBe('function');
        expect(typeof instance.focus).toBe('function');
        expect(typeof instance.dispose).toBe('function');
    });

    test('dispose can be called multiple times safely', () => {
        const instance = mockPaneInstance();
        instance.dispose();
        instance.dispose(); // no throw
    });
});

describe('WebPaneExtension contract', () => {
    test('editor pane extension shape', () => {
        const ext = makeTabPane('editor', 1);
        expect(ext.id).toBe('editor');
        expect(ext.placement).toBe('tabs');
        expect(ext.capabilities).toContain('edit');
        expect(typeof ext.canHandle).toBe('function');
        expect(typeof ext.mount).toBe('function');
    });

    test('dock pane extension shape', () => {
        const ext = makeDockPane('terminal');
        expect(ext.id).toBe('terminal');
        expect(ext.placement).toBe('dock');
        expect(ext.capabilities).toContain('terminal');
        expect(ext.canHandle).toBeUndefined();
        expect(typeof ext.mount).toBe('function');
    });
});
