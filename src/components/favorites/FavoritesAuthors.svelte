<script>
  import { _ } from 'svelte-i18n';
  import Divider from '../common/Divider.svelte';
  import SmallAuthorCardId from '../authors/SmallAuthorCardId.svelte';
  import NoResults from '../common/NoResults.svelte';

  export let authors = [];
</script>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.favorites.authors_title')}</h1>
      <h2 class="subtitle">{$_('pages.favorites.authors_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each authors as author}
      <SmallAuthorCardId {author} />
    {:else}
      <div class="column is-full">
        <NoResults title={$_('pages.favorites.noauthors_title')} />
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
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
