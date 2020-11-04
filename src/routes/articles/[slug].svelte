<script context="module">
  import axios from "axios";
  import { api, identity } from "../../settings";
  export async function preload({ params }) {
    const response = await axios.get(`${api.host}/articles/${params.slug}`);
    return {
      article: response.data,
    };
  }
</script>

<script>
  import SvelteMarkdown from "svelte-markdown";
  import PageTransition from "../../components/common/PageTransition.svelte";

  export let article;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{article.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
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
</PageTransition>
