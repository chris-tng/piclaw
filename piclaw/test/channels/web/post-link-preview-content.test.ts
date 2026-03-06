/**
 * test/channels/web/post-link-preview-content.test.ts
 *
 * Regression test: message text must remain unchanged when OpenGraph link
 * previews exist. We render preview cards in addition to user text, not instead
 * of URL text.
 */

import { expect, test } from "bun:test";
import { getDisplayContent } from "../../../web/src/components/post.ts";

test("getDisplayContent keeps URL text when previews are present", () => {
  const content = "Check this out: https://example.com/article";
  const previews = [
    {
      url: "https://example.com/article",
      title: "Example Article",
    },
  ];

  expect(getDisplayContent(content, previews)).toBe(content);
});

test("getDisplayContent preserves exact formatting (no trim/removal)", () => {
  const content = "https://example.com   \n\n";
  const previews = [{ url: "https://example.com" }];

  expect(getDisplayContent(content, previews)).toBe(content);
});

test("getDisplayContent returns empty string for non-string content", () => {
  expect(getDisplayContent(null as any, [])).toBe("");
  expect(getDisplayContent(undefined as any, [])).toBe("");
});
