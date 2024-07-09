'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { getCookie } from 'cookies-next';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider locale='ja-JP'>
      <ThemeProvider
        attribute='class'
        defaultTheme={getCookie('darkmode') === 'true' ? 'dark' : 'light'}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
