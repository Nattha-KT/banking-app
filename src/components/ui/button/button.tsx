'use client';
import { cn } from '@/libs';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { ButtonVariantProps, buttonVariants } from './button.variant';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  backgroundColor?: string;
  loading?: boolean;
} & ButtonVariantProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
