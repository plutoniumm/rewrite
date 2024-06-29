<script lang="ts">
  import { defaultMarkdownSerializer } from "prosemirror-markdown";
  import { parser, plugins, parsed } from "$lib/basic";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { onMount } from "svelte";

  let { value = $bindable(), raw = $bindable() } = $props();
  let editor: N<HTMLElement> = null;

  const M_INLINE = /\$(.+)\$/g;
  const M_BLOCK = /\$\$(.+)\$\$/g;
  const isInline = (s: string) => M_INLINE.test(s);
  const isBlock = (s: string) => M_BLOCK.test(s);

  onMount(() => {
    let state = EditorState.create({
      doc: parser.parse(value),
      plugins,
    });

    // for each node check if it's text
    state.doc.descendants((node, pos) => {
      if (node.isText) {
        node.text = node?.text as string;
        if (isBlock(node.text)) {
          const math = node.text.replace(M_BLOCK, "$1").trim();
          const parse = parsed(math, true);

          const start = pos;
          const end = start + node.text.length;
          const tr = state.tr.replaceWith(start, end, parse);
          state = state.apply(tr);
        } else if (isInline(node.text)) {
          // @ts-ignore
          const math = new RegExp(M_INLINE).exec(node.text)[1];
          const parse = parsed(math, false);

          const start = pos + node.text.indexOf("$");
          const end = start + math.length + 2;
          const tr = state.tr.replaceWith(start, end, parse);
          state = state.apply(tr);
        }
      }
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
