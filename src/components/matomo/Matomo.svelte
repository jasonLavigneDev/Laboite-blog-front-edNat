<script context="module">
  import {browser} from '$app/environment';

  export const push = args => {
    if (!browser) return;
    if (!('_paq' in window)) window._paq = [];
    window._paq.push(args);
  };
</script>

<script>
  import {onMount} from 'svelte';

  export let url;
  export let siteId = '1';

  // see https://developer.matomo.org/guides/spa-tracking
  push(['setSiteId', siteId]);
  push(['setTrackerUrl', url + '/matomo.php']);
  push(['disableCookies']);

  let initscript = false;
  onMount(() => (initscript = true));
</script>

<svelte:head>
  {#if initscript}
    <script defer async src={url + '/matomo.js'}></script>
  {/if}
</svelte:head>
