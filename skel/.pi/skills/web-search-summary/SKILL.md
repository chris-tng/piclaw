---
name: web-search-summary
description: Search via SearXNG, fetch top results, and return quick summaries plus markdown.
---

# Web Search + Summaries

Search the web and generate lightweight summaries using HTML-to-Markdown conversion.

## Steps

1. Run a summarized search:
   ```bash
   bun /workspace/.pi/skills/web-search-summary/web-search-summary.ts --query "your query"
   ```

2. Adjust fetch depth or summary length:
   ```bash
   bun /workspace/.pi/skills/web-search-summary/web-search-summary.ts --query "your query" --fetch-limit 3 --max-sentences 4 --max-chars 800
   ```

## Options

- `--query` (or `--q`) Required search query.
- `--limit` Number of results to return (default 5).
- `--fetch` Set to `false` to skip fetching pages (default true).
- `--fetch-limit` How many results to fetch/convert (default 2).
- `--searx-url` Override the SearXNG endpoint (default http://192.168.1.100:3080/search).
- `--timeout` Fetch timeout in milliseconds (default 15000).
- `--max-sentences` Summary sentence limit (default 3).
- `--max-chars` Summary character limit (default 600).

## Notes

- Summaries are heuristic (first sentences) and may need human refinement.
- HTML conversion uses turndown + linkedom and prefers `<article>`/`<main>`.
