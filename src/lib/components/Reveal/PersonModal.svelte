<script lang="ts">
  import { onMount } from "svelte";

  export let image: string = "";
  export let name: string = "";
  export let setCloseModal: any;

  const id = name.replaceAll(" ", "-").toLowerCase();
  let personModal: any;
  onMount(() => {
    personModal = document.querySelector(`#${id}`);
    personModal.showModal();
  });
  const handleCloseModal = () => {
    personModal.close();
    setCloseModal();
  };
</script>

<dialog
  {id}
  class="h-[450px] bg-gray-100 lg:w-1/3 w-full pt-0.5 px-2 border-2 rounded-sm border-secondaryColor text-secondaryColor space-y-3 flex flex-col justify-center items-center"
>
  <div class="flex justify-end items-center w-full">
    <button class="bg-transparent hover:font-bold" on:click={handleCloseModal}
      >X</button
    >
  </div>
  {#if image !== ""}
    <img
      loading="lazy"
      src={image}
      alt={`image-${id}`}
      class="rounded-sm"
      srcset=""
    />
  {/if}
</dialog>
