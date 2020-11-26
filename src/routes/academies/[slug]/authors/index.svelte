<script context="module">
  import { identity } from "../../../../settings";
  import { fetchData } from "../../../../utils/api/methods";
  import { structureOptions } from "../../_academies";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;
    const academy = structureOptions.find(({ slug }) => slug === params.slug);

    const limit = 9;
    const fields = {};
    const searchFields = ["firstName", "lastName", "username", "structure"];
    const order = "articlesCount DESC";
    const apiurl = "authors";
    const where = { articlesCount: { gt: 0 }, structure: academy.value };

    const { items, total } = await fetchData({
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
      academy,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../../../components/common/Divider.svelte";
  import PageTransition from "../../../../components/common/PageTransition.svelte";
  import SearchField from "../../../../components/common/SearchField.svelte";
  import Pagination from "../../../../components/common/Pagination.svelte";
  import Loader from "../../../../components/common/Loader.svelte";
  import NoResults from "../../../../components/common/NoResults.svelte";
  import AuthorIdCard from "../../../../components/authors/AuthorIdCard.svelte";

  export let authors = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let loading = false;
  export let academy;
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
  }
  .container .title {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {academy.label} | {$_('links.authors')}</title>
</svelte:head>

<PageTransition>
  <div class="container">
    <a href="/academies/{academy.slug}" rel="prefetch"><h1 class="title">
        {academy.label}
      </h1></a>
  </div>
  <section class="box-transparent">
    <div class="container">
      <h1 class="title">{$_('pages.authors.title')}</h1>
      <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
    </div>
    <Divider />
    <div class="columns is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField bind:loading {query} {path} />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !loading}
          <Pagination {total} {page} {limit} {query} {path} bind:loading />
        {/if}
      </div>
    </div>

    {#if loading}
      <Loader message={$_('loading')} />
    {/if}
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
    <Pagination {total} {page} {limit} {query} {path} bind:loading />
  </section>
</PageTransition>
