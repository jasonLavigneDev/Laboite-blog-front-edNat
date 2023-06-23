/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  // previously stored in session (deprecated)
  // https://github.com/sveltejs/kit/discussions/5883
  const {API_HOST, LABOITE_HOST, UML_SERVER} = process.env;
  return {
    env: {API_HOST, LABOITE_HOST, UML_SERVER},
  };
}
