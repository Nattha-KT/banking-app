import Link from 'next/link';
import { BankCard } from '../feature';
import { Category } from '../shared';
import { countTransactionCategories } from '@/libs';

export default function ProfileSide({
  user,
  transactions,
  banks,
}: RightSidebarProps) {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-4">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold capitalize text-teal-500">
              {user?.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="text-[16px] font-semibold text-teal-950">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <h2 className="flex items-center gap-1 text-[14px] font-semibold text-teal-600/50">
              <span className="mb-[-2px] text-2xl font-thin">+</span>
              <span> Add Bank </span>
            </h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%] hover:z-20">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="text-[16px] font-semibold text-teal-950">
            Top Payment Chanel
          </h2>

          <div className="space-y-5">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
