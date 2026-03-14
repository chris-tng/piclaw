#!/usr/bin/env bun
/**
 * quick-twitter-summary.ts — Lightweight Twitter/X summary via Nitter HTML
 * scraping (no browser needed). Fetches, parses, and outputs JSON.
 */
import { parseHTML } from "linkedom";

/** Parse CLI flags (--key value) into a key-value object. */
function parseArgs(argv: string[]) {
  const parsed: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [key, inline] = arg.slice(2).split("=");
    if (!key) continue;
    if (inline !== undefined) {
      parsed[key] = inline;
      continue;
    }
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      i += 1;
    } else {
      parsed[key] = "true";
    }
  }
  return parsed;
}

/** Parse a string to an integer, returning a fallback on failure. */
function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Extract a short plain-text summary from markdown content. */
function summarizeMarkdown(markdown: string, maxSentences = 3, maxChars = 600) {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, (match) => match.replace(/\[(.*?)\]\(.*?\)/g, "$1"))
    .replace(/[#>*_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const sentences = cleaned.split(/(?<=[.!?])\s+/g).filter(Boolean);
  const selected = sentences.slice(0, maxSentences).join(" ");
  if (selected.length <= maxChars) return selected;
  return selected.slice(0, maxChars).trim() + "…";
}

/** Fetch a URL with a timeout, returning null on failure. */
async function tryFetch(url: string, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Piclaw/1.0)' } });
    if (!res.ok) {
      return { ok: false, status: res.status, text: null };
    }
    const text = await res.text();
    return { ok: true, status: res.status, text };
  } catch (err) {
    return { ok: false, status: 0, text: null };
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  const opts = parseArgs(process.argv.slice(2));
  const handle = opts.handle || opts.h || "badlogicgames";
  const hours = parseNumber(opts.hours || opts.hrs, 16);
  const maxTweets = parseNumber(opts.max || opts.limit, 200);
  const instances = (opts.instances || "https://nitter.net,https://nitter.snopyta.org,https://nitter.kavin.rocks,https://nitter.1d4.us").split(",").map((s) => s.trim()).filter(Boolean);

  const now = Date.now();
  const cutoff = now - hours * 3600 * 1000;

  let html: string | null = null;
  let usedInstance: string | null = null;

  for (const base of instances) {
    const url = `${base.replace(/\/+$/, "")}/${handle}`;
    console.error(`Trying ${url}`);
    try {
      const res = await tryFetch(url, 10000);
      if (!res.ok || !res.text) {
        console.error(`  -> failed (status=${res.status})`);
        continue;
      }
      if (res.text.length < 50) {
        console.error(`  -> empty response`);
        continue;
      }
      html = res.text;
      usedInstance = base;
      console.error(`  -> ok (len=${res.text.length})`);
      break;
    } catch (err) {
      console.error(`  -> error ${String(err)}`);
      continue;
    }
  }

  if (!html) {
    console.error("No instance returned page content. Network or remote blocking suspected.");
    process.exit(2);
  }

  const { document } = parseHTML(html);

  // candidates: nitter uses .timeline-item, .tweet, .timeline .timeline-item, li.timeline-item
  const candidates = Array.from(document.querySelectorAll('div.timeline-item, div.tweet, li.timeline-item, div.status'));

  const tweets: Array<any> = [];

  for (const el of candidates) {
    if (tweets.length >= maxTweets) break;

    // try to find time
    let timeEl = el.querySelector('time');
    let dateStr: string | null = null;
    if (timeEl) {
      dateStr = (timeEl.getAttribute('datetime') || timeEl.textContent || '').trim();
    }
    if (!dateStr) {
      // anchor to status
      const link = el.querySelector('a[href*="/status/"]');
      if (link) {
        const title = link.getAttribute('title') || link.textContent || '';
        dateStr = title.trim();
      }
    }

    if (!dateStr) {
      // fallback: skip
      continue;
    }

    // attempt parse
    let parsed = Date.parse(dateStr);
    if (isNaN(parsed)) {
      // try parse formats like "2h", "3d" — skip those (can't reliably interpret)
      // try to extract ISO in title like "2026-02-25 10:12:34"
      const isoMatch = dateStr.match(/(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2})/);
      if (isoMatch) parsed = Date.parse(isoMatch[1]);
    }
    if (isNaN(parsed)) {
      // cannot parse date, skip
      continue;
    }
    if (parsed < cutoff) continue; // older than cutoff

    // extract content
    let contentEl = el.querySelector('.tweet-content, .status__content, .tweet-body, .tweet-text, .content, p');
    let content = contentEl ? (contentEl.textContent || '') : (el.textContent || '');
    content = content.replace(/\s+/g, ' ').trim();
    if (!content) continue;

    // classify
    const isRetweet = /Retweet(ed)?|RT @/i.test(content) || !!el.querySelector('.retweet');
    const isReply = !!el.querySelector('.reply') || /in reply to/i.test(content) || /replying to/i.test(content);

    const linkEl = el.querySelector('a[href*="/status/"]');
    const href = linkEl ? (linkEl.getAttribute('href') || '') : '';
    let url = '';
    if (href) url = href.startsWith('http') ? href : `${usedInstance.replace(/\/+$/, '')}${href}`;

    tweets.push({ date: new Date(parsed).toISOString(), content, isRetweet, isReply, url });
  }

  tweets.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  if (tweets.length === 0) {
    console.error('No tweets found in the last', hours, 'hours on the instances tried.');
    process.exit(3);
  }

  const previewItems = tweets.slice(-20).reverse();
  const aggregateText = previewItems.map((t: any) => `${t.isRetweet ? '[RT] ' : t.isReply ? '[Reply] ' : ''}${t.content}`).join("\n\n");

  const summary = summarizeMarkdown(aggregateText, 4, 600);

  // print a compact report
  const report = {
    handle,
    hours,
    instance: usedInstance,
    count: tweets.length,
    summary,
    items: previewItems.map((t: any) => ({ date: t.date, url: t.url, type: t.isRetweet ? 'retweet' : t.isReply ? 'reply' : 'tweet', text: t.content.slice(0, 280) })),
  };

  console.log(JSON.stringify(report, null, 2));
})();