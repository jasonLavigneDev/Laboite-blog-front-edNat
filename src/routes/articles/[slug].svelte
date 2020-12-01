<script context="module">
  import { api, identity } from "../../settings";
  import fetcher from "isomorphic-fetch";

  export async function preload({ params }) {
    const responseArticle = await fetcher(
      `${api.host}/articles/${params.slug}`
    );
    const article = await responseArticle.json();

    return {
      article,
      author: article && article.user,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import SvelteMarkdown from "svelte-markdown";
  import { onMount } from "svelte";
  import AuthorIdCard from "../../components/authors/AuthorIdCard.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import BackButton from "../../components/navigation/BackButton.svelte";
  import SingleTag from "../../components/common/SingleTag.svelte";
  import FavoritesButton from "../../components/common/FavoritesButton.svelte";
  import { articlesRead } from "../../utils/functions/stores";
  import NoResults from "../../components/common/NoResults.svelte";
  import BigLink from "../../components/common/BigLink.svelte";

  export let article, author;
  onMount(async () => {
    if (
      article &&
      article._id &&
      !$articlesRead.find((i) => i === article._id)
    ) {
      await fetcher(`${api.host}/articles/${article._id}/read`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          visits: article.visits + 1,
        }),
      });
      articlesRead.update((list) => {
        if (!list.find((i) => i === article._id)) {
          list.unshift(article._id);
        }
        return list;
      });
    }
  });
</script>

<style lang="scss">
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
  .favorites {
    display: flex;
    justify-content: flex-end;
  }
  .last-box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>
    {identity.title}
    |
    {article ? article.title : $_('pages.article.no_article_title')}
  </title>
</svelte:head>

<PageTransition>
  {#if !article}
    <NoResults
      title={$_('pages.article.no_article_title')}
      subtitle={$_('pages.article.no_article_subtitle')} />
  {:else}
    <div class="columns is-multiline is-mobile">
      <div class="column is-half">
        <BackButton previousLocation="/articles" useHistory={true} />
      </div>
      <div class="column is-half favorites">
        <div class="box-transparent">
          <FavoritesButton type="article" itemId={article._id} />
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-three-quarters-fullhd is-full-desktop is-full-tablet">
        <section class="box-transparent">
          <div class="title is-4">{article.title}</div>

          <div class="content">
            {#if article.markdown}
              <SvelteMarkdown source={article.content} />
            {:else}
              {@html article.content}
            {/if}
          </div>
        </section>
      </div>
      <div class="column is-one-quarter-fullhd is-full-desktop is-full-tablet">
        <div class="box-transparent">
          <AuthorIdCard {author} full />
          <div class="box">
            <div class="title is-5">{$_('pages.article.tags')}</div>
            <div class="tags">
              {#each article.tags as tag}
                <SingleTag {tag} />
              {/each}
            </div>
          </div>
          <div class="box last-box">
            <div class="title is-5">
              {$_('pages.article.read_times')}
              :
              {article.visits}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</PageTransition>
