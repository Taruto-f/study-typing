'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { TopTab } from './tabs';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider locale='ja-JP' navigate={router.push}>
      <ThemeProvider
        attribute='class'
        defaultTheme={getCookie('darkmode') === 'true' ? 'dark' : 'light'}
      >
        <TopTab>{children}</TopTab>
      </ThemeProvider>
    </NextUIProvider>
  );
}
