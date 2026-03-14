---
name: feed-digest
description: Build a deduped markdown digest from feeds.carmo.io (last N hours) and store links separately.
---

# Feed Digest

Build a deduped markdown digest from all feeds on https://feeds.carmo.io, filtered by a time window.
The script stores:
- Markdown digest: `/workspace/notes/feeds-digest.md`
- Link index (JSON): `/workspace/notes/feeds-digest-links.json`

## Usage

```bash
/workspace/.pi/skills/feed-digest/run [--hours N] [--simhash N] [--out path] [--links-out path]
```

Defaults:
- `--hours 12`
- `--simhash 8`
- `--out /workspace/notes/feeds-digest.md`
- `--links-out /workspace/notes/feeds-digest-links.json`

## Notes

- Deduping uses simhash with a Hamming distance threshold.
- The markdown digest omits URLs; fetch links from the JSON index when needed.
