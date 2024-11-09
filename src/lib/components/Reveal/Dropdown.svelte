<script lang="ts">
  export let filterData: any[] = [];
  export let setAnswer: (data: string) => void;
</script>

<section
  class="w-full absolute flex-col flex justify-left items-left h-[150px] z-50 overflow-y-scroll bg-white text-black"
>
  {#each filterData as data}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="w-full text-left p-2 hover:cursor-pointer"
      on:click={() => setAnswer(data)}
    >
      {data}
    </div>
  {:else}
    <div class="p-2">No options</div>
  {/each}
</section>
