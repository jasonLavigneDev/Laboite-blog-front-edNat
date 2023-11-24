const accentInsensitive = searchString => {
  // inspired from https://stackoverflow.com/questions/227950/
  const accented = {
    // eslint-disable-next-line max-len
    A: '[Aa\xaa\xc0-\xc5\xe0-\xe5\u0100-\u0105\u01cd\u01ce\u0200-\u0203\u0226\u0227\u1d2c\u1d43\u1e00\u1e01\u1e9a\u1ea0-\u1ea3\u2090\u2100\u2101\u213b\u249c\u24b6\u24d0\u3371-\u3374\u3380-\u3384\u3388\u3389\u33a9-\u33af\u33c2\u33ca\u33df\u33ff\uff21\uff41]',
    // eslint-disable-next-line max-len
    E: '[Ee\xc8-\xcb\xe8-\xeb\u0112-\u011b\u0204-\u0207\u0228\u0229\u1d31\u1d49\u1e18-\u1e1b\u1eb8-\u1ebd\u2091\u2121\u212f\u2130\u2147\u24a0\u24ba\u24d4\u3250\u32cd\u32ce\uff25\uff45]',
    // eslint-disable-next-line max-len
    I: '[Ii\xcc-\xcf\xec-\xef\u0128-\u0130\u0132\u0133\u01cf\u01d0\u0208-\u020b\u1d35\u1d62\u1e2c\u1e2d\u1ec8-\u1ecb\u2071\u2110\u2111\u2139\u2148\u2160-\u2163\u2165-\u2168\u216a\u216b\u2170-\u2173\u2175-\u2178\u217a\u217b\u24a4\u24be\u24d8\u337a\u33cc\u33d5\ufb01\ufb03\uff29\uff49]',
    // eslint-disable-next-line max-len
    O: '[Oo\xba\xd2-\xd6\xf2-\xf6\u014c-\u0151\u01a0\u01a1\u01d1\u01d2\u01ea\u01eb\u020c-\u020f\u022e\u022f\u1d3c\u1d52\u1ecc-\u1ecf\u2092\u2105\u2116\u2134\u24aa\u24c4\u24de\u3375\u33c7\u33d2\u33d6\uff2f\uff4f]',
    // eslint-disable-next-line max-len
    U: '[Uu\xd9-\xdc\xf9-\xfc\u0168-\u0173\u01af\u01b0\u01d3\u01d4\u0214-\u0217\u1d41\u1d58\u1d64\u1e72-\u1e77\u1ee4-\u1ee7\u2106\u24b0\u24ca\u24e4\u3373\u337a\uff35\uff55]',
    C: '[Cc\xc7\xe7]',
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
    : await fetch(`${host}/${apiurl}?filter=${JSON.stringify(queryFilters)}`);
  const items = countOnly ? null : await response.json();
  let total;

  if (count) {
    const newTotal = await fetch(
      `${host}/${apiurl}/count?where=${JSON.stringify(whereQuery)}`,
    );
    const result = await newTotal.json();
    total = result.count;
  }
  return {items, total, response};
}

export async function getTags(host) {
  const queryFilters = {fields: {_id: false}};
  const response = await fetch(
    `${host}/tags?filter=${JSON.stringify(queryFilters)}`,
  );
  const items = await response.json();
  const tags = items.map(({name}) => name);
  return tags;
}

export async function getMaintenance(host) {
  const response = await fetch(`${host}/appsettings`);
  if (response.ok) {
    const result = await response.json();
    return {
      maintenance: result.maintenance,
      textMaintenance: result.textMaintenance,
    };
  }
  return {maintenance: false, textMaintenance: ''};
}
