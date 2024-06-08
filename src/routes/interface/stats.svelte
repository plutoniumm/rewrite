<script lang="ts">
  import { Stats } from "./stats";
  export let value, g;

  const stats = Stats(value, g);
</script>

<div class="f j-ar">
  <span class="fw7">Chars:&nbsp;</span>{stats.count}
</div>
<div class="f j-ar">
  <span class="fw7">Words:&nbsp;</span>{stats.words}
</div>
<div class="f j-ar">
  <span class="fw7">Long Sentences:&nbsp;</span>{stats.longs.length}
  {#if stats.longs.length}
    <select class="p-rel">
      {#each stats.longs as sentence}
        <option>{sentence}</option>
      {/each}
    </select>
  {/if}
</div>
<div>
  <span class="fw7">Hard Words:&nbsp;</span>{stats.unique.length}
  <select class="p-rel">
    {#each stats.unique as word}
      <option>{word}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  select {
    max-width: 120px;
    padding: 5px;
    background: #f5f5f7;
    border-radius: 2px;
    top: 1px;
  }
</style>
