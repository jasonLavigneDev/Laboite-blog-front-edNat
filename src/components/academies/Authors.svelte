<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import SingleAuthorBlock from "../authors/SingleAuthorBlock.svelte";
  import BigLink from "../common/BigLink.svelte";

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
    <BigLink
      link="/academies/{academy.slug}/authors"
      text={$_('pages.academy.all_authors')} />
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each authors as author}
      <SingleAuthorBlock {author} />
    {/each}
  </div>
</section>
