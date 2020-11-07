<script>
  import { _ } from "svelte-i18n";
  import axios from "axios";
  import { stores } from "@sapper/app";

  import { api } from "../../settings";
  import { footer } from "./items";

  let links = getLinks();

  //TODO: filter the content fields or remove this query and use static data

  async function getLinks() {
    const filters = {
      fields: {},
    };
    return await axios.get(
      `${api.host}/legal-texts?filter=${JSON.stringify(filters)}`
    );
  }

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
      {#await links}
        <!-- promise is pending -->
      {:then { data }}
        {#each footer as { path, text }}
          <a
            rel="prefetch"
            class:is-active={$page.path === path}
            class="navbar-item"
            target={data[text] && data[text].external ? '_blank' : ''}
            href={data[text] && data[text].external ? data[text].link : path}>
            {$_(`links.${text}`)}
          </a>
        {/each}
      {/await}
    </div>
    <div class="navbar-end" />
  </div>
</nav>
