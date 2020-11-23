<script context="module">
  import { fetchData } from "../../../utils/api/methods";
  import { structureOptions } from "../_academies";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;
    const academy = structureOptions.find(({ slug }) => slug === params.slug);

    const limit = 4;
    const fields = {};
    const order = "articlesCount DESC";
    const apiurl = "authors";
    const where = { articlesCount: { gt: 0 }, structure: academy.value };
    const include = [
      {
        relation: "articles",
        scope: {
          fields: {
            content: false,
          },
          limit: 2,
          order: ["createdAt DESC"],
        },
      },
    ];

    const { items } = await fetchData({
      limit,
      order,
      fields,
      count: false,
      apiurl,
      where,
      include,
    });
    return {
      authors: items,
      academy,
    };
  }
</script>

<script>
  import PageTransition from "../../../components/common/PageTransition.svelte";

  import LastPublished from "../../../components/academies/LastPublished.svelte";
  import { identity } from "../../../settings";

  export let academy;
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
  <LastPublished {authors} {academy} />
</PageTransition>
