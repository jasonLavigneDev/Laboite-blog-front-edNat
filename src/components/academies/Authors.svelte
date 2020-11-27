<script>
  import { _ } from "svelte-i18n";
  import Divider from "../common/Divider.svelte";
  import BigLink from "../common/BigLink.svelte";
  import AuthorIdCard from "../authors/AuthorIdCard.svelte";

  export let authors;
  export let academy;
</script>

<style lang="scss">
  .box-transparent {
    margin-bottom: var(--space-between);
    min-height: 450px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>

<section class="box-transparent">
  <div class="container">
    <div>
      <h1 class="title">{$_('pages.academy.authors_title')}</h1>
      <h2 class="subtitle">{$_('pages.academy.authors_subtitle')}</h2>
    </div>
    <BigLink
      link="/academies/{academy.slug}/authors"
      text={$_('pages.academy.all_authors')} />
  </div>
  <Divider />
  <div class="columns is-multiline">
    {#each authors as author}
      <div class="column is-one-third is-full-mobile">
        <AuthorIdCard {author} />
      </div>
    {/each}
  </div>
</section>
