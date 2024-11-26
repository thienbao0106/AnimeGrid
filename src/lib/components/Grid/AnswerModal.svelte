<script lang="ts">
  import { onMount } from "svelte";

  export let question;
  export let character;
  export let closeModal;
  export let id;

  onMount(() => {
    const modal: any = document.querySelector(`#${id}`);
    if (!modal) return;
    modal.showModal();
  });
</script>

<main>
  <dialog
    {id}
    class="h-[550px] bg-gray-100 lg:w-1/3 w-full pt-0.5 p-2 border-2 rounded-sm border-secondaryColor text-secondaryColor space-y-3 flex flex-col"
  >
    <div class="w-full text-right text-2xl">
      <button class="" on:click={closeModal}>X</button>
    </div>
    <h1 class="text-center">{question.title} x {character.name}</h1>
    <form>
      <input
        type="text"
        name="answer"
        class="w-full border border-secondaryColor px-2 py-3"
      />
    </form>
  </dialog>
</main>
