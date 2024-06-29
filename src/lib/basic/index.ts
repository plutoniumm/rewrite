import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";
import { mathPlugin } from "@benrbray/prosemirror-math";
import { baseKeymap } from "prosemirror-commands";
import { DOMParser } from "prosemirror-model";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { buildInputRules } from "./inputs";
import { shikiLazyPlugin } from "./code";
import { buildKeymap } from "./keymap";
import { schema } from "./schema";

const pm_dp = DOMParser.fromSchema(schema);
let dp = null;
export function parsed (string: string, display: boolean = false) {
  if (!dp) dp = new window.DOMParser();
  let mode = display ? "math-display" : "math-inline";
  let wrap = display ? "div" : "span";

  let math = `<${wrap}><${mode}>${string}</${mode}></${wrap}>`;
  let parsed = dp.parseFromString(math, "text/html").body.firstChild;

  parsed = pm_dp.parse(parsed);

  // if we're in inline and the parsed is a paragraph, return the first child
  if (!display && parsed.content.childCount === 1) {
    return parsed.content.firstChild.content.content[0];
  } else {
    return parsed;
  }
};

export const parser = new MarkdownParser(
  schema,
  defaultMarkdownParser.tokenizer,
  defaultMarkdownParser.tokens,
);

export let plugins = [
  mathPlugin,
  buildInputRules(schema),
  keymap(buildKeymap(schema)),
  keymap(baseKeymap),
  shikiLazyPlugin,
  history(),
];