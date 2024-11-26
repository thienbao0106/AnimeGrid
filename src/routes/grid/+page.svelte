<script lang="ts">
  import Box from "$lib/components/Grid/Box.svelte";
  import AnswerModal from "$lib/components/Grid/AnswerModal.svelte";
  import questions from "../../lib/grid.json";

  let currentQuestion: any,
    isShowModal: boolean = false;
  const totalQuestions: any[] = [];
  for (
    let characterIndex = 0;
    characterIndex < questions.characters.length;
    characterIndex++
  ) {
    for (
      let questionIndex = 0;
      questionIndex < questions.questions.length;
      questionIndex++
    ) {
      totalQuestions.push({
        id: `q${questionIndex}-c${characterIndex}`,
        question: questions.questions[questionIndex],
        character: questions.characters[characterIndex],
      });
    }
  }

  const setCurrentQuestion = (question: any) => {
    isShowModal = true;
    currentQuestion = question;
  };
  const closeModal = () => {
    isShowModal = false;
  };
</script>

{#if isShowModal}
  <AnswerModal
    {closeModal}
    id={currentQuestion.id}
    character={currentQuestion.character}
    question={currentQuestion.question}
  />
{/if}
<main class="flex flex-row w-full h-[40rem]">
  <section class="flex flex-row justify-center items-center w-full -mx-[60px]">
    <section>
      {#each questions.characters as character}
        <div
          class="w-[150px] h-[200px] flex justify-center items-center text-secondaryColor"
        >
          {character.name}
        </div>
      {/each}
    </section>
    <section class="flex flex-col">
      <section class="flex flex-row mb-2">
        {#each questions.questions as quiz}
          <div
            class="w-[150px] flex justify-center items-center text-center text-secondaryColor"
          >
            {quiz.title}
          </div>
        {/each}
      </section>
      <div class={`grid grid-cols-${totalQuestions.length / 2}`}>
        {#each totalQuestions as quiz}
          <div>
            <Box question={quiz} setQuestion={setCurrentQuestion} />
          </div>
        {/each}
      </div>
    </section>
  </section>
</main>
