<script lang="ts">
  import { onMount } from "svelte";
  import Dropdown from "../Reveal/Dropdown.svelte";
  import { fetchDropdown } from "$lib/utils/anilist/fetchDropdown";
  import { gridAnswers } from "$lib/stores/gridAnswers";

  export let question;
  export let character;
  export let closeModal;
  export let id;

  $: showDropdown = false;
  let guess = "",
    filteredData: any[] = [];
  //Set on mount
  onMount(() => {
    const modal: any = document.querySelector(`#${id}`);
    if (!modal) return;
    modal.showModal();

    document.addEventListener("click", (ev) => {
      const guessInput = document.querySelector("#guessValue");
      let target: any = ev.target;
      do {
        if (target === guessInput) {
          showDropdown = true;
          return;
        }
        // Go up the DOM
        target = target.parentNode;
      } while (target && showDropdown);

      showDropdown = false;
    });
  });

  const handleSubmit = () => {
    closeModal();
    gridAnswers.addAnswer({
      id,
      guess,
    });
  };

  const setDropdown = () => {
    showDropdown = !showDropdown;
  };

  const handleChange = async (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (guess === "") return;
    const data = await fetchDropdown(e.currentTarget.value);
    filteredData = data;
  };
</script>

<main>
  <dialog
    {id}
    class=" h-[300px] bg-gray-100 lg:w-1/3 w-full pt-0.5 p-2 border-2 rounded-sm border-secondaryColor text-secondaryColor space-y-3 flex flex-col"
  >
    <div class="w-full text-right text-2xl">
      <button class="" on:click={closeModal}>X</button>
    </div>
    <h1 class="text-center">{question.title} x {character.name}</h1>
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-y-2">
      <div class="relative">
        <input
          type="text"
          name="answer"
          id="guessValue"
          class="w-full border border-secondaryColor px-2 py-3"
          bind:value={guess}
          on:change={(e) => handleChange(e)}
          on:click={() => setDropdown()}
        />

        {#if showDropdown}
          <Dropdown
            className={" absolute w-full h-[100px] overflow-y-auto  z-50 bg-white"}
            filterData={filteredData}
            setAnswer={(currentGuess) => {
              guess = currentGuess;
            }}
          />
        {/if}
        <button
          type="submit"
          class="p-2 bg-secondaryColor hover:bg-opacity-80 text-white font-bold text-2xl rounded-md w-full mt-3"
          >Answer</button
        >
      </div>
    </form>
  </dialog>
</main>
