<script>
  import { _ } from "svelte-i18n";
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
  a {
    font-weight: bold;
    font-family: "WorkSansBold";
    font-size: 16px;
    &:hover {
      color: var(--secondary);
    }
  }
</style>

<div class="column is-half is-full-mobile">
  <div class="subtitle is-6">
    {new Date(article.createdAt).toLocaleString()}
  </div>
  <div class="title is-4">{article.title}</div>
  <div class="content">{article.description}</div>
  <a rel="prefetch" href="/articles/{article.slug}">
    {$_('components.SingleArticleBlock.link')}</a>
</div>
