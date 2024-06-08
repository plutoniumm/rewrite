<script lang="ts">
  import { dummy } from "$lib/editor";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import {
    schema,
    defaultMarkdownParser,
    defaultMarkdownSerializer,
  } from "prosemirror-markdown";
  import { exampleSetup } from "prosemirror-example-setup";
  import { onMount } from "svelte";

  let editor: N<HTMLElement> = null;

  class ProseMirrorView {
    view: EditorView;

    constructor(target: HTMLElement, content: string) {
      this.view = new EditorView(target, {
        state: EditorState.create({
          doc: defaultMarkdownParser.parse(content),
          plugins: exampleSetup({ schema }),
        }),
      });
    }

    get content() {
      return defaultMarkdownSerializer.serialize(this.view.state.doc);
    }
    focus = () => this.view.focus();
    destroy = () => this.view.destroy();
  }

  onMount(() => {
    editor = editor as HTMLElement;
    let view = new ProseMirrorView(editor, dummy);
    view.focus();
  });
</script>

<div bind:this={editor} class="h-100" id="editor"></div>
