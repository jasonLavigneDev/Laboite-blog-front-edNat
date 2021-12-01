<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { footer } from "./items";

  const { page, session } = stores();
  const settings = AppSettings.findOne(
    { _id: "settings" },
    { fields: AppSettings.links }
  );
</script>

<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      {#each footer as { path, text }}
        <a
          class:is-active={$page.path === path}
          class="navbar-item"
          target="_blank"
          href="{$session.env.LABOITE_HOST}{path}"
        >
          {$_(`links.${text}`)}
        </a>
      {/each}
    </div>
    <div class="navbar-end" />
  </div>
</nav>

<style lang="scss">
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
    &.is-active {
      color: var(--tertiary);
    }
  }
</style>
