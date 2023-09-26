<script>
  import Matomo, {push} from './Matomo.svelte';
  import {browser} from '$app/environment';
  import {page} from '$app/stores';

  export let url;
  export let siteId = '1';
  let referrer = null;

  const trackPageView = path => {
    if (referrer) push(['setReferrerUrl', referrer]);
    referrer = path;
    push(['setCustomUrl', path]);
    push(['setDocumentTitle', document.title]);
    push(['trackPageView']);
  };

  // call TrackPageView on page change
  $: browser && trackPageView($page.url.pathname);
</script>

<Matomo {url} {siteId} />
