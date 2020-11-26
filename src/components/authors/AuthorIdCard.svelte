<script>
  import { _ } from "svelte-i18n";
  import { structureOptions } from "../../routes/academies/_academies";
  import BigLink from "../common/BigLink.svelte";
  import Avatar from "./Avatar.svelte";
  export let author;
  const academy =
    structureOptions.find(({ value }) => value === author.structure) || {};
</script>

<style lang="scss">
  .card {
    margin-bottom: var(--space-between);
    // height: 100%;
  }
  .media-content {
    .title,
    .subtitle {
      color: var(--primary);
    }
    .subtitle {
      margin-bottom: 0;
    }
  }
  .content {
    background-color: var(--primary_fade);
    padding: 1.5rem;
    // height: 100%;
  }
</style>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <Avatar firstName={author.firstName} avatar={author.avatar} />
      </div>
      <div class="media-content">
        <p class="title is-4">{author.firstName} {author.lastName}</p>
        <p class="subtitle is-6">{author.username}</p>
        <p>{academy.value}</p>
      </div>
    </div>
  </div>
  <div class="content">
    <p class="title is-6">
      {$_('components.AuthorIdCard.articles')}:
      {author.articlesCount}
    </p>
    <BigLink
      link="/authors/{author._id}"
      text={$_('components.AuthorIdCard.all_articles')} />
  </div>
</div>
