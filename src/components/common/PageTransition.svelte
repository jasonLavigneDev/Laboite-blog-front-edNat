<script>
  import {blur} from 'svelte/transition';
  let inTransition = {y: 100, duration: 600, delay: 100};
</script>

<div in:blur|local={inTransition} out:blur|local={{duration: 200}}>
  <slot />
</div>

<style>
  div {
    position: inherit;
  }
</style>
