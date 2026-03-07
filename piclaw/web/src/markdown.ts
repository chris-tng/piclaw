// @ts-nocheck

/** Regex matching HTTP/HTTPS URLs in message text. */
export const URL_REGEX = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
/** Regex matching #hashtag tokens in message text. */
export const HASHTAG_REGEX = /#(\w+)/g;

const ALLOWED_HTML_TAGS = new Set([
    'strong',
    'em',
    'b',
    'i',
    'u',
    's',
    'br',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'ruby',
    'rt',
    'rp',
]);

const SAFE_TAGS = new Set([
    'a',
    'abbr',
    'blockquote',
    'br',
    'code',
    'div',
    'em',
    'hr',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'img',
    'kbd',
    'li',
    'mark',
    'ol',
    'p',
    'pre',
    'ruby',
    'rt',
    'rp',
    's',
    'span',
    'strong',
    'sub',
    'sup',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
    // KaTeX/MathML tags
    'math',
    'semantics',
    'mrow',
    'mi',
    'mn',
    'mo',
    'mtext',
    'mspace',
    'msup',
    'msub',
    'msubsup',
    'mfrac',
    'msqrt',
    'mroot',
    'mtable',
    'mtr',
    'mtd',
    'annotation',
]);

const GLOBAL_ALLOWED_ATTRS = new Set([
    'class',
    'style',
    'title',
    'role',
    'aria-hidden',
    'aria-label',
    'aria-expanded',
    'aria-live',
    'data-mermaid',
    'data-hashtag',
]);

const TAG_ALLOWED_ATTRS = {
    a: new Set(['href', 'target', 'rel']),
    img: new Set(['src', 'alt', 'title']),
};

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', '']);

function escapeHtmlAttr(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;');
}

export function sanitizeUrl(url, options = {}) {
    if (!url) return null;
    const raw = String(url).trim();
    if (!raw) return null;

    if (raw.startsWith('#') || raw.startsWith('/')) return raw;

    if (raw.startsWith('data:')) {
        if (options.allowDataImage && /^data:image\//i.test(raw)) {
            return raw;
        }
        return null;
    }

    if (raw.startsWith('blob:')) return raw;

    try {
        const parsed = new URL(raw, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;
        return parsed.href;
    } catch {
        return null;
    }
}

function sanitizeHtml(html, options = {}) {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nodes = [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }

    for (const el of nodes) {
        const tag = el.tagName.toLowerCase();
        if (!SAFE_TAGS.has(tag)) {
            const parent = el.parentNode;
            if (!parent) continue;
            while (el.firstChild) {
                parent.insertBefore(el.firstChild, el);
            }
            parent.removeChild(el);
            continue;
        }

        const allowedAttrs = TAG_ALLOWED_ATTRS[tag] || new Set();
        for (const attr of Array.from(el.attributes)) {
            const name = attr.name.toLowerCase();
            const value = attr.value;
            if (name.startsWith('on')) {
                el.removeAttribute(attr.name);
                continue;
            }
            if (name.startsWith('data-') || name.startsWith('aria-')) {
                continue;
            }
            if (allowedAttrs.has(name) || GLOBAL_ALLOWED_ATTRS.has(name)) {
                if (name === 'href') {
                    const safe = sanitizeUrl(value);
                    if (!safe) {
                        el.removeAttribute(attr.name);
                    } else {
                        el.setAttribute(attr.name, safe);
                        if (tag === 'a' && !el.getAttribute('rel')) {
                            el.setAttribute('rel', 'noopener noreferrer');
                        }
                    }
                } else if (name === 'src') {
                    const rewritten = tag === 'img' && typeof options.rewriteImageSrc === 'function'
                        ? options.rewriteImageSrc(value)
                        : value;
                    const safe = sanitizeUrl(rewritten, { allowDataImage: tag === 'img' });
                    if (!safe) {
                        el.removeAttribute(attr.name);
                    } else {
                        el.setAttribute(attr.name, safe);
                    }
                }
                continue;
            }
            el.removeAttribute(attr.name);
        }
    }

    return doc.body.innerHTML;
}

/**
 * Decode HTML entities
 */
export function decodeEntities(text) {
    if (!text) return text;
    // Escape literal angle brackets so DOMParser doesn't treat them as tags
    const safe = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const doc = new DOMParser().parseFromString(safe, 'text/html');
    return doc.documentElement.textContent;
}

/** Recursively decode HTML entities up to maxDepth iterations. */
export function decodeEntitiesDeep(text, maxDepth = 2) {
    if (!text) return text;
    let current = text;
    for (let i = 0; i < maxDepth; i += 1) {
        const next = decodeEntities(current);
        if (next === current) break;
        current = next;
    }
    return current;
}

function extractMermaidBlocks(text) {
    if (!text) return { text: '', blocks: [] };
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    const blocks = [];
    const output = [];
    let inMermaid = false;
    let current = [];

    for (const line of lines) {
        if (!inMermaid && line.trim().match(/^```mermaid\s*$/i)) {
            inMermaid = true;
            current = [];
            continue;
        }
        if (inMermaid && line.trim().match(/^```\s*$/)) {
            const idx = blocks.length;
            blocks.push(current.join('\n'));
            output.push(`@@MERMAID_BLOCK_${idx}@@`);
            inMermaid = false;
            current = [];
            continue;
        }
        if (inMermaid) {
            current.push(line);
        } else {
            output.push(line);
        }
    }

    if (inMermaid) {
        output.push('```mermaid');
        output.push(...current);
    }

    return { text: output.join('\n'), blocks };
}

function decodeMermaidBlock(text) {
    if (!text) return text;
    return decodeEntitiesDeep(text, 5);
}

function toBase64(value) {
    const bytes = new TextEncoder().encode(String(value || ''));
    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
}

function fromBase64(value) {
    const binary = atob(String(value || ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

function injectMermaidBlocks(html, blocks) {
    if (!html || !blocks || blocks.length === 0) return html;
    return html.replace(/@@MERMAID_BLOCK_(\d+)@@/g, (match, idxStr) => {
        const idx = Number(idxStr);
        const raw = blocks[idx] ?? '';
        const decoded = decodeMermaidBlock(raw);
        const encoded = toBase64(decoded);
        return `<div class="mermaid-container" data-mermaid="${encoded}"><div class="mermaid-loading">Loading diagram...</div></div>`;
    });
}

function normalizeHtmlCodeTags(text) {
    if (!text) return text;
    return text.replace(/<code>([\s\S]*?)<\/code>/gi, (match, code) => {
        if (code.includes('\n')) {
            return `\n\`\`\`\n${code}\n\`\`\`\n`;
        }
        return `\`${code}\``;
    });
}

function restoreAllowedHtmlTags(text) {
    if (!text) return text;
    return text.replace(/&lt;([\s\S]*?)&gt;/g, (match, content) => {
        const trimmed = content.trim();
        const isClosing = trimmed.startsWith('/');
        const rawTag = isClosing ? trimmed.slice(1).trim() : trimmed;
        const isSelfClosing = rawTag.endsWith('/');
        const tagContent = isSelfClosing ? rawTag.slice(0, -1).trim() : rawTag;
        const tagName = tagContent.split(/\s+/)[0]?.toLowerCase();
        if (!tagName || !ALLOWED_HTML_TAGS.has(tagName)) return match;
        // Void tag: never emit a closing </br>
        if (tagName === 'br') {
            return isClosing ? '' : '<br>';
        }
        if (isClosing) return `</${tagName}>`;
        return `<${tagName}>`;
    });
}

function decodeCodeEntities(html) {
    if (!html) return html;
    const normalize = (value) => value
        .replace(/&amp;lt;/g, '&lt;')
        .replace(/&amp;gt;/g, '&gt;')
        .replace(/&amp;quot;/g, '&quot;')
        .replace(/&amp;#39;/g, '&#39;')
        .replace(/&amp;amp;/g, '&amp;');
    return html
        .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => `<pre><code>${normalize(code)}</code></pre>`)
        .replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => `<code>${normalize(code)}</code>`);
}

function decodeTextEntities(html) {
    if (!html) return html;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const decode = (value) => value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    let node;
    while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;
        const next = decode(node.nodeValue);
        if (next !== node.nodeValue) {
            node.nodeValue = next;
        }
    }
    return doc.body.innerHTML;
}


/**
 * Render LaTeX math expressions using KaTeX
 * Handles $$...$$ for display math and $...$ for inline math
 */
function renderMath(html_content) {
    if (!window.katex) return html_content;

    const decodeMath = (value) => decodeEntities(value)
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/<br\s*\/?\s*>/gi, '\n');

    const stripCodeBlocks = (html) => {
        const blocks = [];
        let output = html.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi, (match) => {
            const idx = blocks.length;
            blocks.push(match);
            return `@@CODE_BLOCK_${idx}@@`;
        });
        output = output.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, (match) => {
            const idx = blocks.length;
            blocks.push(match);
            return `@@CODE_INLINE_${idx}@@`;
        });
        return { html: output, blocks };
    };

    const restoreCodeBlocks = (html, blocks) => {
        if (!blocks.length) return html;
        return html.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g, (_match, idxStr) => {
            const idx = Number(idxStr);
            return blocks[idx] ?? '';
        });
    };

    const stripped = stripCodeBlocks(html_content);
    let processed = stripped.html;

    // Process display math first ($$...$$) - require block delimiters on their own line
    processed = processed.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi, (match, leading, tex) => {
        try {
            const rendered = katex.renderToString(decodeMath(tex.trim()), { displayMode: true, throwOnError: false });
            return `${leading}${rendered}`;
        } catch (e) {
            return `<span class="math-error" title="${escapeHtmlAttr(e.message)}">${match}</span>`;
        }
    });

    // Process inline math ($...$) with simple guardrails to avoid $$ and whitespace edges.
    processed = processed.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g, (match, leading, tex) => {
        if (/\s$/.test(tex)) return match;
        try {
            const rendered = katex.renderToString(decodeMath(tex), { displayMode: false, throwOnError: false });
            return `${leading}${rendered}`;
        } catch (e) {
            return `${leading}<span class="math-error" title="${escapeHtmlAttr(e.message)}">$${tex}$</span>`;
        }
    });

    return restoreCodeBlocks(processed, stripped.blocks);
}

/**
 * Linkify hashtags in rendered HTML, avoiding links/code blocks.
 */
function linkifyHashtagsInHtml(html_content) {
    if (!html_content) return html_content;
    const doc = new DOMParser().parseFromString(html_content, 'text/html');
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }
    for (const textNode of nodes) {
        const value = textNode.nodeValue;
        if (!value) continue;
        HASHTAG_REGEX.lastIndex = 0;
        if (!HASHTAG_REGEX.test(value)) continue;
        HASHTAG_REGEX.lastIndex = 0;
        const parent = textNode.parentElement;
        if (parent && (parent.closest('a') || parent.closest('code') || parent.closest('pre'))) continue;
        const parts = value.split(HASHTAG_REGEX);
        if (parts.length <= 1) continue;
        const fragment = doc.createDocumentFragment();
        parts.forEach((part, idx) => {
            if (idx % 2 === 1) {
                const link = doc.createElement('a');
                link.setAttribute('href', '#');
                link.className = 'hashtag';
                link.setAttribute('data-hashtag', part);
                link.textContent = `#${part}`;
                fragment.appendChild(link);
            } else {
                fragment.appendChild(doc.createTextNode(part));
            }
        });
        textNode.parentNode?.replaceChild(fragment, textNode);
    }
    return doc.body.innerHTML;
}

/**
 * Render markdown and then linkify hashtags
 */
function normalizeMathFences(text) {
    if (!text) return text;
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    const output = [];
    let inMath = false;

    for (const line of lines) {
        if (!inMath && line.trim().match(/^```(?:math|katex|latex)\s*$/i)) {
            inMath = true;
            output.push('$$');
            continue;
        }
        if (inMath && line.trim().match(/^```\s*$/)) {
            inMath = false;
            output.push('$$');
            continue;
        }
        output.push(line);
    }

    return output.join('\n');
}

/** Render markdown text to sanitised HTML with syntax highlighting. */
export function renderMarkdown(text, onHashtagClick, options = {}) {
    if (!text) return '';

    const normalizedMath = normalizeMathFences(text);
    const { text: stripped, blocks: mermaidBlocks } = extractMermaidBlocks(normalizedMath);

    // Decode HTML entities first (in case content has encoded entities)
    const decoded = decodeEntitiesDeep(stripped, 2);
    const normalized = normalizeHtmlCodeTags(decoded);
    const escaped = normalized
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const safeHtml = restoreAllowedHtmlTags(escaped);

    // Render markdown to HTML (preserve escaped HTML)
    let html_content = window.marked
        ? marked.parse(safeHtml, { headerIds: false, mangle: false })
        : safeHtml.replace(/\n/g, '<br>');

    html_content = decodeCodeEntities(html_content);
    html_content = decodeTextEntities(html_content);

    // Render math expressions
    html_content = renderMath(html_content);

    // Process hashtags without breaking links
    html_content = linkifyHashtagsInHtml(html_content);

    // Inject Mermaid blocks after markdown processing to avoid double-encoding
    html_content = injectMermaidBlocks(html_content, mermaidBlocks);

    // Sanitize HTML output (links/attributes/tags)
    html_content = sanitizeHtml(html_content, options);

    return html_content;
}

/**
 * Render thinking panels with markdown while keeping tags/quotes intact.
 */
export function renderThinkingMarkdown(text) {
    if (!text) return '';
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const decoded = decodeEntitiesDeep(normalized, 2);
    const normalizedHtml = normalizeHtmlCodeTags(decoded);
    const escaped = normalizedHtml
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const safeHtml = restoreAllowedHtmlTags(escaped);
    let html_content = window.marked ? marked.parse(safeHtml) : safeHtml.replace(/\n/g, '<br>');
    html_content = decodeCodeEntities(html_content);
    html_content = decodeTextEntities(html_content);
    // Avoid math rendering in thought/draft panels to prevent shell $ variables
    // from being misinterpreted as inline LaTeX.
    html_content = sanitizeHtml(html_content);
    return html_content;
}

// Render pending mermaid diagrams in the DOM
/** Find mermaid code blocks in a container and render them as SVG diagrams. */
export async function renderMermaidDiagrams(container) {
    if (!window.beautifulMermaid) return;

    const { renderMermaid, THEMES } = window.beautifulMermaid;
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? THEMES['tokyo-night'] : THEMES['github-light'];

    const pending = container.querySelectorAll('.mermaid-container[data-mermaid]');
    for (const el of pending) {
        try {
            const encoded = el.dataset.mermaid;
            const raw = fromBase64(encoded || '');
            const code = decodeEntitiesDeep(raw, 2);
            const svg = await renderMermaid(code, { ...theme, transparent: true });
            el.innerHTML = svg;
            el.removeAttribute('data-mermaid');
        } catch (e) {
            console.error('Mermaid render error:', e);
            const pre = document.createElement('pre');
            pre.className = 'mermaid-error';
            pre.textContent = `Diagram error: ${e.message}`;
            el.innerHTML = '';
            el.appendChild(pre);
            el.removeAttribute('data-mermaid');
        }
    }
}
