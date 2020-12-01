<script>
  import { onMount } from "svelte";
  import PageTransition from "../components/common/PageTransition.svelte";
  import Authors from "../components/academies/Authors.svelte";
  import BackButton from "../components/navigation/BackButton.svelte";
  import LastPublished from "../components/academies/LastPublished.svelte";

  import { identity } from "../settings";
  import { fetchData } from "../utils/api/methods";
  import {
    favoritesArticles,
    favoritesAuthors,
  } from "../utils/functions/stores";
  import { _ } from "svelte-i18n";
  import FavoritesArticles from "../components/favorites/FavoritesArticles.svelte";
  import FavoritesAuthors from "../components/favorites/FavoritesAuthors.svelte";
  import Loader from "../components/common/Loader.svelte";

  let articles = [];
  let authors = [];
  let loading = true;

  const getFavorites = async () => {
    loading = true;
    const resultsAuthors = await fetchData({
      limit: 6,
      order: "articlesCount DESC",
      fields: {},
      count: false,
      apiurl: "authors",
      where: { articlesCount: { gt: 0 }, _id: { inq: $favoritesAuthors } },
    });
    const resultsArticles = await fetchData({
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { _id: { inq: $favoritesArticles } },
      include: [
        {
          relation: "user",
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
    loading = false;
  };

  onMount(getFavorites);
  favoritesArticles.subscribe(getFavorites);
  favoritesAuthors.subscribe(getFavorites);
</script>

<svelte:head>
  <title>{identity.title} | {$_('links.favorites')}</title>
</svelte:head>

<PageTransition>
  <div class="container box-transparent">
    <h1 class="title is-2">{$_('pages.favorites.title')}</h1>
  </div>

  {#if loading}
    <Loader message={$_('loading')} />
  {/if}
  <FavoritesArticles {articles} />
  <FavoritesAuthors {authors} />
</PageTransition>
