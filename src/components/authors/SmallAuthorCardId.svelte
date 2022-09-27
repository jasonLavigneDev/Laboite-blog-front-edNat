<script>
  import {_} from 'svelte-i18n';
  import {onMount} from 'svelte';
  import fetcher from 'isomorphic-fetch';
  import BigLink from '../common/BigLink.svelte';
  import FavoritesButton from '../common/FavoritesButton.svelte';
  import Avatar from './Avatar.svelte';
  import {session} from '$app/stores';

  export let author;

  let academy = {};
  onMount(async () => {
    const responseAcademy = await fetcher(
      `${$session.env.API_HOST}/structures/${author.structure}`,
    );
    academy = await responseAcademy.json();
  });
</script>

<div class="column is-full ">
  <div class="media box">
    <figure class="media-left">
      <Avatar firstName={author.firstName} avatar={author.avatar} />
    </figure>
    <div class="media-content">
      <div class="title is-4">{author.firstName} {author.lastName}</div>
      <div>{academy.name}</div>
      <div class="title is-6">
        {$_('components.SmallAuthorIdCard.articles')}:
        {author.articlesCount}
      </div>
    </div>
    <div class="media-right">
      <BigLink
        link="/authors/{author._id}"
        text={$_('components.SmallAuthorIdCard.all_articles')}
      />
      <FavoritesButton type="author" itemId={author._id} />
    </div>
  </div>
</div>

<style>
  .title {
    margin-bottom: 0px;
  }
</style>
