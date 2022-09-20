<script>
  import {_} from 'svelte-i18n';
  import Divider from '../common/Divider.svelte';
  import NoResults from '../common/NoResults.svelte';
  import GroupCard from '../groups/GroupCard.svelte';

  export let groups = [];
</script>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.favorites.groups_title')}</h1>
      <h2 class="subtitle">{$_('pages.favorites.groups_subtitle')}</h2>
    </div>
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each groups as group}
      <GroupCard {group} />
    {:else}
      <div class="column is-full">
        <NoResults title={$_('pages.favorites.nogroups_title')} />
      </div>
    {/each}
  </div>
</section>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
