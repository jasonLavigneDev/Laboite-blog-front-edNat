<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<style lang="scss" global>
  @import "../theme/index.scss";
</style>

<Nav {segment} />

<main>
  <slot />
</main>
