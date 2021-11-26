export const toCamel = (str: string) =>
  str.replace(/(-[a-z])/g, ($1) => $1.toUpperCase().replace('-', ''));
