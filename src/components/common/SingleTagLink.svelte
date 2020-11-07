<script>
  export let tag;
</script>

<style lang="scss">
  .tag {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: var(--secondary) !important;
    }
  }
</style>

<span class="tag is-medium is-link is-light">{tag}</span>
