import {fetchData, getTags} from '../../../../utils/api/methods';

export async function load({params, url, parent, fetch}) {
  const path = url.pathname;
  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const tags = url.searchParams.get('tags') || '';
  const query = {page, search, tags};
  const {env} = await parent();
  const responseStructure = await fetch(
    `${env.API_HOST}/structures/${params._id}`,
  );
  const structure = await responseStructure.json();
  const isResearchLink = !!tags || !!search;
  const request =
    !!tags || !!search
      ? {
          path,
          query: {search, tags},
          type: 'articles',
          structure,
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
        structure: structure._id,
        draft: {neq: true},
      }
    : {structure: structure._id, draft: {neq: true}};
  const include = [
    {
      relation: 'user',
    },
  ];

  const {items, total} = await fetchData({
    host: env.API_HOST,
    fetcher: fetch,
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
  const tagsList = await getTags(env.API_HOST, fetch);
  return {
    articles: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    structure,
    tagsList,
    isResearchLink,
    request,
  };
}
