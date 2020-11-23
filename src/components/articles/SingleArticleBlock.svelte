<script>
  import { _ } from "svelte-i18n";
  import BigLink from "../common/BigLink.svelte";
  import SingleTagLink from "../common/SingleTagLink.svelte";

  export let article;
</script>

<style lang="scss">
  .subtitle.is-6 {
    color: var(--lightgrey2) !important;
  }
  .column {
    margin-bottom: var(--space-between);
    position: relative;
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
  {#if article.user}
    <div class="subtitle is-6">
      {$_('components.SingleArticleBlock.written_by')}
      {article.user.firstName}
      {article.user.firstName}
    </div>
  {/if}
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
