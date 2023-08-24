<script>
  import {_} from 'svelte-i18n';
  import {onMount} from 'svelte';
  import sanitizeHtml from 'sanitize-html';
  import AuthorIdCard from '../../../components/authors/AuthorIdCard.svelte';
  import PageTransition from '../../../components/common/PageTransition.svelte';
  import BackButton from '../../../components/navigation/BackButton.svelte';
  import SingleTag from '../../../components/common/SingleTag.svelte';
  import FavoritesButton from '../../../components/common/FavoritesButton.svelte';
  import {articlesRead} from '../../../utils/functions/stores';
  import NoResults from '../../../components/common/NoResults.svelte';
  let MarkdownViewer;

  export let data;
  $: fullScreen = false;

  onMount(async () => {
    if (data.article.markdown) {
      const module = await import(
        '../../../components/articles/MarkdownViewer.svelte'
      );
      MarkdownViewer = module.default;
    }
    if (
      data.article &&
      data.article._id &&
      !$articlesRead.find(i => i === data.article._id)
    ) {
      await fetcher(`${data.env.API_HOST}/articles/${data.article._id}/read`, {
        method: 'PATCH',
      });
      articlesRead.update(list => {
        if (!list.find(i => i === data.article._id)) {
          list.unshift(data.article._id);
        }
        return list;
      });
    }
  });

  function handleFullscreen() {
    fullScreen = !fullScreen;
  }
</script>

<svelte:head>
  <title>
    {$_('title')}
    |
    {data.article ? data.article.title : $_('pages.article.no_article_title')}
  </title>
</svelte:head>

<PageTransition>
  {#if !data.article}
    <NoResults
      title={$_('pages.article.no_article_title')}
      subtitle={$_('pages.article.no_article_subtitle')}
    />
  {:else}
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-half">
        <BackButton previousLocation="/articles" useHistory={true} />
      </div>
      <div class="column is-half fav-button-wrap">
        <div class="box-transparent">
          <button
            class="button is-round"
            title={$_('details_article')}
            on:click={handleFullscreen}
          >
            <span class="icon is-small"> <i class="fas fa-id-card" /> </span>
          </button>
          <FavoritesButton type="article" itemId={data.article._id} />
        </div>
      </div>
    </div>
    <div class="columns is-gapless is-multiline">
      <div
        class="column is-full-desktop is-full-tablet {fullScreen
          ? ''
          : 'is-three-quarters-widescreen'}"
      >
        <section class="box-transparent">
          <div class="title is-4">{data.article.title}</div>

          <div class="column is-full-desktop table-container is-full-tablet">
            {#if data.article.markdown}
              <svelte:component
                this={MarkdownViewer}
                content={data.article.content}
              />
            {:else}
              <div class="quill-editor">
                {@html sanitizeHtml(data.article.content)}
              </div>
            {/if}
          </div>
        </section>
      </div>
      {#if !fullScreen}
        <div
          class="column is-one-quarter-widescreen is-full-desktop is-full-tablet"
        >
          <div class="box-transparent">
            <AuthorIdCard author={data.author} />
            <div class="box">
              <div class="title is-5">{$_('license.license')}</div>
              <div>
                {#if data.article.licence}
                  <div class="columns is-centered has-text-centered">
                    {$_(`license.${data.article.licence}`)}
                  </div>
                  <div class="columns is-centered mt-1">
                    <img
                      src="/logoCC/{data.article.licence}.svg"
                      alt="licence {data.article.licence}"
                    />
                  </div>
                {:else}
                  <div class="columns is-centered has-text-centered">
                    {$_('license.CC BY')}
                  </div>
                  <div class="columns is-centered mt-1">
                    <img src="/logoCC/CC BY.svg" alt="license CC BY" />
                  </div>
                {/if}
              </div>
            </div>
            {#if data.article.tags && data.article.tags.length}
              <div class="box">
                <div class="title is-5">{$_('pages.article.tags')}</div>
                <div class="tags">
                  {#each data.article.tags as tag}
                    <SingleTag {tag} />
                  {/each}
                </div>
              </div>
            {/if}
            <div class="box last-box">
              <div class="title is-5">
                {$_('pages.article.read_times')}
                :
                {data.article.visits}
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</PageTransition>

<style>
  .quill-editor {
    box-sizing: border-box;
    cursor: text;
    line-height: 1.42;
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 15px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .content {
    text-align: justify;
  }
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
  .last-box {
    margin-bottom: var(--space-between);
  }
</style>
