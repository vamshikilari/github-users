function buildUrl({ path, query }) {
  const queryString = Object.entries(query).reduce(
    (prev, [type, value]) => prev + `&${type}=${value}`,
    ""
  );
  return path + "?" + queryString;
}

export { buildUrl };
