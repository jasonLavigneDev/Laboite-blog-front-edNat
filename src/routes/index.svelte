<script context="module">
  import { fetchData } from "../utils/api/methods";

  export async function preload() {
    const { items: articles } = await fetchData({
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
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
  import PageTransition from "../components/common/PageTransition.svelte";

  import LastPublished from "../components/home/LastPublished.svelte";
  import { identity } from "../settings";

  export let articles;
</script>

<svelte:head>
  <title>{identity.title}</title>
</svelte:head>

<PageTransition>
  <LastPublished {articles} />
</PageTransition>
