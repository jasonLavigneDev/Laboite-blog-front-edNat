/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  const { API_HOST, LABOITE_HOST, UML_SERVER } = process.env;
  return {
    env: { API_HOST, LABOITE_HOST, UML_SERVER },
  };
}
