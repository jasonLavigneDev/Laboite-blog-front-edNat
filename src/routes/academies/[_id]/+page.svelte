<script>
  import LastPublished from '../../../components/academies/LastPublished.svelte';
  import Authors from '../../../components/academies/Authors.svelte';
  import BackButton from '../../../components/navigation/BackButton.svelte';
  import PageTransition from '../../../components/common/PageTransition.svelte';
  import SingleFavoriteButton from '../../../components/common/SingleFavoriteButton.svelte';
  import {onMount} from 'svelte';
  import {lastAcademies} from '../../../utils/functions/stores';
  import {_} from 'svelte-i18n';

  export let data;

  onMount(() => {
    lastAcademies.update(list => {
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
  <title>{$_('title')} | {data.academy.name}</title>
</svelte:head>

<PageTransition>
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <BackButton previousLocation="/academies" useHistory={true} />
    </div>
    <!-- <div class="column is-half favorites">
      <div class="box-transparent">
        <SingleFavoriteButton type="academy" itemId={academy._id} />
      </div>
    </div> -->
  </div>
  <div class="container box-transparent">
    <h1 class="title is-2">{data.academy.name}</h1>
  </div>
  <LastPublished articles={data.articles} academy={data.academy} />
  <Authors authors={data.authors} academy={data.academy} />
</PageTransition>

<style>
  .favorites {
    display: flex;
    justify-content: flex-end;
  }
</style>
