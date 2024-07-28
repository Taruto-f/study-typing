import { z } from 'zod';

const year_regex = /^(小学|中学|高校)[一二三四五六七八九]年$/;

export const TypeData = z.object({
  moji: z.string(),
  yomi: z.string(),
  mean: z.string(),
});

const DataArray = z.array(TypeData).optional();

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

export type SubjectsType = keyof Omit<z.infer<typeof Subjects>, 'season'>;
export type SubjectNameType = Record<SubjectsType, string>;

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

export const subject_names: SubjectNameType = {
  jp: '国語',
  math: '数学/算数',
  science: '理科',
  social: '社会',
  english: '英語',
  music: '音楽',
  pe: '保健体育',
};
export const subjects = Object.keys(subject_names) as SubjectsType[];
export const map_data: Record<string, z.infer<typeof Subjects>> = (() => {
  const ret: Record<string, z.infer<typeof Subjects>> = {};

  datas.forEach((year) => {
    year.seasons.forEach((season) => {
      ret[`${year.key}_${season.season}`] = season;
    });
  });

  return ret;
})();
console.log(map_data);

export function exist_subject(
  keys: Set<string>
): Record<SubjectsType, boolean> {
  const ans: Record<SubjectsType, boolean> = {} as Record<
    SubjectsType,
    boolean
  >;

  for (let i = 0; i < subjects.length; ++i) {
    ans[subjects[i]] = false;
  }

  keys.forEach((key) => {
    const season = map_data[key];
    const season_keys = Object.keys(season);
    season_keys.forEach((val) => {
      if (val !== 'season') {
        ans[val as SubjectsType] = true;
      }
    });
  });

  return ans;
}

interface SubjectSelect {
  key: SubjectsType;
  name: string;
}

export const subjects_select: SubjectSelect[] = (() => {
  const ans: SubjectSelect[] = [];
  for (let i = 0; i < subjects.length; ++i) {
    ans.push({
      key: subjects[i],
      name: subject_names[subjects[i]],
    });
  }

  return ans;
})();

export function seasons_to_str(season: Set<string>): string {
  const ret: string[] = [];
  datas.forEach((dat) => {
    for (let i = 1; i <= 3; ++i) {
      if (season.has(`${dat.key}_${i}`)) {
        ret.push(`${dat.year} ${i}学期`);
      }
    }
  });

  return ret.join(' / ');
}

export function subjects_to_str(subject: Set<string>): string {
  const ret: string[] = [];
  subjects.forEach((key) => {
    if (subject.has(key)) ret.push(subject_names[key]);
  });
  return ret.join(', ');
}
