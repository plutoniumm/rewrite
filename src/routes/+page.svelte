<script lang="ts">
  import Editor from "$lib/editor.svelte";
  import { notes, toasts } from "$lib";
  import { onMount } from "svelte";

  import Toast from "./interface/toaster.svelte";
  import Note from "./interface/note.svelte";
  import Statbar from "./interface/stats.svelte";

  import { dummy } from "./editor";

  function check5000() {
    if (g.w5000.length < 10) {
      fetch("/5000.txt")
        .then((res) => res.text())
        .then((text) => {
          g.w5000 = text.split("\n").map((w) => w.trim());
        });
    }
  }

  let g = $state({
    w5000: ["the"],
    raw: "",
  });
  let value = $state(dummy);

  onMount(check5000);
</script>

<lt-split ratio="1:3">
  <div slot="a">
    {#each $notes as note}<Note {note} />{/each}
  </div>
  <div slot="b">
    <div class="f-col p-rel">
      <div id="statbar" class="f j-ar p-abs w-100">
        {#if value}
          <Statbar {value} {g} />
        {/if}
      </div>
      <div style="height: calc(100% - 25px);margin-top:25px;">
        <Editor bind:raw={g.raw} bind:value />
      </div>
    </div>
  </div>
</lt-split>

{#if $toasts.length}
  <Toast {toasts} />
{/if}

<style lang="scss">
  #statbar {
    height: 24px;
    border-bottom: 1px solid #222;
    left: 0;
    top: 0;
  }
  lt-split {
    height: 100vh;
    [slot] {
      height: 100%;
    }
  }
</style>
