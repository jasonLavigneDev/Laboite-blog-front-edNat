<script>
  import { _ } from "svelte-i18n";

  export let title = null;
  export let subtitle = null;
</script>

<style>
  .title,
  .subtitle {
    text-align: center;
  }
</style>

<section class="hero is-medium is-grey is-bold is-centered">
  <div class="hero-body">
    <div class="container">
      <div class="title">{title || $_('components.NoResults.title')}</div>
      <div class="subtitle">
        {subtitle || $_('components.NoResults.subtitle')}
      </div>
    </div>
  </div>
</section>
