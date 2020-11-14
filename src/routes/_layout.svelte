<script context="module">
  import { waitLocale } from "svelte-i18n";
  import "../utils/theme/index.css";
  import { fetchData } from "../utils/api/methods";

  export async function preload() {
    waitLocale();
    const fields = {};
    const apiurl = "legal-texts";

    const { items } = await fetchData(this.fetch, {
      fields,
      apiurl,
      count: false,
    });
    return {
      footerData: items,
    };
  }
</script>

<script>
  import "../utils/locales/index";
  import Nav from "../components/Navigation/Nav.svelte";
  import Footer from "../components/Navigation/Footer.svelte";
  export let footerData;
</script>

<style global lang="scss">
  main {
    padding-top: calc(52px + var(--space-between));
    min-height: calc(100vh - 64px);
  }
  .hidden {
    display: none;
  }
</style>

<Nav />

<main class="container">
  <slot />
</main>

<Footer {footerData} />
