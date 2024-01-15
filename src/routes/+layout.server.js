/** @type {import('./$types').LayoutServerLoad} */
import {redirect} from '@sveltejs/kit';

export async function load(args) {
  // redirect '/academies' to '/structures' for backward compatibility
  if (args.url.pathname.startsWith('/academies')) {
    throw redirect(307, args.url.pathname.replace('/academies', '/structures'));
  }
  // previously stored in session (deprecated)
  // https://github.com/sveltejs/kit/discussions/5883
  const {API_HOST, LABOITE_HOST, UML_SERVER, MATOMO_URL, MATOMO_SITEID} =
    process.env;
  return {
    env: {API_HOST, LABOITE_HOST, UML_SERVER, MATOMO_URL, MATOMO_SITEID},
  };
}
