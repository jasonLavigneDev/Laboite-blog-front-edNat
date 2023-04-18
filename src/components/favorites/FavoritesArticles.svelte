<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';
  import Divider from '../common/Divider.svelte';
  import SmallArticleBlock from '../articles/SmallArticleBlock.svelte';
  import NoResults from '../common/NoResults.svelte';
  import FavoritesTitle from './FavoritesTitle.svelte';

  export let articles = [];

  let isOpen = false;
  console.log(isOpen);
</script>

<section>
  <FavoritesTitle
    component="articles"
    componentCount={articles.length}
    bind:isOpen
  />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline my-4">
      {#each articles as article}
        <SmallArticleBlock {article} />
      {:else}
        <div class="column is-full">
          <NoResults title={$_('pages.favorites.noarticles_title')} />
        </div>
      {/each}
    </div>
  {/if}
  <Divider />
</section>
