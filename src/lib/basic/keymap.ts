import {
  chainCommands, toggleMark, exitCode, selectParentNode
} from "prosemirror-commands"
import { splitListItem } from "prosemirror-schema-list"
import { undo, redo } from "prosemirror-history"
import { undoInputRule } from "prosemirror-inputrules"
import type { Command } from "prosemirror-state"
import { Schema } from "prosemirror-model"

const mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false

export function buildKeymap (schema: Schema) {
  let mapKeys: { [key: string]: string } = {}
  let keys: { [key: string]: Command } = {}, type

  function bind (key: string, cmd: Command) {
    if (mapKeys[key]) key = mapKeys[key]
    keys[key] = cmd
  }

  bind("Mod-z", undo)
  bind("Shift-Mod-z", redo)
  bind("Backspace", undoInputRule)
  bind("Escape", selectParentNode)
  if (type = schema.marks.strong) bind("Mod-b", toggleMark(type))
  if (type = schema.marks.em) bind("Mod-i", toggleMark(type))

  if (type = schema.marks.code) bind("Mod-h", toggleMark(type))
  //   if (type = schema.marks.mark) bind("Mod-m", toggleMark(type))
  // if (type = schema.marks.underline) bind("Mod-u", toggleMark(type))

  if (type = schema.nodes.hard_break) {
    let br = type, cmd = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch) dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView())
      return true
    })
    bind("Mod-Enter", cmd)
    bind("Shift-Enter", cmd)
    if (mac) bind("Ctrl-Enter", cmd)
  }
  if (type = schema.nodes.list_item) {
    bind("Enter", splitListItem(type))
  }
  if (type = schema.nodes.horizontal_rule) {
    let hr = type
    bind("Mod-_", (state, dispatch) => {
      if (dispatch) dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView())
      return true
    })
  }

  return keys
}
