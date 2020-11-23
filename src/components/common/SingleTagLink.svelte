<script>
  export let tag;
</script>

<style lang="scss">
  .tag {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background-color: var(--secondary);
    color: var(--tertiary);
    border-radius: 20px;
    &:hover {
      color: var(--lightgrey2) !important;
    }
  }
</style>

<span class="tag is-medium">{tag}</span>
