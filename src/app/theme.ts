interface Theme {
  id: string;
  name: string;
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'ライト',
  },
  {
    id: 'dark',
    name: 'ダーク',
  },
  {
    id: 'system',
    name: 'システムの既定',
  },
];
