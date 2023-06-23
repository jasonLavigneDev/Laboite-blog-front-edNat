import {sveltekit} from '@sveltejs/kit/vite';

const config = {
  plugins: [sveltekit()],
  define: {
    // XXX FIXME: get version from package.json
    __APP_VERSION__: JSON.stringify('1.0'),
  },
};

export default config;
