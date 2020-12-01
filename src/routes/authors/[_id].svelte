<script context="module">
  import { api, identity } from "../../settings";
  import { fetchData, getTags } from "../../utils/api/methods";
  import fetcher from "isomorphic-fetch";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "", tags } = query;

    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = `articles`;
    const where = tags
      ? { userId: params._id, tags: { inq: [tags] } }
      : { userId: params._id };

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
    const tagsList = await getTags();
    return {
      articles: items,
      total,
      limit,
      page: Number(page),
      query,
      path,
      loading: false,
      author,
      tagsList,
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
  import Avatar from "../../components/authors/Avatar.svelte";
  import BackButton from "../../components/navigation/BackButton.svelte";
  import TagsFilter from "../../components/common/TagsFilter.svelte";
  import FavoritesButton from "../../components/common/FavoritesButton.svelte";

  export let articles = [];
  export let author = {};
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let loading = false;
  export let tagsList = [];
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
  }
  .media-content .content * {
    color: var(--texts);
  }
  .favorites {
    display: flex;
    justify-content: flex-end;
    .box-transparent {
      padding-right: 0px;
    }
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/authors" useHistory={true} />
    </div>
    <div class="column is-half favorites">
      <div class="box-transparent">
        <FavoritesButton type="author" itemId={author._id} />
      </div>
    </div>
  </div>
  <section class="box-transparent">
    <div class="container">
      <article class="media">
        <figure class="media-left">
          <Avatar avatar={author.avatar} firstName={author.firstName} />
        </figure>

        <div class="media-content">
          <div class="content">
            <h1 class="title">{author.firstName} {author.lastName}</h1>
            <div class="subtitle">{author.username}</div>
            <div>{author.structure}</div>
          </div>
        </div>
      </article>
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
      <div class="column is-full">
        {#if !loading}
          <TagsFilter bind:loading {query} {path} {tagsList} />
        {/if}
      </div>
    </div>

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
