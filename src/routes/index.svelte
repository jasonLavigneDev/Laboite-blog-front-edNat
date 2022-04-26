<script context='module'>
  import { fetchData } from "../utils/api/methods";

  export async function preload(_, { env }) {
    const { items: articles } = await fetchData({
      host: env.API_HOST,
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { draft: { neq: true } },
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

    return {
      articles,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import PageTransition from "../components/common/PageTransition.svelte";
  import FavoriteAcademy from "../components/home/FavoriteAcademy.svelte";

  import LastPublished from "../components/home/LastPublished.svelte";
  import LastRead from "../components/home/LastRead.svelte";
  import LastAcademies from "../components/home/LastAcademies.svelte";
  import {
    favoritesAcademy,
    lastAcademies,
    lastRead,
  } from "../utils/functions/stores";

  export let articles;
</script>

<svelte:head>
  <title>{$_("title")}</title>
</svelte:head>

<PageTransition>
  {#if $favoritesAcademy}
    <FavoriteAcademy />
  {/if}
  <LastPublished {articles} />
  {#if $lastRead.length}
    <LastRead />
  {/if}
  {#if $lastAcademies.length}
    <LastAcademies />
  {/if}
</PageTransition>
