import { AuthForm } from '@/components';

export default async function SignInPage() {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
}
