<script>
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { items } from "./items";
  import { fade } from "svelte/transition";
  import MobileMenu from "./MobileMenu.svelte";

  const { page } = stores();
  let mobileMenu = false;
  const toggleMobileMenu = () => {
    mobileMenu = !mobileMenu;
  };
</script>

<style lang="scss">
  .navbar {
    box-shadow: var(--box-shadow);
  }
  .navbar-start {
    margin-left: auto;
  }
  .navbar-item {
    text-transform: uppercase;
    margin-left: 10px;
    margin-right: 10px;
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
      data-target="navbarMenu"
      on:click={toggleMobileMenu}>
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

{#if mobileMenu}
  <MobileMenu toggle={toggleMobileMenu} pathname={$page.path} />
{/if}
