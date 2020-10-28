<script lang="ts">
  import PageTransition from "../components/common/PageTransition.svelte";

  import Hero from "../components/Home/Hero.svelte";
  import { identity } from "../settings";
</script>

<svelte:head>
  <title>{identity.title}</title>
</svelte:head>

<PageTransition>
  <Hero />
</PageTransition>
