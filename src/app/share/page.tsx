'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Share() {
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

  return null;
}
