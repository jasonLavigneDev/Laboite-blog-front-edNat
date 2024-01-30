<script>
  import {_} from 'svelte-i18n';
  import Divider from '../common/Divider.svelte';
  import SingleArticleBlock from '../articles/SingleArticleBlock.svelte';
  import BigLink from '../common/BigLink.svelte';

  export let articles = [];
  export let structure;
</script>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.structure.last_title')}</h1>
      <h2 class="subtitle">{$_('pages.structure.last_subtitle')}</h2>
    </div>
    <BigLink
      link="/structures/{structure._id}/articles"
      text={$_('pages.structure.all_articles')}
    />
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each articles as article}
      <SingleArticleBlock {article} />
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
