<script>
  import { _ } from "svelte-i18n";
  import { getStores } from "$app/stores";
  import { fade } from "svelte/transition";
  import { items } from "./items";
  import MobileMenu from "./MobileMenu.svelte";
  import LanguageSwitcher from "../common/LanguageSwitcher.svelte";

  const { page } = getStores();
  let mobileMenu = false;

  const toggleMobileMenu = () => {
    mobileMenu = !mobileMenu;
  };
</script>

<style >
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

  }
  .navbar-item.is-active {
      color: var(--primary);
      
    }
.navbar-item.is-active .indicator {
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
  .navbar-logo {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    width: 220px;
  }
</style>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-logo" href="/" rel="prefetch">
      <img src="./Leblog.png" alt="LaBoite - Blog" />
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
          class:is-active={`/${$page.url.pathname.split('/')[1]}` === path}
          class="navbar-item"
          href={path}>
          {$_(text)}
          {#if `/${$page.url.pathname.split('/')[1]}` === path}
            <div transition:fade class="indicator" />
          {/if}
        </a>
      {/each}
    </div>
    <div class="navbar-end">
      <LanguageSwitcher />
    </div>
  </div>
</nav>

{#if mobileMenu}
  <MobileMenu toggle={toggleMobileMenu} pathname={$page.url.pathname} />
{/if}
