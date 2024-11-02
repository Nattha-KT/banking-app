'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import Footer from './Footer';
// import PlaidLink from './PlaidLink';

export default function Sidebar({ user }: SiderbarProps) {
  const pathname = usePathname();
  console.log(user);

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 flex cursor-pointer items-center gap-2 px-1"
        >
          <Image
            src="/icons/bank-logo.svg"
            width={30}
            height={30}
            alt="Horizon logo"
            className="size-[42px] max-xl:size-12"
          />
          <h1 className="sidebar-logo">BANK APP</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', {
                'bg-bank-green-gradient': isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive,
                  })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        {/* <PlaidLink user={user} /> */}
      </nav>

      {/* <Footer user={user} /> */}
    </section>
  );
}
