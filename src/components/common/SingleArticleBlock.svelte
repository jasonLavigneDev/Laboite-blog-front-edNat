<script>
  import { _ } from "svelte-i18n";
  import BigLink from "./BigLink.svelte";
  import SingleTagLink from "./SingleTagLink.svelte";
  export let article;
</script>

<style lang="scss">
  .subtitle.is-6 {
    color: var(--lightgrey2) !important;
  }
  .column {
    margin-bottom: var(--space-between);
  }
  .content {
    margin-bottom: 10px;
    text-align: justify;
  }
</style>

<div class="column is-half is-full-mobile">
  <div class="subtitle is-6">
    {new Date(article.createdAt).toLocaleString()}
  </div>
  <div class="title is-4">{article.title}</div>
  <div class="content">{article.description}</div>
  <div class="tags">
    {#each article.tags as tag}
      <SingleTagLink {tag} />
    {/each}
  </div>
  <BigLink
    link="/articles/{article.slug}"
    text={$_('components.SingleArticleBlock.link')} />
</div>
