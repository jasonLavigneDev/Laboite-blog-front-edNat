<script>
  import {_} from 'svelte-i18n';
  import {getStores} from '$app/stores';
  import Divider from '../../components/common/Divider.svelte';
  import SearchField from '../../components/common/SearchField.svelte';
  import Pagination from '../../components/common/Pagination.svelte';
  import NoResults from '../../components/common/NoResults.svelte';
  import AuthorIdCard from '../../components/authors/AuthorIdCard.svelte';
  import PageTransition from '../../components/common/PageTransition.svelte';
  import FavoritesButton from '../../components/common/FavoritesButton.svelte';

  export let data;
  const {navigating} = getStores();
</script>

<svelte:head>
  <title>{$_('title')} | {$_('links.authors')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="columns is-multiline is-mobile">
      <div
        class="column"
        class:is-full={!data.isResearchLink}
        class:is-half={data.isResearchLink}
      >
        <h1 class="title">{$_('pages.authors.title')}: {data.total}</h1>
        <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
      </div>
      {#if data.isResearchLink}
        <div class="column is-half fav-button-wrap">
          <div class="box-transparent">
            <div>{$_('save_research')}</div>
            <FavoritesButton
              type="research"
              itemId={JSON.stringify(data.request)}
            />
          </div>
        </div>
      {/if}
    </div>
    <Divider />

    <div class="columns is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField
          loading={$navigating}
          query={data.query}
          path={data.path}
        />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !$navigating}
          <Pagination
            total={data.total}
            page={data.page}
            limit={data.limit}
            query={data.query}
            path={data.path}
          />
        {/if}
      </div>
    </div>

    {#if data.authors.length}
      <div class="columns is-multiline">
        {#each data.authors as author}
          <div class="column is-one-third is-half-tablet is-full-mobile">
            <AuthorIdCard {author} />
          </div>
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(data.query).length} />
    {/if}
    <Pagination
      total={data.total}
      page={data.page}
      limit={data.limit}
      query={data.query}
      path={data.path}
    />
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
