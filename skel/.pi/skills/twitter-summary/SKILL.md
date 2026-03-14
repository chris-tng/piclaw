---
name: twitter-summary
description: Fetch a user's recent tweets (tweets, replies, retweets) using Playwright + Nitter fallbacks and produce compact JSON/Markdown summaries.
---

# Twitter Summary

Scrape a public Twitter/X profile via Nitter front-ends and return a compact JSON listing of tweets, replies, and retweets within a time window.

Two scrapers are included:
- `playwright-twitter-summary.ts` — uses Playwright for full browser rendering (more reliable)
- `quick-twitter-summary.ts` — uses linkedom for lightweight HTML parsing (no browser needed)

## Prerequisites

The wrapper auto-installs Playwright if missing (logs to `/tmp/twitter-playwright-install.log`).

For the quick scraper:

```bash
cd /workspace && bun add linkedom
```

## Usage

Using the wrapper script:

```bash
/workspace/.pi/skills/twitter-summary/run <handle> [hours] [output.json]
```

Examples:

```bash
# Fetch last 16 hours for @badlogicgames
/workspace/.pi/skills/twitter-summary/run badlogicgames 16 /tmp/badlogic_fetch.json

# Direct Playwright invocation
bun /workspace/.pi/skills/twitter-summary/playwright-twitter-summary.ts --handle=badlogicgames --hours=24

# Quick (no browser) invocation
bun /workspace/.pi/skills/twitter-summary/quick-twitter-summary.ts --handle=badlogicgames --hours=12
```

## Output

JSON with `handle`, `instance`, `count`, and `items` array. Each item has:
- `date` — ISO 8601 timestamp
- `type` — `tweet`, `reply`, or `retweet`
- `text` — Tweet content
- `url` — Link to the tweet on the Nitter instance

## Notes

- The scrapers try several public Nitter instances and use the first that responds.
- Coverage varies by instance; combining outputs from multiple instances often yields the best results.
- Network restrictions or anti-bot protections may affect results.
- Logs are written to stderr; JSON output goes to stdout.
- A log file is written to /tmp/twitter-summary.log when using the wrapper.
