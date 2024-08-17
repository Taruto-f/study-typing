'use client';

import Title from '@/components/ui/title';
import { Data } from '@/types/supabase/data';
import { get_id } from '@/utils/supabase/auth';
import { supabase } from '@/utils/supabase/client';
import {
  Card,
  CardBody,
  CardHeader,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Tooltip,
} from '@nextui-org/react';
import { useEffect, useState, useMemo } from 'react';
import { Source_Code_Pro } from 'next/font/google';

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
});

type NumKey = {
  [K in keyof Data]: Data[K] extends number ? K : never;
}[keyof Data];

function add_rank<K extends NumKey>(data: Data[] | null, key: K): RankData[] {
  if (data === null) return [];

  const n = data.length;
  const ret: RankData[] = new Array<RankData>(n);

  const ranktmp = new Array<number>(n);
  for (let i = 0; i < n; ++i) {
    ranktmp[i] = data[i][key];
  }

  const rank: Record<number, number> = {};
  const rank_in = new Set<number>();
  for (let i = 0; i < n; ++i) {
    if (!rank_in.has(data[i][key])) {
      rank[data[i][key]] = i + 1;
      rank_in.add(data[i][key]);
    }
  }

  for (let i = 0; i < data.length; i++) {
    ret[i] = Object.assign({}, data[i], { rank: rank[data[i][key]] });
  }

  return ret;
}

interface SelectColumn {
  key: string;
  name: string;
}

interface RankData extends Data {
  rank: number;
}

function ShowTable({
  data,
  label,
  id,
}: {
  data: RankData[];
  label: SelectColumn;
  id: string;
}) {
  const cols: SelectColumn[] = [
    {
      key: 'rank',
      name: '順位',
    },
    {
      key: 'name',
      name: '名前',
    },
  ].concat(label);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <>
      <Table
        selectedKeys={[id]}
        selectionMode='single'
        color='primary'
        aria-label='Ranking'
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={cols}>
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent='データなし'>
          {(item) => {
            return (
              <TableRow key={item.id} aria-label='Table Row'>
                {(colkey) => {
                  return (
                    <TableCell>
                      <div className={`text-medium ${SourceCodePro.className}`}>
                        <Tooltip
                          content={'ID: ' + item.id}
                          isDisabled={colkey !== 'name'}
                          placement='top-start'
                          closeDelay={100}
                        >
                          {getKeyValue(item, colkey)}
                        </Tooltip>
                      </div>
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}

function ShowCard({
  title,
  keys,
  id,
}: {
  title: string;
  keys: NumKey;
  id: string;
}) {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    (async () => {
      setData(
        (
          await supabase
            .from('users')
            .select('*')
            .order(keys, { ascending: false })
            .order('name', { ascending: true })
            .order('id', { ascending: true })
        ).data!
      );
    })();
  }, [keys]);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-center w-full py-4'>
          <Title>{title}ランキング</Title>
        </div>
      </CardHeader>
      <CardBody>
        <ShowTable
          data={add_rank(data, keys)}
          label={{
            key: keys,
            name: title,
          }}
          id={id}
        ></ShowTable>
      </CardBody>
    </Card>
  );
}

export default function Ranking() {
  const [my_id, setId] = useState('');

  useEffect(() => {
    (async () => {
      setId(await get_id());
    })();
  }, []);

  return (
    <>
      <div className={`py-4 grid grid-cols-2 gap-4`}>
        <ShowCard title='最高得点' keys='max_point' id={my_id}></ShowCard>
        <ShowCard title='累計得点' keys='point_sum' id={my_id}></ShowCard>
        <ShowCard title='累計タイプ数' keys='type_sum' id={my_id}></ShowCard>
        <ShowCard title='累計回答数' keys='answer_sum' id={my_id}></ShowCard>
      </div>
    </>
  );
}
