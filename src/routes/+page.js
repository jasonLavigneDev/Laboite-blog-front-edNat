import {fetchData} from '../utils/api/methods';

export async function load({parent}) {
  const {env} = await parent();
  const {items: articles, response} = await fetchData({
    host: env.API_HOST,
    limit: 4,
    order: 'createdAt DESC',
    fields: {content: false},
    count: false,
    apiurl: 'articles',
    where: {draft: {neq: true}},
    include: [
      {
        relation: 'user',
        scope: {
          fields: {
            username: false,
            structure: false,
            articlesCount: false,
          },
        },
      },
    ],
  });

  return {
    status: response.status,
    articles,
  };
}
