<script>
  import loader from "../common/loader2.svg";
  export let message;
</script>

<style>
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
  .loader-svg {
    margin: auto;
  }
  .subtitle {
    text-transform: uppercase;
  }
</style>

<div>
  <img src={loader} class="loader-svg" alt="loader" />
  {#if message}<span class="subtitle">{message}</span>{/if}
</div>
