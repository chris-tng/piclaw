// @ts-nocheck
import { html, useEffect, useMemo, useRef, useState } from '../vendor/preact-htm.js';
import { getMediaInfo, getMediaUrl, getThumbnailUrl, submitAdaptiveCardAction } from '../api.js';
import { renderMarkdown, renderMermaidDiagrams, sanitizeUrl } from '../markdown.js';
import { formatCount, formatFileSize, formatTime, formatTimestamp } from '../utils/format.js';
import { DEFAULT_AGENT_NAME, getAvatarInfo } from '../ui/agent-utils.js';
import { getAttachmentPreviewKind } from '../ui/attachment-preview.js';
import { extractCardBlocks, renderAdaptiveCard } from '../ui/adaptive-card-renderer.js';
import { AttachmentPreviewModal } from './attachment-preview-modal.js';
import { ImageModal } from './image-modal.js';
import { FilePill } from './file-pill.js';

/**
 * File attachment component - keeps single-click download on the main card while
 * exposing an explicit preview affordance for the v1 preview flow.
 */
function FileAttachment({ mediaId, onPreview }) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        getMediaInfo(mediaId).then(setInfo).catch(() => {});
    }, [mediaId]);

    if (!info) return null;

    const filename = info.filename || 'file';
    const size = info.metadata?.size;
    const sizeStr = size ? formatFileSize(size) : '';
    const previewKind = getAttachmentPreviewKind(info.content_type);
    const previewLabel = previewKind === 'unsupported' ? 'Details' : 'Preview';

    return html`
        <div class="file-attachment" onClick=${(e) => e.stopPropagation()}>
            <a href=${getMediaUrl(mediaId)} download=${filename} class="file-attachment-main">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <div class="file-info">
                    <span class="file-name">${filename}</span>
                    <span class="file-meta-row">
                        ${sizeStr && html`<span class="file-size">${sizeStr}</span>`}
                        ${info.content_type && html`<span class="file-size">${info.content_type}</span>`}
                    </span>
                </div>
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </a>
            <button
                class="file-attachment-preview"
                type="button"
                onClick=${(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPreview?.({ mediaId, info });
                }}
            >
                ${previewLabel}
            </button>
        </div>
    `;
}

function AttachmentPill({ attachment, onPreview }) {
    const mediaId = Number(attachment?.id);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (!Number.isFinite(mediaId)) return undefined;
        getMediaInfo(mediaId).then(setInfo).catch(() => {});
        return undefined;
    }, [mediaId]);

    const filename = info?.filename || attachment.label || `attachment-${attachment.id}`;
    const downloadHref = Number.isFinite(mediaId) ? getMediaUrl(mediaId) : null;
    const previewKind = getAttachmentPreviewKind(info?.content_type);
    const previewLabel = previewKind === 'unsupported' ? 'Details' : 'Preview';

    return html`
        <span class="attachment-pill" title=${filename}>
            ${downloadHref
                ? html`
                    <a href=${downloadHref} download=${filename} class="attachment-pill-main" onClick=${(e) => e.stopPropagation()}>
                        <${FilePill}
                            prefix="post"
                            label=${attachment.label}
                            title=${filename}
                        />
                    </a>
                `
                : html`
                    <${FilePill}
                        prefix="post"
                        label=${attachment.label}
                        title=${filename}
                    />
                `}
            ${Number.isFinite(mediaId) && info && html`
                <button
                    class="attachment-pill-preview"
                    type="button"
                    title=${previewLabel}
                    onClick=${(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onPreview?.({ mediaId, info });
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            `}
        </span>
    `;
}

/**
 * Render annotations (audience/priority/lastModified)
 */
function AnnotationsBadge({ annotations }) {
    if (!annotations) return null;
    const { audience, priority, lastModified } = annotations;
    const formattedLastModified = lastModified ? formatTimestamp(lastModified) : null;
    return html`
        <div class="content-annotations">
            ${audience && audience.length > 0 && html`
                <span class="content-annotation">Audience: ${audience.join(', ')}</span>
            `}
            ${typeof priority === 'number' && html`
                <span class="content-annotation">Priority: ${priority}</span>
            `}
            ${formattedLastModified && html`
                <span class="content-annotation">Updated: ${formattedLastModified}</span>
            `}
        </div>
    `;
}

/**
 * Resource link block (MCP/ACP)
 */
function ResourceLinkBlock({ block }) {
    const name = block.title || block.name || block.uri;
    const description = block.description;
    const sizeStr = block.size ? formatFileSize(block.size) : '';
    const mimeType = block.mime_type || '';
    const icon = getMimeIcon(mimeType);
    const safeUrl = sanitizeUrl(block.uri);
    return html`
        <a
            href=${safeUrl || '#'}
            class="resource-link"
            target=${safeUrl ? "_blank" : undefined}
            rel=${safeUrl ? "noopener noreferrer" : undefined}
            onClick=${(e) => e.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${icon}</span>
                    <div class="resource-link-title">${name}</div>
                </div>
                ${description && html`<div class="resource-link-description">${description}</div>`}
                <div class="resource-link-meta">
                    ${mimeType && html`<span>${mimeType}</span>`}
                    ${sizeStr && html`<span>${sizeStr}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `;
}

/**
 * Embedded resource block (MCP/ACP)
 */
function ResourceBlock({ block }) {
    const [open, setOpen] = useState(false);
    const title = block.uri || 'Embedded resource';
    const contentText = block.text || '';
    const hasBlob = Boolean(block.data);
    const mimeType = block.mime_type || '';
    return html`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}>
                ${open ? '▼' : '▶'} ${title}
            </button>
            ${open && html`
                ${contentText && html`<pre class="resource-embed-content">${contentText}</pre>`}
                ${hasBlob && html`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${mimeType && html`<span class="resource-embed-blob-meta">${mimeType}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const blob = new Blob([Uint8Array.from(atob(block.data), c => c.charCodeAt(0))], { type: mimeType || 'application/octet-stream' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = title.split('/').pop() || 'resource';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}>Download</button>
                    </div>
                `}
            `}
        </div>
    `;
}

function getMimeIcon(mimeType) {
    if (!mimeType) return '📎';
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.startsWith('video/')) return '🎬';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('zip') || mimeType.includes('gzip')) return '🗜️';
    if (mimeType.startsWith('text/')) return '📄';
    return '📎';
}

/**
 * Link preview component - card with image background
 */
function LinkPreview({ preview }) {
    const safeUrl = sanitizeUrl(preview.url);
    const safeImage = sanitizeUrl(preview.image, { allowDataImage: true });
    const bgStyle = safeImage
        ? `background-image: url('${safeImage}')`
        : '';
    let siteName = preview.site_name;
    if (!siteName && safeUrl) {
        try {
            siteName = new URL(safeUrl).hostname;
        } catch {
            siteName = safeUrl;
        }
    }

    return html`
        <a
            href=${safeUrl || '#'}
            class="link-preview ${safeImage ? 'has-image' : ''}"
            target=${safeUrl ? "_blank" : undefined}
            rel=${safeUrl ? "noopener noreferrer" : undefined}
            onClick=${(e) => e.stopPropagation()}
            style=${bgStyle}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${siteName || ''}</div>
                <div class="link-preview-title">${preview.title}</div>
                ${preview.description && html`
                    <div class="link-preview-description">${preview.description}</div>
                `}
            </div>
        </a>
    `;
}

/**
 * Preserve message text exactly as-authored, even when link previews exist.
 *
 * Regression note: we intentionally do not strip URLs from content when a
 * preview card is shown. Users expect their original text to remain visible.
 */
export function getDisplayContent(content, _linkPreviews) {
    return typeof content === 'string' ? content : '';
}

const CODE_COPY_RESET_MS = 1800;
const COPY_ICON_SVG = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`;
const COPY_SUCCESS_SVG = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`;
const COPY_ERROR_SVG = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;

async function copyCodeText(text) {
    const value = typeof text === 'string' ? text : '';
    if (!value) return false;

    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(value);
            return true;
        } catch {
            // Fall through to execCommand fallback.
        }
    }

    try {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        return copied;
    } catch {
        return false;
    }
}

function enhanceCodeBlocks(container) {
    if (!container) return () => {};

    const blocks = Array.from(container.querySelectorAll('pre')).filter((pre) => pre.querySelector('code'));
    if (blocks.length === 0) return () => {};

    const resetTimers = new Map();
    const cleanups = [];

    const setButtonState = (button, state) => {
        const nextState = state || 'idle';
        button.dataset.copyState = nextState;
        if (nextState === 'success') {
            button.innerHTML = COPY_SUCCESS_SVG;
            button.setAttribute('aria-label', 'Copied');
            button.setAttribute('title', 'Copied');
            button.classList.add('is-success');
            button.classList.remove('is-error');
        } else if (nextState === 'error') {
            button.innerHTML = COPY_ERROR_SVG;
            button.setAttribute('aria-label', 'Copy failed');
            button.setAttribute('title', 'Copy failed');
            button.classList.add('is-error');
            button.classList.remove('is-success');
        } else {
            button.innerHTML = COPY_ICON_SVG;
            button.setAttribute('aria-label', 'Copy code');
            button.setAttribute('title', 'Copy code');
            button.classList.remove('is-success', 'is-error');
        }
    };

    blocks.forEach((pre) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'post-code-block';
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'post-code-copy-btn';
        setButtonState(button, 'idle');
        wrapper.appendChild(button);

        const handleCopyClick = async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const code = pre.querySelector('code');
            const text = code?.textContent || '';
            const ok = await copyCodeText(text);
            setButtonState(button, ok ? 'success' : 'error');
            const existingTimer = resetTimers.get(button);
            if (existingTimer) clearTimeout(existingTimer);
            const timer = setTimeout(() => {
                setButtonState(button, 'idle');
                resetTimers.delete(button);
            }, CODE_COPY_RESET_MS);
            resetTimers.set(button, timer);
        };

        button.addEventListener('click', handleCopyClick);
        cleanups.push(() => {
            button.removeEventListener('click', handleCopyClick);
            const timer = resetTimers.get(button);
            if (timer) clearTimeout(timer);
            if (wrapper.parentNode) {
                wrapper.parentNode.insertBefore(pre, wrapper);
                wrapper.remove();
            }
        });
    });

    return () => {
        cleanups.forEach((cleanup) => cleanup());
    };
}

function extractFileRefs(content) {
    if (!content) return { content, fileRefs: [] };
    const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    let start = -1;
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim() === 'Files:' && lines[i + 1] && /^\s*-\s+/.test(lines[i + 1])) {
            start = i;
            break;
        }
    }
    if (start === -1) return { content, fileRefs: [] };
    const refs = [];
    let end = start + 1;
    for (; end < lines.length; end += 1) {
        const line = lines[end];
        if (/^\s*-\s+/.test(line)) {
            refs.push(line.replace(/^\s*-\s+/, '').trim());
        } else if (!line.trim()) {
            break;
        } else {
            break;
        }
    }
    if (refs.length === 0) return { content, fileRefs: [] };
    const before = lines.slice(0, start);
    const after = lines.slice(end);
    let cleaned = [...before, ...after].join('\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    return { content: cleaned, fileRefs: refs };
}

function extractMessageRefs(content) {
    if (!content) return { content, messageRefs: [] };
    const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    let start = -1;
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim() === 'Referenced messages:' && lines[i + 1] && /^\s*-\s+/.test(lines[i + 1])) {
            start = i;
            break;
        }
    }
    if (start === -1) return { content, messageRefs: [] };
    const refs = [];
    let end = start + 1;
    for (; end < lines.length; end += 1) {
        const line = lines[end];
        if (/^\s*-\s+/.test(line)) {
            const val = line.replace(/^\s*-\s+/, '').trim();
            const match = val.match(/^message:(\S+)$/i);
            if (match) refs.push(match[1]);
        } else if (!line.trim()) {
            break;
        } else {
            break;
        }
    }
    if (refs.length === 0) return { content, messageRefs: [] };
    const before = lines.slice(0, start);
    const after = lines.slice(end);
    let cleaned = [...before, ...after].join('\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    return { content: cleaned, messageRefs: refs };
}

function extractAttachmentRefs(content) {
    if (!content) return { content, attachments: [] };
    const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    let start = -1;
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim() === 'Images:' && lines[i + 1] && /^\s*-\s+/.test(lines[i + 1])) {
            start = i;
            break;
        }
    }
    if (start === -1) return { content, attachments: [] };
    const refs = [];
    let end = start + 1;
    for (; end < lines.length; end += 1) {
        const line = lines[end];
        if (/^\s*-\s+/.test(line)) {
            const raw = line.replace(/^\s*-\s+/, '').trim();
            const match = raw.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i) ||
                raw.match(/^attachment:([^\s]+)\s+(.+)$/i);
            if (match) {
                const id = match[1];
                const label = (match[2] || '').trim() || id;
                refs.push({ id, label, raw });
            } else {
                refs.push({ id: null, label: raw, raw });
            }
        } else if (!line.trim()) {
            break;
        } else {
            break;
        }
    }
    if (refs.length === 0) return { content, attachments: [] };
    const before = lines.slice(0, start);
    const after = lines.slice(end);
    let cleaned = [...before, ...after].join('\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    return { content: cleaned, attachments: refs };
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightHtml(html, query) {
    if (!html || !query) return html;
    const terms = String(query)
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    if (terms.length === 0) return html;

    const escapedTerms = terms
        .map(escapeRegex)
        .sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const matcher = new RegExp(`^(${escapedTerms.join('|')})$`, 'i');

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    for (const textNode of nodes) {
        const value = textNode.nodeValue;
        if (!value || !pattern.test(value)) {
            pattern.lastIndex = 0;
            continue;
        }
        pattern.lastIndex = 0;
        const parent = textNode.parentElement;
        if (parent && parent.closest('code, pre, script, style')) continue;

        const parts = value.split(pattern).filter((part) => part !== '');
        if (parts.length === 0) continue;
        const frag = doc.createDocumentFragment();
        for (const part of parts) {
            if (matcher.test(part)) {
                const mark = doc.createElement('mark');
                mark.className = 'search-highlight-term';
                mark.textContent = part;
                frag.appendChild(mark);
            } else {
                frag.appendChild(doc.createTextNode(part));
            }
        }
        textNode.parentNode.replaceChild(frag, textNode);
    }

    return doc.body.innerHTML;
}

/**
 * Single post component
 */
export function Post({ post, onClick, onHashtagClick, onMessageRef, onScrollToMessage, agentName, agentAvatarUrl, userName, userAvatarUrl, userAvatarBackground, onDelete, isThreadReply, isThreadPrev, isThreadNext, isRemoving, highlightQuery, onFileRef }) {
    const [zoomedImage, setZoomedImage] = useState(null);
    const contentRef = useRef(null);

    const data = post.data;
    const isAgent = data.type === 'agent_response';
    const resolvedUserName = userName || 'You';
    const displayName = isAgent ? (agentName || DEFAULT_AGENT_NAME) : resolvedUserName;

    // Get avatar info based on the name
    const avatarInfo = isAgent
        ? getAvatarInfo(agentName, agentAvatarUrl)
        : getAvatarInfo(resolvedUserName, userAvatarUrl);
    const normalizedUserBackground = typeof userAvatarBackground === 'string'
        ? userAvatarBackground.trim().toLowerCase()
        : '';
    const clearUserBackground = !isAgent && avatarInfo.image
        && (normalizedUserBackground === 'clear' || normalizedUserBackground === 'transparent');
    // Keep agent avatars with transparent background when an image is set,
    // matching user avatar behavior when background is cleared.
    const clearAgentBackground = isAgent && Boolean(avatarInfo.image);
    const avatarStyle = `background-color: ${(clearUserBackground || clearAgentBackground) ? 'transparent' : avatarInfo.color}`;

    const contentMeta = data.content_meta;
    const isTruncated = Boolean(contentMeta?.truncated);
    const isPreview = Boolean(contentMeta?.preview);
    const isHardTruncated = isTruncated && !isPreview;
    const truncatedInfo = isTruncated
        ? {
            originalLength: Number.isFinite(contentMeta?.original_length)
                ? contentMeta.original_length
                : (data.content ? data.content.length : 0),
            maxLength: Number.isFinite(contentMeta?.max_length) ? contentMeta.max_length : 0,
        }
        : null;

    const blocks = data.content_blocks || [];
    const mediaIds = data.media_ids || [];

    // Keep original message text even when link previews are available.
    let displayContent = getDisplayContent(data.content, data.link_previews);
    const { content: cleanedContent, fileRefs } = extractFileRefs(displayContent);
    const { content: cleanedWithMsgRefs, messageRefs } = extractMessageRefs(cleanedContent);
    const { content: cleanedWithAttachments, attachments } = extractAttachmentRefs(cleanedWithMsgRefs);
    displayContent = cleanedWithAttachments;
    const directCardBlocks = extractCardBlocks(blocks);
    const singleCardFallback = directCardBlocks.length === 1 && typeof directCardBlocks[0]?.fallback_text === 'string'
        ? directCardBlocks[0].fallback_text.trim()
        : '';
    const hideRenderedFallback = Boolean(singleCardFallback) && displayContent?.trim() === singleCardFallback;
    const shouldRenderContent = Boolean(displayContent) && !isHardTruncated && !hideRenderedFallback;
    const highlightQueryText = typeof highlightQuery === 'string' ? highlightQuery.trim() : '';
    const renderedHtml = useMemo(() => {
        if (!displayContent || hideRenderedFallback) return '';
        const baseHtml = renderMarkdown(displayContent, onHashtagClick);
        return highlightQueryText ? highlightHtml(baseHtml, highlightQueryText) : baseHtml;
    }, [displayContent, hideRenderedFallback, highlightQueryText]);

    const handleImageClick = (e, mediaId) => {
        e.stopPropagation();
        setZoomedImage(getMediaUrl(mediaId));
    };

    const [attachmentPreview, setAttachmentPreview] = useState(null);

    const handleAttachmentPreview = (attachment) => {
        setAttachmentPreview(attachment);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete?.(post);
    };

    const resolveInlineAttachments = (content, attachments) => {
        const usedIds = new Set();
        if (!content || attachments.length === 0) {
            return { content, usedIds };
        }

        const replaced = content.replace(/attachment:([^\s)"']+)/g, (match, rawRef, offset, source) => {
            const ref = rawRef.replace(/^\/+/, '');
            const byName = attachments.find(
                (entry) => entry.name && entry.name.toLowerCase() === ref.toLowerCase() && !usedIds.has(entry.id)
            );
            const entry = byName || attachments.find((item) => !usedIds.has(item.id));
            if (!entry) return match;
            usedIds.add(entry.id);
            const prefix = source.slice(Math.max(0, offset - 2), offset);
            if (prefix === '](') {
                return `/media/${entry.id}`;
            }
            return entry.name || 'attachment';
        });

        return { content: replaced, usedIds };
    };

    // Separate images from files using content_blocks info
    const imageItems: Array<{ id: number; annotations?: unknown; mimeType?: string }> = [];
    const fileIds = [];
    const attachmentEntries = [];
    const resourceLinks = [];
    const resources = [];
    const textAnnotations = [];
    let mediaIndex = 0;

    if (blocks.length > 0) {
        blocks.forEach((block) => {
            if (block?.type === 'text' && block.annotations) {
                textAnnotations.push(block.annotations);
            }
            if (block?.type === 'resource_link') {
                resourceLinks.push(block);
            } else if (block?.type === 'resource') {
                resources.push(block);
            } else if (block?.type === 'file') {
                const id = mediaIds[mediaIndex++];
                if (id) {
                    fileIds.push(id);
                    attachmentEntries.push({ id, name: block?.name || block?.filename || block?.title });
                }
            } else if (block?.type === 'image' || !block?.type) {
                const id = mediaIds[mediaIndex++];
                if (id) {
                    const mimeType =
                        typeof block?.mime_type === 'string' ? block.mime_type : undefined;
                    imageItems.push({ id, annotations: block?.annotations, mimeType });
                    attachmentEntries.push({ id, name: block?.name || block?.filename || block?.title });
                }
            }
        });
    } else if (mediaIds.length > 0) {
        mediaIds.forEach((id) => {
            imageItems.push({ id, annotations: null });
            attachmentEntries.push({ id, name: null });
        });
    }

    if (attachments.length > 0) {
        attachments.forEach((ref) => {
            if (!ref?.id) return;
            const match = attachmentEntries.find((entry) => String(entry.id) === String(ref.id));
            if (match && !match.name) {
                match.name = ref.label;
            }
        });
    }

    const { content: resolvedContent, usedIds } = resolveInlineAttachments(displayContent, attachmentEntries);
    displayContent = resolvedContent;
    const filteredImageItems = imageItems.filter(({ id }) => !usedIds.has(id));
    const filteredFileIds = fileIds.filter((id) => !usedIds.has(id));

    const attachmentPills = attachments.length > 0
        ? attachments.map((ref, idx) => ({
            id: ref.id || `attachment-${idx + 1}`,
            label: ref.label || `attachment-${idx + 1}`,
        }))
        : attachmentEntries.map((entry, idx) => ({
            id: entry.id,
            label: entry.name || `attachment-${idx + 1}`,
        }));

    // Extract adaptive card blocks from content_blocks
    const cardBlocks = useMemo(() => extractCardBlocks(blocks), [blocks]);

    // Render mermaid diagrams and enhance code blocks after content is mounted
    useEffect(() => {
        if (!contentRef.current) return undefined;
        renderMermaidDiagrams(contentRef.current);
        return enhanceCodeBlocks(contentRef.current);
    }, [renderedHtml]);

    // Render adaptive cards into their containers
    const cardContainerRef = useRef(null);
    useEffect(() => {
        if (!cardContainerRef.current || cardBlocks.length === 0) return;
        const container = cardContainerRef.current;
        container.innerHTML = '';
        for (const block of cardBlocks) {
            const cardEl = document.createElement('div');
            container.appendChild(cardEl);
            renderAdaptiveCard(cardEl, block, {
                onAction: async (action) => {
                    if (action.type === 'Action.OpenUrl') {
                        const safeUrl = sanitizeUrl(action.url || '');
                        if (!safeUrl) throw new Error('Invalid URL');
                        window.open(safeUrl, '_blank', 'noopener,noreferrer');
                        return;
                    }

                    if (action.type === 'Action.Submit') {
                        await submitAdaptiveCardAction({
                            post_id: post.id,
                            thread_id: data.thread_id || post.id,
                            card_id: block.card_id,
                            action: {
                                type: action.type,
                                title: action.title || '',
                                data: action.data,
                            },
                        });
                        return;
                    }

                    console.warn('[post] unsupported adaptive card action:', action.type, action);
                },
            }).catch((err) => {
                console.error('[post] adaptive card render error:', err);
                cardEl.textContent = block.fallback_text || 'Card failed to render.';
            });
        }
    }, [cardBlocks, data.thread_id, post.id]);

    return html`
        <div id=${`post-${post.id}`} class="post ${isAgent ? 'agent-post' : ''} ${isThreadReply ? 'thread-reply' : ''} ${isThreadPrev ? 'thread-prev' : ''} ${isThreadNext ? 'thread-next' : ''} ${isRemoving ? 'removing' : ''}" onClick=${onClick}>
            <div class="post-avatar ${isAgent ? 'agent-avatar' : ''} ${avatarInfo.image ? 'has-image' : ''}" style=${avatarStyle}>
                ${avatarInfo.image ? html`<img src=${avatarInfo.image} alt=${displayName} />` : avatarInfo.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${handleDeleteClick}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${displayName}</span>
                    <a class="post-time" href=${`#msg-${post.id}`} onClick=${(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onMessageRef) onMessageRef(post.id);
                    }}>${formatTime(post.timestamp)}</a>
                </div>
                ${isHardTruncated && truncatedInfo && html`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${formatCount(truncatedInfo.originalLength)} chars
                            ${truncatedInfo.maxLength ? html` • Display limit: ${formatCount(truncatedInfo.maxLength)} chars` : ''}
                        </div>
                    </div>
                `}
                ${isPreview && truncatedInfo && html`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${formatCount(truncatedInfo.maxLength)} of ${formatCount(truncatedInfo.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(fileRefs.length > 0 || messageRefs.length > 0 || attachmentPills.length > 0) && html`
                    <div class="post-file-refs">
                        ${messageRefs.map((id) => {
                            const scrollToRef = (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (onScrollToMessage) {
                                    onScrollToMessage(id);
                                } else {
                                    const el = document.getElementById('post-' + id);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        el.classList.add('post-highlight');
                                        setTimeout(() => el.classList.remove('post-highlight'), 2000);
                                    }
                                }
                            };
                            return html`
                                <a href=${`#msg-${id}`} class="post-msg-pill-link" onClick=${scrollToRef}>
                                    <${FilePill}
                                        prefix="post"
                                        label=${'msg:' + id}
                                        title=${'Message ' + id}
                                        icon="message"
                                        onClick=${scrollToRef}
                                    />
                                </a>
                            `;
                        })}
                        ${fileRefs.map((ref) => {
                            const label = ref.split('/').pop() || ref;
                            return html`
                                <${FilePill}
                                    prefix="post"
                                    label=${label}
                                    title=${ref}
                                    onClick=${() => onFileRef?.(ref)}
                                />
                            `;
                        })}
                        ${attachmentPills.map((attachment) => html`
                            <${AttachmentPill}
                                key=${attachment.id}
                                attachment=${attachment}
                                onPreview=${handleAttachmentPreview}
                            />
                        `)}
                    </div>
                `}
                ${shouldRenderContent && html`
                    <div 
                        ref=${contentRef}
                        class="post-content"
                        dangerouslySetInnerHTML=${{ __html: renderedHtml }}
                        onClick=${(e) => {
                            if (e.target.classList.contains('hashtag')) {
                                e.preventDefault();
                                e.stopPropagation();
                                const tag = e.target.dataset.hashtag;
                                if (tag) onHashtagClick?.(tag);
                            } else if (e.target.tagName === 'IMG') {
                                e.preventDefault();
                                e.stopPropagation();
                                setZoomedImage(e.target.src);
                            }
                        }}
                    />
                `}
                ${cardBlocks.length > 0 && html`
                    <div ref=${cardContainerRef} class="post-adaptive-cards" />
                `}
                ${textAnnotations.length > 0 && html`
                    ${textAnnotations.map((annotations, idx) => html`
                        <${AnnotationsBadge} key=${idx} annotations=${annotations} />
                    `)}
                `}
                ${filteredImageItems.length > 0 && html`
                    <div class="media-preview">
                        ${filteredImageItems.map(({ id, mimeType }) => {
                            const isSvg = typeof mimeType === 'string' && mimeType.toLowerCase().startsWith('image/svg');
                            const imageSrc = isSvg ? getMediaUrl(id) : getThumbnailUrl(id);
                            return html`
                                <img 
                                    key=${id} 
                                    src=${imageSrc} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(e) => handleImageClick(e, id)}
                                />
                            `;
                        })}
                    </div>
                `}
                ${filteredImageItems.length > 0 && html`
                    ${filteredImageItems.map(({ annotations }, idx) => html`
                        ${annotations && html`<${AnnotationsBadge} key=${idx} annotations=${annotations} />`}
                    `)}
                `}
                ${filteredFileIds.length > 0 && html`
                    <div class="file-attachments">
                        ${filteredFileIds.map(id => html`
                            <${FileAttachment} key=${id} mediaId=${id} onPreview=${handleAttachmentPreview} />
                        `)}
                    </div>
                `}
                ${resourceLinks.length > 0 && html`
                    <div class="resource-links">
                        ${resourceLinks.map((block, idx) => html`
                            <div key=${idx}>
                                <${ResourceLinkBlock} block=${block} />
                                <${AnnotationsBadge} annotations=${block.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${resources.length > 0 && html`
                    <div class="resource-embeds">
                        ${resources.map((block, idx) => html`
                            <div key=${idx}>
                                <${ResourceBlock} block=${block} />
                                <${AnnotationsBadge} annotations=${block.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${data.link_previews?.length > 0 && html`
                    <div class="link-previews">
                        ${data.link_previews.map((preview, i) => html`
                            <${LinkPreview} key=${i} preview=${preview} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${zoomedImage && html`<${ImageModal} src=${zoomedImage} onClose=${() => setZoomedImage(null)} />`}
        ${attachmentPreview && html`
            <${AttachmentPreviewModal}
                mediaId=${attachmentPreview.mediaId}
                info=${attachmentPreview.info}
                onClose=${() => setAttachmentPreview(null)}
            />
        `}
    `;
}
