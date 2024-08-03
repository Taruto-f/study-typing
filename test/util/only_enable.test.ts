import { only_enable } from '@/utils/util';
import { faker } from '@faker-js/faker';

test('該当なし', () => {
  const dat = new Set<string>(['a', 'b', 'c']);
  const enable: Record<string, boolean> = {
    a: false,
    b: false,
    c: false,
  };

  expect(only_enable(dat, enable)).toStrictEqual(new Set<string>());
});

test('全部', () => {
  const dat = new Set<string>(['a', 'b', 'c']);
  const enable: Record<string, boolean> = {
    a: true,
    b: true,
    c: true,
  };

  expect(only_enable(dat, enable)).toStrictEqual(dat);
});

test('ランダム', () => {
  const dat = new Set<string>();
  const ans = new Set<string>();
  const enable: Record<string, boolean> = {};
  for (let i = 0; i < 100; ++i) {
    const key = faker.string.alpha(20);
    dat.add(key);

    const enab = faker.datatype.boolean();
    if (enab) ans.add(key);

    enable[key] = enab;
  }

  expect(only_enable(dat, enable)).toStrictEqual(ans);
});
