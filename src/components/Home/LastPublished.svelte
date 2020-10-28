<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import { api } from "../../settings";
  import axios from "axios";
  import Loader from "../common/Loader.svelte";

  let articles = getArticles();

  async function getArticles() {
    const filters = {
      limit: 6,
      order: "createdAt DESC",
      fields: { content: false, _id: false, updatedAt: false },
    };
    return await axios.get(
      `${api.host}/articles?filter=${JSON.stringify(filters)}`
    );
  }
</script>

<section class="box">
  <div class="container">
    <h1 class="title">{$_('pages.home.last_title')}</h1>
    <h2 class="subtitle">{$_('pages.home.last_subtitle')}</h2>
  </div>
  <Divider />
  {#await articles}
    <Loader message={$_('loading')} />
  {:then { data }}
    {#each data as item}
      <div>{item.title}</div>
    {/each}
  {:catch error}
    error
  {/await}
</section>
