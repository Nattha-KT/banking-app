import { HeaderBox, PaymentForm } from '@/components';
import { getAccounts, getLoggedInUser } from '@/libs';
import { cookies } from 'next/headers';

export default async function PatmentPage() {
  const sessionValue = (await cookies()).get('appwrite-session')?.value || '';

  const loggedIn = await getLoggedInUser(sessionValue);
  const accounts = await getAccounts({ userId: loggedIn?.$id });

  if (!accounts) return;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentForm accounts={accounts?.data} />
      </section>
    </section>
  );
}
