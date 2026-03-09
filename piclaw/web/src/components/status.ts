// @ts-nocheck
import { html, useEffect, useState } from '../vendor/preact-htm.js';
import { addToWhitelist, respondToAgentRequest } from '../api.js';
import { renderThinkingMarkdown } from '../markdown.js';
import { getTurnColor } from '../ui/agent-utils.js';

/** Preact component: agent status bar with draft/thought/plan panels. */
export function AgentStatus({ status, draft, plan, thought, pendingRequest, turnId, steerQueued, onPanelToggle }) {
    const THOUGHT_MAX_LINES = 8;
    const DRAFT_MAX_LINES = 8;

    const normalizePreview = (value) => {
        if (!value) return { text: '', totalLines: 0, fullText: '' };
        if (typeof value === 'string') {
            const text = value;
            const totalLines = text ? text.replace(/\r\n/g, '\n').split('\n').length : 0;
            return { text, totalLines, fullText: text };
        }
        const text = value.text || '';
        const fullText = value.fullText || value.full_text || text;
        const totalLines = Number.isFinite(value.totalLines)
            ? value.totalLines
            : (fullText ? fullText.replace(/\r\n/g, '\n').split('\n').length : 0);
        return { text, totalLines, fullText };
    };

    const PREVIEW_MAX_CHARS_PER_LINE = 160;

    const countSoftLines = (line) => {
        if (!line) return 1;
        return Math.max(1, Math.ceil(line.length / PREVIEW_MAX_CHARS_PER_LINE));
    };

    const truncateLines = (text, maxLines, totalLinesOverride) => {
        const value = (text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        if (!value) {
            const totalLines = Number.isFinite(totalLinesOverride) ? totalLinesOverride : 0;
            return { text: '', omitted: 0, totalLines, visibleLines: 0 };
        }
        const lines = value.split('\n');
        const clipped = lines.length > maxLines ? lines.slice(0, maxLines).join('\n') : value;
        const totalLines = Number.isFinite(totalLinesOverride) ? totalLinesOverride : lines.reduce((acc, line) => acc + countSoftLines(line), 0);
        const visibleLines = clipped
            ? clipped.split('\n').reduce((acc, line) => acc + countSoftLines(line), 0)
            : 0;
        const omitted = Math.max(totalLines - visibleLines, 0);
        return { text: clipped, omitted, totalLines, visibleLines };
    };

    const planInfo = normalizePreview(plan);
    const thoughtInfo = normalizePreview(thought);
    const draftInfo = normalizePreview(draft);
    const hasPlan = Boolean(planInfo.text) || planInfo.totalLines > 0;
    const hasThought = Boolean(thoughtInfo.text) || thoughtInfo.totalLines > 0;
    const hasDraft = Boolean(draftInfo.fullText?.trim() || draftInfo.text?.trim());

    if (!status && !hasDraft && !hasPlan && !hasThought && !pendingRequest) return null;

    const [expandedPanels, setExpandedPanels] = useState(new Set());
    const toggleExpand = (key) =>
        setExpandedPanels(prev => {
            const next = new Set(prev);
            const willExpand = !next.has(key);
            if (willExpand) next.add(key); else next.delete(key);
            if (typeof onPanelToggle === 'function') {
                onPanelToggle(key, willExpand);
            }
            return next;
        });

    // Collapse all panels when a new turn begins
    useEffect(() => { setExpandedPanels(new Set()); }, [turnId]);

    const activeTurn = status?.turn_id || turnId;
    const turnColor = getTurnColor(activeTurn);
    const dotClass = steerQueued ? 'turn-dot turn-dot-queued' : 'turn-dot';
    const panelTitle = (label) => label;
    const isLastActivity = Boolean(status?.last_activity || status?.lastActivity);

    let content = '';
    const title = status?.title;
    const statusText = status?.status;
    if (status?.type === 'plan') {
        content = title ? `Planning: ${title}` : 'Planning...';
    } else if (status?.type === 'tool_call') {
        content = title ? `Running: ${title}` : 'Running tool...';
    } else if (status?.type === 'tool_status') {
        content = title ? `${title}: ${statusText || 'Working...'}` : (statusText || 'Working...');
    } else if (status?.type === 'error') {
        content = title || 'Agent error';
    } else {
        content = title || statusText || 'Working...';
    }
    if (isLastActivity) {
        content = 'Last activity just now';
    }

    const renderThinkingPanel = ({ panelTitle, text, fullText, totalLines, maxLines, titleClass, panelKey }) => {
        const isExpanded = expandedPanels.has(panelKey);
        const sourceText = fullText || text || '';
        const isCollapsible = typeof maxLines === 'number';
        const showClose = isExpanded && isCollapsible;
        const truncated = isCollapsible
            ? truncateLines(sourceText, maxLines, totalLines)
            : { text: sourceText || '', omitted: 0, totalLines: Number.isFinite(totalLines) ? totalLines : 0 };
        if (!sourceText && !(Number.isFinite(truncated.totalLines) && truncated.totalLines > 0)) return null;
        const bodyClass = `agent-thinking-body${isCollapsible ? ' agent-thinking-body-collapsible' : ''}`;
        const bodyStyle = isCollapsible ? `--agent-thinking-collapsed-lines: ${maxLines};` : '';
        return html`
            <div
                class="agent-thinking"
                data-expanded=${isExpanded ? 'true' : 'false'}
                data-collapsible=${isCollapsible ? 'true' : 'false'}
                style=${turnColor ? `--turn-color: ${turnColor};` : ''}
            >
                <div class="agent-thinking-title ${titleClass || ''}">
                    ${turnColor && html`<span class=${dotClass} aria-hidden="true"></span>`}
                    ${panelTitle}
                    ${showClose && html`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${panelTitle} panel`}
                            onClick=${() => toggleExpand(panelKey)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${bodyClass}
                    style=${bodyStyle}
                    dangerouslySetInnerHTML=${{ __html: renderThinkingMarkdown(sourceText) }}
                />
                ${!isExpanded && truncated.omitted > 0 && html`
                    <button class="agent-thinking-truncation" onClick=${() => toggleExpand(panelKey)}>
                        ▸ ${truncated.omitted} more lines
                    </button>
                `}
                ${isExpanded && truncated.omitted > 0 && html`
                    <button class="agent-thinking-truncation" onClick=${() => toggleExpand(panelKey)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `;
    };

    const pendingTitle = pendingRequest?.tool_call?.title;
    const pendingMessage = pendingTitle ? `Awaiting approval: ${pendingTitle}` : 'Awaiting approval';

    return html`
        <div class="agent-status-panel">
            ${pendingRequest && html`
                <div class="agent-status agent-status-request" aria-live="polite" style=${turnColor ? `--turn-color: ${turnColor};` : ''}>
                    <span class=${dotClass} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${pendingMessage}</span>
                </div>
            `}
            ${hasPlan && renderThinkingPanel({
                panelTitle: panelTitle('Planning'),
                text: planInfo.text,
                fullText: planInfo.fullText,
                totalLines: planInfo.totalLines,
                panelKey: 'plan',
            })}
            ${hasThought && renderThinkingPanel({
                panelTitle: panelTitle('Thoughts'),
                text: thoughtInfo.text,
                fullText: thoughtInfo.fullText,
                totalLines: thoughtInfo.totalLines,
                maxLines: THOUGHT_MAX_LINES,
                titleClass: 'thought',
                panelKey: 'thought',
            })}
            ${hasDraft && renderThinkingPanel({
                panelTitle: panelTitle('Draft'),
                text: draftInfo.text,
                fullText: draftInfo.fullText,
                totalLines: draftInfo.totalLines,
                maxLines: DRAFT_MAX_LINES,
                titleClass: 'thought',
                panelKey: 'draft',
            })}
            ${status && html`
                <div class=${`agent-status${isLastActivity ? ' agent-status-last-activity' : ''}${status?.type === 'error' ? ' agent-status-error' : ''}`} aria-live="polite" style=${turnColor ? `--turn-color: ${turnColor};` : ''}>
                    ${turnColor && html`<span class=${dotClass} aria-hidden="true"></span>`}
                    ${status?.type === 'error' ? html`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>` : (!isLastActivity && html`<div class="agent-status-spinner"></div>`)}
                    <span class="agent-status-text">${content}</span>
                </div>
            `}
        </div>
    `;
}

/** Preact component: modal for agent confirmation/input requests. */
export function AgentRequestModal({ request, onRespond }) {
    if (!request) return null;

    const { request_id, tool_call, options } = request;
    const title = tool_call?.title || 'Agent Request';
    const kind = tool_call?.kind || 'other';

    // Extract command and explanation from tool call metadata
    const rawInput = tool_call?.rawInput || {};
    const command = rawInput.command || (rawInput.commands && rawInput.commands[0]) || null;
    const diff = rawInput.diff || null;
    const fileName = rawInput.fileName || rawInput.path || null;
    const explanation = tool_call?.description || rawInput.description || rawInput.explanation || null;
    const locations = Array.isArray(tool_call?.locations) ? tool_call.locations : [];
    const locationPaths = locations
        .map((loc) => loc?.path)
        .filter((path) => Boolean(path));
    const uniquePaths = Array.from(new Set([fileName, ...locationPaths].filter(Boolean)));

    console.log('AgentRequestModal:', { request_id, tool_call, options });

    const handleResponse = async (outcome) => {
        try {
            await respondToAgentRequest(request_id, outcome);
            onRespond();
        } catch (e) {
            console.error('Failed to respond to agent request:', e);
        }
    };

    const handleAlwaysAllow = async () => {
        try {
            // Add to whitelist with the exact title
            await addToWhitelist(title, `Auto-approved: ${title}`);
            // Then approve this request
            await respondToAgentRequest(request_id, 'approved');
            onRespond();
        } catch (e) {
            console.error('Failed to add to whitelist:', e);
        }
    };

    // ACP options format: { optionId, name, kind }
    const hasOptions = options && options.length > 0;

    return html`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${title}</div>
                </div>
                ${(explanation || command || diff || uniquePaths.length > 0) && html`
                    <div class="agent-request-body">
                        ${explanation && html`
                            <div class="agent-request-description">${explanation}</div>
                        `}
                        ${uniquePaths.length > 0 && html`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${uniquePaths.map((path, idx) => html`<li key=${idx}>${path}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${command && html`
                            <pre class="agent-request-command">${command}</pre>
                        `}
                        ${diff && html`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${diff}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${hasOptions ? (
                        options.map(opt => html`
                            <button 
                                key=${opt.optionId || opt.id || String(opt)}
                                class="agent-request-btn ${opt.kind === 'allow_once' || opt.kind === 'allow_always' ? 'primary' : ''}"
                                onClick=${() => handleResponse(opt.optionId || opt.id || opt)}
                            >
                                ${opt.name || opt.label || opt.optionId || opt.id || String(opt)}
                            </button>
                        `)
                    ) : html`
                        <button class="agent-request-btn primary" onClick=${() => handleResponse('approved')}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${() => handleResponse('denied')}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${handleAlwaysAllow}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;
}

/** Preact component: SSE connection status indicator. */
export function ConnectionStatus({ status }) {
    if (status === 'connected') return null;

    return html`
        <div class="connection-status ${status}">
            ${status === 'disconnected' ? 'Reconnecting...' : status}
        </div>
    `;
}
