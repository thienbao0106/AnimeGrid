<script lang="ts">
  import { calculate } from "$lib/stores/calculate";
  export let number = 0;
  export let value = 0;
</script>

<button
  on:click={() => {
    calculate.decrement(value);
  }}
  class="text-white font-bold bg-secondaryColor w-full rounded-sm relative h-[50px] flex justify-center items-center"
>
  <div class="absolute top-1 left-2 font-normal text-sm">{value}</div>
  <div>Hello</div>
  <div class="absolute bottom-1 right-2 font-normal text-sm">{number}</div>
</button>
