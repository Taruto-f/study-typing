'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { TopTab } from './tabs';
import { default_cookie } from './cookie';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { expires_date } from './cookie';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const keys = Object.keys(default_cookie);
  keys.forEach((key) => {
    if (!hasCookie(key)) {
      setCookie(key, default_cookie[key], { expires: expires_date });
    }
  });

  const [theme, setTheme] = useState('system');
  useEffect(() => {
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
