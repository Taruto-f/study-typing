'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Source_Code_Pro } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import { shuffle } from 'fast-shuffle';
import { Word } from 'higgsino';
import { btos, str_to_set, to_bool } from '../util';
import { get_words, Words } from '../data';

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
});

export default function Play() {
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onOpenChange: onHelpOpenChange,
  } = useDisclosure();

  const words = useRef<Words[]>([]);
  const [pos, setPos] = useState(-1);

  const show_roman = useRef(true);
  const show_word = useRef(true);
  const word = useRef(new Word('', ''));
  const [typed, setTyped] = useState('');
  const [untyped, setUntyped] = useState('');

  const [point, setPoint] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answer, setAnswer] = useState(0);

  const once = useRef(true);

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

      if (/^[a-z]$/.test(event.key)) {
        const result = word.current.typed(event.key);
        setTyped(word.current.roman.typed);
        setUntyped(word.current.roman.untyped);

        if (!result.isMiss) {
          setStreak(streak + 1);
          setPoint(point + Math.ceil((streak + 1) / 6));
        } else {
          setStreak(0);
        }

        if (result.isFinish) {
          setAnswer(answer + 1);
          next();
        }
      } else if (event.code === 'Space') {
        setPoint(Math.round(point / 2));
        setStreak(0);
        next();
      }

      console.log(event.code, event.key);
    },
    [point, streak, pos, answer, init]
  );

  useEffect(() => {
    if (once.current) {
      if (to_bool(localStorage.getItem('show_help')!)) {
        onHelpOpen();
      }

      init();

      show_roman.current = to_bool(localStorage.getItem('show_roman')!);
      show_word.current = to_bool(localStorage.getItem('show_word')!);

      once.current = false;
    }

    document.addEventListener('keydown', keyHandler, false);

    return () => document.removeEventListener('keydown', keyHandler);
  }, [keyHandler, onHelpOpen, init]);

  return (
    <>
      <div className='py-4 w-full'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center w-full'>
              <p className={`${SourceCodePro.className} text-2xl`}>60</p>
            </div>
          </CardHeader>
          <Divider></Divider>
          <CardBody>
            <div className='flex flex-col justify-center items-center h-96 gap-5 m-5'>
              <p className='text-2xl'>
                {pos == -1 ? '総合' : words.current[pos].subject}
              </p>
              <div className='flex flex-col justify-center items-center m-8 gap-2'>
                <h1 className='text-7xl font-bold'>
                  {pos == -1
                    ? '読み込み中'
                    : show_word.current
                      ? words.current[pos].moji
                      : '???'}
                </h1>
                <p className='text-xl'>
                  {pos == -1
                    ? 'よみこみちゅう'
                    : show_word.current
                      ? words.current[pos].yomi
                      : '???'}
                </p>
              </div>
              <p className='text-2xl'>
                {pos == -1
                  ? 'ゲーム開始のための処理をしています'
                  : words.current[pos].mean}
              </p>
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
              <div className='flex flex-col items-center w-full'>
                <p>得点</p>
                <p className={`${SourceCodePro.className} text-3xl`}>{point}</p>
              </div>
              <Divider orientation='vertical'></Divider>
              <div className='flex flex-col items-center w-full'>
                <p>ストリーク</p>
                <p className={`${SourceCodePro.className} text-3xl`}>
                  {streak}
                </p>
              </div>
              <Divider orientation='vertical'></Divider>
              <div className='flex flex-col items-center w-full'>
                <p>回答数</p>
                <p className={`${SourceCodePro.className} text-3xl`}>
                  {answer}
                </p>
              </div>
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
    </>
  );
}
