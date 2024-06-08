<script lang="ts">
  export let note: Note;

  const formatter = new Intl.RelativeTimeFormat("en");

  function timeAgo(input: string | Date) {
    const date = input instanceof Date ? input : new Date(input);
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const sec = (date.getTime() - Date.now()) / 1000;

    for (let key in ranges) {
      if (ranges[key] < Math.abs(sec)) {
        const delta = sec / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }
</script>

<article class="rpm-10 ptr">
  <div class="f j-bw">
    <div class="p10 fw6">
      {note.title}
    </div>
    <div style="color:#222;">
      {timeAgo(note.date)}
    </div>
  </div>

  <div class="p10">
    {note.preview}
  </div>
</article>
<hr class="o-25 w-50 mx-a" />

<style lang="scss">
  article {
    background: #ccc0;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: #ccc4;
    }
  }
</style>
