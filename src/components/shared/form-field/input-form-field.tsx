import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from '../../ui';

import { AuthFormValues } from '@/schema';
import { Control, FieldPath } from 'react-hook-form';

export type InputFormFieldProps = {
  control: Control<AuthFormValues>;
  name: FieldPath<AuthFormValues>;
  label: string;
  placeholder: string;
};

export function InputFormField({
  control,
  name,
  label,
  placeholder,
}: InputFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
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
}
