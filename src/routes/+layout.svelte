<script context="module">
  import {waitLocale, _, locale} from 'svelte-i18n';
  import '../utils/theme/index.css';
  import {getMaintenance} from '../utils/api/methods';

  export async function load(args) {
    waitLocale();
    const maintenance = await getMaintenance(args.session.env.API_HOST);
    return {...args, props: {...args.props, maintenance}};
  }
</script>

<script defer src="./fonts/js/all.min.js">
  import {getStores} from '$app/stores';
  import '../utils/locales/index';
  import Nav from '../components/navigation/Nav.svelte';
  import Footer from '../components/navigation/Footer.svelte';
  import {trackLocation} from '../utils/functions/locationTracker';
  import Loader from '../components/common/Loader.svelte';
  import {onMount} from 'svelte';
  import {language} from '../utils/functions/stores';

  export let maintenance = {maintenance: false, textMaintenance: ''};

  onMount(() => {
    if (!$language) {
      language.set($locale.split('-')[0]);
    } else {
      locale.set($language);
    }
  });

  trackLocation();

  const {navigating} = getStores();
</script>

<Nav />

{#if !!$navigating}
  <Loader message={$_('loading')} mainLoader={true} />
{/if}

<main class="container">
  {#if !!maintenance.maintenance}
    <div class="maintenance">
      <h1>{$_('maintenance')}</h1>
      <p>{maintenance.textMaintenance}</p>
    </div>
  {:else}
    <slot />
  {/if}
</main>

<Footer />

<style>
  main {
    padding-top: calc(52px + var(--space-between));
    min-height: calc(100vh - 64px);
  }
  :global(.hidden) {
    display: none;
  }

  :global(.maintenance) {
    text-align: center;
    border: rgba(255, 0, 0, 0.7) solid 5px;
    padding: 3vh;
    border-radius: 15px;
  }

  :global(h1, h2, h3, h4, h5, h6, .title, .maintenance) {
    font-family: 'WorkSansBold' !important;
  }

  :global(.title, .subtitle, p, .content) {
    color: var(--texts);
  }
  :global(.box-transparent) {
    padding: 20px;
  }

  :global(.fav-button-wrap) {
    display: flex;
    justify-content: flex-end;
  }
  :global(.fav-button-wrap .box-transparent) {
    display: flex;
    align-items: center;
  }
  :global(.fav-button-wrap .box-transparent div) {
    margin-right: 5px;
  }
</style>
