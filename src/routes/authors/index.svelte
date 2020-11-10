<script context="module">
  import axios from "axios";
  import { api, identity } from "../../settings";
  export async function preload() {
    const filters = {
      limit: 9,
      order: "articlesCount DESC",
      where: { articlesCount: { gt: 0 } },
      //   fields: { content: false, _id: false, updatedAt: false },
    };
    const response = await axios.get(
      `${api.host}/authors?filter=${JSON.stringify(filters)}`
    );
    return {
      authors: response.data,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import SingleAuthorBlock from "../../components/common/SingleAuthorBlock.svelte";
  import SearchField from "../../components/common/SearchField.svelte";

  export let authors = [];
  const handleUpdate = (data) => (authors = data);
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('authors')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{$_('pages.authors.title')}</h1>
      <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
    </div>
    <Divider />
    <SearchField
      {handleUpdate}
      apiurl="authors"
      limit={9}
      where={{ articlesCount: { gt: 0 } }}
      order="articlesCount DESC"
      searchFields={['firstName', 'lastName', 'username', 'structure']} />
    <Divider transparent />

    <div class="columns is-multiline">
      {#each authors as author}
        <SingleAuthorBlock {author} />
      {/each}
    </div>
  </section>
</PageTransition>
