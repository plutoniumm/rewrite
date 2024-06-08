import { keymap } from "prosemirror-keymap";
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";
import { Plugin } from "prosemirror-state";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { Schema } from "prosemirror-model";

import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputs";
import { shikiLazyPlugin } from "./code";

export { buildKeymap, buildInputRules }

export function exampleSetup (options: {
  schema: Schema, mapKeys?: { [key: string]: string | false }
}) {
  let plugins = [
    buildInputRules(options.schema),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    shikiLazyPlugin,
  ];
  plugins.push(history())

  return plugins.concat(new Plugin({
    props: { attributes: { class: "pm-baseline" } }
  }))
}
