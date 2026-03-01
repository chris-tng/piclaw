import { describe, test, expect } from "bun:test";
import "../helpers.js";

import {
  clampWebContent,
  shouldPreviewWebContent,
  isSvgContent,
  getWebPreviewMaxChars,
} from "../../src/db/web-content.js";

describe("web-content", () => {
  test("getWebPreviewMaxChars returns a number", () => {
    expect(typeof getWebPreviewMaxChars()).toBe("number");
    expect(getWebPreviewMaxChars()).toBeGreaterThan(0);
  });

  test("isSvgContent detects SVG", () => {
    expect(isSvgContent('<svg width="100">')).toBe(true);
    expect(isSvgContent("data:image/svg+xml;base64,abc")).toBe(true);
    expect(isSvgContent("just plain text")).toBe(false);
    expect(isSvgContent("")).toBe(false);
  });

  test("shouldPreviewWebContent returns false for short content", () => {
    expect(shouldPreviewWebContent("short")).toBe(false);
    expect(shouldPreviewWebContent("")).toBe(false);
  });

  test("shouldPreviewWebContent returns false for SVG", () => {
    const svgContent = '<svg width="100">' + "x".repeat(100000);
    expect(shouldPreviewWebContent(svgContent)).toBe(false);
  });

  test("shouldPreviewWebContent returns true for long non-SVG content", () => {
    const longContent = "x".repeat(100000);
    expect(shouldPreviewWebContent(longContent)).toBe(true);
  });

  test("clampWebContent passes through short content", () => {
    const result = clampWebContent("hello world");
    expect(result.content).toBe("hello world");
    expect(result.meta).toBeUndefined();
  });

  test("clampWebContent truncates very long content", () => {
    const veryLong = "x".repeat(500000);
    const result = clampWebContent(veryLong);
    expect(result.content).toBe("");
    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.original_length).toBe(500000);
  });

  test("clampWebContent previews medium-length content", () => {
    const medium = "x".repeat(50000);
    const result = clampWebContent(medium);
    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.preview).toBe(true);
    expect(result.content.length).toBeLessThan(medium.length);
    expect(result.content.length).toBeGreaterThan(0);
  });

  test("clampWebContent handles non-string input", () => {
    const result = clampWebContent(null as any);
    expect(result.content).toBe("");
  });
});
