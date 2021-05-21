<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import SingleArticleBlock from "../articles/SingleArticleBlock.svelte";
  import { fetchData } from "../../utils/api/methods";
  import { onMount } from "svelte";
  import { lastRead } from "../../utils/functions/stores";
  import Loader from "../common/Loader.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  let articles = [];
  let loading = true;

  onMount(async () => {
    const { items } = await fetchData({
      host: $session.env.API_HOST,
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { _id: { inq: $lastRead }, draft: { neq: true } },
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
    articles = items;
    loading = false;
  });
</script>

<section class="box-transparent">
  <div class="container">
    <h1 class="title">{$_("pages.home.last_read_title")}</h1>
    <h2 class="subtitle">{$_("pages.home.last_read_subtitle")}</h2>
  </div>
  <Divider />

  {#if loading}
    <Loader message={$_("loading")} />
  {/if}
  <div class="columns is-multiline">
    {#each articles as article}
      <SingleArticleBlock {article} />
    {/each}
  </div>
</section>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
</style>
