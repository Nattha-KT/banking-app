import { BankCard, HeaderBox } from '@/components';
import { getAccounts, getLoggedInUser } from '@/libs';

export default async function MyBanksPage() {
  const [loggedIn, accounts] = await Promise.all([
    getLoggedInUser(),
    getAccounts({ userId: (await getLoggedInUser())?.$id }),
  ]);

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
