import {
  inputRules, wrappingInputRule, textblockTypeInputRule,
  smartQuotes, emDash, ellipsis,
} from "prosemirror-inputrules";
import { NodeType, Schema } from "prosemirror-model";

//"> " -> blockquote
export function blockQuoteRule (nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
};

// "1. " -> ordered list
export function orderedListRule (nodeType: NodeType) {
  return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order == +match[1]);
};

// "- " -> bullet list
export function bulletListRule (nodeType: NodeType) {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
};

// "```" -> code block
export function codeBlockRule (nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
};

// "# " -> heading, "## ", "### ", "#### ", "##### ", "######
export function headingRule (nodeType: NodeType) {
  return textblockTypeInputRule(new RegExp("^(#{1,6})\\s$"),
    nodeType, match => ({ level: match[1].length }));
};

// "--- " -> horizontal rule
export function horizontalRuleRule (nodeType: NodeType) {
  return textblockTypeInputRule(/^---$/, nodeType);
};

/// A set of input rules for creating the basic block quotes, lists,
/// code blocks, and heading.
export function buildInputRules (schema: Schema) {
  let rules = smartQuotes.concat(ellipsis, emDash), type;
  if (type = schema.nodes.blockquote) rules.push(blockQuoteRule(type));
  if (type = schema.nodes.ordered_list) rules.push(orderedListRule(type));
  if (type = schema.nodes.bullet_list) rules.push(bulletListRule(type));
  if (type = schema.nodes.code_block) rules.push(codeBlockRule(type));
  if (type = schema.nodes.heading) rules.push(headingRule(type));
  if (type = schema.nodes.horizontal_rule) rules.push(horizontalRuleRule(type));

  return inputRules({ rules });
};
