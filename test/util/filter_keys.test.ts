import { filter_keys } from '@/app/util';

test('該当なし', () => {
  const dat: Record<string, number> = {
    adf: 33,
    buier: 8,
    de: 3,
    snd: 3,
  };

  expect(filter_keys(dat, -1)).toStrictEqual([]);
});

test('一つ該当', () => {
  const dat: Record<string, number> = {
    hello: 1,
  };

  expect(filter_keys(dat, 1)).toStrictEqual(['hello']);
});
