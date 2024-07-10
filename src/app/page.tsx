'use client';

import { Card, CardBody, Divider, Select, SelectItem } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { themes } from './theme';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import { expires_date } from './cookie';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const [show_theme, setShowTheme] = useState('system');
  useEffect(() => {
    setShowTheme(theme!);
  }, [theme, show_theme]);
  console.log(show_theme);

  return (
    <>
      <div className='py-5 w-full'>
        <Card>
          <CardBody>
            <div className='py-20'></div>
          </CardBody>
        </Card>
      </div>

      <div className='py-5 w-full'>
        <Card>
          <CardBody>
            <div className='space-y-3'>
              <h1 className='font-bold'>ゲーム設定</h1>

              <Divider />
              <h1 className='font-bold'>環境設定</h1>
              <Select
                label='テーマ'
                className='max-w-xs'
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                selectedKeys={[show_theme as any]}
                onSelectionChange={(keys) => {
                  const new_theme = [...keys] as string[];

                  if (new_theme.length !== 0) {
                    setTheme(new_theme[0]);
                    setCookie('theme', new_theme[0], { expires: expires_date });
                  }
                }}
              >
                {themes.map((value) => {
                  return <SelectItem key={value.id}>{value.name}</SelectItem>;
                })}
              </Select>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
