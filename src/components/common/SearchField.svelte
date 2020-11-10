<script>
  import { _ } from "svelte-i18n";
  import axios from "axios";
  import { api } from "../../settings";
  export let apiurl,
    where = {},
    order,
    limit = 10,
    fields = {},
    handleUpdate,
    searchFields = [];

  let value,
    loading = false;

  const submit = (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    handleSearch();
  };
  const resetSearch = () => {
    value = "";
    handleSearch();
  };

  const handleSearch = async () => {
    const whereQuery = { ...where };
    if (value) {
      whereQuery.or = searchFields.map((field) => ({
        [field]: { like: `.*${value}.*`, options: "i" },
      }));
    }
    const queryFilters = {
      limit,
      order,
      where: whereQuery,
      //   fields: { content: false, _id: false, updatedAt: false },
    };
    loading = true;
    const response = await axios.get(
      `${api.host}/${apiurl}?filter=${JSON.stringify(queryFilters)}`
    );
    loading = false;
    handleUpdate(response.data);
  };
</script>

<form on:submit={submit}>
  <div class="field has-addons">
    <p class="control" class:is-loading={loading}>
      <input
        bind:value
        class="input is-rounded"
        type="text"
        disabled={loading}
        placeholder={$_('components.SearchField.placeholder')} />
    </p>
    <div class="control">
      <a class="button is-info" on:click={handleSearch}>
        <i class="fas fa-search" />
      </a>
    </div>

    {#if value}
      <div class="control">
        <a class="button is-warning" on:click={resetSearch}>
          <i class="fa fa-times" />
        </a>
      </div>
    {/if}
  </div>
  <button class="hidden" type="submit" />
</form>
