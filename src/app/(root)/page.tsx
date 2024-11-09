import {
  HeaderBox,
  BalanceBox,
  RecentTransactions,
  ProfileSide,
} from '@/components';
import { getAccount, getAccounts, getLoggedInUser } from '@/libs';

export default async function HomePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page as string) || 1;

  // Should be use Oauth with appwrite
  const [loggedIn, accounts] = await Promise.all([
    getLoggedInUser(),
    getAccounts({ userId: (await getLoggedInUser())?.$id }),
  ]);

  if (!loggedIn || !accounts?.data.length) return null;

  const accountsData = accounts.data;

  const appwriteItemId =
    (searchParams?.id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  if (!account) return null;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            title="Welcome"
            type="greeting"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Manage your account and transaction efficiently"
          />
          <BalanceBox
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <ProfileSide
        user={loggedIn}
        transactions={accounts?.transaction}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
}
