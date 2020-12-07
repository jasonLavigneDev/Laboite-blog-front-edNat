<script context="module">
  export function preload(page, { env }) {
    return { env };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../../components/common/Divider.svelte";
  import { structureOptions } from "./_academies";
  import SingleAcademy from "../../components/academies/SingleAcademy.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  export let env;
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{env.IDENTITY} | {$_('links.academies')}</title>
</svelte:head>

<PageTransition>
  <section class="box-transparent">
    <div class="container">
      <h1 class="title">{$_('pages.academies.title')}</h1>
      <h2 class="subtitle">{$_('pages.academies.subtitle')}</h2>
    </div>
    <Divider />
    <div class="columns is-multiline">
      {#each structureOptions as academy}
        <div class="column is-half is-full-mobile">
          <SingleAcademy {academy} />
        </div>
      {/each}
    </div>
  </section>
</PageTransition>
