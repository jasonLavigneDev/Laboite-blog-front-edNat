<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import { fetchData } from "../../utils/api/methods";
  import Loader from "../common/Loader.svelte";
  import SingleArticleBlock from "../articles/SingleArticleBlock.svelte";
  import { onMount } from "svelte";

  let articles = [];
  let loading = true;

  onMount(async function () {
    const limit = 4;
    const fields = { content: false, _id: false, updatedAt: false };
    const order = "createdAt DESC";
    const apiurl = "articles";
    const include = [
      {
        relation: "user",
        scope: {
          fields: {
            articlesCount: false,
            username: false,
            structure: false,
          },
          limit: 1,
        },
      },
    ];

    const { items } = await fetchData({
      limit,
      order,
      fields,
      apiurl,
      skip: 0,
      count: false,
      include,
    });
    loading = false;
    articles = items;
  });
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
</style>

<section class="box">
  <div class="container">
    <h1 class="title">{$_('pages.home.last_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.last_subtitle')}</h2>
  </div>
  <Divider />
  {#if !articles.length && loading}
    <Loader message={$_('loading')} />
  {:else}
    <div class="columns is-multiline">
      {#each articles as article}
        <SingleArticleBlock {article} />
      {/each}
    </div>
  {/if}
</section>
