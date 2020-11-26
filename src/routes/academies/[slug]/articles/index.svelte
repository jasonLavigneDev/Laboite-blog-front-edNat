<script context="module">
  import { identity } from "../../../../settings";
  import { fetchData } from "../../../../utils/api/methods";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;
    const academy = structureOptions.find(({ slug }) => slug === params.slug);

    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = "articles";
    const where = { structure: academy.value };
    const include = [
      {
        relation: "user",
        scope: {
          fields: {
            articlesCount: false,
            username: false,
            structure: false,
          },
          limit: 1,
        },
      },
    ];

    const { items, total } = await fetchData({
      limit,
      order,
      fields,
      searchFields,
      apiurl,
      where,
      value: search,
      include,
      skip: page === 1 ? 0 : (Number(page) - 1) * limit,
    });
    return {
      articles: items,
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
  import SingleArticleBlock from "../../../../components/articles/SingleArticleBlock.svelte";
  import PageTransition from "../../../../components/common/PageTransition.svelte";
  import SearchField from "../../../../components/common/SearchField.svelte";
  import Pagination from "../../../../components/common/Pagination.svelte";
  import Loader from "../../../../components/common/Loader.svelte";
  import NoResults from "../../../../components/common/NoResults.svelte";
  import { structureOptions } from "../../_academies";

  export let articles = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let loading = false;
  export let academy;
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
  .container .title {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {academy.label} | {$_('links.articles')}</title>
</svelte:head>

<PageTransition>
  <div class="container">
    <a href="/academies/{academy.slug}" rel="prefetch"><h1 class="title">
        {academy.label}
      </h1></a>
  </div>
  <section class="box">
    <div class="container">
      <h1 class="title">{$_('pages.articles.title')}: {total}</h1>
      <h2 class="subtitle">{$_('pages.articles.subtitle')}</h2>
    </div>
    <Divider />
    <SearchField bind:loading {query} {path} />
    <Divider transparent />
    <Pagination {total} {page} {limit} {query} {path} bind:loading />

    {#if loading}
      <Loader message={$_('loading')} />
    {/if}
    {#if articles.length}
      <div class="columns is-multiline">
        {#each articles as article, index}
          <SingleArticleBlock {article} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    <Pagination {total} {page} {limit} {query} {path} bind:loading />
  </section>
</PageTransition>
