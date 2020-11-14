export const toQuery = (query) => {
  let string = "";
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      string = `${string}${string ? "&" : ""}${key}=${query[key]}`;
    }
  });
  return string;
};
