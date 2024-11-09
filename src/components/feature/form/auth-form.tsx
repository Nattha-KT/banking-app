'use client';
import { Form, signIn, signUp } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useAuthHook } from '@/hooks';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { InputFormField, PlaidLink } from '@/components/shared';
import { AuthFormValues } from '@/schema';
import { FieldPath } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }: { type: AuthFormType }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authForm: form } = useAuthHook(type);
  const router = useRouter();

  const onSubmit = async (data: AuthFormValues<typeof type>) => {
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        const userData = {
          ...(data as AuthFormValues<'sign-up'>),
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image
            src="/icons/bank-logo.svg"
            width={80}
            height={80}
            alt="Horizon logo"
          />
          <h1 className="font-ibm-plex-serif text-[34px] font-bold text-bankGradient-200 2xl:text-[36px]">
            BANK APP
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] font-semibold text-gray-700 lg:text-[30px]">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <InputFormField
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <InputFormField
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <InputFormField
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <InputFormField
                    name={'city' as FieldPath<AuthFormValues>}
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <InputFormField
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <InputFormField
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputFormField
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <InputFormField
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <InputFormField
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <InputFormField
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="form-btn hover:bg-teal-500"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="form-link"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
