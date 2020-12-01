<script>
  import { fly, fade } from "svelte/transition";
  let inTransition = { y: 100, duration: 600, delay: 200 };
</script>

<style>
  div {
    position: inherit;
  }
</style>

<div in:fly={inTransition} out:fade={{ duration: 200 }}>
  <slot />
</div>
