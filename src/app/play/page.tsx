'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from '@nextui-org/react';
import { shuffle } from 'fast-shuffle';
import { Word } from 'higgsino';
import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import { useRouter } from 'next/navigation';
import { Source_Code_Pro } from 'next/font/google';

import key1_mp3 from '#/key1.mp3';
import key2_mp3 from '#/key2.mp3';
import key3_mp3 from '#/key3.mp3';
import miss_mp3 from '#/miss.mp3';

import { get_words, Words } from '@/utils/data';
import Value from '@/components/ui/value';
import { gen_url, share_text, x, line } from '@/utils/share';
import { inf_timer } from '@/utils/data';
import { str_to_set, to_bool, btos } from '@/utils/type';
import { Data } from '@/types/supabase/data';
import { get_data } from '@/utils/supabase/database';
import { supabase } from '@/utils/supabase/client';
import { get_id } from '@/utils/supabase/auth';

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // 上限は除き、下限は含む
}

function set_sec(sec: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + sec);
  return time;
}

export default function Play() {
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onOpenChange: onHelpOpenChange,
  } = useDisclosure();
  const router = useRouter();

  const {
    isOpen: isResultOpen,
    onOpen: onResultOpen,
    onOpenChange: onResultOpenChange,
  } = useDisclosure();

  const words = useRef<Words[]>([]);
  const [pos, setPos] = useState(-1);

  const show_roman = useRef(true);
  const show_word = useRef(true);
  const enable_keysound = useRef(true);
  const enbale_misssound = useRef(true);
  const time_infinity = useRef(false);

  const word = useRef(new Word('', ''));
  const [typed, setTyped] = useState('');
  const [untyped, setUntyped] = useState('');

  const [point, setPoint] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answer, setAnswer] = useState(0);

  const [inited, setInited] = useState(false);
  const [started, setStarted] = useState(false);
  const [new_record, setNewRecord] = useState(false);

  // results
  const key_cnt = useRef(0);
  const miss_cnt = useRef(0);
  const skip_cnt = useRef(0);
  const time = useRef(60);

  const cancel = useRef(false);
  const share_url = useRef('https://example.com');
  const new_data = useRef<Data>({
    id: '',
    answer_sum: 0,
    max_point: 0,
    name: '',
    point_sum: 0,
    type_sum: 0,
  });

  // sounds
  const [key1] = useSound(key1_mp3, { interrupt: false });
  const [key2] = useSound(key2_mp3, { interrupt: false });
  const [key3] = useSound(key3_mp3, { interrupt: false });
  const [miss] = useSound(miss_mp3, { interrupt: false });

  async function update_data() {
    if (!cancel.current) {
      new_data.current.answer_sum += answer;
      new_data.current.point_sum += point;
      new_data.current.type_sum += key_cnt.current;

      if (new_data.current.max_point < point) {
        new_data.current.max_point = point;
        setNewRecord(true);
      }
      const id = await get_id();
      await supabase.from('users').update(new_data.current).eq('id', id);
    }
  }

  const { totalSeconds, isRunning, restart, pause } = useTimer({
    expiryTimestamp: set_sec(60),
    autoStart: false,
    onExpire: () => {
      onResultOpen();
      update_data();
    },
  });

  const init = useCallback(() => {
    words.current = shuffle(
      get_words(
        str_to_set(localStorage.getItem('select_season')!),
        str_to_set(localStorage.getItem('select_subject')!)
      )
    );
    setPos(0);
    word.current = new Word(words.current[0].moji, words.current[0].yomi);
    setTyped('');
    setUntyped(word.current.roman.untyped);
  }, []);

  const keyHandler = useCallback(
    (event: KeyboardEvent) => {
      const next = () => {
        const new_pos = pos + 1;
        if (new_pos < words.current.length) {
          setPos(new_pos);
          word.current = new Word(
            words.current[new_pos].moji,
            words.current[new_pos].yomi
          );
          setTyped('');
          setUntyped(word.current.roman.untyped);
        } else {
          setPos(0);
          init();
        }
      };

      if (inited && !isHelpOpen && !isResultOpen) {
        if (/^[a-z0-9-]$/.test(event.key)) {
          if (!isRunning) {
            restart(set_sec(time.current));
            setStarted(true);
          }

          const result = word.current.typed(event.key);
          setTyped(word.current.roman.typed);
          setUntyped(word.current.roman.untyped);

          if (!result.isMiss) {
            setStreak(streak + 1);
            setPoint(point + Math.ceil((streak + 1) / 6));
            key_cnt.current++;

            if (enable_keysound.current) {
              const sound = getRandomInt(0, 3);
              if (sound === 0) key1();
              else if (sound === 1) key2();
              else if (sound === 2) key3();
            }
          } else {
            setStreak(0);
            miss_cnt.current++;

            if (enbale_misssound.current) {
              miss();
            }
          }

          if (result.isFinish) {
            setAnswer(answer + 1);
            next();
          }
        } else if (event.code === 'Space') {
          setPoint(Math.round(point / 2));
          setStreak(0);
          skip_cnt.current++;

          if (!isRunning) {
            restart(set_sec(time.current));
            setStarted(true);
          }

          if (enbale_misssound.current) {
            miss();
          }

          next();
        } else if (event.code === 'Escape') {
          pause();
          cancel.current = true;
          onResultOpen();
        }
      }
    },
    [
      point,
      streak,
      pos,
      answer,
      init,
      key1,
      key2,
      key3,
      miss,
      isHelpOpen,
      inited,
      isRunning,
      isResultOpen,
      restart,
      pause,
      onResultOpen,
    ]
  );

  useEffect(() => {
    if (!inited) {
      if (to_bool(localStorage.getItem('show_help')!)) {
        onHelpOpen();
      }

      init();

      show_roman.current = to_bool(localStorage.getItem('show_roman')!);
      show_word.current = to_bool(localStorage.getItem('show_word')!);

      enable_keysound.current = to_bool(localStorage.getItem('enable_type')!);
      enbale_misssound.current = to_bool(localStorage.getItem('enable_miss')!);

      time.current = Number(localStorage.getItem('time')!);
      time_infinity.current = String(time.current) == inf_timer;

      share_url.current = gen_url(
        localStorage.getItem('select_season')!,
        localStorage.getItem('select_subject')!,
        show_roman.current,
        show_word.current,
        time.current
      );

      (async () => {
        new_data.current = await get_data();
        setInited(true);
      })();
    }

    document.addEventListener('keydown', keyHandler, false);

    return () => document.removeEventListener('keydown', keyHandler);
  }, [keyHandler, onHelpOpen, init, inited]);

  return (
    <>
      <div className='py-4 w-full'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center w-full'>
              <Skeleton className='rounded-lg' isLoaded={inited}>
                <p className={`${SourceCodePro.className} text-2xl`}>
                  {time_infinity.current
                    ? 'Infinity'
                    : started
                      ? totalSeconds
                      : time.current}
                </p>
              </Skeleton>
            </div>
          </CardHeader>
          <Divider></Divider>
          <CardBody>
            <div className='flex flex-col justify-center items-center h-96 gap-5 m-5'>
              <Skeleton className='rounded-lg' isLoaded={inited}>
                <p className='text-2xl'>
                  {pos == -1 ? '総合' : words.current[pos].subject}
                </p>
              </Skeleton>

              <div className='flex flex-col justify-center items-center m-8 gap-2'>
                <Skeleton className='rounded-lg' isLoaded={inited}>
                  <h1 className='text-7xl font-bold'>
                    {pos == -1
                      ? '読み込み中'
                      : show_word.current
                        ? words.current[pos].moji
                        : '???'}
                  </h1>
                </Skeleton>

                <Skeleton className='rounded-lg' isLoaded={inited}>
                  <p className='text-xl'>
                    {pos == -1
                      ? 'よみこみちゅう'
                      : show_word.current
                        ? words.current[pos].yomi
                        : '???'}
                  </p>
                </Skeleton>
              </div>

              <Skeleton className='rounded-lg' isLoaded={inited}>
                <div className='text-2xl'>
                  {pos == -1
                    ? 'ゲーム開始のための処理をしています'
                    : words.current[pos].mean}
                </div>
              </Skeleton>

              <p className={`${SourceCodePro.className} text-3xl`}>
                <span>{typed}</span>
                {show_roman.current && (
                  <span className='text-default-400'>{untyped}</span>
                )}
              </p>
            </div>
          </CardBody>
          <Divider></Divider>
          <CardFooter>
            <div className='h-20 flex items-center w-full justify-center space-x-4'>
              <Value label='得点' val={point}></Value>
              <Divider orientation='vertical'></Divider>
              <Value label='ストリーク' val={streak}></Value>
              <Divider orientation='vertical'></Divider>
              <Value label='回答数' val={answer}></Value>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* 説明 */}
      <Modal isOpen={isHelpOpen} onOpenChange={onHelpOpenChange} size='3xl'>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>説明</ModalHeader>
                <ModalBody>
                  <ul>
                    <li>
                      ・表示された単語の
                      <span className='font-bold underline'>読み</span>
                      を入力してください。
                    </li>
                    <li>
                      ・連続して正しくタイピングすることでストリークが増え、得点をより多く得ることができます。
                    </li>
                    <li>
                      ・スペースキーを押すことで、得点を消費して問題をスキップすることが出来ます。
                    </li>
                    <li>・Escキーを押すことで、中断することが出来ます。</li>
                    <li>・キーを打ち始めてから開始です。</li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <Checkbox
                    onValueChange={(selected) => {
                      localStorage.setItem('show_help', btos(!selected));
                    }}
                  >
                    今後表示しない
                  </Checkbox>
                  <Button onPress={onClose} color='primary' variant='shadow'>
                    開始
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>

      {/* 結果 */}
      <Modal
        isOpen={isResultOpen}
        onOpenChange={onResultOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        size='lg'
      >
        <ModalContent>
          <ModalHeader>結果</ModalHeader>
          <ModalBody>
            <div className='flex flex-col items-center justify-center w-full gap-y-4'>
              {new_record && (
                <div className='flex flex-col items-center justify-center w-full'>
                  <Chip variant='flat' color='warning'>
                    NEW RECORD!
                  </Chip>
                </div>
              )}
              <Value label='得点' val={point}></Value>
              <div className='grid grid-cols-2 gap-y-4'>
                <Value label='回答数' val={answer}></Value>
                <Value label='スキップ回数' val={skip_cnt.current}></Value>
                <Value label='正しく打った回数' val={key_cnt.current}></Value>
                <Value label='ミス回数' val={miss_cnt.current}></Value>
                <Value
                  label='打/sec'
                  val={
                    cancel.current
                      ? '-'
                      : (key_cnt.current / time.current).toFixed(1)
                  }
                ></Value>
                <Value
                  label='正確率'
                  val={
                    key_cnt.current + miss_cnt.current !== 0
                      ? `${((key_cnt.current / (key_cnt.current + miss_cnt.current)) * 100).toFixed(1)}%`
                      : '-'
                  }
                ></Value>
              </div>
            </div>
            {cancel.current && (
              <div className='flex flex-col items-center justify-center w-full'>
                <Chip variant='flat'>今回の結果は反映されません</Chip>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <div className='flex w-full'>
              <Dropdown>
                <DropdownTrigger>
                  <Button size='lg' isDisabled={cancel.current}>
                    シェア
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key='x'
                    href={x(share_text(point), share_url.current)}
                    target='_about'
                  >
                    X(Twitter)
                  </DropdownItem>
                  <DropdownItem
                    key='line'
                    href={line(share_text(point), share_url.current)}
                    target='_about'
                  >
                    LINE
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div className='ml-auto flex gap-4'>
                <Button size='lg' onPress={() => router.replace('/')}>
                  ホーム
                </Button>
                <Button
                  size='lg'
                  color='primary'
                  onPress={() => window.location.reload()}
                >
                  もう一度やる
                </Button>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
