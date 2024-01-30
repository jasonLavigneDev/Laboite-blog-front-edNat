<script>
  import {favoritesStructure} from '../../utils/functions/stores';

  const types = {
    structure: favoritesStructure,
  };

  export let type;
  export let itemId;

  let active = false;
  let store = types[type];

  $: store.subscribe(v => {
    active = v === itemId;
  });

  const toggleFavorite = () => {
    $store = active ? null : itemId;
  };
</script>

<button class="button is-round" on:click={toggleFavorite}>
  {#if active}
    <span class="icon is-small"> <i class="fas fa-star" /> </span>
  {:else}<span class="icon is-small"> <i class="far fa-star" /> </span>{/if}
</button>
