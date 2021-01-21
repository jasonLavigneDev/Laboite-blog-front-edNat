<script>
  import { _ } from 'svelte-i18n';
  import { structureOptions } from '../../routes/academies/_academies';
  import BigLink from '../common/BigLink.svelte';
  import FavoritesButton from '../common/FavoritesButton.svelte';
  import Avatar from './Avatar.svelte';

  export let author;
  const academy = structureOptions.find(({ value }) => value === (author.structure || 'Autre')) || {};
</script>

<div class="column is-full ">
  <div class="media box">
    <figure class="media-left">
      <Avatar firstName={author.firstName} avatar={author.avatar} />
    </figure>
    <div class="media-content">
      <div class="title is-4">{author.firstName} {author.lastName}</div>
      <div>{academy.value}</div>
      <div class="title is-6">
        {$_('components.SmallAuthorIdCard.articles')}:
        {author.articlesCount}
      </div>
    </div>
    <div class="media-right">
      <BigLink link="/authors/{author._id}" text={$_('components.SmallAuthorIdCard.all_articles')} />
      <FavoritesButton type="author" itemId={author._id} />
    </div>
  </div>
</div>

<style>
  .title {
    margin-bottom: 0px;
  }
</style>
