<script context="module">
  import axios from "axios";
  import { api, identity } from "../../settings";
  export async function preload() {
    const filters = {
      limit: 10,
      order: "createdAt DESC",
      fields: { content: false, _id: false, updatedAt: false },
    };
    const response = await axios.get(
      `${api.host}/articles?filter=${JSON.stringify(filters)}`
    );
    return {
      articles: response.data,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import SingleArticleBlock from "../../components/common/SingleArticleBlock.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";

  export let articles = [];
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{$_('pages.home.last_title')}</h1>
      <h2 class="subtitle">{$_('pages.home.last_subtitle')}</h2>
    </div>
    <Divider />

    <div class="columns is-multiline">
      {#each articles as article}
        <SingleArticleBlock {article} />
      {/each}
    </div>
  </section>
</PageTransition>
