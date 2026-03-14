#!/usr/bin/env bun
/**
 * playwright-twitter-summary.ts — Scrape a Twitter/X user's recent tweets
 * via Nitter instances using Playwright, and output a JSON summary.
 */
import { chromium } from "playwright";

/** Main entry: scrape tweets via Playwright and output JSON summary. */
async function run() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith("--")) continue;
    const [k, v] = a.slice(2).split("=");
    opts[k] = v === undefined ? "true" : v;
  }
  const handle = opts.handle || opts.h || "badlogicgames";
  const hours = parseInt(opts.hours || opts.hrs || "16", 10) || 16;
  const instances = (opts.instances || "https://nitter.net,https://nitter.tiekoetter.com,https://nitter.snopyta.org,https://nitter.kavin.rocks,https://nitter.1d4.us").split(",").map(s => s.trim()).filter(Boolean);
  const cutoff = Date.now() - hours * 3600 * 1000;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
  const page = await context.newPage();

  for (const base of instances) {
    const url = `${base.replace(/\/+$/, '')}/${handle}`;
    console.error(`Trying ${url}`);
    try {
      const allItems: any[] = [];
      let pageUrl = url;
      const maxPages = 10;

      for (let pg = 0; pg < maxPages; pg++) {
        console.error(`  page ${pg + 1}: ${pageUrl}`);
        const res = await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 20000 });
        if (!res || res.status() >= 400) {
          if (pg === 0) {
            console.error(`  -> HTTP status ${res ? res.status() : 'no-res'}`);
            break;
          }
          break;
        }

        if (pg === 0) {
          try {
            await page.waitForSelector('div.timeline-item, div.status, article, li.timeline-item, .timeline', { timeout: 8000 });
          } catch (e) {
            console.error('  -> timeline selector not found (but continuing)');
          }
        }

      const now = Date.now();
      const items = await page.$$eval('div.timeline-item, div.status, article, li.timeline-item, .timeline-item, .status', (nodes) => {
        const nowMs = Date.now();
        /** Parse a relative or absolute date string into a Unix timestamp. */
        function parseDateText(t) {
          if (!t) return null;
          t = ('' + t).trim();
          // relative like '2h', '15m', '10s', '3d'
          const rel = t.match(/^(\d+)(s|m|h|d)$/i);
          if (rel) {
            const n = Number(rel[1]);
            const u = rel[2].toLowerCase();
            if (u === 's') return nowMs - n * 1000;
            if (u === 'm') return nowMs - n * 60 * 1000;
            if (u === 'h') return nowMs - n * 60 * 60 * 1000;
            if (u === 'd') return nowMs - n * 24 * 60 * 60 * 1000;
          }

          // try Date.parse
          const parsed = Date.parse(t);
          if (!isNaN(parsed)) return parsed;

          // try common formats without year like '2 Nov' -> append current year
          const monthDay = t.match(/^(\d{1,2})\s+([A-Za-z]+)$/);
          if (monthDay) {
            const year = new Date().getFullYear();
            const p = Date.parse(`${t} ${year}`);
            if (!isNaN(p)) return p;
          }

          // try formats like '2 Nov 2025'
          const md = t.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
          if (md) {
            const p = Date.parse(t);
            if (!isNaN(p)) return p;
          }

          return null;
        }

        return nodes.map((n) => {
          // extract content
          const contentEl = n.querySelector('.tweet-content, .status__content, .tweet-body, .tweet-text, .content, p');
          const content = contentEl ? (contentEl.textContent || '').trim() : (n.textContent || '').trim();

          // find time: <time>, or anchor with status and text
          const timeEl = n.querySelector('time');
          let dtText = null;
          if (timeEl) dtText = timeEl.getAttribute('datetime') || timeEl.getAttribute('title') || timeEl.textContent;

          // find anchor with status
          const a = n.querySelector('a[href*="/status/"]');
          let aText = null;
          let href = null;
          if (a) {
            aText = a.textContent ? a.textContent.trim() : null;
            href = a.getAttribute('href') || null;
            // sometimes the date is in a child anchor with text like '2 Nov 2025'
            if (!dtText && aText && /\d/.test(aText)) dtText = aText;
          }

          // also check for small/localized date nodes
          if (!dtText) {
            const dateCandidate = n.querySelector('.date, .tweet-date, .status__timestamp');
            if (dateCandidate) dtText = dateCandidate.textContent;
          }

          const ts = parseDateText(dtText);

          const isRetweet = /Retweet(ed)?|RT @/i.test(content) || Boolean(n.querySelector('.retweet'));
          const isReply = Boolean(n.querySelector('.reply')) || /in reply to/i.test(content) || /replying to/i.test(content);

          return { ts, dtText, content: content.replace(/\s+/g, ' ').trim(), isRetweet, isReply, href };
        }).filter(Boolean);
      });

        // Check if any items on this page are within our window
        const pageFiltered = items.filter(it => it.ts && it.ts >= cutoff);
        allItems.push(...pageFiltered);

        // If oldest item on this page is before cutoff, no need for more pages
        const oldestOnPage = items.filter(it => it.ts).sort((a, b) => a.ts - b.ts)[0];
        if (oldestOnPage && oldestOnPage.ts < cutoff) {
          console.error(`  -> reached cutoff on page ${pg + 1}`);
          break;
        }

        // Look for next page link
        const nextHref = await page.$eval('div.show-more:last-child a, .load-more a, a.show-more', (a: any) => a?.getAttribute('href') || null).catch(() => null);
        if (!nextHref) {
          console.error(`  -> no more pages`);
          break;
        }

        const nextUrl = new URL(nextHref, pageUrl).href;
        if (nextUrl === pageUrl) break;
        pageUrl = nextUrl;
      }

      if (allItems.length === 0) {
        console.error('  -> no recent tweets found on this instance');
        continue;
      }

      // Dedupe by href
      const seen = new Set<string>();
      const deduped = allItems.filter(it => {
        const key = it.href || it.content;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      deduped.sort((a,b) => b.ts - a.ts);
      const out = deduped.map(p => ({ date: new Date(p.ts).toISOString(), type: p.isRetweet ? 'retweet' : p.isReply ? 'reply' : 'tweet', text: p.content, url: p.href }));

      console.log(JSON.stringify({ handle, instance: base, count: out.length, items: out }, null, 2));
      await browser.close();
      process.exit(0);
    } catch (err) {
      console.error('  -> error', String(err));
      continue;
    }
  }

  await browser.close();
  console.error('No instances yielded recent tweets.');
  process.exit(2);
}

run().catch((e) => { console.error(e); process.exit(1); });
