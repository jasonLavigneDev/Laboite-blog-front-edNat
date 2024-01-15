<script>
  import {onMount} from 'svelte';
  import {_} from 'svelte-i18n';

  import {lastStructures} from '../../utils/functions/stores';
  import SingleStructure from '../structures/SingleStructure.svelte';
  import Divider from '../common/Divider.svelte';
  import {fetchData} from '../../utils/api/methods';
  import {page} from '$app/stores';

  let structures = [];
  onMount(async () => {
    const where = {_id: {inq: $lastStructures}};
    const {items} = await fetchData({
      host: $page.data.env.API_HOST,
      limit: 4,
      order: 'name DESC',
      apiurl: 'structures',
      where,
    });
    structures = items;
  });
</script>

<section class="box-transparent">
  <div class="container">
    <h1 class="title">{$_('pages.home.last_structures_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.last_structures_subtitle')}</h2>
  </div>
  <Divider />

  <div class="columns is-multiline">
    {#each structures as structure}
      <div class="column is-full">
        <SingleStructure {structure} />
      </div>
    {/each}
  </div>
</section>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
