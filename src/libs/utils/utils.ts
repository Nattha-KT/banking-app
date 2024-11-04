export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));
