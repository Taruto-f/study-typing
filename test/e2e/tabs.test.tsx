import { TopTab } from '@/components/tabs';
import { render, screen } from '@testing-library/react';

test('タブチェック', () => {
  render(
    <TopTab force>
      <span>test</span>
    </TopTab>
  );

  expect(screen.getByText('Home')).toBeDefined();
  expect(screen.getByText('Data')).toBeDefined();
  expect(screen.getByText('Ranking')).toBeDefined();
  expect(screen.getByText('About')).toBeDefined();
});
