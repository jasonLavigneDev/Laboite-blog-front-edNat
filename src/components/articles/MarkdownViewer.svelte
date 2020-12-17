<script>
  import "@toast-ui/editor/dist/toastui-editor-viewer.css";
  import { stores } from "@sapper/app";

  import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

  import chart from "./chartPlugin";
  import uml from "@toast-ui/editor-plugin-uml";
  import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
  import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
  import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
  import { onMount } from "svelte";
  const { session } = stores();

  export let content;
  onMount(async () => {
    let umlPlugin = uml;
    const chartOptions = {
      minWidth: 100,
      maxWidth: 800,
      minHeight: 100,
      maxHeight: 600,
    };
      const umlOptions = {
        rendererURL:
          $session.env.UML_SERVER || "https://www.plantuml.com/plantuml/png/",
      };
      umlPlugin = [uml, umlOptions];
    new Viewer({
      el: document.querySelector("#viewer"),
      initialValue: content,
      height: "600px",
      plugins: [
        [chart, chartOptions],
        codeSyntaxHighlight,
        colorSyntax,
        tableMergedCell,
        umlPlugin,
      ],
    });
  });
</script>

<div id="viewer" />
