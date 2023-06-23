import fetcher from 'isomorphic-fetch';

export async function load({params = {}, parent}) {
  const {env} = await parent();
  const responseArticle = await fetcher(
    `${env.API_HOST}/articles/${params.slug}`,
  );
  const article = await responseArticle.json();

  return {
    env,
    article,
    author: article && article.user,
  };
}
