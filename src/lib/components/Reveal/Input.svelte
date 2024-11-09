<script lang="ts">
  import { onMount } from "svelte";
  import Dropdown from "./Dropdown.svelte";
  import { fetchDropdown } from "$lib/utils/fetchDropdown";
  export let isGivenUp: boolean = false;
  export let setGuess: any;
  console.log(isGivenUp);
  let guess: string = "",
    filteredData: any[] = [];

  $: showDropdown = false;

  //Set on mount
  onMount(() => {
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
    setGuess(guess);
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

  const setAnswer = (selectedAnswer: string) => {
    console.log(selectedAnswer);
    guess = selectedAnswer;
  };
  const setDropdown = () => {
    showDropdown = !showDropdown;
  };
</script>

<section class="w-full">
  <form
    on:submit|preventDefault={handleSubmit}
    class="w-full justify-center items-center flex flex-col gap-y-2"
  >
    <div class="relative w-full">
      <input
        disabled={isGivenUp}
        id="guessValue"
        type="text"
        bind:value={guess}
        on:change={(e) => handleChange(e)}
        on:click={() => setDropdown()}
        class="w-full px-2 py-4 rounded-none border border-secondaryColor border-x-0 bg-gray-50 disabled:bg-gray-200"
        placeholder="Input your answer here"
      />
      {#if showDropdown}
        <Dropdown filterData={filteredData} {setAnswer} />
      {/if}
    </div>
    <input
      disabled={isGivenUp}
      type="submit"
      value="Guess"
      class="bg-secondaryColor py-2 px-4 hover:bg-[#004995] text-white font-bold rounded-md hover:cursor-pointer disabled:bg-gray-700"
    />
  </form>
</section>
