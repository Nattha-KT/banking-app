import { HeaderBox, TransactionsTable } from '@/components';
import { formatAmount, getAccount, getAccounts, getLoggedInUser } from '@/libs';
import { cookies } from 'next/headers';

export default async function TransactionPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page as string) || 1;
  const sessionValue = (await cookies()).get('appwrite-session')?.value || '';
  const loggedIn = await getLoggedInUser(sessionValue);
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId =
    (searchParams?.id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account outline outline-8 outline-offset-2 outline-teal-100">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14 font-semibold">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              {/* <Pagination totalPages={totalPages} page={currentPage} /> */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
