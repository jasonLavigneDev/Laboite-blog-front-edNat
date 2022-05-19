<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import SingleArticleBlock from "../articles/SingleArticleBlock.svelte";

  export let articles = [];
</script>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
</style>

<section class="box-transparent">
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
