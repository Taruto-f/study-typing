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
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { themes } from './theme';
import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { default_cookie, expires_date } from './cookie';
import { datas, exist_subject, subjects, subjects_select } from './data';
import { filter_keys, only_enable, set_to_str, str_to_set } from './util';

export default function Home() {
  // 初期設定類
  const { theme, setTheme } = useTheme();

  const [show_theme, setShowTheme] = useState('system');
  const [select_season, setSeason] = useState<Selection>(new Set([]));
  const [select_subject, setSubject] = useState<Selection>(new Set([]));
  const [selectable_subject, setSelectableSubject] = useState<
    Record<string, boolean>
  >(exist_subject(new Set<string>()));

  const init_setting = () => {
    const new_season = str_to_set<string>(getCookie('select_season')!);
    setSeason(new_season);

    const selectable = exist_subject(new_season);
    setSelectableSubject(selectable);

    setSubject(str_to_set<string>(getCookie('select_subject')!));
  };

  useEffect(() => {
    setShowTheme(theme!);
    init_setting();
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

              <div className='flex gap-4 items-center'>
                <Select
                  items={datas}
                  className='max-w-xs'
                  label='範囲'
                  selectionMode='multiple'
                  selectedKeys={select_season}
                  onSelectionChange={(keys) => {
                    setSeason(keys);
                    setCookie(
                      'select_season',
                      set_to_str(keys as Set<string>),
                      {
                        expires: expires_date,
                      }
                    );
                    setSelectableSubject(exist_subject(keys as Set<string>));
                    setSubject(
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
                    setCookie(
                      'select_subject',
                      set_to_str(keys as Set<string>),
                      { expires: expires_date }
                    );
                  }}
                >
                  {(subject) => (
                    <SelectItem key={subject.key}>{subject.name}</SelectItem>
                  )}
                </Select>

                <Button
                  size='lg'
                  color='primary'
                  onPress={() => {
                    const tmp = new Set<string>([
                      ...(select_subject as Set<string>),
                    ]);
                    subjects.forEach((val) => {
                      if (selectable_subject[val]) {
                        tmp.add(val);
                      }
                    });
                    setCookie('select_subject', set_to_str(tmp), {
                      expires: expires_date,
                    });
                    setSubject(tmp);
                  }}
                >
                  全教科を選択
                </Button>
              </div>
              <p>
                {[...select_season].join(', ')}:
                {JSON.stringify(selectable_subject)}
                {[...select_subject].join(',')}
              </p>

              <div className='flex gap-4'>
                {/* <Button onPress={init_setting}>前回の設定を読み込み</Button> */}

                <Button
                  color='danger'
                  variant='ghost'
                  onPress={() => {
                    const reset_cookie = ['select_season', 'select_subject'];
                    reset_cookie.forEach((val) => {
                      setCookie(val, default_cookie[val], {
                        expires: expires_date,
                      });
                    });
                    init_setting();
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
