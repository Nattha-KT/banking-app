'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { cn, formUrlQuery } from '@/libs';

export default function TabBankItem({
  account,
  appwriteItemId,
}: BankTabItemProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'id',
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item`, {
        'border-emerald-300': isActive,
      })}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
          'text-emerald-400': isActive,
        })}
      >
        {account.name}
      </p>
    </div>
  );
}