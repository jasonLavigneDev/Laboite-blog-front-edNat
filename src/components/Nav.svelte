<script lang="ts">
  export let segment: string;
</script>

<style>
  .navbar {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
      0px 2px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="/apps-logo-sansfond.svg" alt="LaBoite - Blog" height="40" />
    </a>

    <div
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>
</nav>
