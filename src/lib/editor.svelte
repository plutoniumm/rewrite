<script lang="ts">
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import {
    schema,
    defaultMarkdownParser,
    defaultMarkdownSerializer,
  } from "prosemirror-markdown";
  import { keymap } from "prosemirror-keymap";
  import { history } from "prosemirror-history";
  import { baseKeymap } from "prosemirror-commands";

  import { buildKeymap } from "$lib/basic/keymap";
  import { buildInputRules } from "$lib/basic/inputs";
  import { shikiLazyPlugin } from "$lib/basic/code";
  import { onMount } from "svelte";

  let { value = $bindable(), raw = $bindable() } = $props();

  let editor: N<HTMLElement> = null;

  onMount(() => {
    let state = EditorState.create({
      doc: defaultMarkdownParser.parse(value),
      plugins: [
        buildInputRules(schema),
        keymap(buildKeymap(schema)),
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
