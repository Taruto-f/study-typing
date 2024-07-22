'use client';

import {
  Button,
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  SelectSection,
  Selection,
  Tooltip,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { themes } from './theme';
import { useEffect, useState } from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import { expires_date, reset_cookie } from './cookie';
import { datas, exist_subject, subject_names, subjects_select } from './data';
import { filter_keys, only_enable } from './util';

export default function Home() {
  // 初期設定類
  const { theme, setTheme } = useTheme();

  const [show_theme, setShowTheme] = useState('system');
  const [select_season, setSeason] = useState<Selection>(new Set([]));
  const [select_subject, setSubject] = useState<Selection>(new Set([]));
  const [selectable_subject, setSelectableSubject] = useState<
    Record<string, boolean>
  >(exist_subject(new Set<string>()));
  // const init_setting = () => {
  //   if (getCookie('select_season')! !== '') {
  //     setSeason(new Set(getCookie('select_season')!.split(',')));
  //   } else {
  //     setSeason(new Set([]));
  //   }
  // };
  useEffect(() => {
    setShowTheme(theme!);
    //   init_setting();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, setSeason]);

  // 設定リセットの警告

  return (
    <>
      <div className='py-5 w-full'>
        <Card>
          <CardBody>
            <div className='py-20 justify-center items-center flex'></div>
          </CardBody>
        </Card>
      </div>

      <div className='py-5 w-full'>
        <Card>
          <CardBody>
            <div className='space-y-3'>
              <h1 className='font-bold'>ゲーム設定</h1>

              <div className='flex gap-4'>
                <Select
                  items={datas}
                  className='max-w-xs'
                  label='範囲'
                  selectionMode='multiple'
                  selectedKeys={select_season}
                  onSelectionChange={(keys) => {
                    setSeason(keys);
                    setCookie('select_season', [...keys].join(','), {
                      expires: expires_date,
                    });
                    setSelectableSubject(exist_subject(keys as Set<string>));
                    setSubject(
                      only_enable<string>(
                        select_subject as Set<string>,
                        exist_subject(keys as Set<string>)
                      )
                    );
                    console.log(
                      only_enable<string>(
                        select_subject as Set<string>,
                        exist_subject(keys as Set<string>)
                      )
                    );
                  }}
                >
                  {(data) => {
                    return (
                      <SelectSection showDivider title={data.year}>
                        {data.seasons.map((season) => (
                          <SelectItem
                            key={data.key + '_' + String(season.season)}
                          >
                            {`${data.year} ${season.season}学期`}
                          </SelectItem>
                        ))}
                      </SelectSection>
                    );
                  }}
                </Select>

                <Select
                  label='教科'
                  className='max-w-md'
                  items={subjects_select}
                  disabledKeys={filter_keys(selectable_subject, false)}
                  selectionMode='multiple'
                  selectedKeys={select_subject}
                  onSelectionChange={(keys) => {
                    setSubject(keys);
                  }}
                >
                  {(subject) => (
                    <SelectItem key={subject.key}>{subject.name}</SelectItem>
                  )}
                </Select>
              </div>
              <p>
                {[...select_season].join(', ')}:
                {JSON.stringify(selectable_subject)}
              </p>

              <div className='flex gap-4'>
                <Button
                  color='danger'
                  variant='ghost'
                  onPress={() => {
                    setSeason(new Set());
                    setSubject(new Set());
                    setSelectableSubject(exist_subject(new Set<string>()));
                  }}
                >
                  リセット
                </Button>
              </div>

              <Divider />
              <h1 className='font-bold'>環境設定</h1>
              <div>
                <Select
                  label='テーマ'
                  className='max-w-xs'
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  selectedKeys={[show_theme as any]}
                  onSelectionChange={(keys) => {
                    const new_theme = [...keys] as string[];

                    if (new_theme.length !== 0) {
                      setTheme(new_theme[0]);
                      setCookie('theme', new_theme[0], {
                        expires: expires_date,
                      });
                    }
                  }}
                >
                  {themes.map((value) => {
                    return <SelectItem key={value.id}>{value.name}</SelectItem>;
                  })}
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
