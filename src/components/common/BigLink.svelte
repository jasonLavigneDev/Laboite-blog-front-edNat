<script>
  export let link, text;
</script>

<style>
  a {
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }
  a:hover {
      color: var(--primary) !important;
      background-color: var(--tertiary) !important;
    }
</style>

<a class="button is-primary" rel="prefetch" href={link}> {text}</a>
