<!-- svelte-ignore missing-declaration -->
<script>
  import {_} from 'svelte-i18n';
  import PageTransition from '../components/common/PageTransition.svelte';
  import FavoriteAcademy from '../components/home/FavoriteAcademy.svelte';

  import LastPublished from '../components/home/LastPublished.svelte';
  import LastRead from '../components/home/LastRead.svelte';
  import LastAcademies from '../components/home/LastAcademies.svelte';
  import {
    favoritesAcademy,
    lastAcademies,
    lastRead,
  } from '../utils/functions/stores';
  export let data;
</script>

<svelte:head>
  <title>{$_('title')} - {__APP_VERSION__}</title>
</svelte:head>

<PageTransition>
  {#if $favoritesAcademy}
    <FavoriteAcademy />
  {/if}
  <LastPublished articles={data.articles} />
  {#if $lastRead.length}
    <LastRead />
  {/if}
  {#if $lastAcademies.length}
    <LastAcademies />
  {/if}
</PageTransition>
