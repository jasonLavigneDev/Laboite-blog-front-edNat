import {fetchData, getTags} from '../../../utils/api/methods';

export async function load({params, url, parent}) {
  const path = url.pathname;
  const {env} = await parent();

  const page = url.searchParams.get('page') || 1;
  const search = url.searchParams.get('search');
  const tags = url.searchParams.get('tags') || '';

  const query = {page, search, tags};
  const limit = 10;
  const fields = {content: false, _id: false, updatedAt: false};
  const searchFields = ['description', 'title', 'slug', 'tags'];
  const order = 'createdAt DESC';
  const apiurl = `articles`;
  const where = tags
    ? {userId: params._id, tags: {inq: [tags]}, draft: {neq: true}}
    : {userId: params._id, draft: {neq: true}};

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
  const responseAuthor = await fetch(`${env.API_HOST}/authors/${params._id}`);
  const author = await responseAuthor.json();
  const responseStructure = await fetch(
    `${env.API_HOST}/structures/${author.structure}`,
  );
  const structure = await responseStructure.json();
  const tagsList = await getTags(env.API_HOST);
  return {
    articles: items,
    total,
    limit,
    page: Number(page),
    query,
    path,
    author,
    structure,
    tagsList,
  };
}
