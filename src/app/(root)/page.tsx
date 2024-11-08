import { HeaderBox, ProfileSide } from '@/components';
import { BalanceBox } from '@/components/feature';
import { getAccounts, getLoggedInUser } from '@/libs';

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
  // const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  // // const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          title="Welcome"
          type="greeting"
          user={loggedIn.name || 'Guest'}
          subtext="Manage your account and transaction efficiently"
        />
        <BalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.12}
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
