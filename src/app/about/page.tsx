'use client';

import { Card, CardBody } from '@nextui-org/react';

export default function About() {
  return (
    <div className='py-4'>
      <Card>
        <CardBody>
          <div className='my-8 flex flex-col items-center py-2 gap-12'>
            <h1 className='text-4xl font-bold'>About</h1>
            <div className='flex flex-col items-center justify-center w-full'>
              <p>
                Study
                Typingは、学年・教科を指定して単語をタイピングすることができるサイトです。
              </p>
              <p>料金はかからず、全て無料で利用できます。</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
