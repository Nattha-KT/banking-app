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

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case 'depository':
      return {
        bg: 'bg-blue-25',
        lightBg: 'bg-blue-100',
        title: 'text-blue-900',
        subText: 'text-blue-700',
      };

    case 'credit':
      return {
        bg: 'bg-success-25',
        lightBg: 'bg-success-100',
        title: 'text-success-900',
        subText: 'text-success-700',
      };

    default:
      return {
        bg: 'bg-green-25',
        lightBg: 'bg-green-100',
        title: 'text-green-900',
        subText: 'text-green-700',
      };
  }
}
