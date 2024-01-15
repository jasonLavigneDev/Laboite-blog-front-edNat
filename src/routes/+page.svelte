<!-- svelte-ignore missing-declaration -->
<script>
  import {_} from 'svelte-i18n';
  import PageTransition from '../components/common/PageTransition.svelte';
  import FavoriteStructure from '../components/home/FavoriteStructure.svelte';

  import LastPublished from '../components/home/LastPublished.svelte';
  import LastRead from '../components/home/LastRead.svelte';
  import LastStructures from '../components/home/LastStructures.svelte';
  import {
    favoritesStructure,
    lastStructures,
    lastRead,
  } from '../utils/functions/stores';
  export let data;
</script>

<svelte:head>
  <title>{$_('title')} - {__APP_VERSION__}</title>
</svelte:head>

<PageTransition>
  {#if $favoritesStructure}
    <FavoriteStructure />
  {/if}
  <LastPublished articles={data.articles} />
  {#if $lastRead.length}
    <LastRead />
  {/if}
  {#if $lastStructures.length}
    <LastStructures />
  {/if}
</PageTransition>
