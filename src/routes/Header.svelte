<script lang="ts">
  let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<header
  class="text-secondaryColor flex justify-between items-center lg:px-10 px-3 py-5"
>
  <div class="flex-none font-bold text-4xl lg:w-1/4">AnimeGrid</div>
  {#if width >= 1024}
    <section class="flex flex-row gap-x-3 justify-center items-center lg:w-2/4">
      <a href="/grid">Anime Grid</a>
      <a href="/reveal">Anime Reveal</a>
    </section>
  {/if}

  <div class="flex flex-row gap-x-2 justify-end lg:w-1/4 text-right">
    <div><a href="/history">History</a></div>
    <div>Our social</div>
  </div>
</header>

<style>
</style>
