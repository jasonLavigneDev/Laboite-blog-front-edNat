<script context="module">
  import { identity } from "../../settings";
  import { fetchData } from "../../utils/api/methods";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;

    const limit = 9;
    const fields = {};
    const searchFields = ["firstName", "lastName", "username", "structure"];
    const order = "articlesCount DESC";
    const apiurl = "authors";
    const where = { articlesCount: { gt: 0 } };

    const { items, total } = await fetchData(this.fetch, {
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
      authors: items,
      total,
      limit,
      page: Number(page),
      query,
      path,
      loading: false,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import SingleAuthorBlock from "../../components/authors/SingleAuthorBlock.svelte";
  import SearchField from "../../components/common/SearchField.svelte";
  import Pagination from "../../components/common/Pagination.svelte";
  import Loader from "../../components/common/Loader.svelte";
  import NoResults from "../../components/common/NoResults.svelte";

  export let authors = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let loading = false;
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('links.authors')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{$_('pages.authors.title')}</h1>
      <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
    </div>
    <Divider />
    <SearchField bind:loading {query} {path} />
    <Divider transparent />
    <Pagination {total} {page} {limit} {query} {path} bind:loading />

    {#if loading}
      <Loader message={$_('loading')} />
    {/if}
    {#if authors.length}
      <div class="columns is-multiline">
        {#each authors as author}
          <SingleAuthorBlock {author} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    <Pagination {total} {page} {limit} {query} {path} bind:loading />
  </section>
</PageTransition>
