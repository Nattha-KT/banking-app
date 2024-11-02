// import { MobileNav, Sidebar } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const loggedIn = { firstName: 'Natthphon', lastName: 'KT' };
  return (
    <main className="flex h-screen w-full font-inter">
      {/* <Sidebar user={loggedIn} /> */}

      <div className="flex size-full flex-col">
        <div className="root-layout">
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
            <h1 className="text-[20px] font-bold text-gray-700 2xl:text-[26px]">
              BANK APP
            </h1>
          </Link>
          <div>{/* <MobileNav user={loggedIn} /> */}</div>
        </div>
        {children}
      </div>
    </main>
  );
}
