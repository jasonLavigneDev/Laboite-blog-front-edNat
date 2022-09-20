<script>
  export let tag;
  export let disabled = false;
  export let onDelete = null;
</script>

<span class="tag is-medium" class:disabled
  >{tag}{#if onDelete}
    <button class="delete is-medium" on:click={onDelete} />
  {/if}</span
>

<style>
  .tag {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    background-color: var(--secondary);
    color: var(--tertiary);
    border-radius: 20px;
  }
  .tag.disabled {
    opacity: 0.5;
  }
  .tag.disabled:hover {
    opacity: 1;
  }
</style>
