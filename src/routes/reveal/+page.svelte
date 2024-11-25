<script lang="ts">
  import Level from "$lib/components/Reveal/Level.svelte";
  import Section from "$lib/components/Reveal/Section.svelte";
  import Input from "$lib/components/Reveal/Input.svelte";
  import AnswerModal from "$lib/components/Reveal/AnswerModal.svelte";
  import { onMount } from "svelte";
  import { points, guesses } from "$lib/stores/calculate";
  import { level } from "$lib/stores/level";

  import {
    convertStaff,
    convertVoiceActress,
    convertDetail,
  } from "$lib/utils/convertFetch";
  import { checkHistory, setHistory, getHistory } from "$lib/utils/setHistory";
  import AlreadyPlayed from "$lib/components/Reveal/AlreadyPlayed.svelte";
  import { fetchQuestion } from "$lib/utils/fetchQuestion";
  import questions from "../../lib/reveal.json";
  import moment from "moment";
  import { defaultQuestion } from "$lib/utils/defaultValue";

  let question: Question, questionData: any;

  let voiceActorsData: any = [],
    staffsData: any = [],
    detailsData: any = [],
    isShowModal = false,
    isGivenUp = false;
  let endGame = false;
  let existedScore: any, tempHistory: any;

  const setupQuestion = async (history: any, level: string) => {
    questionData = questions.find((diff) => diff.level === level);
    question = await fetchQuestion(questionData);
    if (checkHistory(history, level)) {
      endGame = true;
      isGivenUp = true;
      existedScore = history.find((his: any) => his.level === level);
      points.set(existedScore.points);
      guesses.set(existedScore.guesses);
      return;
    }
    endGame = false;
    isGivenUp = false;
    existedScore = null;

    voiceActorsData = convertVoiceActress(question.voiceActors);
    staffsData = convertStaff(question.staffs);
    detailsData = convertDetail(question);
  };

  onMount(async () => {
    tempHistory = getHistory();

    // tempLevel = $level;
    await setupQuestion(tempHistory, $level);
  });

  const finishQuiz = () => {
    endGame = true;
    isShowModal = true;
    isGivenUp = true;
    const data: UserHistory = {
      mode: "reveal",
      level: $level,
      points: $points,
      guesses: $guesses,
      date: moment().toDate(),
    };
    setHistory(data);
  };

  const handleGivenUp = () => {
    isGivenUp = true;
    points.set(0);
    finishQuiz();
  };

  const showAnswerModal = () => {
    isShowModal = true;
    endGame = true;
    const answerModal: any = document.querySelector("#answer");
    if (!answerModal) return;
    answerModal.showModal();
    return;
  };

  const setGuess = (userAnswer: string) => {
    guesses.decrement(1);
    if (userAnswer !== question?.title) return;
    finishQuiz();
    return;
  };

  const setUserLevel = async (nextLevel: string) => {
    if (nextLevel === $level) return;
    console.log("check user level");
    level.setLevel(nextLevel);
    await setupQuestion(tempHistory, nextLevel);
  };

  const setCloseModal = () => {
    isShowModal = false;
  };

  $: {
    if (($points <= 0 || $guesses === 0) && isGivenUp === false) {
      finishQuiz();
    }
  }
</script>

{#if (isGivenUp || isShowModal) && endGame}
  <AnswerModal
    {setCloseModal}
    title={question?.title}
    image={question?.bannerImage}
  />
{/if}

<main class="flex flex-col justify-center items-center text-secondaryColor">
  <section class="">
    <Level {setUserLevel} />
  </section>
  <section
    class="bg-white lg:w-[50%] w-[95%] flex flex-col space-y-3 justify-center items-center rounded-lg border-secondaryColor border-2 py-2 my-6"
  >
    <h1>{questionData?.question}</h1>

    <Input {isGivenUp} {setGuess} />
    {#if !existedScore}
      <section class="flex flex-row gap-x-3">
        <div>Points: <span class="font-bold">{$points}</span></div>
        <div>Guesses Left: <span class="font-bold">{$guesses}</span></div>
      </section>
    {/if}
    <section>
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <p
        on:click={() => {
          isGivenUp === false && endGame === false
            ? handleGivenUp()
            : showAnswerModal();
        }}
        class="underline hover:cursor-pointer"
      >
        {existedScore || endGame ? "Show Answer" : "Give up"}
      </p>
    </section>
    {#if !existedScore}
      <section class="px-2 w-full space-y-5">
        <Section data={voiceActorsData} title="Voice Actors" />
        <Section data={staffsData} title="Staff" />
        <Section data={detailsData} title="Details" />
      </section>
    {:else}
      <section>
        <AlreadyPlayed data={existedScore} />
      </section>
    {/if}
  </section>
</main>
