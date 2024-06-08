<script lang="ts">
  import Editor from "./editor.svelte";
</script>

<lt-split ratio="1:3">
  <div slot="a">LHS</div>
  <div slot="b">
    <Editor />
  </div>
</lt-split>

<style lang="scss">
  lt-split {
    height: 100vh;
    [slot] {
      height: 100%;
    }
  }
</style>
