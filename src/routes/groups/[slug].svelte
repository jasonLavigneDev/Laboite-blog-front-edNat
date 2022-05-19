<script context="module">
  import { fetchData, getTags } from "../../utils/api/methods";
  import fetcher from "isomorphic-fetch";

  export async function load({ params, url, session }) {
    const path = url.pathname
    const page = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');
    const query = { page, search }

    const responseGroup = await fetcher(
      `${session.env.API_HOST}/groups/${params.slug}`
    );
    const group = await responseGroup.json();

    const limit = 10;
    const fields = { content: false, _id: false, updatedAt: false };
    const searchFields = ["description", "title", "slug", "tags"];
    const order = "createdAt DESC";
    const apiurl = `articles`;
    const where = { "groups._id": { eq: group._id } };

    const { items, total } = await fetchData({
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
    const tagsList = await getTags(session.env.API_HOST);
    return {
      props: {
        articles: items,
        total,
        limit,
        page: Number(page),
        query,
        path,
        group,
        tagsList,
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
  import BackButton from "../../components/navigation/BackButton.svelte";
  import TagsFilter from "../../components/common/TagsFilter.svelte";
  import FavoritesButton from "../../components/common/FavoritesButton.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import Avatar from "../../components/authors/Avatar.svelte";

  export let articles = [];
  export let group = {};
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let tagsList = [];
  const { navigating } = getStores();
</script>

<svelte:head>
  <title>{$_("title")} | {$_("articles")}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-gapless is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/authors" useHistory={true} />
    </div>
    <div class="column is-half fav-button-wrap">
      <div class="box-transparent">
        <FavoritesButton type="group" itemId={group.slug} />
      </div>
    </div>
  </div>
  <section class="box-transparent">
    <div class="container">
      <article class="media">
        <figure class="media-left">
          <Avatar avatar={group.avatar} firstName={group.name} />
        </figure>

        <div class="media-content">
          <div class="content">
            <h1 class="title">{group.name}</h1>
          </div>
        </div>
      </article>
    </div>
    <Divider />
    <div class="columns is-gapless is-multiline">
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
        {#each articles as article}
          <SingleArticleBlock {article} />
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
  .media-content .content * {
    color: var(--texts);
  }
</style>
