<script context="module">
  import { waitLocale } from "svelte-i18n";
  import "../utils/theme/index.css";

  export async function preload() {
    return waitLocale();
  }
</script>

<script>
  import "../utils/locales/index";
  import Nav from "../components/Navigation/Nav.svelte";
</script>

<style global lang="scss">
  .container {
    padding-top: 15px;
  }
</style>

<Nav />

<main class="container">
  <slot />
</main>
