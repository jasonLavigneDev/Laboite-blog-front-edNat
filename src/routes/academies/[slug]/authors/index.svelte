<script context="module">
  import { identity } from "../../../../settings";
  import { fetchData } from "../../../../utils/api/methods";
  import { structureOptions } from "../../_academies";

  export async function preload({ params, query, path }) {
    const { page = 1, search = "" } = query;
    const academy = structureOptions.find(({ slug }) => slug === params.slug);
    const isResearchLink = !!search;
    const request = !!search
      ? {
          path,
          query: { search },
          academy,
          type: "authors",
        }
      : null;

    const limit = 9;
    const fields = {};
    const searchFields = ["firstName", "lastName", "username", "structure"];
    const order = "articlesCount DESC";
    const apiurl = "authors";
    const where = { articlesCount: { gt: 0 }, structure: academy.value };

    const { items, total } = await fetchData({
      limit,
      order,
      fields,
      searchFields,
      apiurl,
      value: search,
      where,
      skip: page === 1 ? 0 : (Number(page) - 1) * limit,
    });
    return {
      authors: items,
      total,
      limit,
      page: Number(page),
      query,
      path,
      academy,
      isResearchLink,
      request,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import Divider from "../../../../components/common/Divider.svelte";
  import SearchField from "../../../../components/common/SearchField.svelte";
  import Pagination from "../../../../components/common/Pagination.svelte";
  import NoResults from "../../../../components/common/NoResults.svelte";
  import AuthorIdCard from "../../../../components/authors/AuthorIdCard.svelte";
  import BackButton from "../../../../components/navigation/BackButton.svelte";
  import PageTransition from "../../../../components/common/PageTransition.svelte";
  import FavoritesButton from "../../../../components/common/FavoritesButton.svelte";

  export let authors = [];
  export let total = 0;
  export let limit;
  export let page = 1;
  export let query = {};
  export let path = "";
  export let academy;
  export let isResearchLink;
  export let request;
  const { preloading } = stores();
</script>

<svelte:head>
  <title>{identity.title} | {academy.label} | {$_('links.authors')}</title>
</svelte:head>

<PageTransition>
  <BackButton previousLocation="/academies/{academy.slug}" />
  <div class="container box-transparent">
    <a href="/academies/{academy.slug}" rel="prefetch"><h1 class="title is-2">
        {academy.label}
      </h1></a>
  </div>
  <section class="box-transparent">
    <div class="columns is-multiline is-mobile">
      <div
        class="column"
        class:is-full={!isResearchLink}
        class:is-half={isResearchLink}>
        <h1 class="title">{$_('pages.authors.title')}: {total}</h1>
        <h2 class="subtitle">{$_('pages.authors.subtitle')}</h2>
      </div>
      {#if isResearchLink}
        <div class="column is-half fav-button-wrap">
          <div class="box-transparent">
            <div>{$_('save_research')}</div>
            <FavoritesButton type="research" itemId={JSON.stringify(request)} />
          </div>
        </div>
      {/if}
    </div>
    <Divider />
    <div class="columns is-multiline">
      <div class="column is-half is-full-mobile">
        <SearchField loading={$preloading} {query} {path} />
      </div>
      <div class="column is-half is-full-mobile">
        {#if !$preloading}
          <Pagination {total} {page} {limit} {query} {path} />
        {/if}
      </div>
    </div>

    {#if authors.length}
      <div class="columns is-multiline">
        {#each authors as author}
          <div class="column is-one-third is-half-tablet is-full-mobile">
            <AuthorIdCard {author} />
          </div>
        {/each}
      </div>
    {:else}
      <NoResults query={!!Object.keys(query).length} />
    {/if}
    <Pagination {total} {page} {limit} {query} {path} />
  </section>
</PageTransition>
