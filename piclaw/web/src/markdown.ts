// @ts-nocheck

export const URL_REGEX = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
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
]);

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

function injectMermaidBlocks(html, blocks) {
    if (!html || !blocks || blocks.length === 0) return html;
    return html.replace(/@@MERMAID_BLOCK_(\d+)@@/g, (match, idxStr) => {
        const idx = Number(idxStr);
        const raw = blocks[idx] ?? '';
        const decoded = decodeMermaidBlock(raw);
        const encoded = btoa(unescape(encodeURIComponent(decoded)));
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
        const tagContent = isClosing ? trimmed.slice(1) : trimmed;
        const tagName = tagContent.split(/\s+/)[0]?.toLowerCase();
        if (!tagName || !ALLOWED_HTML_TAGS.has(tagName)) return match;
        const slash = isClosing ? '/' : '';
        return `<${slash}${tagName}>`;
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

    const decodeMath = (value) => decodeEntities(value).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');

    // Process display math first ($$...$$) - must not be inside code blocks
    html_content = html_content.replace(/\$\$([\s\S]+?)\$\$/g, (match, tex) => {
        try {
            return katex.renderToString(decodeMath(tex.trim()), { displayMode: true, throwOnError: false });
        } catch (e) {
            return `<span class="math-error" title="${e.message}">${match}</span>`;
        }
    });

    // Process inline math ($...$) - avoid matching $$, shell expansions, or currency
    html_content = html_content.replace(/(?<!\$)\$(?!\$|\(|\{|\[)([^\$\n]+?)\$(?!\$)/g, (match, tex) => {
        const trimmed = tex.trim();
        // Skip if it looks like currency ($ followed by number)
        if (/^\d/.test(trimmed)) return match;
        try {
            return katex.renderToString(decodeMath(tex.trim()), { displayMode: false, throwOnError: false });
        } catch (e) {
            return `<span class="math-error" title="${e.message}">${match}</span>`;
        }
    });

    return html_content;
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
export function renderMarkdown(text, onHashtagClick) {
    if (!text) return '';

    const { text: stripped, blocks: mermaidBlocks } = extractMermaidBlocks(text);

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
    return html_content;
}

// Render pending mermaid diagrams in the DOM
export async function renderMermaidDiagrams(container) {
    if (!window.beautifulMermaid) return;

    const { renderMermaid, THEMES } = window.beautifulMermaid;
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? THEMES['tokyo-night'] : THEMES['github-light'];

    const pending = container.querySelectorAll('.mermaid-container[data-mermaid]');
    for (const el of pending) {
        try {
            const encoded = el.dataset.mermaid;
            const raw = decodeURIComponent(escape(atob(encoded)));
            const code = decodeEntitiesDeep(raw, 2);
            const svg = await renderMermaid(code, { ...theme, transparent: true });
            el.innerHTML = svg;
            el.removeAttribute('data-mermaid');
        } catch (e) {
            console.error('Mermaid render error:', e);
            el.innerHTML = `<pre class="mermaid-error">Diagram error: ${e.message}</pre>`;
            el.removeAttribute('data-mermaid');
        }
    }
}
