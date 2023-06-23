<script>
  import '@toast-ui/editor/dist/toastui-editor-viewer.css';
  import '@toast-ui/chart/dist/toastui-chart.css';
  import chart from '@toast-ui/editor-plugin-chart';
  import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

  // import chart from "./chartPlugin";
  import uml from '@toast-ui/editor-plugin-uml';
  import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
  import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
  import {onMount} from 'svelte';
  import {page} from '$app/stores';

  import {modifiedColorSyntax} from '../../utils/functions/modifiedPlugin';

  export let content;
  onMount(() => {
    let umlPlugin = uml;
    const chartOptions = {
      minWidth: 100,
      maxWidth: 800,
      minHeight: 100,
      maxHeight: 600,
    };
    const umlOptions = {
      rendererURL:
        $page.data.env.UML_SERVER || 'https://www.plantuml.com/plantuml/png/',
    };
    umlPlugin = [uml, umlOptions];
    new Viewer({
      el: document.querySelector('#viewer'),
      initialValue: content,
      height: '600px',
      plugins: [
        [chart, chartOptions],
        codeSyntaxHighlight,
        modifiedColorSyntax,
        tableMergedCell,
        umlPlugin,
      ],
    });
  });
</script>

<div id="viewer" />
