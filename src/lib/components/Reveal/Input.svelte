<script lang="ts">
  import { onMount } from "svelte";
  import Dropdown from "./Dropdown.svelte";
  let guess = "";
  $: testFilterData = ["hello", "hello 1", "a"].filter((data) => {
    if (guess === "") return false;
    return data.includes(guess);
  });
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

  const handleSubmit = () => {};

  const handleChange = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    console.log(e.currentTarget.value);
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
        id="guessValue"
        type="text"
        bind:value={guess}
        on:change={(e) => handleChange(e)}
        on:click={() => setDropdown()}
        class="w-full px-2 py-4 rounded-none border border-secondaryColor border-x-0"
        placeholder="Input your answer here"
      />
      {#if showDropdown}
        <Dropdown filterData={testFilterData} {setAnswer} />
      {/if}
    </div>
    <input
      type="submit"
      value="Guess"
      class="bg-secondaryColor py-2 px-4 hover:bg-[#004995] text-white font-bold rounded-md hover:cursor-pointer"
    />
  </form>
</section>
