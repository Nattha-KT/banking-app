'use client';
import { BarChart } from '../../shared';

export default function AnalystBox({ accounts = [] }: TotalBalanceBoxProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-center">
        <BarChart accounts={accounts} />
      </div>
    </section>
  );
}
