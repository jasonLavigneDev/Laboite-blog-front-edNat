import {sveltekit} from '@sveltejs/kit/vite';
import {version} from './package.json';

const config = {
  plugins: [sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
};

export default config;
