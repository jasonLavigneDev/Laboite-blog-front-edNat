<script lang="ts">
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { items } from "./items";
  import { fade } from "svelte/transition";

  const { page } = stores();
</script>

<style lang="scss">
  .navbar {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
      0px 2px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  }
  .navbar-start {
    margin-left: auto;
  }
  .navbar-item {
    text-transform: uppercase;
    &.is-active {
      color: var(--primary);
      .indicator {
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: var(--secondary);
        bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        left: 0;
        right: 0;
      }
    }
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
      aria-expanded="false"
      data-target="navbarMenu">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>
  <div id="navbarMenu" class="navbar-menu">
    <div class="navbar-start">
      {#each items as { path, text }}
        <a
          rel="prefetch"
          class:is-active={$page.path === path}
          class="navbar-item"
          href={path}>
          {$_(text)}
          {#if $page.path === path}
            <div transition:fade class="indicator" />
          {/if}
        </a>
      {/each}
    </div>
    <div class="navbar-end" />
  </div>
</nav>
