'use client';
import { Tabs, Tab } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export function TopTab({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <>
      <div className='flex w-screen p-5 flex-col'>
        <Tabs aria-label='Options' selectedKey={path}>
          <Tab key='/' title='Home' href='/'></Tab>
          <Tab key='/data' title='Data' href='/data'></Tab>
        </Tabs>
        {children}
      </div>
    </>
  );
}
