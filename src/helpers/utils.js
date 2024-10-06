export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
