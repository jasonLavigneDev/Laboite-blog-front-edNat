<script>
  import { _ } from "svelte-i18n";
  import BigLink from "../common/BigLink.svelte";
  export let author;
</script>

<style lang="scss">
  .card {
    margin-bottom: var(--space-between);
  }
</style>

<div class="card">
  <div class="card-content">
    <div class="media">
      <!-- <div class="media-left">
        <figure class="image is-48x48">
          <img
            src="https://bulma.io/images/placeholders/96x96.png"
            alt="Placeholder image" />
        </figure>
      </div> -->
      <div class="media-content">
        <p class="title is-4">{author.firstName} {author.lastName}</p>
        <p class="subtitle is-6">{author.username}</p>
      </div>
    </div>

    <div class="content">
      <p class="title is-5">{$_('components.AuthorIdCard.academy')}</p>
      <p class="subtitle is-6">{author.structure}</p>
      <br />
      <p class="title is-5">
        {$_('components.AuthorIdCard.articles')}:
        {author.articlesCount}
      </p>
      <BigLink
        link="/authors/{author._id}"
        text={$_('components.AuthorIdCard.all_articles')} />
    </div>
  </div>
</div>
