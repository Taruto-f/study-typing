'use client';
import { Card, CardBody } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Data } from '@/types/supabase/data';
import { get_id, is_session } from '@/utils/supabase/auth';
import Title from '@/components/ui/title';
import Value from '@/components/ui/value';
import { get_data } from '@/utils/supabase/database';

export default function DataPage() {
  const [data, setData] = useState<Partial<Data>>({});

  useEffect(() => {
    (async () => {
      if (await is_session()) {
        const user = await get_id();
        console.log(user);

        setData(await get_data());
      }
    })();
  }, []);

  return (
    <>
      <div className='py-4'>
        <Card>
          <CardBody>
            <div className='flex flex-col my-12 py-2 gap-20 items-center justify-center'>
              <Title>今までの記録</Title>
              <div className='grid grid-cols-2 gap-y-8 gap-x-24'>
                <Value label='答えた問題数' val={data.answer_sum}></Value>
                <Value label='正しく打った数' val={data.type_sum}></Value>
                <Value label='合計得点' val={data.point_sum}></Value>
                <Value label='最大得点' val={data.max_point}></Value>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
