'use client';

import { Source_Code_Pro } from 'next/font/google';

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
});

export default function Value({
  label,
  val,
}: {
  label: string;
  val: number | string | undefined;
}) {
  return (
    <div className='flex flex-col items-center w-full'>
      <p>{label}</p>
      <p className={`${SourceCodePro.className} text-3xl`}>{val ?? '-'}</p>
    </div>
  );
}
