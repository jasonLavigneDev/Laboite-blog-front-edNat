<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';

  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import GroupCard from '../groups/GroupCard.svelte';
  import FavoritesTitle from './FavoritesTitle.svelte';

  export let groups = [];
  let isOpen = false;
</script>

<section>
  <FavoritesTitle
    component="groups"
    componentCount={groups.length}
    bind:isOpen
  />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline my-4">
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
  <Divider />
</section>
