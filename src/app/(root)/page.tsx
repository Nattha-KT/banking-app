import { HeaderBox, ProfileSide } from '@/components';
import { BalanceBox } from '@/components/feature';
import { getAccount, getAccounts, getLoggedInUser } from '@/libs';

export default async function HomePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  //  should be use Oauth with appwrite
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  console.log('searchParams:', searchParams);

  if (!accounts) return;
  const accountsData = accounts?.data;
  //bankId
  const appwriteItemId =
    (searchParams?.id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  console.log({
    account,
  });

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
      </div>
      <ProfileSide
        user={loggedIn}
        transactions={accounts?.transaction}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
}
