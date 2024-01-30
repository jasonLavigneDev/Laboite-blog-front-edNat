import {fetchData, getTags} from '../../utils/api/methods';

export async function load({url, parent, fetch}) {
  const path = url.pathname;
  const currentPage = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const tags = url.searchParams.get('tags') || '';
  const query = {currentPage, search, tags};
  const isResearchLink = !!tags || !!search;
  const request =
    !!tags || !!search
      ? {
          path,
          query: {search, tags},
          type: 'articles',
        }
      : null;
  const limit = 10;
  const fields = {content: false, _id: false, updatedAt: false};
  const searchFields = ['description', 'title', 'slug', 'tags'];
  const order = 'createdAt DESC';
  const apiurl = 'articles';
  const where = tags
    ? {
        draft: {neq: true},
        and: tags.split(',').map(t => ({tags: {inq: [t]}})),
      }
    : {draft: {neq: true}};
  const include = [
    {
      relation: 'user',
    },
  ];
  const {env} = await parent();

  const {items, total} = await fetchData({
    host: env.API_HOST,
    fetcher: fetch,
    limit,
    order,
    fields,
    searchFields,
    apiurl,
    value: search,
    include,
    where,
    skip: currentPage === 1 ? 0 : (Number(currentPage) - 1) * limit,
  });

  const tagsList = await getTags(env.API_HOST, fetch);
  return {
    articles: items,
    total,
    limit,
    currentPage: Number(currentPage),
    query,
    path,
    tagsList,
    isResearchLink,
    request,
  };
}
