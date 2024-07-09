import { z } from 'zod';

const year_regex = /^(小学|中学|高校)[一-九]年$/;

export const TypeData = z.object({
  moji: z.string(),
  yomi: z.string(),
  mean: z.string(),
});

const DataArray = z.array(TypeData);

export const SeasonData = z.object({
  year: z.string().regex(year_regex), // 中学一年
  season: z.number().int().min(1).max(3), // 学期
  jp: DataArray, // 国語
  math: DataArray, // 数学・算数
  social: DataArray, // 社会
  science: DataArray, // 理科
  english: DataArray, // 英語
  pe: DataArray, // 保健体育
  music: DataArray, // 音楽
});

const DataRaw: Array<z.infer<typeof SeasonData>> = [
  {
    year: '中学一年',
    season: 1,
    jp: [],
    math: [],
    social: [],
    science: [],
    english: [],
    pe: [],
    music: [],
  },
];

export const Datas = z.array(SeasonData).parse(DataRaw);
