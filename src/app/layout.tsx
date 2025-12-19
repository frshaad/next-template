import './globals.css';
import type { Metadata } from 'next';
import { geistMono, geistSans, inter } from '@/lib/fonts';
import Providers from '@/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'A starter template for Next.js applications.',
};
