'use client';
import { Tabs, Tab, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export function TopTab({
  children,
  force = false,
}: {
  children: React.ReactNode;
  force?: boolean;
}) {
  const path = usePathname();
  const taburl = new Set(['/', '/data']);

  return (
    <>
      <div className='flex w-screen px-5 flex-col'>
        {taburl.has(path) ||
          (force && (
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
          ))}
        {children}
      </div>
    </>
  );
}
