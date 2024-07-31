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
import { useCallback, useEffect, useRef } from 'react';
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

  const words = useRef<Words[]>();

  const once = useRef(true);

  const keyHand = useCallback((event: KeyboardEvent) => {
    console.log(event.code);
  }, []);

  useEffect(() => {
    if (once.current) {
      document.addEventListener('keydown', keyHand, false);

      if (to_bool(localStorage.getItem('show_help')!)) {
        onHelpOpen();
      }

      words.current = get_words(
        str_to_set(localStorage.getItem('select_season')!),
        str_to_set(localStorage.getItem('select_subject')!)
      );
      console.log(words.current);

      once.current = false;
    }

    return () => document.removeEventListener('keydown', keyHand);
  }, [keyHand, onHelpOpen]);

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
              <p className='text-2xl'>国語</p>
              <div className='flex flex-col justify-center items-center m-8'>
                <h1 className='text-7xl font-bold'>単語</h1>
                <p className='text-xl'>たんご</p>
              </div>
              <p className='text-2xl'>単語の説明</p>
              <p className={`${SourceCodePro.className} text-3xl`}>
                t<span className='text-default-400'>ango</span>
              </p>
            </div>
          </CardBody>
          <Divider></Divider>
          <CardFooter>
            <div className='h-20 flex items-center w-full justify-center space-x-4'>
              <div className='flex flex-col items-center w-full'>
                <p>得点</p>
                <p className={`${SourceCodePro.className} text-3xl`}>1</p>
              </div>
              <Divider orientation='vertical'></Divider>
              <div className='flex flex-col items-center w-full'>
                <p>ストリーク</p>
                <p className={`${SourceCodePro.className} text-3xl`}>1</p>
              </div>
              <Divider orientation='vertical'></Divider>
              <div className='flex flex-col items-center w-full'>
                <p>回答数</p>
                <p className={`${SourceCodePro.className} text-3xl`}>0</p>
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
