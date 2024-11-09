<script lang="ts">
  import Level from "$lib/components/Reveal/Level.svelte";
  import Section from "$lib/components/Reveal/Section.svelte";
  import Input from "$lib/components/Reveal/Input.svelte";

  import { getQuestion } from "$lib/utils/fetchQuestion";
  import { onMount } from "svelte";
  import { points, guesses } from "$lib/stores/calculate";
  import { convertStaff, convertVoiceActress } from "$lib/utils/convertFetch";

  let question: Question | null = null;
  let voiceActorsData: any = [],
    staffsData: any = [],
    detailsData: any = [];
  let endGame = false;
  onMount(async () => {
    const data: any = await getQuestion();
    question = data;
    voiceActorsData = convertVoiceActress(question?.voiceActors || []);
    staffsData = convertStaff(question?.staffs || []);
    detailsData = [
      {
        role: "Studios",
        name: question?.studios.join(", "),
        value: 20,
      },
      {
        role: "Season",
        name: `${question?.season} ${question?.seasonYear}`,
        value: 20,
      },
      {
        role: "Mean Score",
        name: question?.meanScore,
        value: 20,
      },
    ];
  });

  const handleGivenUp = () => {
    endGame = true;
  };

  const setGuess = (userAnswer: string) => {
    guesses.decrement(1);
    if (userAnswer !== question?.title) return;
    endGame = true;
    alert("Correct Answer");
  };

  $: {
    if ($points <= 0 || $guesses === 0) {
      alert("Stopped");
      endGame = true;
    }
  }
</script>

<main class="flex flex-col justify-center items-center text-secondaryColor">
  <section class="">
    <Level />
  </section>
  <section
    class="bg-white lg:w-[50%] w-[95%] flex flex-col space-y-3 justify-center items-center rounded-lg border-secondaryColor border-2 py-2 my-6"
  >
    <h1>Title with 2 words</h1>

    <Input isGivenUp={endGame} {setGuess} />
    <section class="flex flex-row gap-x-3">
      <div>Points: <span class="font-bold">{$points}</span></div>
      <div>Guesses Left: <span class="font-bold">{$guesses}</span></div>
    </section>
    <section>
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <p
        on:click={() => handleGivenUp()}
        class="underline hover:cursor-pointer"
      >
        Give Up
      </p>
    </section>
    <section class="px-2 w-full space-y-5">
      <Section data={voiceActorsData} title="Voice Actors" />
      <Section data={staffsData} title="Staff" />
      <Section data={detailsData} title="Details" />
    </section>
  </section>
</main>
