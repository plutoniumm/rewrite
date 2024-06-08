<script lang="ts">
  import Editor from "$lib/editor.svelte";
  import { notes, toasts } from "$lib";
  import { onMount } from "svelte";

  import Toast from "./toaster.svelte";
  import Note from "./note.svelte";

  import { dummy } from "./editor";
  import { Stats } from "./stats";

  let g = $state({
    w5000: ["the"],
  });

  function check5000() {
    if (g.w5000.length < 10) {
      fetch("/5000.txt")
        .then((res) => res.text())
        .then((text) => {
          g.w5000 = text.split("\n").map((w) => w.trim());
        });
    }
  }

  let value = $state(dummy);

  onMount(() => {
    check5000();
  });
</script>

<lt-split ratio="1:3">
  <div slot="a">
    {#each $notes as note}
      <Note {note} />
    {/each}
  </div>
  <div slot="b">
    <div class="f-col">
      <div class="f j-ar" style="height: 24px;border-bottom: 1px solid #222;">
        {#if value}
          {@const stats = Stats(value, g)}
          <div class="f j-ar">
            <span class="fw7">Chars:</span>
            {stats.count} &emsp;
          </div>
          <div class="f j-ar">
            <span class="fw7">Words:</span>
            {stats.words}
          </div>
          <div>
            <span>Outliers: </span>
            {stats.outliers?.join(", ") || "none"}
          </div>
        {/if}
      </div>
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
