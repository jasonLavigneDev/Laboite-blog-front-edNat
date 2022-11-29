<script>
  import {_} from 'svelte-i18n';
  import {getStores} from '$app/stores';
  import BigLink from '../common/BigLink.svelte';
  import SingleTag from '../common/SingleTag.svelte';
  const {page} = getStores();
  const tags = $page.url.searchParams.get('tags') || '';

  export let article;
  let queryTags = tags ? tags.split(',') : [];
</script>

<div class="column is-half is-full-mobile ">
  <div class="box">
    <div class="title is-4">{article.title}</div>
    {#if article.user}
      <div class="subtitle is-6">
        {$_('components.SingleArticleBlock.written_by')}
        {article.user.firstName}
        {article.user.lastName}
      </div>
    {/if}
    <div class="subtitle is-6">
      {#if article.licence}
        <p>{$_('license.license')}:</p>
        {article.licence}
        <br />
        {$_(`license.${article.licence}`)}
      {:else}
        <p>{$_('license.license')}:</p>
        {'CC BY'}
        <br />
        {$_('license.CC BY')}
      {/if}
    </div>
    <div class="content">{article.description}</div>
    <div class="subtitle is-6">
      {new Date(article.createdAt).toLocaleString()}
    </div>
    {#if article.groups && article.groups.length}
      <h4>{$_('components.SingleArticleBlock.groups')}</h4>
      <div class="tags">
        {#each article.groups as tag}
          <span class="tag is-medium">
            {tag.name}
          </span>
        {/each}
      </div>
    {/if}
    {#if article.tags && article.tags.length}
      <h4>{$_('components.SingleArticleBlock.tags')}</h4>
      <div class="tags">
        {#each article.tags as tag}
          <SingleTag
            {tag}
            disabled={!!queryTags.length &&
              queryTags.filter(t => t !== tag).length === queryTags.length}
            tagSearch={$page.url.pathname === '/articles'}
            on:getTag
          />
        {/each}
      </div>
    {/if}

    <div class="blank">
      <BigLink
        link="/articles/{article.slug}"
        text={$_('components.SingleArticleBlock.link')}
      />
    </div>
  </div>
</div>

<style>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .tag {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    background-color: var(--primary);
    color: var(--tertiary);
    border-radius: 20px;
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
