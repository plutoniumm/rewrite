import {
  inputRules, wrappingInputRule as wrap, textblockTypeInputRule as block,
  smartQuotes, emDash, ellipsis, InputRule
} from "prosemirror-inputrules";
import { NodeType, Schema } from "prosemirror-model";

//"> " -> blockquote
export const quoteRule = (type: NodeType) => wrap(/^\s*>\s$/, type);

// "1. " -> ordered list
export const listRule = (type: NodeType) => wrap(
  /^(\d+)\.\s$/,
  type,
  match => ({ order: +match[1] }),
  (match, n) => n.childCount + n.attrs.order == +match[1]
);

// "- " -> bullet list
export const bulletRule = (type: NodeType) => wrap(/^\s*([-+*])\s$/, type);

// "```" -> code block
export const codeRule = (type: NodeType) => block(/^```$/, type);

// "# " -> heading, "## ", "### ", "#### ", "##### ", "######
export const headingRule = (type: NodeType) =>
  block(new RegExp("^(#{1,6})\\s$"), type, match => ({ level: match[1].length }));

/// A set of input rules for creating the basic block quotes, lists,
/// code blocks, and heading.
export function buildInputRules (schema: Schema) {
  let rules = smartQuotes.concat(ellipsis, emDash), type;
  if (type = schema.nodes.blockquote) rules.push(quoteRule(type));
  if (type = schema.nodes.ordered_list) rules.push(listRule(type));
  if (type = schema.nodes.bullet_list) rules.push(bulletRule(type));
  if (type = schema.nodes.code_block) rules.push(codeRule(type));
  if (type = schema.nodes.heading) rules.push(headingRule(type));

  return inputRules({ rules });
};
