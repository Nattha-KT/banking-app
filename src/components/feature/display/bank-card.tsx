import { ButtonCopy } from '@/components/shared';
import { formatAmount } from '@/libs';
import Image from 'next/image';
import Link from 'next/link';
// import Copy from './Copy';

export default function BankCard({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) {
  return (
    <div
      key={account.id}
      className="flex flex-col transition-all duration-200 ease-linear hover:-translate-y-1"
    >
      <Link
        href={`/transaction/?id-=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">{account.name}</h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-[10px] font-semibold text-white">
                {userName}
              </h1>
              <h2 className="text-[10px] font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-[11px] font-semibold tracking-[1px] text-white">
              ●●●● ●●●● ●●●●{' '}
              <span className="text-[15px]">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute left-0 top-0"
        />
      </Link>

      {showBalance && <ButtonCopy title={account?.shareableId} />}
    </div>
  );
}
