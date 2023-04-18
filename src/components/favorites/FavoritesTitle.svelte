<script>
  import {_} from 'svelte-i18n';

  export let component = '';
  export let componentCount = 0;
  export let isOpen;
  const handleClick = () => {
    isOpen = !isOpen;
  };
</script>

<div class="container">
  <div>
    <h1 class="title">
      {$_(`pages.favorites.${component}_title`)}
      ({componentCount})
      <button
        class="button is-round"
        style="border: none; background: transparent"
        on:click={() => handleClick()}
      >
        {#if isOpen === true}
          <span class="icon is-small">
            <i class="fa fa-chevron-down is-open" />
          </span>
        {:else}
          <span class="icon is-small">
            <i class="fa fa-chevron-down" />
          </span>
        {/if}
      </button>
    </h1>
    <h2 class="subtitle">{$_(`pages.favorites.${component}_subtitle`)}</h2>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .is-open {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
