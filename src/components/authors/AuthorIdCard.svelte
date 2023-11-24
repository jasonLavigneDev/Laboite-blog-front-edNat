<script>
  import {page} from '$app/stores';

  import {_} from 'svelte-i18n';
  import BigLink from '../common/BigLink.svelte';
  import Avatar from './Avatar.svelte';
  export let author;

  let structure = {};
  $: fetchStructure(author);

  const fetchStructure = async currentAuthor => {
    if (currentAuthor?.structure) {
      const responseStructure = await fetch(
        `${$page.data.env.API_HOST}/structures/${currentAuthor.structure}`,
      );
      structure = await responseStructure.json();
    }
  };
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <Avatar
          firstName={author?.firstName || '?'}
          avatar={author?.avatar || ''}
        />
      </div>
      <div class="media-content">
        <p class="title is-4">
          {author?.firstName || $_('components.AuthorIdCard.unknownFirstname')}
          {author?.lastName || $_('components.AuthorIdCard.unknownLastname')}
        </p>
        <p class="subtitle is-6">{structure.name || ''}</p>
      </div>
    </div>
  </div>
  {#if author}
    <div class="content">
      <p class="title is-6">
        {$_('components.AuthorIdCard.articles')}:
        {author.articlesCount}
      </p>
      <BigLink
        link="/authors/{author._id}"
        text={$_('components.AuthorIdCard.all_articles')}
      />
    </div>
  {/if}
</div>

<style>
  .card {
    margin-bottom: var(--space-between);
  }
  .title,
  .subtitle {
    color: var(--primary);
  }
  .subtitle {
    margin-bottom: 0;
  }
  .content {
    background-color: var(--primary_fade);
    padding: 1.5rem;
  }
</style>
