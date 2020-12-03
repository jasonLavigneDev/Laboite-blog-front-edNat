<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import BigLink from "../common/BigLink.svelte";
  import SingleTag from "../common/SingleTag.svelte";
  const { page } = stores();

  export let article;
  let queryTags = [];
  $: queryTags = $page.query.tags ? $page.query.tags.split(",") : [];
</script>

<style lang="scss">
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .subtitle.is-6 {
    color: var(--lightgrey2) !important;
  }
  .title {
    color: var(--primary) !important;
  }
  .column {
    margin-bottom: var(--space-between);
    position: relative;
  }
  .content {
    margin-bottom: 10px;
    text-align: justify;
  }
  .blank {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
  }
</style>

<div class="column is-half is-full-mobile ">
  <div class="box">
    <div class="title is-4">{article.title}</div>
    {#if article.user}
      <div class="subtitle is-6">
        {$_('components.SingleArticleBlock.written_by')}
        {article.user.firstName}
        {article.user.firstName}
      </div>
    {/if}
    <div class="content">{article.description}</div>
    <div class="subtitle is-6">
      {new Date(article.createdAt).toLocaleString()}
    </div>
    <div class="tags">
      {#each article.tags as tag}
        <SingleTag
          {tag}
          disabled={!!queryTags.length && queryTags.filter((t) => t !== tag).length === queryTags.length} />
      {/each}
    </div>
    <div class="blank">
      <BigLink
        link="/articles/{article.slug}"
        text={$_('components.SingleArticleBlock.link')} />
    </div>
  </div>
</div>
