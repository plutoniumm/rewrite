<script lang="ts">
  import Editor from "./editor.svelte";
  import Toast from "./toaster.svelte";
  import { notes, toasts } from "$lib";
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
    <Editor />
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
