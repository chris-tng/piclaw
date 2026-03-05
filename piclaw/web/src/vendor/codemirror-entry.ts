export { EditorState, Compartment } from "@codemirror/state";
export {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  scrollPastEnd,
  showPanel,
} from "@codemirror/view";
export { minimalSetup } from "codemirror";
export { javascript } from "@codemirror/lang-javascript";
export { python } from "@codemirror/lang-python";
export { markdown } from "@codemirror/lang-markdown";
export { go } from "@codemirror/lang-go";
export { json } from "@codemirror/lang-json";
export { css } from "@codemirror/lang-css";
export { html } from "@codemirror/lang-html";
export { yaml } from "@codemirror/lang-yaml";
export { sql } from "@codemirror/lang-sql";
export { xml } from "@codemirror/lang-xml";
export { StreamLanguage, HighlightStyle, syntaxHighlighting, indentOnInput, indentUnit } from "@codemirror/language";
export { tags, classHighlighter } from "@lezer/highlight";
export { shell } from "@codemirror/legacy-modes/mode/shell";
export { indentWithTab } from "@codemirror/commands";
export { search, openSearchPanel, closeSearchPanel, searchKeymap, highlightSelectionMatches } from "@codemirror/search";
export { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
export { lintGutter } from "@codemirror/lint";
export { vim } from "@replit/codemirror-vim";
export { indentationMarkers } from "@replit/codemirror-indentation-markers";
export { githubLight, githubDark } from "@uiw/codemirror-theme-github";
