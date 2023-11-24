export async function load({params = {}, parent}) {
  const {env} = await parent();
  const responseArticle = await fetch(
    `${env.API_HOST}/articles/${params.slug}`,
  );
  const article = await responseArticle.json();

  return {
    env,
    article,
    author: article && article.user,
  };
}
