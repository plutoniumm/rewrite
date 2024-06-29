import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";
import { keymap } from "prosemirror-keymap";
import { schema } from "./schema";

import { mathPlugin } from "@benrbray/prosemirror-math";
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";

import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputs";
import { shikiLazyPlugin } from "./code";

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