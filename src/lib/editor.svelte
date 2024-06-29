<script lang="ts">
  import { defaultMarkdownSerializer } from "prosemirror-markdown";
  import { parser, plugins } from "$lib/basic";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { onMount } from "svelte";

  let { value = $bindable(), raw = $bindable() } = $props();
  let editor: N<HTMLElement> = null;

  onMount(() => {
    let state = EditorState.create({
      doc: parser.parse(value),
      plugins,
    });

    let view = new EditorView(editor, {
      state,
      dispatchTransaction(tr) {
        view.updateState(view.state.apply(tr));
        raw = view.state.doc;
        value = defaultMarkdownSerializer.serialize(view.state.doc);
      },
    });

    view.focus();
    return () => view.destroy();
  });
</script>

<div bind:this={editor} class="h-100 b0 p0" id="editor"></div>
