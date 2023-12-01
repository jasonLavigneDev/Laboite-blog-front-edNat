import {fetchData} from '../../utils/api/methods';

export async function load({url, parent, fetch}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const query = {page, search};
  const isResearchLink = !!search;
  const request = !!search
    ? {
        path,
        query: {search},
        type: 'groups',
      }
    : null;

  const limit = 9;
  const fields = {};
  const searchFields = ['name'];
  const order = 'createdAt DESC';
  const apiurl = 'groups';
  const where = {articles: {eq: true}};
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
    where,
    skip: page === 1 ? 0 : (Number(page) - 1) * limit,
  });
  return {
    groups: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    isResearchLink,
    request,
  };
}
