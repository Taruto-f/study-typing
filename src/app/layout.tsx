import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

// const inter = Inter({ subsets: ["latin"] });
const notosans = Noto_Sans_JP({ subsets: ['latin'] });
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
    <html lang='ja'>
      <body className={notosans.className}>
        <div className='w-screen h-screen p-8 flex items-start justify-center'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
