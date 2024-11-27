<script lang="ts">
  import { gridAnswers } from "$lib/stores/gridAnswers";
  export let boxId;
  export let question;
  export let setQuestion;

  let hasAnswer: string | undefined = "";
  $: {
    hasAnswer =
      $gridAnswers.find((ans: any) => `box-${ans.id}` === boxId)?.guess || "";
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="w-[150px] h-[200px] bg-white border border-secondaryColor hover:bg-opacity-60 hover:cursor-pointer"
  on:click={() => {
    setQuestion(question);
  }}
>
  {hasAnswer}
</div>
