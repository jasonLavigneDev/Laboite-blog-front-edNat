<script>
  import Avatar from '../authors/Avatar.svelte';
  import {onMount} from 'svelte';
  import {_} from 'svelte-i18n';
  import {page} from '$app/stores';

  export let structure = {};
  let total;
  let loading = true;

  onMount(async () => {
    const where = {structure: structure._id};

    const response = await fetch(
      `${$page.data.env.API_HOST}/articles/count?where=${JSON.stringify(
        where,
      )}`,
    );
    const {count} = await response.json();

    loading = false;
    total = count;
  });
</script>

<a href="/structures/{structure._id}">
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <Avatar firstName={structure.name} avatar={structure.logo} />
        </div>
        <div class="media-content">
          <p class="title is-5">{structure.name}</p>
          <p class="subtitle is-6">
            {$_('components.SingleStructure.articles')}:
            {loading ? $_('loading') : total}
          </p>
        </div>
      </div>
    </div>
  </div>
</a>
