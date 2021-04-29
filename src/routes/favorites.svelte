<script>
  import { onMount } from "svelte";

  import { fetchData } from "../utils/api/methods";

  import {
    favoritesArticles,
    favoritesAuthors,
  } from "../utils/functions/stores";
  import { _ } from "svelte-i18n";
  import FavoritesArticles from "../components/favorites/FavoritesArticles.svelte";
  import FavoritesAuthors from "../components/favorites/FavoritesAuthors.svelte";
  import PageTransition from "../components/common/PageTransition.svelte";
  import FavoritesResearch from "../components/favorites/FavoritesResearch.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  let articles = [];
  let authors = [];

  const getFavorites = async () => {
    const resultsAuthors = await fetchData({
      host: $session.env.API_HOST,
      limit: 6,
      order: "articlesCount DESC",
      fields: {},
      count: false,
      apiurl: "authors",
      where: { articlesCount: { gt: 0 }, _id: { inq: $favoritesAuthors } },
    });
    const resultsArticles = await fetchData({
      host: $session.env.API_HOST,
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { _id: { inq: $favoritesArticles }, draft: { ne: true } },
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
  };

  onMount(getFavorites);
  favoritesArticles.subscribe(getFavorites);
  favoritesAuthors.subscribe(getFavorites);
</script>

<svelte:head>
  <title>{$_("title")} | {$_("links.favorites")}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="container">
      <h1 class="title is-2">{$_("pages.favorites.title")}</h1>
    </div>
  </section>
  <FavoritesArticles {articles} />
  <FavoritesResearch />
  <FavoritesAuthors {authors} />
</PageTransition>
