---
name: web-search
description: Search the web via SearXNG and optionally convert result pages to Markdown.
---

# Web Search

Use the local SearXNG instance to search the web and optionally fetch pages and convert HTML to Markdown.

## Steps

1. Run a search (JSON output):
   ```bash
   bun /workspace/.pi/skills/web-search/web-search.ts --query "your query"
   ```

2. Fetch top results and convert to Markdown:
   ```bash
   bun /workspace/.pi/skills/web-search/web-search.ts --query "your query" --fetch true --fetch-limit 2
   ```

## Options

- `--query` (or `--q`) Required search query.
- `--limit` Number of results to return (default 5).
- `--fetch` When true, fetches top results and converts HTML to Markdown.
- `--fetch-limit` How many results to fetch/convert (default 2).
- `--searx-url` Override the SearXNG endpoint (default http://192.168.1.100:3080/search).
- `--timeout` Fetch timeout in milliseconds (default 15000).

## Notes

- HTML conversion uses turndown + linkedom.
- The converter prefers `<article>`/`<main>` content when available.
