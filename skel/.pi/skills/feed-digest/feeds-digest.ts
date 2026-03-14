#!/usr/bin/env bun
/**
 * feeds-digest.ts — Fetch RSS feeds from feeds.carmo.io, deduplicate
 * entries using SimHash, and output a markdown digest with a links index.
 */

import { writeFileSync } from "fs";

/** URL of the feed index page listing all RSS feed links. */
const FEED_INDEX_URL = "https://feeds.carmo.io/feeds/index.html";
/** Base URL prefix for resolving relative feed paths. */
const FEED_BASE_URL = "https://feeds.carmo.io/feeds/";
/** Default output path for the digest markdown file. */
const DEFAULT_OUT = "/workspace/notes/feeds-digest.md";
/** Default output path for the links JSON index. */
const DEFAULT_LINKS_OUT = "/workspace/notes/feeds-digest-links.json";
/** Default lookback window in hours. */
const DEFAULT_HOURS = 12;
/** Hamming distance threshold for near-duplicate detection. */
const DEFAULT_SIMHASH_THRESHOLD = 8;

/** Parse CLI arguments into a key-value options object. */
function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let out = DEFAULT_OUT;
  let linksOut = DEFAULT_LINKS_OUT;
  let hours = DEFAULT_HOURS;
  let threshold = DEFAULT_SIMHASH_THRESHOLD;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--out") {
      const next = args[i + 1];
      if (next) {
        out = next;
        i += 1;
      }
      continue;
    }
    if (arg.startsWith("--out=")) {
      out = arg.slice("--out=".length);
      continue;
    }
    if (arg === "--links-out") {
      const next = args[i + 1];
      if (next) {
        linksOut = next;
        i += 1;
      }
      continue;
    }
    if (arg.startsWith("--links-out=")) {
      linksOut = arg.slice("--links-out=".length);
      continue;
    }
    if (arg === "--hours") {
      const next = args[i + 1];
      if (next) {
        const parsed = Number.parseInt(next, 10);
        if (Number.isFinite(parsed) && parsed > 0) hours = parsed;
        i += 1;
      }
      continue;
    }
    if (arg.startsWith("--hours=")) {
      const parsed = Number.parseInt(arg.slice("--hours=".length), 10);
      if (Number.isFinite(parsed) && parsed > 0) hours = parsed;
      continue;
    }
    if (arg === "--simhash") {
      const next = args[i + 1];
      if (next) {
        const parsed = Number.parseInt(next, 10);
        if (Number.isFinite(parsed) && parsed >= 0) threshold = parsed;
        i += 1;
      }
      continue;
    }
    if (arg.startsWith("--simhash=")) {
      const parsed = Number.parseInt(arg.slice("--simhash=".length), 10);
      if (Number.isFinite(parsed) && parsed >= 0) threshold = parsed;
      continue;
    }
  }

  return { out, linksOut, hours, threshold };
}

/** Decode common HTML entities (&amp; &lt; &gt; &quot;) in a string. */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/** Extract RSS feed URLs from the feed index HTML page. */
async function extractFeedUrls(indexHtml: string): Promise<string[]> {
  const urls: string[] = [];
  const rewriter = new HTMLRewriter().on("a", {
    element(el) {
      const href = el.getAttribute("href") || "";
      if (href.endsWith(".xml")) {
        urls.push(new URL(href, FEED_BASE_URL).toString());
      }
    },
  });

  await rewriter.transform(new Response(indexHtml)).text();
  return Array.from(new Set(urls));
}

/** Extract the text content of an XML/HTML tag from a string. */
function extractTag(block: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = regex.exec(block);
  if (!match) return "";
  return decodeEntities(match[1].trim());
}

/** Extract all <item> blocks from an RSS XML string. */
function extractItemBlocks(xml: string): string[] {
  const blocks: string[] = [];
  const regex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(xml)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

/** Clean up summary text: collapse whitespace and strip empty lines. */
function normalizeSummaryText(text: string): string {
  return text
    .replace(/\blink\s*\((https?:\/\/[^)]+)\)/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove @@URL@@...@@URL@@ markers and collect the URLs. */
function stripUrlMarkers(text: string): { text: string; urls: string[] } {
  const urls: string[] = [];
  const cleaned = text.replace(/@@URL@@([^@]+)@@URL@@/g, (_, url) => {
    urls.push(url);
    return "";
  });
  return { text: normalizeSummaryText(cleaned), urls };
}

/** Parse HTML content into titled sections with item lists. */
async function extractSectionsFromContent(contentHtml: string): Promise<Array<{ title: string; items: Array<{ text: string; urls: string[] }> }>> {
  if (!contentHtml) return [];
  const decoded = decodeEntities(contentHtml);

  const lines: string[] = [];
  const rewriter = new HTMLRewriter()
    .on("h2, h3, h4", {
      element(el) {
        el.before("\n@@HEADER@@", { html: false });
        el.after("\n", { html: false });
      },
    })
    .on("li", {
      element(el) {
        el.before("\n@@ITEM@@", { html: false });
      },
    })
    .on("a", {
      element(el) {
        const href = el.getAttribute("href");
        if (href) {
          el.after(`@@URL@@${href}@@URL@@`, { html: false });
        }
      },
    });

  const transformed = rewriter.transform(new Response(decoded));
  const raw = await transformed.text();
  const text = decodeEntities(raw).replace(/<[^>]+>/g, " ");
  for (const line of text.split("\n")) {
    const trimmed = line.replace(/\s+/g, " ").trim();
    if (!trimmed) continue;
    lines.push(trimmed);
  }

  const sections: Array<{ title: string; items: Array<{ text: string; urls: string[] }> }> = [];
  let currentTitle = "Highlights";
  let currentItems: Array<{ text: string; urls: string[] }> = [];

  const flush = () => {
    if (currentItems.length > 0) {
      sections.push({ title: currentTitle, items: currentItems });
    }
  };

  for (const line of lines) {
    if (line.startsWith("@@HEADER@@")) {
      flush();
      currentTitle = line.replace("@@HEADER@@", "").trim() || "Highlights";
      currentItems = [];
      continue;
    }
    if (line.startsWith("@@ITEM@@")) {
      const item = line.replace("@@ITEM@@", "").trim();
      if (item) currentItems.push(stripUrlMarkers(item));
    }
  }

  flush();
  return sections;
}

/** Split text into lowercase alphanumeric tokens for hashing. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

/** Compute a 64-bit FNV-1a hash of a token string. */
function hashToken(token: string): bigint {
  let hash = 14695981039346656037n;
  const prime = 1099511628211n;
  for (const ch of token) {
    hash ^= BigInt(ch.charCodeAt(0));
    hash = (hash * prime) & ((1n << 64n) - 1n);
  }
  return hash;
}

/** Compute a 64-bit SimHash fingerprint for near-duplicate detection. */
function simhash(text: string): bigint {
  const weights = Array(64).fill(0);
  for (const token of tokenize(text)) {
    const hash = hashToken(token);
    for (let i = 0; i < 64; i += 1) {
      const bit = (hash >> BigInt(i)) & 1n;
      weights[i] += bit === 1n ? 1 : -1;
    }
  }
  let result = 0n;
  for (let i = 0; i < 64; i += 1) {
    if (weights[i] >= 0) {
      result |= 1n << BigInt(i);
    }
  }
  return result;
}

/** Count the number of differing bits between two SimHash values. */
function hammingDistance(a: bigint, b: bigint): number {
  let x = a ^ b;
  let count = 0;
  while (x > 0n) {
    count += Number(x & 1n);
    x >>= 1n;
  }
  return count;
}

/** Fetch feeds, deduplicate, and write the digest markdown and links JSON. */
async function main() {
  const { out, linksOut, hours, threshold } = parseArgs(process.argv);
  const indexResponse = await fetch(FEED_INDEX_URL);
  if (!indexResponse.ok) {
    throw new Error(`Failed to fetch feed index: ${indexResponse.status}`);
  }
  const indexHtml = await indexResponse.text();
  const feedUrls = await extractFeedUrls(indexHtml);

  const now = new Date();
  const windowStart = new Date(now.getTime() - hours * 60 * 60 * 1000);

  const allItems: Array<{
    title: string;
    link: string;
    pubDate: Date;
    feedTitle: string;
    detailSections: Array<{ title: string; items: Array<{ text: string; urls: string[] }> }>;
    simhash: bigint;
    summaryText: string;
  }> = [];

  for (const url of feedUrls) {
    const response = await fetch(url);
    if (!response.ok) {
      continue;
    }
    const xml = await response.text();
    const feedTitle = extractTag(xml, "title") || "Unknown Feed";

    for (const block of extractItemBlocks(xml)) {
      const title = extractTag(block, "title") || "(untitled)";
      const link = extractTag(block, "link") || "";
      const pubDateRaw = extractTag(block, "pubDate") || extractTag(block, "date");
      const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;
      if (!pubDate || !Number.isFinite(pubDate.getTime())) continue;
      if (pubDate < windowStart || pubDate > now) continue;
      const contentHtml = extractTag(block, "content:encoded") || extractTag(block, "description");
      const detailSections = await extractSectionsFromContent(contentHtml);
      const summaryText = detailSections
        .flatMap((section) => [section.title, ...section.items.map((item) => item.text)])
        .join(" ");
      const signature = simhash(`${title} ${summaryText}`);
      allItems.push({ title, link, pubDate, feedTitle, detailSections, simhash: signature, summaryText });
    }
  }

  const sortedItems = allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  const uniqueItems: typeof allItems = [];
  const seenKey = new Set<string>();

  for (const item of sortedItems) {
    const key = `${item.title}|${item.link}`;
    if (seenKey.has(key)) continue;
    seenKey.add(key);

    const duplicate = uniqueItems.find((existing) => hammingDistance(existing.simhash, item.simhash) <= threshold);
    if (duplicate) continue;

    uniqueItems.push(item);
  }

  const lines: string[] = [];
  for (const item of uniqueItems) {
    lines.push(`## ${item.title}`);
    lines.push(`Source: ${item.feedTitle} • ${item.pubDate.toISOString()}`);
    if (item.detailSections.length === 0) {
      lines.push("- No detailed summary available.");
    } else {
      for (const section of item.detailSections) {
        lines.push(`- **${section.title}**`);
        for (const bullet of section.items) {
          lines.push(`  - ${bullet.text}`);
        }
      }
    }
    lines.push("");
  }

  const header = [
    `# Feed digest (last ${hours} hours, deduped)`,
    `Generated: ${now.toISOString()}`,
    `Window: ${windowStart.toISOString()} – ${now.toISOString()}`,
    `Items: ${uniqueItems.length} (deduped from ${allItems.length}, simhash ≤ ${threshold})`,
    "",
  ];

  if (lines.length === 0) {
    lines.push("No items found in the requested time window.");
  }

  const content = [...header, ...lines].join("\n");
  writeFileSync(out, content, "utf-8");

  const linkIndex = uniqueItems.map((item, idx) => ({
    id: `item-${idx + 1}`,
    title: item.title,
    feed: item.feedTitle,
    published: item.pubDate.toISOString(),
    url: item.link || null,
    sections: item.detailSections.map((section) => ({
      title: section.title,
      items: section.items,
    })),
  }));

  writeFileSync(linksOut, `${JSON.stringify(linkIndex, null, 2)}\n`, "utf-8");
  console.log(out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
