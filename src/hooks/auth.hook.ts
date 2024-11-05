'use client';
import { AuthFormValues, getAuthFormSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const defaultAuthFormValue: Partial<AuthFormValues<'sign-up'>> = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  dateOfBirth: '',
  ssn: '',
};

export function useAuthHook(type: AuthFormType) {
  const formSchema = getAuthFormSchema(type);
  const authForm = useForm<AuthFormValues<typeof type>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultAuthFormValue,
    },
    mode: 'onSubmit',
  });

  return {
    authForm,
  };
}
