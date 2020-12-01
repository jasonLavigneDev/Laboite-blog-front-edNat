<script>
  import { _ } from "svelte-i18n";

  import { structureOptions } from "../../routes/academies/_academies";
  import { lastAcademy } from "../../utils/functions/stores";
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
    <h1 class="title">{$_('pages.home.your_academy_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.your_academy_subtitle')}</h2>
  </div>
  <Divider />

  <SingleAcademy
    academy={structureOptions.find((t) => t.value === $lastAcademy)} />
</section>
