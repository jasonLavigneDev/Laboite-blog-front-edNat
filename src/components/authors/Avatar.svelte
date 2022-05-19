<script>
  export let avatar;
  export let firstName;
</script>

<style>
  .letter {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background: var(--primary);
    color: var(--tertiary);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
</style>

<figure class="image is-48x48">
  {#if !!avatar}
    <img alt="avatar for {firstName}" class="is-rounded" src={avatar} />
  {:else}
    <div class="letter is-rounded">{firstName?.substring(0, 1)}</div>
  {/if}
</figure>
