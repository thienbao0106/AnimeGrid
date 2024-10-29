<script lang="ts">
  import List from "../common/List.svelte";
  import Box from "./Box.svelte";
  export let data: any[];
</script>

<div class="w-full flex justify-center items-center flex-col">
  <h2 class="text-secondaryColor font-bold text-lg">Casts</h2>
  <List renderItem={Box} className="grid grid-cols-3 gap-3 w-full" {data}
  ></List>
</div>
