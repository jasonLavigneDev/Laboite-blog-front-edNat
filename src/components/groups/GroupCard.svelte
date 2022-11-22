<script>
  import {_} from 'svelte-i18n';
  import {fetchData} from '../../utils/api/methods';
  import Avatar from '../authors/Avatar.svelte';
  import BigLink from '../common/BigLink.svelte';
  import {onMount} from 'svelte';
  import {session} from '$app/stores';
  export let group;

  let total = 0;

  onMount(async () => {
    const results = await fetchData({
      host: $session.env.API_HOST,
      order: 'createdAt DESC',
      fields: {content: false},
      count: true,
      countOnly: true,
      apiurl: 'articles',
      where: {'groups._id': {eq: group._id}},
    });
    total = results.total;
  });
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <Avatar firstName={group.name} avatar={group.avatar} />
      </div>
      <div class="media-content">
        <p class="title is-4">{group.name}</p>
      </div>
    </div>
  </div>
  <div class="content">
    <p class="title is-6">
      {$_('components.AuthorIdCard.articles')}:
      {total}
    </p>
    <BigLink
      link="/groups/{group.slug}"
      text={$_('components.AuthorIdCard.all_articles')}
    />
  </div>
</div>

<style>
  .card {
    margin-bottom: var(--space-between);
  }
  .title {
    color: var(--primary);
  }
  .content {
    background-color: var(--primary_fade);
    padding: 1.5rem;
  }
</style>
