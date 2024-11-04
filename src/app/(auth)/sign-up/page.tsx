import { AuthForm } from '@/components';
import { getLoggedInUser } from '@/libs';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect('/');
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}
