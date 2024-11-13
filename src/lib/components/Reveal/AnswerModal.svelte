<script lang="ts">
  import { onMount } from "svelte";
  import { points } from "$lib/stores/calculate";
  export let title: string = "";
  export let image: string = "";
  export let setShowModal: any;
  let answerModal: any;
  onMount(() => {
    answerModal = document.querySelector("#answer");
    answerModal.showModal();
  });
  const handleCloseModal = () => {
    answerModal.close();
    setShowModal(false);
  };
</script>

<dialog
  class="h-[650px] lg:w-1/3 w-full pt-0.5 px-2 border-2 rounded-sm border-secondaryColor text-secondaryColor space-y-3 flex flex-col justify-start items-center"
  id="answer"
>
  <div class="">
    <button on:click={handleCloseModal} class="hover:font-bold bg-transparent"
      >X</button
    >
  </div>
  <h1 class="text-2xl font-bold">Answer</h1>
  <h2 class="text-xl">{title}</h2>
  <img
    src={image}
    class="w-[20rem] rounded-sm"
    alt={`${title}-image`}
    srcset=""
  />
  <p>{`You score: ${$points}`}</p>
</dialog>
