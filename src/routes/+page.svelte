<script lang="ts">
  import Editor from "$lib/editor.svelte";
  import Toast from "./toaster.svelte";
  import { notes, toasts } from "$lib";
  import { dummy } from "./editor";

  let value = dummy;
</script>

<lt-split ratio="1:3">
  <div slot="a">
    {#each $notes as note}
      <article>
        <div class="f j-bw">
          <div class="p10 fw6">
            {note.title}
          </div>
          <div style="color:#222;">
            {note.date}
          </div>
        </div>
        <div class="p10">
          {note.preview}
        </div>
      </article>
    {/each}
  </div>
  <div slot="b">
    <div class="f-col">
      <div style="height: 24px;border-bottom: 1px solid #222;">stats</div>
      <div style="height: calc(100% - 25px);">
        <Editor bind:value />
      </div>
    </div>
  </div>
</lt-split>

{#if $toasts.length}
  <Toast {toasts} />
{/if}

<style lang="scss">
  lt-split {
    height: 100vh;
    [slot] {
      height: 100%;
    }
  }
</style>
