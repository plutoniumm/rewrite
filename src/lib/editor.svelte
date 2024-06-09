<script lang="ts">
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import {
    schema,
    MarkdownParser,
    defaultMarkdownParser,
    defaultMarkdownSerializer,
  } from "prosemirror-markdown";
  import { Schema } from "prosemirror-model";
  import { keymap } from "prosemirror-keymap";
  import { history } from "prosemirror-history";
  import { baseKeymap } from "prosemirror-commands";

  import { buildKeymap } from "$lib/basic/keymap";
  import { buildInputRules } from "$lib/basic/inputs";
  import { shikiLazyPlugin } from "$lib/basic/code";
  import { onMount } from "svelte";

  let { value = $bindable(), raw = $bindable() } = $props();

  let editor: N<HTMLElement> = null;
  console.log(Object.keys(schema));

  onMount(() => {
    let extended = new Schema({
      nodes: schema.spec.nodes
        .addToEnd("math_inline", {
          group: "inline math",
          content: "text*",
          inline: true,
          atom: true,
          toDOM: () => ["math-inline", { class: "math-node" }, 0],
          parseDOM: [{ tag: "math-inline" }],
        })
        .addToEnd("math_display", {
          group: "block math",
          content: "text*",
          atom: true,
          code: true,
          toDOM: () => ["math-display", { class: "math-node" }, 0],
          parseDOM: [{ tag: "math-display" }],
        }),
      marks: schema.spec.marks,
    });

    const parser = new MarkdownParser(
      extended,
      defaultMarkdownParser.tokenizer,
      defaultMarkdownParser.tokens,
    );

    let state = EditorState.create({
      doc: parser.parse(value),
      plugins: [
        buildInputRules(extended),
        keymap(buildKeymap(extended)),
        keymap(baseKeymap),
        shikiLazyPlugin,
        history(),
      ],
    });

    let view = new EditorView(editor, {
      state,
      dispatchTransaction(tr) {
        view.updateState(view.state.apply(tr));
        raw = view.state.doc;
        value = defaultMarkdownSerializer.serialize(view.state.doc);
      },
    });
  });
</script>

<div bind:this={editor} class="h-100 b0 p0" id="editor"></div>

<style>
  #editor {
  }
</style>
