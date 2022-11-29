<script>
  import {_} from 'svelte-i18n';
  import {createEventDispatcher} from 'svelte';

  export let tag;
  export let disabled = false;
  export let onDelete = null;
  export let tagSearch = false;

  const dispatch = createEventDispatcher();

  function getTag(tag) {
    dispatch('getTag', {
      tag: tag,
    });
  }
</script>

<span class="tag is-medium" class:disabled>
  {tag}
  {#if onDelete}
    <button class="delete is-medium" on:click={onDelete} />
  {/if}
  {#if tagSearch}
    <button
      class="buttonSearch is-medium"
      on:click={getTag(tag)}
      title={$_('components.SearchField.search') + ' ' + `${tag}`}
    >
      <i class="fas fa-search" />
    </button>
  {/if}
</span>

<style>
  .buttonSearch {
    background-color: var(--secondary);
    border: none;
    color: var(--tertiary);
    margin-left: 0.5vw;
    padding: 5px;
  }
  .buttonSearch:hover {
    background-color: var(--tertiary);
    opacity: 0.5;
    cursor: pointer;
    color: var(--secondary);
    border-radius: 20px;
  }

  .tag {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    background-color: var(--secondary);
    border-radius: 20px;
  }
  .tag.disabled {
    opacity: 0.5;
  }
  .tag.disabled:hover {
    opacity: 1;
  }
</style>
