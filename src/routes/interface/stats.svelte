<script lang="ts">
  import { Stats } from "./stats";
  export let value, g;

  const stats = Stats(value, g);
</script>

<div class="f j-ar">
  <span class="fw7">Chars:</span>{stats.count}
</div>
<div class="f j-ar">
  <span class="fw7">Words:</span>{stats.words}
</div>
<div class="f j-ar">
  <span class="fw7">Long Sentences:</span>{stats.longs.length}
  {#if stats.longs.length}
    <select class="p-rel">
      {#each stats.longs as sentence}
        <option>{sentence}</option>
      {/each}
    </select>
  {/if}
</div>
<div>
  <span>Hard Words: {stats.unique.length}</span>
  <select class="p-rel">
    {#each stats.unique as word}
      <option>{word}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  select {
    max-width: 100px;
    background: #f5f5f7;
    border-radius: 2;
    top: -1px;
  }
</style>
