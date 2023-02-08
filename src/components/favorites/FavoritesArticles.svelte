<script>
  import {_} from 'svelte-i18n';
  import {slide} from 'svelte/transition';
  import Divider from '../common/Divider.svelte';
  import SmallArticleBlock from '../articles/SmallArticleBlock.svelte';
  import NoResults from '../common/NoResults.svelte';

  export let articles = [];

  let isOpen = false;

  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<section>
  <div class="container">
    <div>
      <h1 class="title">
        {$_('pages.favorites.articles_title')}

        <button class="button is-round" on:click={() => handleClick()}>
          <span class="icon is-small">
            <i class="fa fa-chevron-down" />
          </span>
        </button>
      </h1>
      <h2 class="subtitle">{$_('pages.favorites.articles_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  {#if isOpen === true}
    <div transition:slide={{duration: 400}} class="columns is-multiline">
      {#each articles as article}
        <SmallArticleBlock {article} />
      {:else}
        <div class="column is-full">
          <NoResults title={$_('pages.favorites.noarticles_title')} />
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  /* .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  } */
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
