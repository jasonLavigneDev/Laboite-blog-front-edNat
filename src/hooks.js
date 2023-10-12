/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  const {API_HOST, LABOITE_HOST, UML_SERVER, MATOMO_URL, MATOMO_SITEID} =
    process.env;
  return {
    env: {API_HOST, LABOITE_HOST, UML_SERVER, MATOMO_URL, MATOMO_SITEID},
  };
}
