<script context="module">
  import { identity } from "../settings";
  import { fetchData } from "../utils/api/methods";

  export async function preload() {
    const fields = { personalData: true };
    const apiurl = "legal-texts";

    const { items } = await fetchData(this.fetch, {
      fields,
      apiurl,
      count: false,
    });
    return {
      legal: items.personalData,
    };
  }
</script>

<script>
  import { _ } from "svelte-i18n";
  import Divider from "../components/common/Divider.svelte";
  import PageTransition from "../components/common/PageTransition.svelte";

  export let legal = {};
</script>

<svelte:head>
  <title>{identity.title} | {$_('links.personalData')}</title>
</svelte:head>

<PageTransition>
  <div class="container">
    <h1 class="title">{$_('links.personalData')}</h1>
  </div>
  <Divider />
  {@html legal.content}
</PageTransition>
