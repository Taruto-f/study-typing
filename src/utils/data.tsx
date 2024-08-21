import { ReactElement } from 'react';
import { InlineMath as Math } from 'react-katex';
import { z } from 'zod';

const year_regex = /^(小学|中学|高校)[一二三四五六七八九]年$/;

export const TypeData = z.object({
  moji: z.string(),
  yomi: z.string().regex(/^[ぁ-んー]+$/),
  mean: z.string().or(z.custom<ReactElement>()),
});

const DataArray = z.array(TypeData).optional();

export const Subjects = z.object({
  season: z.number().int().min(1).max(3), // 学期
  jp: DataArray, // 国語
  math: DataArray, // 数学・算数
  geography: DataArray, // 地理
  history: DataArray, // 歴史
  civics: DataArray, // 公民
  science: DataArray, // 理科
  english: DataArray, // 英語
  pe: DataArray, // 保健体育
  music: DataArray, // 音楽
  tech: DataArray, // 技術
  home: DataArray, // 家庭科
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
    year: '中学一年',
    key: 'j1',
    seasons: [
      {
        season: 1,
        jp: [
          {
            moji: '母音',
            yomi: 'ぼいん',
            mean: 'あ・い・う・え・おの音',
          },
          {
            moji: '子音',
            yomi: 'しいん',
            mean: '母音以外の音',
          },
          {
            moji: '濁音',
            yomi: 'だくおん',
            mean: '「が」、「ば」のように「゛」が付く音',
          },
          {
            moji: '半濁音',
            yomi: 'はんだくおん',
            mean: '「ぱ」、「ぽ」のように「゜」が付く音',
          },
          {
            moji: '拗音',
            yomi: 'ようおん',
            mean: '小さい「ゃ」、「ゅ」、「ょ」を使う音。',
          },
          {
            moji: '撥音',
            yomi: 'はつおん',
            mean: '「ん」の音',
          },
          {
            moji: '促音',
            yomi: 'そくおん',
            mean: '「っ」の音',
          },
          {
            moji: '長音',
            yomi: 'ちょうおん',
            mean: '伸ばす「ー」の音',
          },
          {
            moji: '音節',
            yomi: 'おんせつ',
            mean: 'ひとまとまりの音',
          },
        ],
        math: [
          {
            moji: '正の符号',
            yomi: 'せいのふごう',
            mean: (
              <>
                「<Math math='+'></Math>」の符号のこと
              </>
            ),
          },
          {
            moji: '負の符号',
            yomi: 'ふのふごう',
            mean: (
              <>
                「<Math math='-'></Math>」の符号のこと
              </>
            ),
          },
          {
            moji: '正の数',
            yomi: 'せいのすう',
            mean: (
              <>
                <Math math='0'></Math>より大きい数
              </>
            ),
          },
          {
            moji: '負の数',
            yomi: 'ふのすう',
            mean: (
              <>
                <Math math='0'></Math>より小さい数
              </>
            ),
          },
          {
            moji: '自然数',
            yomi: 'しぜんすう',
            mean: '正の整数',
          },
          {
            moji: '原点',
            yomi: 'げんてん',
            mean: '数直線上の基準となる点',
          },
          {
            moji: '絶対値',
            yomi: 'ぜったいち',
            mean: '数直線上のある数と原点の距離',
          },
          {
            moji: '加法',
            yomi: 'かほう',
            mean: '足し算のこと',
          },
          {
            moji: '加法の交換法則',
            yomi: 'かほうのこうかんほうそく',
            mean: (
              <div className='flex flex-col justify-center items-center'>
                加法の順番を変えても、その和が変わらない法則
                <br />
                <Math math='a+b=b+a'></Math>
              </div>
            ),
          },
          {
            moji: '素数',
            yomi: 'そすう',
            mean: (
              <>
                <Math math='1'></Math>とその数自身でしか割り切れない数
              </>
            ),
          },
        ],
        geography: [
          {
            moji: 'ユーラシア大陸',
            yomi: 'ゆーらしあたいりく',
            mean: 'アジア・ヨーロッパを含む大陸',
          },
          {
            moji: 'アフリカ大陸',
            yomi: 'あふりかたいりく',
            mean: 'アフリカ全土を含む大陸',
          },
          {
            moji: '北アメリカ大陸',
            yomi: 'きたあめりかたいりく',
            mean: 'アメリカ・カナダ等を含む大陸',
          },
          {
            moji: '南アメリカ大陸',
            yomi: 'みなみあめりかたいりく',
            mean: 'ブラジル・チリ等を含む大陸',
          },
          {
            moji: 'オーストラリア大陸',
            yomi: 'おーすとらりあたいりく',
            mean: 'オーストラリアを含む一番小さな大陸',
          },
          {
            moji: '南極大陸',
            yomi: 'なんきょくたいりく',
            mean: '南極の土地を含む大陸',
          },
          {
            moji: '太平洋',
            yomi: 'たいへいよう',
            mean: '地球で最も大きい海洋',
          },
          {
            moji: '大西洋',
            yomi: 'たいせいよう',
            mean: 'アメリカとヨーロッパの間に位置する海洋',
          },
          {
            moji: 'インド洋',
            yomi: 'いんどよう',
            mean: 'インドの南に位置する海洋',
          },
          {
            moji: '赤道',
            yomi: 'せきどう',
            mean: '北半球と南半球を分ける線',
          },
          {
            moji: '緯線',
            yomi: 'いせん',
            mean: '赤道と平行にひかれた線',
          },
          {
            moji: '経線',
            yomi: 'けいせん',
            mean: '北極点と南極点を結んだ、赤道と垂直の線',
          },
        ],
        science: [
          {
            moji: '柱頭',
            yomi: 'ちゅうとう',
            mean: 'めしべの花柱の先の部分',
          },
          {
            moji: '子房',
            yomi: 'しぼう',
            mean: 'めしべの根元の膨らんだ部分',
          },
          {
            moji: '葯',
            yomi: 'やく',
            mean: 'おしべの先にある花粉が入った袋',
          },
          {
            moji: '花弁',
            yomi: 'かべん',
            mean: '花びらのこと',
          },
          {
            moji: '合弁花',
            yomi: 'ごうべんか',
            mean: '花弁が互いにくっついている花',
          },
          {
            moji: '離弁花',
            yomi: 'りべんか',
            mean: '花弁が互いに離れている花',
          },
          {
            moji: '胚珠',
            yomi: 'はいしゅ',
            mean: '子房の中にある、受粉すると種子になる小さな粒',
          },
          {
            moji: '受粉',
            yomi: 'じゅふん',
            mean: 'めしべの柱頭におしべの花粉が付くこと',
          },
          {
            moji: '果実',
            yomi: 'かじつ',
            mean: '植物の実',
          },
          {
            moji: '種子植物',
            yomi: 'しゅししょくぶつ',
            mean: '種子ができる植物',
          },
          {
            moji: '虫媒花',
            yomi: 'ちゅうばいか',
            mean: '虫が花粉を運ぶ植物',
          },
          {
            moji: '風媒花',
            yomi: 'ふうばいか',
            mean: '風が花粉を運ぶ植物',
          },
          {
            moji: '葉脈',
            yomi: 'ようみゃく',
            mean: '葉の中の細い筋',
          },
          {
            moji: '網状脈',
            yomi: 'もうじょうみゃく',
            mean: '網目状の葉脈',
          },
          {
            moji: '平行脈',
            yomi: 'へいこうみゃく',
            mean: '平行に伸びている葉脈',
          },
          {
            moji: '主根',
            yomi: 'しゅこん',
            mean: '双子葉類の太い根',
          },
          {
            moji: '側根',
            yomi: 'そっこん',
            mean: '主根から生える細い根',
          },
          {
            moji: 'ひげ根',
            yomi: 'ひげね',
            mean: '複数の小さい根からなる根の種類',
          },
        ],
      },
    ],
  },
];

export const datas = z.array(SeasonData).parse(data_raw);

export const subject_names: SubjectNameType = {
  jp: '国語',
  math: '数学(算数)',
  geography: '地理(社会)',
  history: '歴史(社会)',
  civics: '公民(社会)',
  science: '理科',
  english: '英語',
  music: '音楽',
  pe: '保健体育',
  tech: '技術',
  home: '家庭科',
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

export interface Words extends z.infer<typeof TypeData> {
  subject: string;
}
export function get_words(
  seasons: Set<string>,
  subjects_set: Set<string>
): Words[] {
  const subjects = [...subjects_set] as SubjectsType[];

  const ans: Words[] = [];

  datas.forEach((val) => {
    val.seasons.forEach((season) => {
      if (seasons.has(`${val.key}_${season.season}`)) {
        subjects.forEach((subject) => {
          if (season[subject] !== undefined) {
            const words = season[subject];
            words.forEach((word) => {
              ans.push({
                ...word,
                subject: subject_names[subject],
              });
            });
          }
        });
      }
    });
  });

  return ans;
}

export const inf_timer = '999999999';
