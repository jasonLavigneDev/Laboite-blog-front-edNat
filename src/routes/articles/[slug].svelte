<script context="module">
  import { api, identity } from "../../settings";

  export async function preload({ params }) {
    const responseArticle = await this.fetch(
      `${api.host}/articles/${params.slug}`
    );
    const article = await responseArticle.json();

    const responseAuthor = await this.fetch(
      `${api.host}/authors/${article.userId}`
    );
    const author = await responseAuthor.json();
    return {
      article,
      author,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import SvelteMarkdown from "svelte-markdown";
  import AuthorIdCard from "../../components/Articles/AuthorIdCard.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import SingleTagLink from "../../components/common/SingleTagLink.svelte";

  export let article, author;
</script>

<style>
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
</style>

<svelte:head>
  <title>{identity.title} | {article.title}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline">
    <div class="column is-three-quarters is-full-mobile">
      <div class="box">
        <div class="title is-4">{article.title}</div>

        <div class="content">
          {#if article.markdown}
            <SvelteMarkdown source={article.content} />
          {:else}
            {@html article.content}
          {/if}
        </div>
      </div>
    </div>
    <div class="column is-one-quarters is-full-mobile">
      <AuthorIdCard {author} full />
      <div class="box">
        <div class="title is-5">{$_('pages.article.tags')}</div>
        <div class="tags">
          {#each article.tags as tag}
            <SingleTagLink {tag} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</PageTransition>
