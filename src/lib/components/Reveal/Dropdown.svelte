<script lang="ts">
  export let filterData: any[] = [];
  export let setAnswer: (data: string) => void;
</script>

<section
  class="w-full absolute flex-col flex justify-left items-left h-[100px] bg-white"
>
  {#each filterData as data}
    <button class="w-full text-left px-2" on:click={() => setAnswer(data)}
      >{data}</button
    >
  {:else}
    <div>No options</div>
  {/each}
</section>
