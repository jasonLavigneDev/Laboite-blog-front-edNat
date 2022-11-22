<script>
  import {_} from 'svelte-i18n';
  import {favoritesResearches} from '../../utils/functions/stores';
  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import SingleResearch from './SingleResearch.svelte';
</script>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.favorites.research_title')}</h1>
      <h2 class="subtitle">{$_('pages.favorites.research_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each $favoritesResearches as research}
      <SingleResearch {research} />
    {:else}
      <div class="column is-full">
        <NoResults title={$_('pages.favorites.noresearch_title')} />
      </div>
    {/each}
  </div>
</section>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
