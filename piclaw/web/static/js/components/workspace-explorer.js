// @ts-nocheck
import { html, useEffect, useMemo, useState } from '../vendor/preact-htm.js';
import {
    attachWorkspaceFile,
    getMediaInfo,
    getMediaUrl,
    getWorkspaceFile,
    getWorkspaceRawUrl,
    getWorkspaceTree,
} from '../api.js';
import { formatFileSize, formatTimestamp } from '../utils/format.js';
import { renderMarkdown } from '../markdown.js';

const ROW_HEIGHT = 22;
const TREE_WIDTH = 260;
const INDENT = 16;
const REFRESH_INTERVAL_MS = 15000;

function FileAttachmentCard({ mediaId }) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (!mediaId) return;
        getMediaInfo(mediaId).then(setInfo).catch(() => {});
    }, [mediaId]);

    if (!info) return null;

    const filename = info.filename || 'file';
    const size = info.metadata?.size;
    const sizeStr = size ? formatFileSize(size) : '';

    return html`
        <a href=${getMediaUrl(mediaId)} download=${filename} class="file-attachment" onClick=${(e) => e.stopPropagation()}>
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

function flattenTree(node, expanded, depth = 0, rows = []) {
    if (!node) return rows;
    rows.push({ node, depth });
    if (node.type === 'dir' && node.children && expanded.has(node.path)) {
        node.children.forEach((child) => flattenTree(child, expanded, depth + 1, rows));
    }
    return rows;
}

function iconPath(type) {
    if (type === 'dir') {
        return html`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`;
    }
    return html`
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
    `;
}

export function WorkspaceExplorer() {
    const [tree, setTree] = useState(null);
    const [expanded, setExpanded] = useState(new Set(['.']));
    const [selectedPath, setSelectedPath] = useState(null);
    const [preview, setPreview] = useState(null);
    const [downloadId, setDownloadId] = useState(null);
    const [loadingTree, setLoadingTree] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [error, setError] = useState(null);

    const loadTree = async () => {
        setLoadingTree(true);
        setError(null);
        try {
            const data = await getWorkspaceTree('', 3);
            setTree(data.root);
            if (data.root?.path) {
                setExpanded((prev) => {
                    const next = new Set(prev);
                    next.add(data.root.path);
                    return next;
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to load workspace');
        } finally {
            setLoadingTree(false);
        }
    };

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

    useEffect(() => {
        loadTree();
        const timer = setInterval(loadTree, REFRESH_INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    const rows = useMemo(() => flattenTree(tree, expanded), [tree, expanded]);
    const svgHeight = Math.max(rows.length * ROW_HEIGHT + 12, 120);

    const handleToggle = (node) => {
        if (node.type !== 'dir') return;
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(node.path)) next.delete(node.path);
            else next.add(node.path);
            return next;
        });
    };

    const handleSelect = (node) => {
        if (node.type === 'dir') {
            handleToggle(node);
            return;
        }
        setSelectedPath(node.path);
        loadPreview(node.path);
    };

    const handleDownload = async () => {
        if (!selectedPath) return;
        try {
            const res = await attachWorkspaceFile(selectedPath);
            if (res.media_id) setDownloadId(res.media_id);
        } catch (err) {
            setPreview((prev) => ({ ...(prev || {}), error: err.message || 'Failed to attach file' }));
        }
    };

    return html`
        <aside class="workspace-sidebar">
            <div class="workspace-header">
                <span>Workspace</span>
                <button class="workspace-refresh" onClick=${loadTree} title="Refresh">⟳</button>
            </div>
            <div class="workspace-tree">
                ${loadingTree && html`<div class="workspace-loading">Loading…</div>`}
                ${error && html`<div class="workspace-error">${error}</div>`}
                ${!loadingTree && tree && html`
                    <svg class="workspace-tree-svg" viewBox=${`0 0 ${TREE_WIDTH} ${svgHeight}`} width="100%" height=${svgHeight}>
                        ${rows.map((row, idx) => {
                            const node = row.node;
                            const depth = row.depth;
                            const y = idx * ROW_HEIGHT + 12;
                            const x = 8 + depth * INDENT;
                            const isSelected = node.path === selectedPath;
                            const isDir = node.type === 'dir';
                            const expandedDir = isDir && expanded.has(node.path);
                            const caret = isDir ? (expandedDir ? '▾' : '▸') : '';
                            const caretWidth = 10;
                            const iconX = x + caretWidth;
                            const iconY = y - 9;
                            const textX = iconX + 18;
                            return html`
                                <g class="workspace-row" onClick=${() => handleSelect(node)}>
                                    <rect x="0" y=${y - 14} width=${TREE_WIDTH} height=${ROW_HEIGHT} class=${`workspace-row-bg ${isSelected ? 'selected' : ''}`} />
                                    ${caret && html`<text class="workspace-caret" x=${x + 1} y=${y}>${caret}</text>`}
                                    <g transform=${`translate(${iconX}, ${iconY}) scale(0.6)`} class=${`workspace-icon ${isDir ? 'folder' : 'file'}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${iconPath(node.type)}
                                        </svg>
                                    </g>
                                    <text class="workspace-label" x=${textX} y=${y}>${node.name}</text>
                                </g>
                            `;
                        })}
                    </svg>
                `}
            </div>
            ${selectedPath && html`
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${selectedPath}</span>
                        <button class="workspace-download" onClick=${handleDownload}>Download</button>
                    </div>
                    ${loadingPreview && html`<div class="workspace-loading">Loading preview…</div>`}
                    ${preview?.error && html`<div class="workspace-error">${preview.error}</div>`}
                    ${preview && !preview.error && html`
                        <div class="workspace-preview-meta">
                            ${preview.size ? html`<span>${formatFileSize(preview.size)}</span>` : ''}
                            ${preview.mtime ? html`<span>${formatTimestamp(preview.mtime)}</span>` : ''}
                            ${preview.truncated ? html`<span>truncated</span>` : ''}
                        </div>
                        ${preview.kind === 'image' && html`
                            <div class="workspace-preview-image">
                                <img src=${preview.url || getWorkspaceRawUrl(preview.path)} alt="preview" />
                            </div>
                        `}
                        ${preview.kind === 'text' && html`
                            <div class="workspace-preview-text" dangerouslySetInnerHTML=${{ __html: renderMarkdown(preview.text || '') }} />
                        `}
                        ${preview.kind === 'binary' && html`
                            <div class="workspace-preview-text">Binary file. Download to view.</div>
                        `}
                    `}
                    ${downloadId && html`<div class="workspace-download-card"><${FileAttachmentCard} mediaId=${downloadId} /></div>`}
                </div>
            `}
        </aside>
    `;
}
