// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenColors = (obj: Record<string, any>, prefix = '') => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object') {
        Object.assign(acc, flattenColors(value, newKey));
      } else {
        acc[newKey] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
