// @ts-nocheck
/**
 * terminal-pane.ts — Terminal dock pane extension.
 *
 * A WebPaneExtension with placement "dock" that provides a terminal
 * in the bottom panel. Currently a scaffold — renders a placeholder
 * with connection status. Will integrate xterm.js + WebSocket in a
 * future phase.
 */

import type { WebPaneExtension, PaneContext, PaneInstance, PaneCapability } from './pane-types.js';

class TerminalPaneInstance implements PaneInstance {
    private container: HTMLElement;
    private disposed = false;
    private termEl: HTMLElement;

    constructor(container: HTMLElement, _context: PaneContext) {
        this.container = container;

        // Build scaffold DOM
        this.termEl = document.createElement('div');
        this.termEl.className = 'terminal-pane-content';
        this.termEl.setAttribute('tabindex', '0');

        const header = document.createElement('div');
        header.className = 'terminal-pane-header';

        const title = document.createElement('span');
        title.className = 'terminal-pane-title';
        title.textContent = 'Terminal';

        const status = document.createElement('span');
        status.className = 'terminal-pane-status';
        status.textContent = 'Not connected';

        header.append(title, status);

        const body = document.createElement('div');
        body.className = 'terminal-pane-body';
        body.innerHTML = '<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>';

        this.termEl.append(header, body);
        container.appendChild(this.termEl);
    }

    getContent(): string | undefined {
        return undefined; // Terminals don't have "content"
    }

    isDirty(): boolean {
        return false; // Terminals are never dirty
    }

    focus(): void {
        this.termEl?.focus();
    }

    resize(): void {
        // Will call xterm.fit() when integrated
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        this.termEl?.remove();
    }
}

/**
 * Terminal dock pane extension.
 * Placement: "dock" — sits in the bottom panel, toggled visible/hidden.
 */
export const terminalPaneExtension: WebPaneExtension = {
    id: 'terminal',
    label: 'Terminal',
    icon: 'terminal',
    capabilities: ['terminal'] as PaneCapability[],
    placement: 'dock',

    // Dock panes don't use canHandle

    mount(container: HTMLElement, context: PaneContext): PaneInstance {
        return new TerminalPaneInstance(container, context);
    },
};
