<script>
  import { blur } from "svelte/transition";
  let inTransition = { y: 100, duration: 600, delay: 100 };
</script>

<style>
  div {
    position: inherit;
  }
</style>

<div in:blur|local={inTransition} out:blur|local={{ duration: 200 }}>
  <slot />
</div>
