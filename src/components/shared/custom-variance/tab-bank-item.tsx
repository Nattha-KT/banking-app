'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { cn, formUrlQuery } from '@/libs';
import React from 'react';

export type TabBankItemProps = React.ComponentPropsWithoutRef<'div'> &
  BankTabItemProps;

const TabBankItem = React.forwardRef<HTMLDivElement, TabBankItemProps>(
  ({ className, account, ...props }, ref) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    // const isActive = appwriteItemId === account?.appwriteItemId;

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
        ref={ref}
        {...props}
        onClick={handleBankChange}
        className={cn(
          'banktab-item group-data-[state=active]:border-emerald-300',
          className,
        )}
      >
        <p
          className={cn(
            'text-16 line-clamp-1 flex-1 font-medium text-gray-500 group-data-[state=active]:text-emerald-400',
          )}
        >
          {account.name}
        </p>
      </div>
    );
  },
);

TabBankItem.displayName = 'TabBankItem';

export default TabBankItem;
