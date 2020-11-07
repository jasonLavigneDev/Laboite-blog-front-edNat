<script>
  export let link, text;
</script>

<style lang="scss">
  a {
    font-weight: bold;
    font-family: "WorkSansBold" !important;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: var(--secondary);
    }
  }
</style>

<a rel="prefetch" href={link}> {text}</a>
