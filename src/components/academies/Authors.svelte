<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import SingleAuthorBlock from "../authors/SingleAuthorBlock.svelte";

  export let authors;
  export let academy;
</script>

<style lang="scss">
  .box {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
</style>

<section class="box">
  <div class="container">
    <h1 class="title">{$_('pages.academy.authors_title')}</h1>
    <h2 class="subtitle">{$_('pages.academy.authors_subtitle')}</h2>
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each authors as author}
      <SingleAuthorBlock {author} />
    {/each}
  </div>
</section>
