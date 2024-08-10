'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Param() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const data = {
      select_season: params.get('season'),
      select_subject: params.get('subject'),
      show_roman: params.get('roman'),
      show_word: params.get('word'),
      time: params.get('time'),
    };

    if (data.show_word === 'false') data.show_roman = 'false';

    const key = Object.keys(data) as (keyof typeof data)[];
    let ok = true;
    for (let i = 0; i < key.length; ++i) {
      if (data[key[i]] === null) {
        alert(`Error: ${key[i]}が足りません!`);
        ok = false;
        break;
      } else {
        localStorage.setItem(key[i], data[key[i]]!);
      }
    }

    if (ok) router.replace('/play');
    else router.replace('/');
  });

  return (
    <div className='absolute inset-0 w-full flex flex-col items-center justify-center'>
      <p className='font-bold text-3xl'>Loading...</p>
    </div>
  );
}

export default function Share() {
  return (
    <Suspense>
      <Param />
    </Suspense>
  );
}
