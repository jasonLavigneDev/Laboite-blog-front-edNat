<script>
  import {_} from 'svelte-i18n';
  import {getStores} from '$app/stores';
  import Divider from '../../../components/common/Divider.svelte';
  import SingleArticleBlock from '../../../components/articles/SingleArticleBlock.svelte';
  import SearchField from '../../../components/common/SearchField.svelte';
  import Pagination from '../../../components/common/Pagination.svelte';
  import NoResults from '../../../components/common/NoResults.svelte';
  import Avatar from '../../../components/authors/Avatar.svelte';
  import BackButton from '../../../components/navigation/BackButton.svelte';
  import FavoritesButton from '../../../components/common/FavoritesButton.svelte';
  import PageTransition from '../../../components/common/PageTransition.svelte';

  export let data;
  const {navigating} = getStores();
</script>

<svelte:head>
  <title>{$_('title')} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-gapless is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/authors" useHistory={true} />
    </div>
    <div class="column is-half fav-button-wrap">
      <div class="box-transparent">
        <FavoritesButton type="author" itemId={data.author._id} />
      </div>
    </div>
  </div>
  <section class="box-transparent">
    <div class="container">
      <article class="media">
        <figure class="media-left">
          <Avatar
            avatar={data.author.avatar}
            firstName={data.author.firstName}
          />
        </figure>

        <div class="media-content">
          <div class="content">
            <h1 class="title">
              {data.author.firstName}
              {data.author.lastName}
            </h1>
            <div class="subtitle">{data.structure.name || 'Autres'}</div>
          </div>
        </div>
      </article>
    </div>
    <Divider />
    <div class="columns is-gapless is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField
          loading={$navigating}
          query={data.query}
          path={data.path}
        />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !$navigating}
          <Pagination
            total={data.total}
            page={data.page}
            limit={data.limit}
            query={data.query}
            path={data.path}
          />
        {/if}
      </div>
    </div>

    {#if data.articles.length}
      <div class="columns is-multiline">
        {#each data.articles as article}
          <SingleArticleBlock {article} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(data.query).length} />
    {/if}
    <Pagination
      total={data.total}
      page={data.page}
      limit={data.limit}
      query={data.query}
      path={data.path}
    />
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
  .media-content .content * {
    color: var(--texts);
  }
</style>
