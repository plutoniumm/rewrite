import {
  inputRules, wrappingInputRule as wrap, textblockTypeInputRule as block,
  smartQuotes, emDash, ellipsis, InputRule
} from "prosemirror-inputrules";
import { NodeType, Schema } from "prosemirror-model";

export const quoteRule = (type: NodeType) => wrap(/^\s*>\s$/, type);
export const listRule = (type: NodeType) => wrap(
  /^(\d+)\.\s$/, type, g => ({ order: +g[1] }),
  (match, n) => n.childCount + n.attrs.order == +match[1]
);
export const bulletRule = (type: NodeType) => wrap(/^\s*([-+*])\s$/, type);
export const codeRule = (type: NodeType) => block(/^```$/, type);
export const headingRule = (type: NodeType) =>
  block(new RegExp("^(#{1,6})\\s$"), type, match => ({ level: match[1].length }));

export function buildInputRules (s: Schema) {
  let rules = smartQuotes.concat(ellipsis, emDash), t;
  if (t = s.nodes.blockquote) rules.push(quoteRule(t));
  if (t = s.nodes.ordered_list) rules.push(listRule(t));
  if (t = s.nodes.bullet_list) rules.push(bulletRule(t));
  if (t = s.nodes.code_block) rules.push(codeRule(t));
  if (t = s.nodes.heading) rules.push(headingRule(t));

  return inputRules({ rules });
};
