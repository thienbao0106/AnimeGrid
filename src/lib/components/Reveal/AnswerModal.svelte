<script lang="ts">
  import { onMount } from "svelte";
  import { points } from "$lib/stores/calculate";
  import { closeModalFromOutside } from "$lib/utils/closeModal";
  export let title: string = "";
  export let image: string = "";
  export let setCloseModal: any;
  let answerModal: any;
  onMount(() => {
    answerModal = document.querySelector("#answer");
    answerModal.showModal();
    closeModalFromOutside(answerModal, setCloseModal);
  });
  const handleCloseModal = () => {
    answerModal.close();
    setCloseModal();
  };
</script>

<dialog
  class="h-[650px] lg:w-1/3 w-full pt-0.5 px-2 border-2 rounded-sm border-secondaryColor text-secondaryColor"
  id="answer"
>
  <div class="text-right">
    <button
      on:click={handleCloseModal}
      class="hover:font-bold bg-transparent text-3xl">X</button
    >
  </div>
  <div class="space-y-3 flex flex-col justify-center items-center">
    <h1 class="text-2xl font-bold">Answer</h1>
    <h2 class="text-xl">{title}</h2>
    <img
      src={image}
      loading="lazy"
      class="w-[20rem] rounded-sm"
      alt={`${title}-image`}
      srcset=""
    />
    <p>{`You score: ${$points}`}</p>
  </div>
</dialog>
