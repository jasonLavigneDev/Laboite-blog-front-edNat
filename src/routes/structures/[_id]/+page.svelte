<script>
  import LastPublished from '../../../components/structures/LastPublished.svelte';
  import Authors from '../../../components/structures/Authors.svelte';
  import BackButton from '../../../components/navigation/BackButton.svelte';
  import PageTransition from '../../../components/common/PageTransition.svelte';
  import SingleFavoriteButton from '../../../components/common/SingleFavoriteButton.svelte';
  import {onMount} from 'svelte';
  import {lastStructures} from '../../../utils/functions/stores';
  import {_} from 'svelte-i18n';

  export let data;

  onMount(() => {
    lastStructures.update(list => {
      if (!list.find(i => i === data.params._id)) {
        list.unshift(data.params._id);
      }
      if (list.length > 4) {
        list.length = 4;
      }
      return list;
    });
  });
</script>

<svelte:head>
  <title>{$_('title')} | {data.structure.name}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/structures" useHistory={true} />
    </div>
    <!-- <div class="column is-half favorites">
      <div class="box-transparent">
        <SingleFavoriteButton type="structure" itemId={structure._id} />
      </div>
    </div> -->
  </div>
  <div class="container box-transparent">
    <h1 class="title is-2">{data.structure.name}</h1>
  </div>
  <LastPublished articles={data.articles} structure={data.structure} />
  <Authors authors={data.authors} structure={data.structure} />
</PageTransition>

<style>
  .favorites {
    display: flex;
    justify-content: flex-end;
  }
</style>
