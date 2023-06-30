<script>
  import Avatar from '../authors/Avatar.svelte';
  import {onMount} from 'svelte';
  import fetcher from 'isomorphic-fetch';
  import {_} from 'svelte-i18n';
  import {page} from '$app/stores';

  export let academy = {};
  let total;
  let loading = true;

  onMount(async () => {
    const where = {structure: academy._id};

    const response = await fetcher(
      `${$page.data.env.API_HOST}/articles/count?where=${JSON.stringify(
        where,
      )}`,
    );
    const {count} = await response.json();

    loading = false;
    total = count;
  });
</script>

<a rel="prefetch" href="/academies/{academy._id}">
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <Avatar firstName={academy.name} avatar={academy.logo} />
        </div>
        <div class="media-content">
          <p class="title is-5">{academy.name}</p>
          <p class="subtitle is-6">
            {$_('components.SingleAcademy.articles')}:
            {loading ? $_('loading') : total}
          </p>
        </div>
      </div>
    </div>
  </div>
</a>
