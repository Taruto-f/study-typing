import { z } from 'zod';

const year_regex = /^(小学|中学|高校)[一二三四五六七八九]年$/;

export const TypeData = z.object({
  moji: z.string(),
  yomi: z.string(),
  mean: z.string(),
});

const DataArray = z.array(TypeData);

export const Subjects = z.object({
  season: z.number().int().min(1).max(3), // 学期
  jp: DataArray, // 国語
  math: DataArray, // 数学・算数
  social: DataArray, // 社会
  science: DataArray, // 理科
  english: DataArray, // 英語
  pe: DataArray, // 保健体育
  music: DataArray, // 音楽
});

export const SeasonData = z.object({
  year: z.string().regex(year_regex), // 中学一年
  key: z.string(), // j1
  seasons: Subjects.array(),
});

const data_raw: Array<z.infer<typeof SeasonData>> = [
  {
    year: '小学六年',
    key: 's1',
    seasons: [
      {
        season: 3,
        jp: [],
        math: [],
        social: [],
        science: [],
        english: [],
        pe: [],
        music: [],
      },
    ],
  },
  {
    year: '中学一年',
    key: 'j1',
    seasons: [
      {
        season: 1,
        jp: [],
        math: [],
        social: [],
        science: [],
        english: [],
        pe: [],
        music: [],
      },
    ],
  },
];

export const datas = z.array(SeasonData).parse(data_raw);
