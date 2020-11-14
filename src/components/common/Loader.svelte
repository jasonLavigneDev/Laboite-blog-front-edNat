<script>
  import loader from "../common/loader2.svg";
  import { fade } from "svelte/transition";
  export let message;
</script>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 10;
  }
  .loader-wrapper {
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

<div class="wrapper" transition:fade>
  <div class="loader-wrapper">
    <img src={loader} class="loader-svg" alt="loader" />
    {#if message}<span class="subtitle">{message}</span>{/if}
  </div>
</div>
