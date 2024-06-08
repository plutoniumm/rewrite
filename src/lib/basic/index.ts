import { keymap } from "prosemirror-keymap";
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";
import { Plugin } from "prosemirror-state";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { menuBar } from "prosemirror-menu";
import type { MenuElement } from "prosemirror-menu";
import { Schema } from "prosemirror-model";

import { buildMenuItems } from "./menu";
import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputs";

export { buildMenuItems, buildKeymap, buildInputRules }

export function exampleSetup (options: {
  schema: Schema
  mapKeys?: { [key: string]: string | false }
  menuBar?: bool;
  history?: bool;
  floatingMenu?: bool;
  menuContent?: MenuElement[][]
}) {
  let plugins = [
    buildInputRules(options.schema),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor()
  ]
  if (options.menuBar !== false)
    plugins.push(menuBar({
      floating: options.floatingMenu !== false,
      content: options.menuContent || buildMenuItems(options.schema).fullMenu
    }))
  if (options.history !== false)
    plugins.push(history())

  return plugins.concat(new Plugin({
    props: {
      attributes: { class: "ProseMirror-example-setup-style" }
    }
  }))
}
