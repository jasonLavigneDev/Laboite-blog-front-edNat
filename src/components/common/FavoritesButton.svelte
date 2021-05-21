<script>
  import {
    favoritesArticles,
    favoritesAuthors,
    favoritesGroups,
    favoritesResearches,
  } from "../../utils/functions/stores";

  const types = {
    article: favoritesArticles,
    author: favoritesAuthors,
    group: favoritesGroups,
    research: favoritesResearches,
  };

  export let type;
  export let itemId;

  let active = false;
  let store = types[type];

  $: store.subscribe((v) => {
    active = !!v.find((i) => i === itemId);
  });

  const toggleFavorites = () => {
    let currentItems = $store || [];
    if (!currentItems.find((i) => i === itemId)) {
      currentItems.push(itemId);
    } else {
      currentItems = currentItems.filter((i) => i !== itemId);
    }
    $store = currentItems;
  };
</script>

<button class="button is-round" on:click={toggleFavorites}>
  {#if active}
    <span class="icon is-small"> <i class="fas fa-bookmark" /> </span>
  {:else}<span class="icon is-small"> <i class="far fa-bookmark" /> </span>{/if}
</button>
