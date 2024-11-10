import Image from 'next/image';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/images/auth-background-2.png"
            alt="Auth image"
            width={900}
            height={900}
            className="rounded-l-xl object-contain outline outline-4 outline-offset-8 outline-bankGradient-500"
          />
        </div>
      </div>
    </main>
  );
}
