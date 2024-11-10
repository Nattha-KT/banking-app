import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from '@/libs';
import { StatusBadge, StatusBadgeVariantProps } from '@/components/shared';

export default function TransactionsTable({
  transactions,
}: TransactionTableProps) {
  return (
    <Table className="text-slate-600">
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2">Status</TableHead>
          {/* <TableHead className="px-2 max-md:hidden">Category</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(
            new Date(t.date),
          ).toLowerCase() as StatusBadgeVariantProps['variant'];
          const amount = formatAmount(t.amount);

          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit';

          return (
            <TableRow
              key={t.id}
              className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-medium">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === '-'
                    ? 'text-[#f04438]'
                    : 'text-[#039855]'
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10 text-[14px]">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="min-w-24 pl-2 pr-10 capitalize">
                {t.paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <StatusBadge variant={status} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
