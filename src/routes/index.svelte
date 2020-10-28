<script>
  import PageTransition from "../components/common/PageTransition.svelte";

  import LastPublished from "../components/Home/LastPublished.svelte";
  import { identity } from "../settings";
</script>

<svelte:head>
  <title>{identity.title}</title>
</svelte:head>

<PageTransition>
  <LastPublished />
</PageTransition>
