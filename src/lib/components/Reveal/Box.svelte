<script lang="ts">
  import { points, guesses } from "$lib/stores/calculate";
  import PersonModal from "./PersonModal.svelte";
  import { level } from "../../stores/level";
  export let name: string;
  export let role: string;
  export let image: string;
  export let value = 0;
  let isShowModal = false,
    currentLevel: string = $level;
  $: isShow = false;

  const handleShowPersonImage = () => {
    isShowModal = true;
  };
  const setCloseModal = () => {
    isShowModal = false;
  };
  $: {
    if (currentLevel !== $level) {
      isShow = false;
    }
    currentLevel = $level;
  }
</script>

{#if isShowModal}
  <PersonModal {setCloseModal} {name} {image} />
{/if}

<button
  on:click|once={() => {
    points.decrement(value);
    isShow = true;
  }}
  disabled={$points <= 0 || $guesses === 0}
  class="text-white hover:bg-[#004995] font-bold bg-secondaryColor w-full rounded-sm relative h-[100px] flex justify-center items-center"
>
  <div class="absolute bottom-1 right-2 font-normal text-sm">{`-${value}`}</div>
  {#if isShow}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="hover:cursor-pointer" on:click={handleShowPersonImage}>
      {name}
    </div>
  {/if}
  <div class="absolute top-1 left-2 font-bold text-sm">{role}</div>
</button>
