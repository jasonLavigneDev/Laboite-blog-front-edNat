<script>
  import {onMount} from 'svelte';
  import fetcher from 'isomorphic-fetch';
  import {_} from 'svelte-i18n';
  import {page} from '$app/stores';

  import {favoritesStructure} from '../../utils/functions/stores';
  import SingleStructure from '../structures/SingleStructure.svelte';
  import Divider from '../common/Divider.svelte';

  let structure = {};
  onMount(async () => {
    const responseStructure = await fetcher(
      `${$page.data.env.API_HOST}/structures/${$favoritesStructure}`,
    );
    structure = await responseStructure.json();
  });
</script>

<section class="box-transparent">
  <div class="container">
    <h1 class="title">{$_('pages.home.your_structure_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.your_structure_subtitle')}</h2>
  </div>
  <Divider />

  {#if structure._id}
    <SingleStructure {structure} />
  {/if}
</section>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
