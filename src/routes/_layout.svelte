<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";

  export async function preload() {
    return waitLocale();
  }
</script>

<script lang="ts">
  import "../utils/locales/index";
  import Nav from "../components/Navigation/Nav.svelte";
</script>

<style lang="scss" global>
  @import "../utils/theme/index.scss";
  .container {
    padding-top: 15px;
  }
</style>

<Nav />

<main class="container">
  <slot />
</main>
