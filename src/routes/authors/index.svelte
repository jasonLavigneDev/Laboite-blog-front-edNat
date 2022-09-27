<script context="module">
  import {fetchData} from '../../utils/api/methods';

  export async function load({url, session}) {
    const path = url.pathname;
    const page = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');

    const query = {page, search};
    const isResearchLink = !!search;
    const request = !!search
      ? {
          path,
          query: {search},
          type: 'authors',
        }
      : null;

    const limit = 9;
    const fields = {};
    const searchFields = ['firstName', 'lastName', 'structure'];
    const order = 'articlesCount DESC';
    const apiurl = 'authors';
    const where = {articlesCount: {gt: 0}};

    const {items, total} = await fetchData({
      host: session.env.API_HOST,
      limit,
      order,
      fields,
      searchFields,
      apiurl,
      value: search,
      where,
      skip: page === 1 ? 0 : (Number(page) - 1) * limit,
    });
    return {
      props: {
        authors: items,
        total,
        limit,
        page: Number(page),
        query,
        path,
        isResearchLink,
        request,
      },
    };
  }
</script>

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

  export let authors = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = '';
  export let isResearchLink;
  export let request;
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
        class:is-full={!isResearchLink}
        class:is-half={isResearchLink}
      >
        <h1 class="title">{$_('pages.authors.title')}: {total}</h1>
        <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
      </div>
      {#if isResearchLink}
        <div class="column is-half fav-button-wrap">
          <div class="box-transparent">
            <div>{$_('save_research')}</div>
            <FavoritesButton type="research" itemId={JSON.stringify(request)} />
          </div>
        </div>
      {/if}
    </div>
    <Divider />

    <div class="columns is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField loading={$navigating} {query} {path} />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !$navigating}
          <Pagination {total} {page} {limit} {query} {path} />
        {/if}
      </div>
    </div>

    {#if authors.length}
      <div class="columns is-multiline">
        {#each authors as author}
          <div class="column is-one-third is-half-tablet is-full-mobile">
            <AuthorIdCard {author} />
          </div>
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    <Pagination {total} {page} {limit} {query} {path} />
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
