import {fetchData} from '../../utils/api/methods';

export async function load({url, parent}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const {env} = await parent();

  const query = {page, search};
  const isResearchLink = !!search;
  const request = !!search
    ? {
        path,
        query: {search},
        type: 'authors',
      }
    : null;

  const limit = 9;
  const fields = {};
  const searchFields = ['firstName', 'lastName', 'structure'];
  const order = 'articlesCount DESC';
  const apiurl = 'authors';
  const where = {articlesCount: {gt: 0}};

  const {items, total} = await fetchData({
    host: env.API_HOST,
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
    authors: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    isResearchLink,
    request,
  };
}
