<script lang="ts">
  export let data: any[];
  export let renderItem: any;
  export let className: string = "";
</script>

<div class={className}>
  {#each data as item}
    <svelte:component this={renderItem} {...item} />
  {/each}
</div>
