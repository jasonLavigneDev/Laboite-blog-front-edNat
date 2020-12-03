<script>
  import "@toast-ui/editor/dist/toastui-editor-viewer.css";

  import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

  import chart from "./chartPlugin";
  import uml from "@toast-ui/editor-plugin-uml";
  import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
  import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
  import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
  import { onMount } from "svelte";

  export let content;
  onMount(async () => {
    new Viewer({
      el: document.querySelector("#viewer"),
      height: "600px",
      initialValue: content,
      plugins: [chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml],
    });
  });
</script>

<div id="viewer" />
