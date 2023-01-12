<script context="module">
  import {fetchData, getTags} from '../../utils/api/methods';
  import fetcher from 'isomorphic-fetch';

  export async function load({params, url, session}) {
    const path = url.pathname;

    const page = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');
    const tags = url.searchParams.get('tags') || '';

    const query = {page, search, tags};
    const limit = 10;
    const fields = {content: false, _id: false, updatedAt: false};
    const searchFields = ['description', 'title', 'slug', 'tags'];
    const order = 'createdAt DESC';
    const apiurl = `articles`;
    const where = tags
      ? {userId: params._id, tags: {inq: [tags]}, draft: {neq: true}}
      : {userId: params._id, draft: {neq: true}};

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
    const responseAuthor = await fetcher(
      `${session.env.API_HOST}/authors/${params._id}`,
    );
    const author = await responseAuthor.json();
    const responseAcademy = await fetcher(
      `${session.env.API_HOST}/structures/${author.structure}`,
    );
    const academy = await responseAcademy.json();
    const tagsList = await getTags(session.env.API_HOST);
    return {
      props: {
        articles: items,
        total,
        limit,
        page: Number(page),
        query,
        path,
        author,
        academy,
        tagsList,
      },
    };
  }
</script>

<script>
  import {_} from 'svelte-i18n';
  import {getStores} from '$app/stores';
  import Divider from '../../components/common/Divider.svelte';
  import SingleArticleBlock from '../../components/articles/SingleArticleBlock.svelte';
  import SearchField from '../../components/common/SearchField.svelte';
  import Pagination from '../../components/common/Pagination.svelte';
  import NoResults from '../../components/common/NoResults.svelte';
  import Avatar from '../../components/authors/Avatar.svelte';
  import BackButton from '../../components/navigation/BackButton.svelte';
  import FavoritesButton from '../../components/common/FavoritesButton.svelte';
  import PageTransition from '../../components/common/PageTransition.svelte';

  export let articles = [];
  export let author = {};
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = '';
  export let academy = {};
  export let tagsList = [];
  const {navigating} = getStores();
</script>

<svelte:head>
  <title>{$_('title')} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-gapless is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/authors" useHistory={true} />
    </div>
    <div class="column is-half fav-button-wrap">
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
            <div class="subtitle">{academy.name || 'Autres'}</div>
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
