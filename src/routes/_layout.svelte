<script context="module">
  import { waitLocale } from "svelte-i18n";

  export async function preload() {
    // awaits for the loading of the 'en-US' and 'en' dictionaries
    return waitLocale();
  }
</script>

<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<style lang="scss" global>
  @import "../utils/theme/index.scss";
  .container {
    padding-top: 15px;
  }
</style>

<Nav {segment} />

<main class="container">
  <slot />
</main>
