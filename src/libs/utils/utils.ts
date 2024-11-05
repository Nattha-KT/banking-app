export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const getEnvironmentVariable = (key: string): string =>
  process.env[key] as string;

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export function encryptId(id: string) {
  return btoa(id);
}

export function extractCustomerIdFromUrl(url: string) {
  const parts = url.split('/');

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}
