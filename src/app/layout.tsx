import '@/styles/globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Serif, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '900'],
  variable: '--font-inter',
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
});

export const metadata: Metadata = {
  title: 'Banking App',
  description: 'Modern banking platform',
  icons: {
    icon: '/icons/bank-logo.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
