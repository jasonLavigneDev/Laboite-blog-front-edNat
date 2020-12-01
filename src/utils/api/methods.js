import { api } from "../../settings";
import fetcher from "isomorphic-fetch";

export async function fetchData({
  limit = 10,
  order,
  fields = {},
  where = {},
  searchFields = [],
  apiurl = "articles",
  value,
  skip = 0,
  count = true,
  include,
}) {
  const whereQuery = { ...where };
  if (value) {
    whereQuery.or = searchFields.map((field) => ({
      [field]: { like: `.*${value}.*`, options: "i" },
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
  const response = await fetcher(
    `${api.host}/${apiurl}?filter=${JSON.stringify(queryFilters)}`
  );
  const items = await response.json();
  let total;
  if (count) {
    const newTotal = await fetcher(
      `${api.host}/${apiurl}/count?where=${JSON.stringify(whereQuery)}`
    );
    const result = await newTotal.json();
    total = result.count;
  }
  return { items, total };
}

export async function getTags() {
  const queryFilters = { fields: { _id: false } };
  const response = await fetcher(
    `${api.host}/tags?filter=${JSON.stringify(queryFilters)}`
  );
  const items = await response.json();
  const tags = items.map(({ name }) => name);
  return tags;
}
