import fetcher from 'isomorphic-fetch';
import {fetchData} from '../../../utils/api/methods';

export async function load({params, parent}) {
  const {env} = await parent();
  const responseAcademy = await fetcher(
    `${env.API_HOST}/structures/${params._id}`,
  );
  const academy = await responseAcademy.json();

  const {items: authors, response} = await fetchData({
    host: env.API_HOST,
    limit: 6,
    order: 'articlesCount DESC',
    fields: {},
    count: false,
    apiurl: 'authors',
    where: {articlesCount: {gt: 0}, structure: academy._id},
  });
  const {items: articles} = await fetchData({
    host: env.API_HOST,
    limit: 4,
    order: 'createdAt DESC',
    fields: {content: false},
    count: false,
    apiurl: 'articles',
    where: {structure: academy._id, draft: {neq: true}},
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
    academy,
    params,
  };
}
