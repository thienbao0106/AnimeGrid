<script lang="ts">
  import List from "$lib/components/common/List.svelte";
  import Card from "$lib/components/History/Card.svelte";
  import { onMount } from "svelte";
  let data: any;
  onMount(() => {
    const stat = localStorage.getItem("stats");
    if (!stat) {
      data = [];
      return;
    }
    data = JSON.parse(stat);
    console.log(data);
  });
</script>

<main class="flex justify-center items-start w-full">
  <div
    class=" bg-white w-3/4 p-4 border-secondaryColor border-2 rounded-md space-y-3"
  >
    <h1 class="w-full text-center font-bold text-3xl text-secondaryColor">
      History
    </h1>
    <p class="italic text-center">
      History is currently only tracked on your device, and will be lost if you
      log out or clear site data.
    </p>
    {#if !data}
      <section>Loading...</section>
    {/if}
    {#if data && data.length === 0}
      <div>You haven't played any game</div>
    {:else}
      <section>
        <List renderItem={Card} className="flex flex-row" {data} />
      </section>
    {/if}
  </div>
</main>
