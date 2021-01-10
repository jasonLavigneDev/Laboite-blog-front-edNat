<script>
  import { _ } from "svelte-i18n";
  import BigLink from "../common/BigLink.svelte";
  import FavoritesButton from "../common/FavoritesButton.svelte";

  export let article;
</script>

<div class="column is-full ">
  <article class="media box">
    <div class="media-content">
      <div class="content">
        <div class="title is-5">{article.title}</div>
        <div class="subtitle is-6">
          {$_('components.SmallArticleBlock.written_by')}
          {article.user.firstName}
          {article.user.lastName}
          {$_('components.SmallArticleBlock.written_on')}
          {new Date(article.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
    <div class="media-right">
      <BigLink
        link="/articles/{article.slug}"
        text={$_('components.SmallArticleBlock.link')} />
      <FavoritesButton type="article" itemId={article._id} />
    </div>
  </article>
</div>
