<script lang="ts">
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import {
    schema,
    defaultMarkdownParser,
    defaultMarkdownSerializer,
  } from "prosemirror-markdown";
  import { exampleSetup } from "./basic";
  import { onMount } from "svelte";

  export let value: U<string>;

  let editor: N<HTMLElement> = null;

  class ProseMirrorView {
    view: EditorView;

    constructor(target: HTMLElement, content: string) {
      let state = EditorState.create({
        doc: defaultMarkdownParser.parse(content),
        plugins: exampleSetup({ schema }),
      });

      this.view = new EditorView(target, { state });
    }

    get content() {
      return defaultMarkdownSerializer.serialize(this.view.state.doc);
    }
    focus = () => this.view.focus();
    destroy = () => this.view.destroy();
  }

  onMount(() => {
    editor = editor as HTMLElement;
    let view = new ProseMirrorView(editor, value);
    view.focus();
  });
</script>

<div bind:this={editor} class="h-100 b0 p0" id="editor"></div>

<style>
  #editor {
  }
</style>
