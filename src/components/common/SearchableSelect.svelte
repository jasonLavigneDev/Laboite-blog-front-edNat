<script>
  import { slide } from "svelte/transition";
  export let options = [];
  export let onChange;
  let search = "";
  let opened = false;
  let optionsFiltered = options;
  let regexp = new RegExp(search, "g");

  $: regexp = new RegExp(search, "g");
  $: optionsFiltered = options.filter(({ value }) => regexp.test(value));

  const open = () => (opened = true);
  const close = () => (opened = false);
</script>

<style lang="scss">
  .dropdown-menu,
  .dropdown {
    z-index: 20;
  }
</style>

<div class="dropdown is-active" on:mouseleave={close} on:mouseenter={open}>
  <div class="dropdown-trigger">
    <input bind:value={search} class="input" type="text" />
  </div>
  {#if opened}
    <div class="dropdown-menu" role="menu" transition:slide>
      <div class="dropdown-content">
        {#each optionsFiltered as item, i}
          {#if i < 5}
            <a
              class="dropdown-item"
              on:click={() => {
                onChange(item.value);
              }}>{item.label}</a>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
