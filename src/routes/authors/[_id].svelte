<script context="module">
  import axios from "axios";
  import { api, identity } from "../../settings";
  export async function preload({ params }) {
    const filtersArticles = {
      limit: 10,
      order: "createdAt DESC",
      fields: { content: false, _id: false, updatedAt: false },
    };
    const responseArticles = await axios.get(
      `${api.host}/authors/${params._id}/articles?filter=${JSON.stringify(
        filtersArticles
      )}`
    );
    const responseAuthor = await axios.get(`${api.host}/authors/${params._id}`);
    return {
      articles: responseArticles.data,
      author: responseAuthor.data,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import SingleArticleBlock from "../../components/common/SingleArticleBlock.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import SearchField from "../../components/common/SearchField.svelte";

  export let articles = [],
    author = {};
  const handleUpdate = (data) => (articles = data);
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('articles')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{author.firstName} {author.lastName}</h1>
      <h2 class="subtitle">{author.username}</h2>
      <div>{author.structure}</div>
    </div>
    <Divider />
    <SearchField
      {handleUpdate}
      apiurl="authors/{author._id}/articles"
      order="createdAt DESC"
      limit={10}
      searchFields={['description', 'title', 'slug', 'tags']}
      fields={{ content: false, _id: false, updatedAt: false }} />
    <Divider transparent />

    <div class="columns is-multiline">
      {#each articles as article}
        <SingleArticleBlock {article} />
      {/each}
    </div>
  </section>
</PageTransition>
