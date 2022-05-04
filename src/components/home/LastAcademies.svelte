<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import { lastAcademies } from "../../utils/functions/stores";
  import SingleAcademy from "../academies/SingleAcademy.svelte";
  import Divider from "../common/Divider.svelte";
import { fetchData } from "../../utils/api/methods";

  let academies = []
  onMount(async () => {
    const where = { _id: { inq: $lastAcademies } };
    const { items } = await fetchData({
      host: import.meta.env.VITE_API_HOST,
      limit: 4,
      order: "name DESC",
      apiurl: "structures",
      where
    });
    academies = items
  })
</script>

<style>
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
    {#each academies as academy}
      <div class="column is-full">
        <SingleAcademy
          academy={academy} />
      </div>
    {/each}
  </div>
</section>
