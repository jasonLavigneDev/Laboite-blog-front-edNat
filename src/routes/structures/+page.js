import {fetchData} from '../../utils/api/methods';

export async function load({parent}) {
  const fields = {};
  const order = 'name ASC';
  const apiurl = 'structures';
  const {env} = await parent();

  const {items} = await fetchData({
    host: env.API_HOST,
    limit: 100,
    order,
    fields,
    apiurl,
  });

  return {
    structures: items,
  };
}
