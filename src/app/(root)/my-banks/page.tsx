import { BankCard, HeaderBox } from '@/components';
import { getAccounts, getLoggedInUser } from '@/libs';
import { cookies } from 'next/headers';

export default async function MyBanksPage() {
  // Should be use Oauth with appwrite
  const sessionValue = (await cookies()).get('appwrite-session')?.value || '';

  const loggedIn = await getLoggedInUser(sessionValue);
  const accounts = await getAccounts({ userId: loggedIn?.$id });

  return (
    <section role="display banks page" className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">All Your cards🪙</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: Account) => (
                <BankCard
                  key={accounts.id}
                  account={account}
                  userName={loggedIn?.firstName}
                  showBalance={true}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
