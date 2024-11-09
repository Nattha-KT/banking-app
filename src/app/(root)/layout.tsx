import { MobileNav, Sidebar } from '@/components';
import { getLoggedInUser } from '@/libs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionValue = (await cookies()).get('appwrite-session')?.value || '';
  const loggedIn = await getLoggedInUser(sessionValue);

  if (!loggedIn) redirect('/sign-in');
  return (
    <main id="root" className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="navbar-root-layout">
          <Link
            href={'/'}
            className="flex cursor-pointer items-center gap-3 px-4"
          >
            <Image
              src="/icons/bank-logo.svg"
              width={45}
              height={45}
              alt="logo"
            />
            <h1 className="text-[20px] font-bold text-teal-700 2xl:text-[26px]">
              BANK APP
            </h1>
          </Link>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
