<script lang="ts">
  import { level } from "$lib/stores/level";
</script>

<main class="flex flex-row text-secondaryColor gap-x-5 font-semibold py-8">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    on:click={() => level.setLevel("normal")}
    class="hover:underline hover:cursor-pointer"
  >
    Normal
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    on:click={() => level.setLevel("hard")}
    class="hover:underline hover:cursor-pointer"
  >
    Hard
  </div>
</main>
