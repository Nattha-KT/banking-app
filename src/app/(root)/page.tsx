import { HeaderBox } from '@/components';
import { BalanceBox } from '@/components/feature';
import { getLoggedInUser } from '@/libs';

export default async function HomePage() {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          title="Welcome"
          type="greeting"
          user={loggedIn.firstName || 'Guest'}
          subtext="Manage your account and transaction efficiently"
        />
        <BalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.12}
        />
      </div>
      {/* <ProfileSide
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 223.5 }, { currentBalance: 313.5 }]}
      /> */}
    </section>
  );
}
