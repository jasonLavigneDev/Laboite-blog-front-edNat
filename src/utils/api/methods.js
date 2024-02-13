const accentInsensitive = searchString => {
  // inspired from https://stackoverflow.com/questions/227950/
  const accented = {
    // eslint-disable-next-line max-len
    A: '[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]',
    // eslint-disable-next-line max-len
    E: '[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]',
    // eslint-disable-next-line max-len
    I: '[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]',
    // eslint-disable-next-line max-len
    O: '[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]',
    // eslint-disable-next-line max-len
    U: '[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]',
    C: '[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]',
  };

  // replace characters by their compositors
  const accentReplacer = chr => {
    return accented[chr.toUpperCase()] || chr;
  };
  const result = searchString.replace(/\S/g, accentReplacer);
  return result;
};

export async function fetchData({
  host,
  limit = 10,
  order,
  fields = {},
  where = {},
  searchFields = [],
  apiurl = 'articles',
  value,
  skip = 0,
  count = true,
  countOnly = false,
  include,
  fetcher = fetch,
}) {
  const whereQuery = {...where};
  if (value) {
    whereQuery.or = searchFields.map(field => ({
      [field]: {like: `.*${accentInsensitive(value)}.*`, options: 'i'},
    }));
  }
  const queryFilters = {
    limit,
    order,
    where: whereQuery,
    fields,
    skip,
    include,
  };
  const response = countOnly
    ? null
    : await fetcher(`${host}/${apiurl}?filter=${JSON.stringify(queryFilters)}`);
  const items = countOnly ? null : await response.json();
  let total;

  if (count) {
    const newTotal = await fetcher(
      `${host}/${apiurl}/count?where=${JSON.stringify(whereQuery)}`,
    );
    const result = await newTotal.json();
    total = result.count;
  }
  return {items, total, response};
}

export async function getTags(host, fetcher = fetch) {
  const queryFilters = {fields: {_id: false}};
  const response = await fetcher(
    `${host}/tags?filter=${JSON.stringify(queryFilters)}`,
  );
  const items = await response.json();
  const tags = items.map(({name}) => name);
  return tags;
}

export async function getMaintenance(host, fetcher = fetch) {
  const response = await fetcher(`${host}/appsettings`);
  if (response.ok) {
    const result = await response.json();
    return {
      maintenance: result.maintenance,
      textMaintenance: result.textMaintenance,
    };
  }
  return {maintenance: false, textMaintenance: ''};
}
