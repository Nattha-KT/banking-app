'use client';
import { getPaymentFormSchema, PaymentFormValues } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const defaultPaymentFormValue: Partial<PaymentFormValues> = {
  name: '',
  email: '',
  amount: '',
  senderBank: '',
  sharableId: '',
};

export function usePaymenyTransferHook() {
  const formSchema = getPaymentFormSchema();
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultPaymentFormValue,
    },
    mode: 'onSubmit',
  });

  return {
    paymentForm,
  };
}
