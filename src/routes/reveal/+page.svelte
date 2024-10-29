<script lang="ts">
  import Level from "$lib/components/Reveal/Level.svelte";
  import Casts from "$lib/components/Reveal/Casts.svelte";
  import Details from "$lib/components/Reveal/Details.svelte";
  import { calculate } from "$lib/stores/calculate";

  const castData = [
    {
      number: 1,
      value: 40,
    },
  ];

  const detailsData = [
    {
      number: 2,
      value: 20,
    },
  ];
</script>

<main class="flex flex-col justify-center items-center text-secondaryColor">
  <section class="">
    <Level />
  </section>
  <section
    class="bg-white px-2 lg:w-[50%] w-[95%] flex flex-col justify-center items-center rounded-lg border-secondaryColor border-2 py-2"
  >
    <div>Hello</div>
    <div>Points: {$calculate}</div>
    <Casts data={castData} />
    <Details data={detailsData} />
  </section>
</main>
