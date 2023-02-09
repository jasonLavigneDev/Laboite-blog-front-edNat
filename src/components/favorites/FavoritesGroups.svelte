<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';

  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import GroupCard from '../groups/GroupCard.svelte';

  export let groups = [];
  let isOpen = false;

  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<section>
  <div class="container">
    <div>
      <h1 class="title">
        {$_('pages.favorites.groups_title')}
        ({groups.length})
        <button class="button is-round" on:click={() => handleClick()}>
          <span class="icon is-small">
            <i class="fa fa-chevron-down" />
          </span>
        </button>
      </h1>
      <h2 class="subtitle">{$_('pages.favorites.groups_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline mb-4">
      {#each groups as group}
        <div class="column is-one-third is-half-tablet is-full-mobile">
          <GroupCard {group} isFavorite />
        </div>
      {:else}
        <div class="column is-full">
          <NoResults title={$_('pages.favorites.nogroups_title')} />
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
