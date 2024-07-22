import { TopTab } from '@/app/tabs';
import { render, screen } from '@testing-library/react';

test('タブチェック', () => {
  render(
    <TopTab>
      <span>test</span>
    </TopTab>
  );

  expect(screen.getByText('Home')).toBeDefined();
  expect(screen.getByText('Data')).toBeDefined();
});
