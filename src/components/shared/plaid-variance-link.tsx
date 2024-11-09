'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';
import Image from 'next/image';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui';
import { useRouter } from 'next/navigation';
import { createLinkTokenPlaid, exchangePublicToken } from '@/libs';

export default function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkTokenPlaid(user);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push('/');
    },
    [user, router],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => open()}
                className="plaidlink-default hover:bg-teal-100"
              >
                <Image
                  src="/icons/connect-bank.svg"
                  className="brightness-[1] invert-0"
                  alt="connect bank"
                  width={24}
                  height={24}
                />
                <p className="text-[12px] font-semibold text-teal-300 max-xl:hidden">
                  Connect bank
                </p>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={10}
              side="right"
              align="center"
              className="hidden border border-teal-200 bg-teal-50 text-teal-700 max-xl:block"
            >
              Connect bank
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
