/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import adapter from '@sveltejs/adapter-node';

const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
  compilerOptions: {},

  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],
  preprocess: preprocess({
    transformers: {
      scss: {
        includePaths: ['node_modules', 'src'],
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: 'last 2 versions',
          }),
        ],
      },
    },
  }),

  package: {
    dir: 'package',
    emitTypes: true,
    // excludes all .d.ts and files starting with _ as the name
    exports: filepath => !/^_|\/_|\.d\.ts$/.test(filepath),
    files: () => true,
  },

  kit: {
    adapter: adapter(),
    appDir: '_app',
    csp: {
      mode: 'auto',
      directives: {
        'default-src': undefined,
        // ...
      },
    },
    moduleExtensions: ['.js', '.ts'],
    files: {
      assets: 'static',
      hooks: {client: 'src/hooks.js', server: 'src/hooks.js'},
      lib: 'src/lib',
      params: 'src/params',
      routes: 'src/routes',
      serviceWorker: 'src/service-worker',
      appTemplate: 'src/app.html',
    },
    inlineStyleThreshold: 0,
    outDir: '.svelte-kit',
    paths: {
      assets: '',
      base: '',
    },
    prerender: {
      concurrency: 1,
      crawl: true,
      entries: ['*'],
      handleHttpError: 'fail',
    },
    serviceWorker: {
      register: true,
      files: filepath => !/\.DS_Store/.test(filepath),
    },
    version: {
      name: Date.now().toString(),
      pollInterval: 0,
    },
  },

  // SvelteKit uses vite-plugin-svelte. Its options can be provided directly here.
  // See the available options at https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md

  // options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)
  preprocess: null,
};

export default config;
