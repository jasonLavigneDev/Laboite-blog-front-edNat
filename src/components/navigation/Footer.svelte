<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { footer } from "./items";
  import { HOST_LABOITE } from "../../settings";

  const { page } = stores();
</script>

<style lang="scss">
  .navbar {
    height: 64px;
  }
  .navbar-item {
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 400;
    font-family: "WorkSansBold" !important;
    font-size: 14px;
    &.is-active {
      color: var(--primary);
    }
  }
</style>

<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div id="navbarMenu" class="navbar-menu">
    <div class="navbar-start">
      {#each footer as { path, text }}
        <a
          class:is-active={$page.path === path}
          class="navbar-item"
          target="_blank"
          href="{HOST_LABOITE}{path}">
          {$_(`links.${text}`)}
        </a>
      {/each}
    </div>
    <div class="navbar-end" />
  </div>
</nav>
