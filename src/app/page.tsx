'use client';

import { Tabs, Tab, Card, CardBody, Divider, Switch } from '@nextui-org/react';
import { default_cookie } from './cookie';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useTheme } from 'next-themes';

const date = new Date('2099/12/31');

export default function Home() {
  const { theme: _theme, setTheme } = useTheme();

  const keys = Object.keys(default_cookie);
  keys.forEach((key) => {
    if (!hasCookie(key)) {
      setCookie(key, default_cookie[key], { expires: date });
    }
  });

  return (
    <div className='flex w-screen p-5 flex-col'>
      <Tabs aria-label='Options'>
        <Tab key='home' title='Home'>
          <div className='py-5 w-full'>
            <Card>
              <CardBody>
                <div className='py-20'></div>
              </CardBody>
            </Card>
          </div>

          {/* 設定 */}
          <div className='py-5 w-full'>
            <Card>
              <CardBody>
                <div className='space-y-3'>
                  <h1 className='font-bold'>ゲーム設定</h1>

                  <Divider />
                  <h1 className='font-bold'>環境設定</h1>

                  <Switch
                    defaultSelected={getCookie('darkmode') === 'true'}
                    color='success'
                    onChange={(event) => {
                      setCookie('darkmode', event.target.checked, {
                        expires: date,
                      });
                      setTheme(event.target.checked ? 'dark' : 'light');
                    }}
                  >
                    ダークモード
                  </Switch>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
        <Tab key='data' title='Data'>
          <div className='py-5 w-full'>
            <Card>
              <CardBody></CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
