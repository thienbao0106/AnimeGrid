<script lang="ts">
  import Level from "$lib/components/Reveal/Level.svelte";
  import Casts from "$lib/components/Reveal/Casts.svelte";
  import Details from "$lib/components/Reveal/Details.svelte";
  import { calculate } from "$lib/stores/calculate";
  import Input from "$lib/components/Reveal/Input.svelte";

  const castData = [
    {
      info: "Actor 1",
      value: 40,
    },
  ];

  const detailsData = [
    {
      info: "Detail 1",
      value: 20,
    },
  ];
</script>

<main class="flex flex-col justify-center items-center text-secondaryColor">
  <section class="">
    <Level />
  </section>
  <section
    class="bg-white lg:w-[50%] w-[95%] flex flex-col space-y-3 justify-center items-center rounded-lg border-secondaryColor border-2 py-2"
  >
    <h1>Guess The Title</h1>
    <div>Question</div>
    <Input />
    <section class="flex flex-row gap-x-3">
      <div>Points: <span class="font-bold">{$calculate}</span></div>
      <div>Guesses Left: <span class="font-bold">5</span></div>
    </section>
    <section class="px-2 w-full">
      <Casts data={castData} />
      <Details data={detailsData} />
    </section>
  </section>
</main>
