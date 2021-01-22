<script context="module">
  import fetcher from 'isomorphic-fetch';

  export async function preload({ params }, { env }) {
    const responseArticle = await fetcher(`${env.API_HOST}/articles/${params.slug}`);
    const article = await responseArticle.json();

    return {
      article,
      author: article && article.user,
      env,
    };
  }
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import AuthorIdCard from '../../components/authors/AuthorIdCard.svelte';
  import PageTransition from '../../components/common/PageTransition.svelte';
  import BackButton from '../../components/navigation/BackButton.svelte';
  import SingleTag from '../../components/common/SingleTag.svelte';
  import FavoritesButton from '../../components/common/FavoritesButton.svelte';
  import { articlesRead } from '../../utils/functions/stores';
  import NoResults from '../../components/common/NoResults.svelte';
  let MarkdownViewer;
  let landscape = false;

  export let article;
  export let author;
  export let env;

  onMount(async () => {
    if (article.markdown) {
      const module = await import('../../components/articles/MarkdownViewer.svelte');
      MarkdownViewer = module.default;
    }
    if (article && article._id && !$articlesRead.find((i) => i === article._id)) {
      await fetcher(`${env.API_HOST}/articles/${article._id}/read`, {
        method: 'PATCH',
      });
      articlesRead.update((list) => {
        if (!list.find((i) => i === article._id)) {
          list.unshift(article._id);
        }
        return list;
      });
    }
  });

  const replacewithLink = (docNode, tagName, replaceParent = false) => {
    // replace audio / video / ... with an url (using src attribute)
    // replace parent : replaces the parent element instead of the element itself
    const elts = docNode.getElementsByTagName(tagName);
    Object.keys(elts).forEach((index) => {
      const element = elts[index];
      const newLink = document.createElement('a');
      newLink.href = element.src;
      newLink.textContent = element.src.split('/').slice(-1).pop();
      if (replaceParent) {
        // replace the parent div (embedded player)
        element.parentNode.replaceWith(newLink);
      } else {
        element.replaceWith(newLink);
      }
    });
  };

  async function handleExport() {
    // Export to PDF. Currently exported as images
    // hack, import on execution to avoid errors on server side (where window is not defined)
    const html2pdf = await import('html2pdf.js');
    const divContents = article.markdown ? document.getElementById('viewer').innerHTML : article.content;
    const node = document.createElement('div');
    node.innerHTML = divContents;
    replacewithLink(node, 'video', true);
    replacewithLink(node, 'audio', true);
    const opt = {
      filename: `article_${article.slug}.pdf`,
      enableLinks: true,
      margin: 4,
      image: { type: 'jpeg' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: {
        // https://html2canvas.hertzen.com/configuration
        useCORS: true,
      },
      jspdf: {
        // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
        unit: 'mm',
        format: 'a4',
        orientation: landscape ? 'landscape' : 'portrait',
      },
    };
    // html2pdf.default(node);
    html2pdf.default().set(opt).from(node, 'element').save();
  }

  async function handleExport2() {
    // export with html-to-pdfmake. Produces clean PDF files
    // does not work yet because images need to be included as base64 in src attribute
    // still need to find a way to
    const convertHTML = (content) => {
      // convert image src to base64, video and audio to link
      const node = document.createElement('div');
      node.innerHTML = content;

      const getBase64Images = () => {
        // not working yet ...
        // https://stackoverflow.com/questions/934012/get-image-data-url-in-javascript/42916772#42916772
        function getDataUrl(img) {
          // Create canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          // Set width and height
          canvas.width = img.width;
          canvas.height = img.height;
          // Draw the image
          ctx.drawImage(img, 0, 0);
          return canvas.toDataURL('image/jpeg');
        }
        const elts = node.getElementsByTagName('img');
        Object.keys(elts).forEach((index) => {
          const element = elts[index];
          element.addEventListener('load', function (event) {
            const dataUrl = getDataUrl(event.currentTarget);
            console.log(dataUrl);
          });
        });
      };
      // getBase64Images();
      replacewithLink(node, 'img');
      replacewithLink(node, 'video', true);
      replacewithLink(node, 'audio', true);
      return node.innerHTML;
    };
    let divContents = convertHTML(article.markdown ? document.getElementById('viewer').innerHTML : article.content);
    var val = htmlToPdfmake(divContents);
    var dataDefinition = { content: val, pageOrientation: landscape ? 'landscape' : 'portrait', pageSize: 'A4' };
    pdfMake.createPdf(dataDefinition).download();
  }
</script>

<svelte:head>
  <!--<script defer src="https://cdn.jsdelivr.net/npm/pdfmake@latest/build/pdfmake.min.js"></script><script
    defer
    src="https://cdn.jsdelivr.net/npm/pdfmake@latest/build/vfs_fonts.min.js" ✂prettier:content✂="" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script><script
    defer
    src="https://cdn.jsdelivr.net/npm/html-to-pdfmake/browser.js" ✂prettier:content✂="" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>-->
  <title>
    {$_('title')}
    |
    {article ? article.title : $_('pages.article.no_article_title')}
  </title>
</svelte:head>

<PageTransition>
  {#if !article}
    <NoResults title={$_('pages.article.no_article_title')} subtitle={$_('pages.article.no_article_subtitle')} />
  {:else}
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-half">
        <BackButton previousLocation="/articles" useHistory={true} />
      </div>
      <div class="column is-half fav-button-wrap">
        <div class="box-transparent">
          <FavoritesButton type="article" itemId={article._id} />
        </div>
      </div>
    </div>
    <div class="columns is-gapless is-multiline">
      <div class="column is-three-quarters-widescreen is-full-desktop is-full-tablet">
        <section class="box-transparent">
          <div class="title is-4">{article.title}</div>

          <div class="content">
            {#if article.markdown}
              <svelte:component this={MarkdownViewer} content={article.content} />
            {:else}
              {@html article.content}
            {/if}
          </div>
        </section>
      </div>
      <div class="column is-one-quarter-widescreen is-full-desktop is-full-tablet">
        <div class="box-transparent">
          <AuthorIdCard {author} />
          <div class="box">
            <div class="title is-5">{$_('pages.article.tags')}</div>
            <div class="tags">
              {#each article.tags as tag}
                <SingleTag {tag} />
              {/each}
            </div>
          </div>
          <div class="box">
            <button class="button is-primary" on:click={handleExport}>
              <span class="icon"><i class="far fa-file-pdf" /></span>
              <span>{$_('pages.article.exportPDF')}</span>
            </button>
            <label class="checkbox check_landscape">
              <input type="checkbox" bind:checked={landscape} />
              {$_('pages.article.exportLandscape')}
            </label>
          </div>
          <div class="box last-box">
            <div class="title is-5">
              {$_('pages.article.read_times')}
              :
              {article.visits}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</PageTransition>

<style lang="scss">
  .content {
    text-align: justify;
  }
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
  .last-box {
    margin-bottom: var(--space-between);
  }
  .check_landscape {
    margin-top: 5px;
  }
</style>
