import { AuthForm } from '@/components';

export default async function SignUpPage() {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}
