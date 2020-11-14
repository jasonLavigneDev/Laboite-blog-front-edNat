<script>
  import { _ } from "svelte-i18n";
  import BigLink from "./BigLink.svelte";

  export let author;
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

<div class="column is-one-third is-full-mobile">
  <div class="title is-4">{author.firstName} {author.lastName}</div>
  <div class="subtitle is-5">{author.username}</div>
  <div class="content">
    <p class="title is-5">{$_('components.AuthorIdCard.academy')}</p>
    <p class="subtitle is-6">{author.structure}</p>
  </div>
  <BigLink
    link="/authors/{author._id}"
    text={$_('components.AuthorIdCard.all_articles')} />
</div>
