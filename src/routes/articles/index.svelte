<script context="module">
  import { identity } from "../../settings";
  import { fetchData, getTags } from "../../utils/api/methods";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "", tags } = query;

    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = "articles";
    const where = tags ? { tags: { inq: [tags] } } : {};
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
      value: search,
      include,
      where,
      skip: page === 1 ? 0 : (Number(page) - 1) * limit,
    });

    const tagsList = await getTags();
    return {
      articles: items,
      total,
      limit,
      page: Number(page),
      query,
      path,
      tagsList,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import Divider from "../../components/common/Divider.svelte";
  import SingleArticleBlock from "../../components/articles/SingleArticleBlock.svelte";
  import SearchField from "../../components/common/SearchField.svelte";
  import Pagination from "../../components/common/Pagination.svelte";
  import NoResults from "../../components/common/NoResults.svelte";
  import TagsFilter from "../../components/common/TagsFilter.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";

  export let articles = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let tagsList = [];
  const { preloading } = stores();
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('links.articles')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="container">
      <h1 class="title">{$_('pages.articles.title')}: {total}</h1>
      <h2 class="subtitle">{$_('pages.articles.subtitle')}</h2>
    </div>
    <Divider />
    <div class="columns is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField loading={$preloading} {query} {path} />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !$preloading}
          <Pagination {total} {page} {limit} {query} {path} />
        {/if}
      </div>
      <div class="column is-full">
        {#if !$preloading}
          <TagsFilter {query} {path} {tagsList} />
        {/if}
      </div>
    </div>

    {#if articles.length}
      <div class="columns is-multiline">
        {#each articles as article, index}
          <SingleArticleBlock {article} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    {#if !$preloading}
      <Pagination {total} {page} {limit} {query} {path} />
    {/if}
  </section>
</PageTransition>
