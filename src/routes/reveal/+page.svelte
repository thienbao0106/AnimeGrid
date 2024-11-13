<script lang="ts">
  import Level from "$lib/components/Reveal/Level.svelte";
  import Section from "$lib/components/Reveal/Section.svelte";
  import Input from "$lib/components/Reveal/Input.svelte";
  import AnswerModal from "$lib/components/Reveal/AnswerModal.svelte";

  import { getQuestion } from "$lib/utils/anilist/fetchQuestionByAnilist";
  import { onMount } from "svelte";
  import { points, guesses } from "$lib/stores/calculate";
  import { convertStaff, convertVoiceActress } from "$lib/utils/convertFetch";
  import { checkHistory, setHistory } from "$lib/utils/setHistory";
  import moment from "moment";

  let question: Question | null = null;
  let voiceActorsData: any = [],
    staffsData: any = [],
    detailsData: any = [],
    isShowModal = false;
  let endGame = false;

  onMount(async () => {
    const data: any = await getQuestion();
    question = data;
    voiceActorsData = convertVoiceActress(question?.voiceActors || []);

    staffsData = convertStaff(question?.staffs || []);
    console.log(staffsData);
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

    if (checkHistory()) {
      alert("You've already played the game, please wait for next day");
      endGame = true;
      return;
    }
  });

  const handleGivenUp = () => {
    endGame = true;
    isShowModal = true;
    points.set(0);
  };

  const setGuess = (userAnswer: string) => {
    guesses.decrement(1);
    if (userAnswer !== question?.title) return;
    endGame = true;
    isShowModal = true;
  };

  const setShowModal = (showModal: boolean) => {
    isShowModal = showModal;
  };

  $: {
    if ($points <= 0 || $guesses === 0) {
      endGame = true;
      setHistory({
        type: "reveal",
        level: "normal",
        points: $points,
        guesses: $guesses,
        date: moment(),
      });
      isShowModal = true;
    }
  }
</script>

{#if endGame && isShowModal}
  <AnswerModal
    {setShowModal}
    title={question?.title}
    image={question?.bannerImage}
  />
{/if}

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
        {endGame ? "Show Answer" : "Give up"}
      </p>
    </section>
    <section class="px-2 w-full space-y-5">
      <Section data={voiceActorsData} title="Voice Actors" />
      <Section data={staffsData} title="Staff" />
      <Section data={detailsData} title="Details" />
    </section>
  </section>
</main>
