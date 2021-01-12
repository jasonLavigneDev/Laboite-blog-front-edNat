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
  let toastRef;

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

  const handleExport = () => {
    // Export to PDF. Currently exported as images
    // try to use jsPDF directly ?
    // https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript

    // hack, import on execution to avoid errors on server side (where window is not defined)
    const html2pdf = require('html2pdf.js');
    console.log('ToastRef : ', toastRef);
    const divContents = article.markdown ? toastRef.current.rootEl.current.innerHTML : article.content;
    const opt = {
      filename: `article_${article.slug}.pdf`,
      enableLinks: true,
      margin: 4,
      image: { type: 'jpeg', quality: 0.98 },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: {
        useCORS: true,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait' },
    };
    html2pdf().set(opt).from(divContents).save();
  };
</script>

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
</style>

<svelte:head>
  <title>{$_('title')} | {article ? article.title : $_('pages.article.no_article_title')}</title>
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
              <svelte:component this={MarkdownViewer} bind:this={toastRef} content={article.content} />
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
            <button class="button" on:click={handleExport}>
              <span class="icon"> <i class="far fa-style-pdf" /> </span>
              <span>{$_('exportPDF')}</span>
            </button>
            <!-- <div name="export">
                <Button
                  startIcon={<PictureAsPdfIcon />}
                  className={classes.buttonText}
                  color="primary"
                  variant="contained"
                  onClick={handleExport}
                >
                  {i18n.__('pages.PublicArticleDetailsPage.exportPDF')}
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      name="checkLandscape"
                      inputProps={{ 'aria-label': 'export to landscape' }}
                      checked={landscape}
                      onChange={() => setLandscape(!landscape)}
                      value="lanscape"
                    />
                  }
                  label={
                    landscape
                      ? i18n.__('pages.PublicArticleDetailsPage.exportLandscape')
                      : i18n.__('pages.PublicArticleDetailsPage.exportPortrait')
                  }
                />
              </div> -->
          </div>
          <div class="box last-box">
            <div class="title is-5">{$_('pages.article.read_times')} : {article.visits}</div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</PageTransition>
