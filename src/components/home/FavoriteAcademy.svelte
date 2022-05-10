<script>
  import { onMount } from "svelte";
  import fetcher from "isomorphic-fetch";
  import { _ } from "svelte-i18n";
  import { session } from "$app/stores"

  import { favoritesAcademy } from "../../utils/functions/stores";
  import SingleAcademy from "../academies/SingleAcademy.svelte";
  import Divider from "../common/Divider.svelte";

  let academy = {}
  onMount(async () => {
    const responseAcademy = await fetcher(
      `${$session.env.API_HOST}/structures/${$favoritesAcademy}`
    );
    academy = await responseAcademy.json();
  })

</script>

<style>
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

  {#if academy._id}
    <SingleAcademy academy={academy} />
  {/if}

</section>
