<script lang="ts">
  import { closeModalFromOutside } from "$lib/utils/closeModal";
  import { onMount } from "svelte";

  export let image: string = "";
  export let name: string = "";
  export let setCloseModal: any;

  const id = name.replaceAll(" ", "-").toLowerCase();
  let personModal: any;
  onMount(() => {
    personModal = document.querySelector(`#${id}`);
    personModal.showModal();
    closeModalFromOutside(personModal, setCloseModal);
  });
  const handleCloseModal = () => {
    personModal.close();
    setCloseModal();
  };
</script>

<dialog
  {id}
  class="h-[550px] bg-gray-100 lg:w-1/3 w-full pt-0.5 p-2 border-2 rounded-sm border-secondaryColor text-secondaryColor space-y-3 flex flex-col"
>
  <div class="flex justify-end items-center w-full">
    <button
      class="bg-transparent hover:font-bold text-3xl"
      on:click={handleCloseModal}>X</button
    >
  </div>
  {#if image !== ""}
    <div class="flex justify-center items-center">
      <img
        loading="lazy"
        src={image}
        alt={`image-${id}`}
        class="rounded-sm w-1/2"
        srcset=""
      />
    </div>
  {/if}
</dialog>
