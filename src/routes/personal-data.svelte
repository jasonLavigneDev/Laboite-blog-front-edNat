<script context="module">
  import axios from "axios";
  import { api, identity } from "../settings";

  export async function preload() {
    const filters = {
      fields: { personalData: true },
    };
    const response = await axios.get(
      `${api.host}/legal-texts?filter=${JSON.stringify(filters)}`
    );
    return {
      legal: response.data.personalData,
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
