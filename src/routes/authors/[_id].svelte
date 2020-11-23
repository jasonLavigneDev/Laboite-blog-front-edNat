<script context="module">
  import { api, identity } from "../../settings";
  import { fetchData } from "../../utils/api/methods";
  import fetcher from "isomorphic-fetch";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;

    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = `articles`;
    const where = { userId: params._id };

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
    const responseAuthor = await fetcher(`${api.host}/authors/${params._id}`);
    const author = await responseAuthor.json();
    return {
      articles: items,
      total,
      limit,
      page: Number(page),
      query,
      path,
      loading: false,
      author,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import SingleArticleBlock from "../../components/articles/SingleArticleBlock.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import SearchField from "../../components/common/SearchField.svelte";
  import Loader from "../../components/common/Loader.svelte";
  import Pagination from "../../components/common/Pagination.svelte";
  import NoResults from "../../components/common/NoResults.svelte";

  export let articles = [];
  export let author = {};
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
  <title>{identity.title} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{author.firstName} {author.lastName}</h1>
      <h2 class="subtitle">{author.username}</h2>
      <div>{author.structure}</div>
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
        {#each articles as article}
          <SingleArticleBlock {article} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    <Pagination {total} {page} {limit} {query} {path} bind:loading />
  </section>
</PageTransition>
