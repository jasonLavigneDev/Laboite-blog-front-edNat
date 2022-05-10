<script context="module">
  import fetcher from "isomorphic-fetch";
  import { fetchData } from "../../../utils/api/methods";

  export async function load({ params, session }) {

    const responseAcademy = await fetcher(
      `${session.env.API_HOST}/structures/${params._id}`
    );
    const academy = await responseAcademy.json();

    const { items: authors, response } = await fetchData({
      host: session.env.API_HOST,
      limit: 6,
      order: "articlesCount DESC",
      fields: {},
      count: false,
      apiurl: "authors",
      where: { articlesCount: { gt: 0 }, structure: academy._id },
    });
    const { items: articles } = await fetchData({
      host: session.env.API_HOST,
      limit: 4,
      order: "createdAt DESC",
      fields: { content: false },
      count: false,
      apiurl: "articles",
      where: { structure: academy._id, draft: { neq: true } },
      include: [
        {
          relation: "user",
          scope: {
            fields: {
              username: false,
              structure: false,
              articlesCount: false,
            },
          },
        },
      ],
    });

    return {
      status: response.status,
      props: {
        authors,
        articles,
        academy,
        params
      }
    }
  }
</script>

<script>
  import LastPublished from "../../../components/academies/LastPublished.svelte";
  import Authors from "../../../components/academies/Authors.svelte";
  import BackButton from "../../../components/navigation/BackButton.svelte";
  import PageTransition from "../../../components/common/PageTransition.svelte";
  import SingleFavoriteButton from "../../../components/common/SingleFavoriteButton.svelte";
  import { onMount } from "svelte";
  import { lastAcademies } from "../../../utils/functions/stores";
  import { _ } from "svelte-i18n";

  export let academy;
  export let articles;
  export let authors;
  export let params;

  onMount(() => {
    lastAcademies.update((list) => {
      if (!list.find((i) => i === params._id)) {
        list.unshift(params._id);
      }
      if (list.length > 4) {
        list.length = 4;
      }
      return list;
    });
  });
</script>

<svelte:head>
  <title>{$_("title")} | {academy.name}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/academies" useHistory={true} />
    </div>
    <div class="column is-half favorites">
      <div class="box-transparent">
        <SingleFavoriteButton type="academy" itemId={academy._id} />
      </div>
    </div>
  </div>
  <div class="container box-transparent">
    <h1 class="title is-2">{academy.name}</h1>
  </div>
  <LastPublished {articles} {academy} />
  <Authors {authors} {academy} />
</PageTransition>

<style>
  .favorites {
    display: flex;
    justify-content: flex-end;
  }
</style>
