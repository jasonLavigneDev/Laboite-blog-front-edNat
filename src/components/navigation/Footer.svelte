<script>
  import { _ } from "svelte-i18n";
  import { getStores } from "$app/stores";
  import { footer } from "./items";

  const { page, session } = getStores();
</script>

<style>
  .navbar {
    height: 64px;
  }
  .navbar-menu {
    background-color: var(--primary) !important;
  }
  .navbar-item {
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 400;
    font-family: "WorkSansBold" !important;
    font-size: 14px;
    color: var(--tertiary);
  }
  .navbar-item.is-active {
    color: var(--tertiary);
  }
</style>

<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      {#each footer as { path, text }}
        <a
          class:is-active={$page.url.pathname === path}
          class="navbar-item"
          target="_blank"
          href="{import.meta.env.VITE_LABOITE_HOST}{path}">
          {$_(`links.${text}`)}
        </a>
      {/each}
    </div>
    <div class="navbar-end" />
  </div>
</nav>
