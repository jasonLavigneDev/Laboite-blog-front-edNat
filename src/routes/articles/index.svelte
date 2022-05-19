<script context="module">
  import { fetchData, getTags } from "../../utils/api/methods";

  export async function load({ url, session }) {
    const path = url.pathname
    const page = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');
    const tags = url.searchParams.get('tags') || "";
    const query = { page, search, tags }
    const isResearchLink = !!tags || !!search;
    const request =
      !!tags || !!search
        ? {
            path,
            query: { search, tags },
            type: "articles",
          }
        : null;
    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = "articles";
    const where = tags
      ? {
          draft: { neq: true },
          and: tags.split(",").map((t) => ({ tags: { inq: [t] } })),
        }
      : { draft: { neq: true } };
    const include = [
      {
        relation: "user",
      },
    ];

    const { items, total } = await fetchData({
      host: session.env.API_HOST,
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

    const tagsList = await getTags(session.env.API_HOST);
    return {
      props: {
        articles: items,
        total,
        limit,
        page: Number(page),
        query,
        path,
        tagsList,
        isResearchLink,
        request,
      }
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import { getStores } from "$app/stores";
  import Divider from "../../components/common/Divider.svelte";
  import SingleArticleBlock from "../../components/articles/SingleArticleBlock.svelte";
  import SearchField from "../../components/common/SearchField.svelte";
  import Pagination from "../../components/common/Pagination.svelte";
  import NoResults from "../../components/common/NoResults.svelte";
  import TagsFilter from "../../components/common/TagsFilter.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import FavoritesButton from "../../components/common/FavoritesButton.svelte";

  export let articles = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let tagsList = [];
  export let isResearchLink;
  export let request;
  const { navigating } = getStores();
</script>

<svelte:head>
  <title>{$_("title")} | {$_("links.articles")}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="columns is-multiline is-mobile">
      <div
        class="column"
        class:is-full={!isResearchLink}
        class:is-half={isResearchLink}
      >
        <h1 class="title">{$_("pages.articles.title")}: {total}</h1>
        <h2 class="subtitle">{$_("pages.articles.subtitle")}</h2>
      </div>
      {#if isResearchLink}
        <div class="column is-half fav-button-wrap">
          <div class="box-transparent">
            <div>{$_("save_research")}</div>
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
      <div class="column is-full">
        {#if !$navigating}
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
    {#if !$navigating}
      <Pagination {total} {page} {limit} {query} {path} />
    {/if}
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
