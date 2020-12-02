<script>
  import { _ } from "svelte-i18n";
  import { slide } from "svelte/transition";
  import { goto } from "@sapper/app";
  import { toQuery } from "../../utils/functions/queryStringMaker";
  import SingleTag from "./SingleTag.svelte";
  import SearchableSelect from "./SearchableSelect.svelte";

  export let query = {};
  export let path;
  export let tagsList = [];
  let queryTags;
  let opened = false;

  $: queryTags = query.tags ? query.tags.split(",") : [];

  const resetUrl = () =>
    `${path}?${toQuery({
      ...query,
      page: 1,
      tags: "",
    })}`;

  const toggleOpened = () => (opened = !opened);

  const deleteTag = (tag) => {
    const tagIndex = queryTags.findIndex((t) => tag === t);
    const tagsArray = [...queryTags];
    if (tagsArray.length === 1) {
      goto(resetUrl());
    } else {
      tagsArray.splice(tagIndex, 1);
      const tagsString = tagsArray.join(",");
      const url = `${path}?${toQuery({
        ...query,
        page: 1,
        tags: tagsString,
      })}`;
      goto(url);
    }
  };
  const addTag = (tag) => {
    const tagsArray = [...queryTags];
    tagsArray.push(tag);
    const tagsString = tagsArray.join(",");
    const url = `${path}?${toQuery({
      ...query,
      page: 1,
      tags: tagsString,
    })}`;
    goto(url);
  };
</script>

<style>
  .main-header {
    margin-bottom: 8px;
  }
  .toggle {
    cursor: pointer;
  }
  .tags {
    margin-top: 5px;
  }
</style>

{#if !opened}
  <span
    class="toggle"
    on:click={toggleOpened}>{$_('components.TagsFilters.open')}</span>
{:else}
  <div class="main-header">
    <span class="subtitle">{$_('components.TagsFilters.filter')}</span>
    {' - '}
    <span
      class="toggle"
      on:click={toggleOpened}>{$_('components.TagsFilters.close')}</span>
    {#if query.tags}
      {' - '}
      <a rel="prefetch" href={resetUrl()}>
        {$_('components.TagsFilters.reset')}
      </a>
    {/if}
  </div>

  <SearchableSelect
    onChange={addTag}
    options={tagsList
      .filter((t) => queryTags.findIndex((qt) => qt === t) === -1)
      .map((t) => ({ value: t, label: t }))} />
{/if}
<div class="tags">
  {#each queryTags as tag}
    <SingleTag {tag} onDelete={() => deleteTag(tag)} />
  {/each}
</div>
