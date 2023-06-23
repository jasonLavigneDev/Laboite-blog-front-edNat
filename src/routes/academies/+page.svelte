<script>
  import {_} from 'svelte-i18n';
  import Divider from '../../components/common/Divider.svelte';
  import SingleAcademy from '../../components/academies/SingleAcademy.svelte';
  import PageTransition from '../../components/common/PageTransition.svelte';

  export let data;
</script>

<svelte:head>
  <title>{$_('title')} | {$_('links.academies')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="container">
      <h1 class="title">{$_('pages.academies.title')}</h1>
      <h2 class="subtitle">{$_('pages.academies.subtitle')}</h2>
    </div>
    <Divider />
    <div class="columns is-multiline">
      {#each data.structures as academy}
        <div class="column is-half is-full-mobile">
          <SingleAcademy {academy} />
        </div>
      {/each}
    </div>
  </section>
</PageTransition>

<style>
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>
