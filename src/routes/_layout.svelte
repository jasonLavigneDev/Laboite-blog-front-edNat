<script context="module">
  import { waitLocale } from "svelte-i18n";
  import "../utils/theme/index.css";

  export async function preload() {
    waitLocale();
  }
</script>

<script>
  import "../utils/locales/index";
  import Nav from "../components/navigation/Nav.svelte";
  import Footer from "../components/navigation/Footer.svelte";
  import { trackLocation } from "../utils/functions/locationTracker";

  trackLocation();
</script>

<style global lang="scss">
  main {
    padding-top: calc(52px + var(--space-between));
    min-height: calc(100vh - 64px);
  }
  .hidden {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .title {
    font-family: "WorkSansBold" !important;
  }

  .title,
  .subtitle,
  p,
  .content {
    color: var(--texts);
  }
  .box-transparent {
    padding: 20px;
  }
</style>

<Nav />

<main class="container">
  <slot />
</main>

<Footer />
