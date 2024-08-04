import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Noto_Sans_JP } from 'next/font/google';

const NotoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
});

// const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'Study Typing',
  description: '勉強タイピングアプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning={true}>
      <body className={NotoSansJP.className}>
        <div className='w-screen h-screen py-4 flex items-start justify-center'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
