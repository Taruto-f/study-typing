import { set_to_str } from '@/utils/util';
import { faker } from '@faker-js/faker';

test('シンプル', () => {
  const dat = new Set<string>(['a', 'b', 'c']);

  expect(set_to_str(dat)).toBe('a,b,c');
});

test('ランダム', () => {
  const dat = new Set<string>();
  const ans = [];
  for (let i = 0; i < 100; ++i) {
    const val = faker.string.alpha(10);
    dat.add(val);
    ans.push(val);
  }

  expect(set_to_str(dat)).toBe(ans.join(','));
});
