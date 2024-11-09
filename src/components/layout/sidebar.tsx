'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FooterSide from './footer-side';
import { PlaidLink } from '../shared';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../ui';

export default function Sidebar({ user }: SiderbarProps) {
  const pathname = usePathname();

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
            <TooltipProvider key={item.label} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.route}
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
                    <p
                      className={cn('sidebar-label', {
                        '!text-white': isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  className="hidden border border-teal-200 bg-teal-50 text-teal-700 max-xl:block"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}

        <PlaidLink user={user} />
      </nav>

      <FooterSide user={user} />
    </section>
  );
}
