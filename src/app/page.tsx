'use client';

import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Select,
  SelectItem,
  SelectSection,
  Selection,
  Switch,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { themes } from './theme';
import { useEffect, useState } from 'react';
import { default_storage, reset_storage } from './localstorage';
import {
  datas,
  exist_subject,
  seasons_to_str,
  subjects,
  subjects_select,
  subjects_to_str,
} from './data';
import {
  filter_keys,
  only_enable,
  set_to_str,
  str_to_set,
  to_bool,
  btos,
} from './util';

export default function Home() {
  // 初期設定類
  const { theme, setTheme } = useTheme();

  const [show_theme, setShowTheme] = useState('system');
  const [select_season, setSeason] = useState<Selection>(new Set([]));

  const [text_season, setTextSeason] = useState<string>('');

  const [select_subject, setSubject] = useState<Selection>(new Set([]));
  const [text_subject, setTextSubject] = useState<string>('');
  const [selectable_subject, setSelectableSubject] = useState<
    Record<string, boolean>
  >(exist_subject(new Set<string>()));
  const [enable_type, setEnableType] = useState<boolean>(true);
  const [enable_miss, setEnableMiss] = useState<boolean>(true);
  const [show_roman, setShowRoman] = useState<boolean>(true);
  const [show_word, setShowWord] = useState<boolean>(true);

  const init_setting = () => {
    const storage_seaosn = str_to_set<string>(
      localStorage.getItem('select_season')!
    );
    setSeason(storage_seaosn);
    setTextSeason(seasons_to_str(storage_seaosn));

    const selectable = exist_subject(storage_seaosn);
    setSelectableSubject(selectable);

    const storage_subject = str_to_set<string>(
      localStorage.getItem('select_subject')!
    );
    setSubject(storage_subject);
    setTextSubject(subjects_to_str(storage_subject));

    setEnableType(to_bool(localStorage.getItem('enable_type')!));
    setEnableMiss(to_bool(localStorage.getItem('enable_miss')!));

    setShowRoman(to_bool(localStorage.getItem('show_roman')!));
    setShowWord(to_bool(localStorage.getItem('show_word')!));
  };

  useEffect(() => {
    reset_storage();
    setShowTheme(theme!);
    init_setting();
  }, [theme, setSeason]);

  return (
    <>
      <div className='py-4'>
        <Card>
          <CardBody>
            <div className='py-4 justify-center items-center flex flex-col gap-4'>
              <div className='my-4 flex flex-col items-center py-2 gap-2'>
                <span className='text-3xl font-bold'>{text_season}</span>
                <span className='text-xl'>{text_subject}</span>
              </div>

              <Button
                color='primary'
                size='lg'
                variant='shadow'
                isDisabled={(select_subject as Set<string>).size === 0}
              >
                Start
              </Button>

              {(select_subject as Set<string>).size === 0 && (
                <Chip color='danger' size='sm' variant='flat'>
                  少なくとも一つの教科を選択している必要があります
                </Chip>
              )}
            </div>
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
                    localStorage.setItem(
                      'select_season',
                      set_to_str(keys as Set<string>)
                    );
                    setTextSeason(seasons_to_str(keys as Set<string>));

                    setSelectableSubject(exist_subject(keys as Set<string>));
                    const new_subject = only_enable<string>(
                      select_subject as Set<string>,
                      exist_subject(keys as Set<string>)
                    );
                    setSubject(new_subject);
                    setTextSubject(subjects_to_str(new_subject));
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
                    localStorage.setItem(
                      'select_subject',
                      set_to_str(keys as Set<string>)
                    );
                    setTextSubject(subjects_to_str(keys as Set<string>));
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
                    localStorage.setItem('select_subject', set_to_str(tmp));
                    setSubject(tmp);
                    setTextSubject(subjects_to_str(tmp));
                  }}
                >
                  全教科を選択
                </Button>
              </div>

              <div className='flex gap-4'>
                <Switch
                  color='success'
                  isSelected={show_roman}
                  onValueChange={(select) => {
                    setShowRoman(select);
                    localStorage.setItem('show_roman', btos(select));
                  }}
                >
                  ローマ字を表示
                </Switch>

                <Switch
                  color='success'
                  isSelected={show_word}
                  onValueChange={(select) => {
                    setShowWord(select);
                    localStorage.setItem('show_word', btos(select));
                  }}
                >
                  単語を表示
                </Switch>
              </div>

              <div className='flex gap-4'>
                <Button
                  color='danger'
                  variant='ghost'
                  onPress={() => {
                    const reset_cookie = [
                      'select_season',
                      'select_subject',
                      'show_roman',
                      'show_word',
                    ];
                    reset_cookie.forEach((val) => {
                      localStorage.setItem(val, default_storage[val]);
                    });
                    init_setting();
                  }}
                >
                  リセット
                </Button>
              </div>

              <Divider />
              <h1 className='font-bold'>環境設定</h1>
              <div className='flex gap-4'>
                <Switch
                  isSelected={enable_type}
                  onValueChange={(select) => {
                    setEnableType(select);
                    localStorage.setItem('enable_type', btos(select));
                  }}
                  color='success'
                >
                  タイプ音
                </Switch>
                <Switch
                  isSelected={enable_miss}
                  onValueChange={(select) => {
                    setEnableMiss(select);
                    localStorage.setItem(
                      'enable_miss',
                      select ? 'true' : 'false'
                    );
                  }}
                  color='success'
                >
                  ミス音
                </Switch>
              </div>

              <div>
                <Select
                  label='テーマ'
                  className='max-w-xs'
                  selectedKeys={[show_theme]}
                  onSelectionChange={(keys) => {
                    const new_theme = [...keys] as string[];

                    if (new_theme.length !== 0) {
                      setTheme(new_theme[0]);
                      localStorage.setItem('theme', new_theme[0]);
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
