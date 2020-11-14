import { api } from "../../settings";

export async function fetchData(
  fetcher,
  {
    limit = 10,
    order,
    fields = {},
    where = {},
    searchFields = [],
    apiurl = "articles",
    value,
    skip = 0,
    count = true,
  }
) {
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
