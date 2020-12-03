<script>
  import { _ } from "svelte-i18n";

  import { structureOptions } from "../../routes/academies/_academies";
  import { lastAcademies } from "../../utils/functions/stores";
  import SingleAcademy from "../academies/SingleAcademy.svelte";
  import Divider from "../common/Divider.svelte";
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
  }
</style>

<section class="box-transparent">
  <div class="container">
    <h1 class="title">{$_('pages.home.last_academies_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.last_academies_subtitle')}</h2>
  </div>
  <Divider />

  <div class="columns is-multiline">
    {#each $lastAcademies as academy}
      <div class="column is-full">
        <SingleAcademy
          academy={structureOptions.find((t) => t.value === academy)} />
      </div>
    {/each}
  </div>
</section>
