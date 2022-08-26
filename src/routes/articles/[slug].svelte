<script context="module">
  import fetcher from "isomorphic-fetch";

  export async function load({ params = {}, session }) {
    const responseArticle = await fetcher(
      `${session.env.API_HOST}/articles/${params.slug}`
    );
    const article = await responseArticle.json();

    return {
      props: {
        session,
        article,
        author: article && article.user,
      }
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import AuthorIdCard from "../../components/authors/AuthorIdCard.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import BackButton from "../../components/navigation/BackButton.svelte";
  import SingleTag from "../../components/common/SingleTag.svelte";
  import FavoritesButton from "../../components/common/FavoritesButton.svelte";
  import { articlesRead } from "../../utils/functions/stores";
  import NoResults from "../../components/common/NoResults.svelte";
  let MarkdownViewer;

  export let article;
  export let session;
  export let author;

  onMount(async () => {
    if (article.markdown) {
      const module = await import(
        "../../components/articles/MarkdownViewer.svelte"
      );
      MarkdownViewer = module.default;
    }
    if (
      article &&
      article._id &&
      !$articlesRead.find((i) => i === article._id)
    ) {
      await fetcher(`${session.env.API_HOST}/articles/${article._id}/read`, {
        method: "PATCH",
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

<svelte:head>
  <title>
    {$_("title")}
    |
    {article ? article.title : $_("pages.article.no_article_title")}
  </title>
  <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet" />
</svelte:head>

<PageTransition>
  {#if !article}
    <NoResults
      title={$_("pages.article.no_article_title")}
      subtitle={$_("pages.article.no_article_subtitle")}
    />
  {:else}
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-half">
        <BackButton previousLocation="/articles" useHistory={true} />
      </div>
      <div class="column is-half fav-button-wrap">
        <div class="box-transparent">
          <FavoritesButton type="article" itemId={article._id} />
        </div>
      </div>
    </div>
    <div class="columns is-gapless is-multiline">
      <div
        class="column is-three-quarters-widescreen is-full-desktop is-full-tablet"
      >
        <section class="box-transparent">
          <div class="title is-4">{article.title}</div>

          <div class="content">
            {#if article.markdown}
              <svelte:component
                this={MarkdownViewer}
                content={article.content}
              />
            {:else}
              <div class="ql-editor">
                {@html article.content}
              </div>
            {/if}
          </div>
        </section>
      </div>
      <div
        class="column is-one-quarter-widescreen is-full-desktop is-full-tablet"
      >
        <div class="box-transparent">
          <AuthorIdCard {author} />
          <div class="box">
            <div class="title is-5">Licence</div>
            <div>
              {#if article.licence}
                <div class="columns is-centered has-text-centered" >
                  {$_(`licence.${article.licence}`)}
                </div>
                <div class="columns is-centered mt-1" >
                  <img src="/logoCC/{article.licence}.svg" alt="licence CC BY"/>
                </div>
              {:else}
                <div class="columns is-centered has-text-centered" >
                  {$_('licence.CC BY')}
                </div>
                <div class="columns is-centered mt-1" >
                  <img src="/logoCC/CC BY.svg" alt="licence CC BY"/>
                </div>
              {/if}
            </div>
          </div>
          <div class="box">
            <div class="title is-5">{$_("pages.article.tags")}</div>
            <div class="tags">
              {#each article.tags as tag}
                <SingleTag {tag} />
              {/each}
            </div>
          </div>
          <div class="box last-box">
            <div class="title is-5">
              {$_("pages.article.read_times")}
              :
              {article.visits}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</PageTransition>

<style>
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
