<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import { api } from "../../settings";
  import axios from "axios";
  import Loader from "../common/Loader.svelte";
  import SingleArticleBlock from "../common/SingleArticleBlock.svelte";

  let articles = getArticles();

  async function getArticles() {
    const filters = {
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false, _id: false, updatedAt: false },
    };
    return await axios.get(
      `${api.host}/articles?filter=${JSON.stringify(filters)}`
    );
  }
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<section class="box">
  <div class="container">
    <h1 class="title">{$_('pages.home.last_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.last_subtitle')}</h2>
  </div>
  <Divider />
  {#await articles}
    <Loader message={$_('loading')} />
  {:then { data }}
    <div class="columns is-multiline">
      {#each data as article}
        <SingleArticleBlock {article} />
      {/each}
    </div>
  {:catch error}
    error
  {/await}
</section>
