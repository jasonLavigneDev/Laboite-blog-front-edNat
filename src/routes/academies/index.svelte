<script>
  import { _ } from "svelte-i18n";
  import { identity } from "../../settings";
  import Divider from "../../components/common/Divider.svelte";
  import PageTransition from "../../components/common/PageTransition.svelte";
  import { structureOptions } from "./_academies";
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
  }
</style>

<svelte:head>
  <title>{identity.title} | {$_('links.academies')}</title>
</svelte:head>

<PageTransition>
  <section class="box">
    <div class="container">
      <h1 class="title">{$_('pages.academies.title')}</h1>
      <h2 class="subtitle">{$_('pages.academies.subtitle')}</h2>
    </div>
    <Divider />
    <div class="columns is-multiline">
      {#each structureOptions as structure}
        <a
          rel="prefetch"
          href="/academies/{structure.slug}">{structure.label}</a>
        <Divider />
      {/each}
    </div>
  </section>
</PageTransition>
