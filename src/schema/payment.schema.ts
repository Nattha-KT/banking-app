import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const getPaymentFormSchema = () =>
  z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(4, 'Transfer note is too short'),
    amount: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, 'Amount must be a valid number')
      .min(1, 'Amount is required'),
    senderBank: z.string().min(4, 'Please select a valid bank account'),
    sharableId: z.string().min(8, 'Please select a valid sharable Id'),
  });

export type PaymentFormValues = z.infer<
  ReturnType<typeof getPaymentFormSchema>
>;
export type PaymentFormSchema = UseFormReturn<PaymentFormValues>;
