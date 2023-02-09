<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';

  import {favoritesResearches} from '../../utils/functions/stores';
  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import SingleResearch from './SingleResearch.svelte';

  let isOpen = false;

  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<section>
  <div class="container">
    <div>
      <h1 class="title">
        {$_('pages.favorites.research_title')}
        ({$favoritesResearches.length})
        <button
          class="button is-round"
          style="border: none; background: transparent"
          on:click={() => handleClick()}
        >
          {#if isOpen === true}
            <span class="icon is-small">
              <i class="fa fa-chevron-down is-open" />
            </span>
          {:else}
            <span class="icon is-small">
              <i class="fa fa-chevron-down" />
            </span>
          {/if}
        </button>
      </h1>
      <h2 class="subtitle">{$_('pages.favorites.research_subtitle')}</h2>
    </div>
  </div>
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

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .is-open {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
