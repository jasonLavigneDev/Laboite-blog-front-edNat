import {fetchData} from '../../../utils/api/methods';

export async function load({params, parent, fetch}) {
  const {env} = await parent();
  const responseStructure = await fetch(
    `${env.API_HOST}/structures/${params._id}`,
  );
  const structure = await responseStructure.json();

  const {items: authors, response} = await fetchData({
    host: env.API_HOST,
    fetcher: fetch,
    limit: 6,
    order: 'articlesCount DESC',
    fields: {},
    count: false,
    apiurl: 'authors',
    where: {articlesCount: {gt: 0}, structure: structure._id},
  });
  const {items: articles} = await fetchData({
    host: env.API_HOST,
    fetcher: fetch,
    limit: 4,
    order: 'createdAt DESC',
    fields: {content: false},
    count: false,
    apiurl: 'articles',
    where: {structure: structure._id, draft: {neq: true}},
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
    authors,
    articles,
    structure,
    params,
  };
}
