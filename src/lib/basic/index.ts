import { Schema } from "prosemirror-model";
import { keymap } from "prosemirror-keymap";

import {
  schema, MarkdownParser, defaultMarkdownParser
} from "prosemirror-markdown";

import {
  mathPlugin, defaultBlockMathParseRules, defaultInlineMathParseRules
} from "@benrbray/prosemirror-math";
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";

import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputs";
import { shikiLazyPlugin } from "./code";

let extended = new Schema({
  nodes: schema.spec.nodes
    .addToEnd("math_inline", {
      group: "inline",
      content: "text*",
      inline: true,
      toDOM: () => ["math-inline", { class: "math-node" }, 0],
      parseDOM: [{ tag: "math-inline" }, ...defaultInlineMathParseRules],
    })
    .addToEnd("math_display", {
      group: "block",
      content: "text*",
      code: true,
      toDOM: () => ["math-display", { class: "math-node" }, 0],
      parseDOM: [{ tag: "math-display" }, ...defaultBlockMathParseRules],
    }),
  marks: schema.spec.marks
    .addToEnd("math_select", {
      toDOM () {
        return ["math-select", 0];
      },
      parseDOM: [{ tag: "math-select" }],
    })
    .addToEnd("underline", {
      parseDOM: [{ tag: "u" }],
      toDOM () {
        return ["u", 0];
      },
    })
    .addToEnd("mark", {
      parseDOM: [{ tag: "mark" }],
      toDOM () {
        return ["mark", 0];
      },
    }),
});

export const parser = new MarkdownParser(
  extended,
  defaultMarkdownParser.tokenizer,
  defaultMarkdownParser.tokens,
);

export let plugins = [
  buildInputRules(extended),
  keymap(buildKeymap(extended)),
  keymap(baseKeymap),
  mathPlugin,
  shikiLazyPlugin,
  history(),
];