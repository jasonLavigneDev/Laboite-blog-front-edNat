<script>
  import {_} from 'svelte-i18n';
  import {toQuery} from '../../utils/functions/queryStringMaker';
  import BigLink from '../common/BigLink.svelte';
  import FavoritesButton from '../common/FavoritesButton.svelte';
  import SingleTag from '../common/SingleTag.svelte';

  export let research;

  const requestObject = JSON.parse(research);

  const {path, type, structure, query} = requestObject;
  const {search, tags} = query;

  const url = `${path}?${toQuery(query)}`;
</script>

<div class="column is-full">
  <div class="media box">
    <div class="media-content">
      <div class="title is-4">
        {$_('components.SingleResearch.type')}:
        {$_(`links.${type}`)}
      </div>
      {#if structure}
        <div class="subtitle is-5">{structure.name}</div>
      {/if}
      {#if search}
        <div>{$_('components.SingleResearch.search')}: {search}</div>
      {/if}

      {#if tags}
        <p class="tags">
          {#each tags.split(',') as tag}
            <SingleTag {tag} />
          {/each}
        </p>
      {/if}
    </div>
    <div class="media-right">
      <BigLink link={url} text={$_('components.SingleResearch.go')} />
      <FavoritesButton type="research" itemId={research} />
    </div>
  </div>
</div>

<style>
</style>
