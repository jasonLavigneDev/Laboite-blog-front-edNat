import fetcher from 'isomorphic-fetch';
import {fetchData} from '../../../../utils/api/methods';

export async function load({params, url, parent}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const query = {page, search};
  const {env} = await parent();
  const responseAcademy = await fetcher(
    `${env.API_HOST}/structures/${params._id}`,
  );
  const academy = await responseAcademy.json();
  const isResearchLink = !!search;
  const request = !!search
    ? {
        path,
        query: {search},
        academy,
        type: 'authors',
      }
    : null;

  const limit = 9;
  const fields = {};
  const searchFields = ['firstName', 'lastName', 'structure'];
  const order = 'articlesCount DESC';
  const apiurl = 'authors';
  const where = {articlesCount: {gt: 0}, structure: academy._id};

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
    academy,
    isResearchLink,
    request,
  };
}
