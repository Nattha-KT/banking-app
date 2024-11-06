'use client';
import React from 'react';
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from '../../ui';
import { AuthFormValues } from '@/schema';
import { FieldPath, useFormContext } from 'react-hook-form';

export interface InputFormFieldProps<T extends AuthFormType> {
  name: FieldPath<AuthFormValues<T>>;
  label: string;
  placeholder: string;
  className?: string;
}

export const InputFormField = React.memo(function InputFormField<
  T extends AuthFormType,
>({ name, label, placeholder, className = '' }: InputFormFieldProps<T>) {
  const form = useFormContext<AuthFormValues<T>>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className={`form-item ${className}`}>
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
});

InputFormField.displayName = 'InputFormField';
