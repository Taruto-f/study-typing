'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { TopTab } from './tabs';
import { reset_storage } from '@/utils/localstorage';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  useEffect(() => {
    reset_storage();
    setTheme(localStorage.getItem('theme')!);
  }, []);

  return (
    <NextUIProvider locale='ja-JP' navigate={router.push}>
      <ThemeProvider attribute='class' defaultTheme={theme}>
        <TopTab>{children}</TopTab>
      </ThemeProvider>
    </NextUIProvider>
  );
}
