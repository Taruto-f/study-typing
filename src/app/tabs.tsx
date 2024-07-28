'use client';
import { Tabs, Tab, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export function TopTab({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <>
      <div className='flex w-screen px-5 flex-col'>
        <div className='flex gap-4 items-center'>
          <Link
            className='text-xl text-justify font-bold'
            color='foreground'
            href='/'
          >
            Study Typing
          </Link>
          <Tabs aria-label='Options' selectedKey={path}>
            <Tab key='/' title='Home' href='/'></Tab>
            <Tab key='/data' title='Data' href='/data'></Tab>
          </Tabs>
        </div>
        {children}
      </div>
    </>
  );
}
