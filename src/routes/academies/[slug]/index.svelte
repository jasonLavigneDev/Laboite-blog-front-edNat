<script context="module">
  import { fetchData } from "../../../utils/api/methods";
  import { structureOptions } from "../_academies";

  export async function preload({ params }, { env }) {
    const academy = structureOptions.find(({ slug }) => slug === params.slug);

    const { items: authors } = await fetchData({
      host: env.API_HOST,
      limit: 6,
      order: "articlesCount DESC",
      fields: {},
      count: false,
      apiurl: "authors",
      where: { articlesCount: { gt: 0 }, structure: academy.value },
    });
    const { items: articles } = await fetchData({
      host: env.API_HOST,
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { structure: academy.value },
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
      authors,
      articles,
      academy,
    };
  }
</script>

<script>
  import LastPublished from "../../../components/academies/LastPublished.svelte";
  import Authors from "../../../components/academies/Authors.svelte";
  import BackButton from "../../../components/navigation/BackButton.svelte";
  import PageTransition from "../../../components/common/PageTransition.svelte";
  import SingleFavoriteButton from "../../../components/common/SingleFavoriteButton.svelte";
  import { onMount } from "svelte";
  import { lastAcademies } from "../../../utils/functions/stores";
  import { _ } from "svelte-i18n";

  export let academy;
  export let articles;
  export let authors;

  onMount(() => {
    lastAcademies.update((list) => {
      if (!list.find((i) => i === academy.value)) {
        list.unshift(academy.value);
      }
      if (list.length > 4) {
        list.length = 4;
      }
      return list;
    });
  });
</script>

<style>
  .favorites {
    display: flex;
    justify-content: flex-end;
  }
</style>

<svelte:head>
  <title>{$_('title')} | {academy.label}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/academies" useHistory={true} />
    </div>
    <div class="column is-half favorites">
      <div class="box-transparent">
        <SingleFavoriteButton type="academy" itemId={academy.value} />
      </div>
    </div>
  </div>
  <div class="container box-transparent">
    <h1 class="title is-2">{academy.label}</h1>
  </div>
  <LastPublished {articles} {academy} />
  <Authors {authors} {academy} />
</PageTransition>
