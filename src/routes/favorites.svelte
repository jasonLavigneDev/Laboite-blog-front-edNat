<script>
  import {onMount} from 'svelte';

  import {fetchData} from '../utils/api/methods';

  import {
    favoritesArticles,
    favoritesAuthors,
    favoritesGroups,
  } from '../utils/functions/stores';
  import {_} from 'svelte-i18n';
  import {page} from '$app/stores';
  import FavoritesArticles from '../components/favorites/FavoritesArticles.svelte';
  import FavoritesAuthors from '../components/favorites/FavoritesAuthors.svelte';
  import PageTransition from '../components/common/PageTransition.svelte';
  import FavoritesResearch from '../components/favorites/FavoritesResearch.svelte';
  import FavoritesGroups from '../components/favorites/FavoritesGroups.svelte';

  let articles = [];
  let authors = [];
  let groups = [];

  const getFavorites = async () => {
    const resultsAuthors = await fetchData({
      host: $page.data.env.API_HOST,
      limit: 6,
      order: 'articlesCount DESC',
      fields: {},
      count: false,
      apiurl: 'authors',
      where: {articlesCount: {gt: 0}, _id: {inq: $favoritesAuthors}},
    });
    const resultsGroups = await fetchData({
      host: $page.data.env.API_HOST,
      limit: 6,
      order: 'createdAt DESC',
      fields: {},
      count: false,
      apiurl: 'groups',
      where: {slug: {inq: $favoritesGroups}},
    });
    const resultsArticles = await fetchData({
      host: $page.data.env.API_HOST,
      limit: 4,
      order: 'createdAt DESC',
      fields: {content: false},
      count: false,
      apiurl: 'articles',
      where: {_id: {inq: $favoritesArticles}, draft: {neq: true}},
      include: [
        {
          relation: 'user',
          scope: {
            fields: {
              username: false,
              structure: false,
              articlesCount: false,
            },
          },
        },
      ],
    });
    authors = resultsAuthors.items;
    articles = resultsArticles.items;
    groups = resultsGroups.items;
  };
  onMount(getFavorites);
  favoritesArticles.subscribe(getFavorites);
  favoritesAuthors.subscribe(getFavorites);
  favoritesGroups.subscribe(getFavorites);
</script>

<svelte:head>
  <title>{$_('title')} | {$_('links.favorites')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent mb-4">
    <div class="container">
      <h1 class="title is-2">{$_('pages.favorites.title')}</h1>
    </div>
  </section>
  <FavoritesArticles {articles} />
  <FavoritesResearch />
  <FavoritesAuthors {authors} />
  <FavoritesGroups {groups} />
</PageTransition>
