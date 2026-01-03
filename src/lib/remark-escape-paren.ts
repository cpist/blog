import type { Plugin } from "unified";
import type { Text, Root } from "mdast";
import { visit } from "unist-util-visit";

export const remarkEscapeParen: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "text", (node: Text) => {
      // Escape parentheses that follow a number, e.g., "1)" -> "1\)"
      node.value = node.value.replace(/(\d+)\)/g, "$1\\)");
    });
  };
};
