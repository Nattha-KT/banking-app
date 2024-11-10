'use client';
import { cva, VariantProps } from 'class-variance-authority';

export const statusBadgeVariants = cva(
  'inline-flex border  items-center gap-2 rounded-3xl py-1 px-2 text-[12px] font-medium',
  {
    variants: {
      variant: {
        payment: 'border-green-600 bg-green-600 text-green-700',
        transfer: 'border-red-700 bg-red-700 text-red-700',
        processing: 'border-[#F2F4F7] bg-gray-500 text-[#344054] bg-[#F2F4F7]',
        success: 'border-[#12B76A] bg-[#12B76A] text-[#027A48] bg-[#ECFDF3]',
        travel: 'border-[#0047AB] bg-blue-500 text-blue-700 bg-[#ECFDF3]',
        default: 'bg-blue-500 text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
export type StatusBadgeVariantProps = VariantProps<typeof statusBadgeVariants>;
