import { str_to_set } from '@/utils/type';
import { faker } from '@faker-js/faker';

test('シンプル', () => {
  const ans = new Set<string>(['a', 'b', 'c']);

  expect(str_to_set('a,b,c')).toStrictEqual(ans);
});

test('ランダム', () => {
  const dat: string[] = [];
  const ans = new Set<string>();

  for (let i = 0; i < 100; ++i) {
    const val = faker.string.alpha(10);
    dat.push(val);
    ans.add(val);
  }

  expect(str_to_set(dat.join(','))).toStrictEqual(ans);
});
