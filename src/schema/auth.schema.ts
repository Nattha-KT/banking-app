import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const baseAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpFields = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  address1: z.string().max(50),
  city: z.string().max(50),
  state: z.string().min(2).max(2),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.string().min(3),
  ssn: z.string().min(3),
});

const signUpSchema = baseAuthSchema.merge(signUpFields);

export const getAuthFormSchema = (type: AuthFormType) => {
  return type === 'sign-up' ? signUpSchema : baseAuthSchema;
};

export type AuthFormValues<T extends AuthFormType = 'sign-in'> =
  T extends 'sign-up'
    ? z.infer<typeof signUpSchema>
    : z.infer<typeof baseAuthSchema>;

export type AuthFormSchema<T extends AuthFormType = 'sign-in'> = UseFormReturn<
  AuthFormValues<T>
>;

// export type AuthFormSchema = UseFormReturn<AuthFormValues>;
// export type AuthFormValues = z.infer<ReturnType<typeof getAuthFormSchema>>;
