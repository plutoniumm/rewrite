import { Schema, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { MenuItem } from "prosemirror-menu";

function canInsert (state: EditorState, nodeType: NodeType) {
  let $from = state.selection.$from
  for (let d = $from.depth; d >= 0; d--) {
    let index = $from.index(d)
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true
  };
  return false
}

export function buildMenuItems (schema: Schema) {
  let r: any = {};
  let node: U<NodeType>;

  if (node = schema.nodes.horizontal_rule) {
    let hr = node
    r.insertHorizontalRule = new MenuItem({
      title: "Insert horizontal rule",
      label: "--",
      enable (state) { return canInsert(state, hr) },
      run (state, dispatch) { dispatch(state.tr.replaceSelectionWith(hr.create())) }
    })
  }

  let cut = <T> (arr: T[]) => arr.filter(x => x) as NonNullable<T>[]
  r.fullMenu = [cut([r.insertImage, r.insertHorizontalRule])]
  return r
}
