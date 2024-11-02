'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../ui';
// import Footer from './Footer';

export default function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();
  console.log(user);

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="max-w-[300px] border-none bg-white"
        >
          <SheetTitle>
            {' '}
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-2 px-4"
            >
              <Image
                src="/icons/bank-logo.svg"
                width={50}
                height={50}
                alt="Horizon logo"
              />
              <h1 className="text-[20px] font-bold text-gray-700 2xl:text-[26px]">
                BANK APP
              </h1>
            </Link>
          </SheetTitle>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'mobilenav-sheet_close w-full hover:bg-teal-100',
                          {
                            'bg-bank-green-gradient': isActive,
                          },
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            'brightness-[3] invert-0': isActive,
                          })}
                        />
                        <p
                          className={cn('text-16 font-medium text-black-2', {
                            'text-white': isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>

            {/* <Footer user={user} type="mobile" /> */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
