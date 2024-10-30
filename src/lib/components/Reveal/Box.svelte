<script lang="ts">
  import { calculate } from "$lib/stores/calculate";
  export let info: string;
  export let value = 0;
  $: isShow = false;
</script>

<button
  on:click|once={() => {
    calculate.decrement(value);
    isShow = true;
  }}
  class="text-white hover:bg-[#004995] font-bold bg-secondaryColor w-full rounded-sm relative h-[80px] flex justify-center items-center"
>
  <div class="absolute bottom-1 right-2 font-normal text-sm">{value}</div>
  {#if isShow}
    <div>Hello</div>
  {/if}
  <div class="absolute top-1 left-2 font-bold text-sm">{info}</div>
</button>
