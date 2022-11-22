<script>
  import {_} from 'svelte-i18n';
  import {onMount} from 'svelte';
  import {getStores, session} from '$app/stores';
  import fetcher from "isomorphic-fetch";
  import Loader from '../common/Loader.svelte';

  const {page} = getStores();

  let settings = {
      maintenance: null,
      textMaintenance: '',
      legal: { external: false, link: '', content: '' },
      accessibility: { external: false, link: '', content: '' },
      gcu: { external: false, link: '', content: '' },
      personalData: { external: false, link: '', content: '' },
    };
  let loading = true;

  onMount(async () => {
    const appsettings = await fetcher(`${$session.env.API_HOST}/appsettings`)
    settings = await appsettings.json()
    loading = false;
  });

  $: footer = [
    {
      text: $_('links.legal'),
      path: settings.legal.external
        ? settings.legal.link
        : `${$session.env.LABOITE_HOST}/legal/legalnotice`,
    },
    {
      text: $_('links.accessibility'),
      path: settings.accessibility.external
        ? settings.accessibility.link
        : `${$session.env.LABOITE_HOST}/legal/accessibility`,
    },
    {
      text: $_('links.gcu'),
      path: settings.gcu.external
        ? settings.gcu.link
        : `${$session.env.LABOITE_HOST}/legal/conditions`,
    },
    {
      text: $_('links.personalData'),
      path: settings.personalData.external
        ? settings.personalData.link
        : `${$session.env.LABOITE_HOST}/legal/personal-data`,
    },
  ];
</script>

<nav class="navbar is-primary" aria-label="main navigation">
  <div class="navbar-menu is-active">

    {#if loading}
      <Loader message={$_('loading')} />
    {/if}

    <div class="navbar-start">
      {#each footer as { path, text }}
        <a
          class:is-active={$page.url.pathname === path}
          class="navbar-item"
          target="_blank"
          href="{path}"
        >
          {$_(text)}
        </a>
      {/each}
    </div>
    <div class="navbar-end" />
  </div>
</nav>

<style>
  .navbar {
    height: 64px;
  }
  .navbar-menu {
    background-color: var(--primary) !important;
  }
  .navbar-item {
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 400;
    font-family: 'WorkSansBold' !important;
    font-size: 14px;
    color: var(--tertiary);
  }
  .navbar-item.is-active {
    color: var(--tertiary);
  }
</style>
