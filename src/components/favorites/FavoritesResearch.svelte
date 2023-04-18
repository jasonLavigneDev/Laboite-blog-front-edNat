<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';

  import {favoritesResearches} from '../../utils/functions/stores';
  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import FavoritesTitle from './FavoritesTitle.svelte';
  import SingleResearch from './SingleResearch.svelte';

  let isOpen = false;
</script>

<section>
  <FavoritesTitle
    component="research"
    componentCount={$favoritesResearches.length}
    bind:isOpen
  />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline my-4">
      {#each $favoritesResearches as research}
        <SingleResearch {research} />
      {:else}
        <div class="column is-full">
          <NoResults title={$_('pages.favorites.noresearch_title')} />
        </div>
      {/each}
    </div>
  {/if}
  <Divider />
</section>
