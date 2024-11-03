'use client';
import { AuthFormSchema, AuthFormValues, getAuthFormSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const defaultAuthFormValue = {} satisfies Partial<AuthFormValues>;

export function useAuthHook(type: string) {
  const formSchema = getAuthFormSchema(type);
  const authForm = useForm<AuthFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultAuthFormValue,
      // email: '',
      // password: '',
    },
  });

  return {
    authForm,
  };
}
