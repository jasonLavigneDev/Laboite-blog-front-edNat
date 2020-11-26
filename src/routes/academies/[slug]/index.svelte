<script context="module">
  import { fetchData } from "../../../utils/api/methods";
  import { structureOptions } from "../_academies";

  export async function preload({ params }) {
    const academy = structureOptions.find(({ slug }) => slug === params.slug);

    const { items: authors } = await fetchData({
      limit: 6,
      order: "articlesCount DESC",
      fields: {},
      count: false,
      apiurl: "authors",
      where: { articlesCount: { gt: 0 }, structure: academy.value },
    });
    const { items: articles } = await fetchData({
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
  import PageTransition from "../../../components/common/PageTransition.svelte";

  import LastPublished from "../../../components/academies/LastPublished.svelte";
  import { identity } from "../../../settings";
  import Authors from "../../../components/academies/Authors.svelte";

  export let academy;
  export let articles;
  export let authors;
</script>

<style>
  .container .title {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {academy.label}</title>
</svelte:head>

<PageTransition>
  <div class="container">
    <h1 class="title">{academy.label}</h1>
  </div>
  <LastPublished {articles} {academy} />
  <Authors {authors} {academy} />
</PageTransition>
