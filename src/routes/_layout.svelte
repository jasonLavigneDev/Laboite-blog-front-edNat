<script context="module">
  import { waitLocale, _, locale } from "svelte-i18n";
  import "../utils/theme/index.css";

  export async function preload() {
    waitLocale();
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import "../utils/locales/index";
  import Nav from "../components/navigation/Nav.svelte";
  import Footer from "../components/navigation/Footer.svelte";
  import { trackLocation } from "../utils/functions/locationTracker";
  import Loader from "../components/common/Loader.svelte";
  import { onMount } from "svelte";
  import { language } from "../utils/functions/stores";

  onMount(() => {
    if (!$language) {
      language.set($locale.split("-")[0]);
    } else {
      locale.set($language);
    }
  });

  trackLocation();

  const { preloading } = stores();
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

  .fav-button-wrap {
    display: flex;
    justify-content: flex-end;
  }
  .fav-button-wrap .box-transparent {
    display: flex;
    align-items: center;
    div {
      margin-right: 5px;
    }
  }
</style>

<Nav />

{#if $preloading}
  <Loader message={$_('loading')} mainLoader={true} />
{/if}

<main class="container">
  <slot />
</main>

<Footer />
