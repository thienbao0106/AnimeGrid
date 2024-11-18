<script lang="ts">
  import List from "../common/List.svelte";
  import Box from "./Box.svelte";
  export let data: any[];
  export let title: string;
</script>

<div class="w-full flex justify-center items-center flex-col">
  <h2 class="text-secondaryColor font-bold text-2xl mb-5">{title}</h2>
  <List
    renderItem={Box}
    className="grid lg:grid-cols-3 grid-cols-2 gap-3 w-full"
    {data}
  ></List>
</div>
