<script>
  import { _ } from "svelte-i18n";
  import { goto } from "@sapper/app";
  import { toQuery } from "../../utils/functions/queryStringMaker";

  export let query = {};
  export let path;
  export let loading;
  let search = query.search || "";

  const urlMaker = (search) =>
    `${path}?${toQuery({
      ...query,
      page: 1,
      search,
    })}`;

  const submit = (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    goto(urlMaker(search));
  };

  const resetSearch = () => {
    search = "";
  };
</script>

<style>
  .button.is-secondary {
    background-color: var(--secondary);
  }
</style>

<form on:submit={submit}>
  <div class="field has-addons">
    <p class="control" class:is-loading={loading}>
      <input
        bind:value={search}
        class="input is-rounded"
        type="text"
        disabled={loading}
        placeholder={$_('components.SearchField.placeholder')} />
    </p>
    <div class="control">
      <a class="button is-primary" rel="prefetch" href={urlMaker(search)}>
        <i class="fas fa-search" />
      </a>
    </div>

    {#if search}
      <div class="control">
        <a
          class="button is-secondary"
          rel="prefetch"
          on:click={resetSearch}
          href={urlMaker()}>
          <i class="fa fa-times" />
        </a>
      </div>
    {/if}
  </div>
  <button class="hidden" type="submit" />
</form>
