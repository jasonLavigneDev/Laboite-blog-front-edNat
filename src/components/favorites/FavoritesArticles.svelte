<script>
  import {_} from 'svelte-i18n';
  import Divider from '../common/Divider.svelte';
  import SmallArticleBlock from '../articles/SmallArticleBlock.svelte';
  import NoResults from '../common/NoResults.svelte';

  export let articles = [];
</script>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.favorites.articles_title')}</h1>
      <h2 class="subtitle">{$_('pages.favorites.articles_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each articles as article}
      <SmallArticleBlock {article} />
    {:else}
      <div class="column is-full">
        <NoResults title={$_('pages.favorites.noarticles_title')} />
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
