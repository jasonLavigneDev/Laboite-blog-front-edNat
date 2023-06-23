import fetcher from 'isomorphic-fetch';
import {fetchData, getTags} from '../../../../utils/api/methods';

export async function load({params, url, parent}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const tags = url.searchParams.get('tags') || '';
  const query = {page, search, tags};
  const {env} = await parent();
  const responseAcademy = await fetcher(
    `${env.API_HOST}/structures/${params._id}`,
  );
  const academy = await responseAcademy.json();
  const isResearchLink = !!tags || !!search;
  const request =
    !!tags || !!search
      ? {
          path,
          query: {search, tags},
          type: 'articles',
          academy,
        }
      : null;

  const limit = 10;
  const fields = {content: false, _id: false, updatedAt: false};
  const searchFields = ['description', 'title', 'slug', 'tags'];
  const order = 'createdAt DESC';
  const apiurl = 'articles';
  const where = tags
    ? {
        and: tags.split(',').map(t => ({tags: {inq: [t]}})),
        structure: academy._id,
        draft: {neq: true},
      }
    : {structure: academy._id, draft: {neq: true}};
  const include = [
    {
      relation: 'user',
    },
  ];

  const {items, total} = await fetchData({
    host: env.API_HOST,
    limit,
    order,
    fields,
    searchFields,
    apiurl,
    where,
    value: search,
    include,
    skip: page === 1 ? 0 : (Number(page) - 1) * limit,
  });
  const tagsList = await getTags(env.API_HOST);
  return {
    articles: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    academy,
    tagsList,
    isResearchLink,
    request,
  };
}
