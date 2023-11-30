import {fetchData, getTags} from '../../../utils/api/methods';

export async function load({params, url, parent, fetch}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const query = {page, search};
  const {env} = await parent();

  const responseGroup = await fetch(`${env.API_HOST}/groups/${params.slug}`);
  const group = await responseGroup.json();

  const limit = 10;
  const fields = {content: false, _id: false, updatedAt: false};
  const searchFields = ['description', 'title', 'slug', 'tags'];
  const order = 'createdAt DESC';
  const apiurl = `articles`;
  const where = {'groups._id': {eq: group._id}};

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
  const tagsList = await getTags(env.API_HOST, fetch);
  return {
    articles: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    group,
    tagsList,
  };
}
