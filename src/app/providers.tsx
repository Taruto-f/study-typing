'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { TopTab } from './tabs';
import { reset_cookie } from './cookie';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  useEffect(() => {
    reset_cookie();
    setTheme(getCookie('theme')!);
  }, []);

  return (
    <NextUIProvider locale='ja-JP' navigate={router.push}>
      <ThemeProvider attribute='class' defaultTheme={theme}>
        <TopTab>{children}</TopTab>
      </ThemeProvider>
    </NextUIProvider>
  );
}
