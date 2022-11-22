<script>
  import fetcher from "isomorphic-fetch";
  import { session } from "$app/stores";

  import { _ } from "svelte-i18n";
  import BigLink from "../common/BigLink.svelte";
  import Avatar from "./Avatar.svelte";
  export let author;

  let academy = {};
  $: fetchAcademy(author);

  const fetchAcademy = async currentAuthor => {
    if (currentAuthor?.structure) {
      const responseAcademy = await fetcher(
        `${$session.env.API_HOST}/structures/${currentAuthor.structure}`
      );
      academy = await responseAcademy.json();
    }
  };
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <Avatar
          firstName={author?.firstName || "?"}
          avatar={author?.avatar || ""}
        />
      </div>
      <div class="media-content">
        <p class="title is-4">
          {author?.firstName || $_("components.AuthorIdCard.unknownFirstname")}
          {author?.lastName || $_("components.AuthorIdCard.unknownLastname")}
        </p>
        <p class="subtitle is-6">{academy.name || ""}</p>
      </div>
    </div>
  </div>
  {#if author}
    <div class="content">
      <p class="title is-6">
        {$_("components.AuthorIdCard.articles")}:
        {author.articlesCount}
      </p>
      <BigLink
        link="/authors/{author._id}"
        text={$_("components.AuthorIdCard.all_articles")}
      />
    </div>
  {/if}
</div>

<style>
  .card {
    margin-bottom: var(--space-between);
  }
  .title,
  .subtitle {
    color: var(--primary);
  }
  .subtitle {
    margin-bottom: 0;
  }
  .content {
    background-color: var(--primary_fade);
    padding: 1.5rem;
  }
</style>
