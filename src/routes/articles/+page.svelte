<script>
  import {_} from 'svelte-i18n';
  import {getStores} from '$app/stores';
  import Divider from '../../components/common/Divider.svelte';
  import SingleArticleBlock from '../../components/articles/SingleArticleBlock.svelte';
  import SearchField from '../../components/common/SearchField.svelte';
  import Pagination from '../../components/common/Pagination.svelte';
  import NoResults from '../../components/common/NoResults.svelte';
  import TagsFilter from '../../components/common/TagsFilter.svelte';
  import PageTransition from '../../components/common/PageTransition.svelte';
  import FavoritesButton from '../../components/common/FavoritesButton.svelte';
  import {toQuery} from '../../utils/functions/queryStringMaker';
  import {goto} from '$app/navigation';

  export let data;
  const {navigating, page} = getStores();

  let tagSearch = '';
  let queryTags;

  $: if ($page.url.searchParams.get('tags')) {
    queryTags = $page.url.searchParams.get('tags').split(',');
  } else {
    queryTags = [];
  }

  function addTag(event) {
    const tagsArray = [...queryTags];
    tagsArray.push(event.detail.tag);
    const tagsString = tagsArray.join(',');
    const url = `${data.path}?${toQuery({
      ...data.query,
      page: 1,
      tags: tagsString,
    })}`;
    goto(url);
  }

  $: tagSearch = tagSearch;
</script>

<svelte:head>
  <title>{$_('title')} | {$_('links.articles')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="columns is-multiline is-mobile">
      <div
        class="column"
        class:is-full={!data.isResearchLink}
        class:is-half={data.sResearchLink}
      >
        <h1 class="title">{$_('pages.articles.title')}: {data.total}</h1>
        <h2 class="subtitle">{$_('pages.articles.subtitle')}</h2>
      </div>
      {#if data.isResearchLink}
        <div class="column is-half fav-button-wrap">
          <div class="box-transparent">
            <div>{$_('save_research')}</div>
            <FavoritesButton
              type="research"
              itemId={JSON.stringify(data.request)}
            />
          </div>
        </div>
      {/if}
    </div>
    <Divider />
    <div class="columns is-multiline">
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
            page={data.currentPage}
            limit={data.limit}
            query={data.query}
            path={data.path}
          />
        {/if}
      </div>
      <div class="column is-full">
        <TagsFilter
          query={data.query}
          path={data.path}
          tagsList={data.tagsList}
          on:addTag={addTag}
          {queryTags}
        />
      </div>
    </div>

    {#if data.articles.length}
      <div class="columns is-multiline">
        {#each data.articles as article, index}
          <SingleArticleBlock {article} on:getTag={addTag} />
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(data.query).length} />
    {/if}
    {#if !$navigating}
      <Pagination
        total={data.total}
        page={data.currentPage}
        limit={data.limit}
        query={data.query}
        path={data.path}
      />
    {/if}
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
