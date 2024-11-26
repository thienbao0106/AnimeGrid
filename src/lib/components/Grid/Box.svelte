<script lang="ts">
  export let question;
  export let setQuestion;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="w-[150px] h-[200px] bg-white border border-secondaryColor hover:bg-mainColor hover:cursor-pointer"
  on:click={() => {
    setQuestion(question);
  }}
></div>
