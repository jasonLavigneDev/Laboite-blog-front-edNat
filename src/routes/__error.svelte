<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  .title,
  .subtitle {
    text-align: center;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<section class="hero is-medium is-grey is-bold is-centered">
  <div class="hero-body">
    <div class="container">
      <div class="title is-1">{status}</div>
      <div class="subtitle is-3">{error?.message}</div>
      {#if dev && error?.stack}
        <pre>{error?.stack}</pre>
      {/if}
    </div>
  </div>
</section>
