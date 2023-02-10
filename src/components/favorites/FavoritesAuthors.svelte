<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';

  import Divider from '../common/Divider.svelte';
  import SmallAuthorCardId from '../authors/SmallAuthorCardId.svelte';
  import NoResults from '../common/NoResults.svelte';
  import FavoritesTitle from './FavoritesTitle.svelte';

  export let authors = [];
  let isOpen = false;
</script>

<section>
  <FavoritesTitle
    component="authors"
    componentCount={authors.length}
    bind:isOpen
  />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline my-4">
      {#each authors as author}
        <SmallAuthorCardId {author} />
      {:else}
        <div class="column is-full">
          <NoResults title={$_('pages.favorites.noauthors_title')} />
        </div>
      {/each}
    </div>
  {/if}
  <Divider />
</section>
