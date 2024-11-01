import { HeaderBox } from '@/components';
import { BalanceBox } from '@/components/feature';

export default function HomePage() {
  const loggedIn = { firstName: 'Aon' };
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
    </section>
  );
}
