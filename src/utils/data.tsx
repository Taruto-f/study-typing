import { ReactElement } from 'react';
import { BlockMath, InlineMath as Maths } from 'react-katex';
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

const center = 'flex flex-col justify-center items-center';
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
                「<Maths math='+'></Maths>」の符号のこと
              </>
            ),
          },
          {
            moji: '負の符号',
            yomi: 'ふのふごう',
            mean: (
              <>
                「<Maths math='-'></Maths>」の符号のこと
              </>
            ),
          },
          {
            moji: '正の数',
            yomi: 'せいのすう',
            mean: (
              <>
                <Maths math='0'></Maths>より大きい数
              </>
            ),
          },
          {
            moji: '負の数',
            yomi: 'ふのすう',
            mean: (
              <>
                <Maths math='0'></Maths>より小さい数
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
              <div className={center}>
                加法の順番を変えても、その和が変わらない法則
                <BlockMath math='a+b=b+a'></BlockMath>
              </div>
            ),
          },
          {
            moji: '加法の結合法則',
            yomi: 'かほうのけつごうほうそく',
            mean: (
              <div className={center}>
                加法の括弧の位置を変えても、その和が変わらない法則
                <BlockMath math='(a+b)+c=a+(b+c)'></BlockMath>
              </div>
            ),
          },
          {
            moji: '減法',
            yomi: 'げんぽう',
            mean: '引き算のこと',
          },
          {
            moji: '項',
            yomi: 'こう',
            mean: (
              <>
                式を<Maths math='+'></Maths>等の記号で区切った時の値
              </>
            ),
          },
          {
            moji: '正の項',
            yomi: 'せいのこう',
            mean: '正の数の項',
          },
          {
            moji: '負の項',
            yomi: 'ふのこう',
            mean: '負の数の項',
          },
          {
            moji: '乗法',
            yomi: 'じょうほう',
            mean: '掛け算のこと',
          },
          {
            moji: '乗法の交換法則',
            yomi: 'じょうほうのこうかんほうそく',
            mean: (
              <div className={center}>
                乗法の順番を変えても、その和が変わらない法則
                <BlockMath math='a \times b=b \times a'></BlockMath>
              </div>
            ),
          },
          {
            moji: '乗法の結合法則',
            yomi: 'じょうほうのけつごうほうそく',
            mean: (
              <div className={center}>
                乗法の括弧の位置を変えても、その和が変わらない法則
                <BlockMath math='(a \times b) \times c=a \times (b \times c)'></BlockMath>
              </div>
            ),
          },
          {
            moji: '累乗',
            yomi: 'るいじょう',
            mean: (
              <div className={center}>
                ある数を何回もかける計算
                <BlockMath math='x^y'></BlockMath>
              </div>
            ),
          },
          {
            moji: '指数',
            yomi: 'しすう',
            mean: (
              <>
                <Maths math='x^y'></Maths>の式の<Maths math='y'></Maths>
              </>
            ),
          },
          {
            moji: '除法',
            yomi: 'じょほう',
            mean: '割り算のこと',
          },
          {
            moji: '四則',
            yomi: 'しそく',
            mean: '加法、減法、乗法、除法の総称',
          },
          {
            moji: '分配法則',
            yomi: 'ぶんぱいほうそく',
            mean: (
              <div className={center}>
                乗法と加法に関する以下の法則
                <BlockMath math='(a+b) \times c=a \times c + b \times c'></BlockMath>
              </div>
            ),
          },
          {
            moji: '素数',
            yomi: 'そすう',
            mean: (
              <>
                <Maths math='1'></Maths>とその数自身でしか割り切れない数
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
          {
            moji: '本初子午線',
            yomi: 'ほんしょしごせん',
            mean: '経度0度の経線',
          },
          {
            moji: '白夜',
            yomi: 'びゃくや',
            mean: '高緯度の場所で見られる、夏に一日中太陽が沈まない現象',
          },
          {
            moji: '地球儀',
            yomi: 'ちきゅうぎ',
            mean: '地球を小さく縮めた模型',
          },
          {
            moji: '世界地図',
            yomi: 'せかいちず',
            mean: '地球全体を写した図',
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
          {
            moji: '根毛',
            yomi: 'こんもう',
            mean: '根の先端に生える小さく細い毛',
          },
          {
            moji: '単子葉類',
            yomi: 'たんしようるい',
            mean: '子葉が一枚の植物',
          },
          {
            moji: '双子葉類',
            yomi: 'そうしようるい',
            mean: '子葉が二枚の植物',
          },
          {
            moji: '花粉嚢',
            yomi: 'かふんのう',
            mean: '花粉が入っている袋',
          },
          {
            moji: '裸子植物',
            yomi: 'らししょくぶつ',
            mean: '胚珠がむき出しになっている植物',
          },
          {
            moji: '被子植物',
            yomi: 'ひししょくぶつ',
            mean: '胚珠が子房の中にある植物',
          },
          {
            moji: '胞子',
            yomi: 'ほうし',
            mean: 'シダ植物やコケ植物が作る小さな繁殖体',
          },
          {
            moji: '胞子嚢',
            yomi: 'ほうしのう',
            mean: '胞子が入った袋',
          },
        ],
      },
      {
        season: 2,
        history: [
          {
            moji: '古代文明',
            yomi: 'こだいぶんめい',
            mean: 'アフリカやアジアで生まれた大きな文明',
          },
          {
            moji: '猿人',
            yomi: 'えんじん',
            mean: 'アフリカ大陸に出現した最古の人類',
          },
          {
            moji: '原人',
            yomi: 'げんじん',
            mean: '猿人の次の人類の種類',
          },
          {
            moji: '新人',
            yomi: 'しんじん',
            mean: '現代の人類の祖先',
          },
          {
            moji: 'メソポタミア文明',
            yomi: 'めそぽたみあぶんめい',
            mean: 'チグリス川とユーフラテス川流域で発展した文明',
          },
          {
            moji: '楔形文字',
            yomi: 'くさびがたもじ',
            mean: 'メソポタミア文明で使用されていた古代文字',
          },
          {
            moji: '太陰暦',
            yomi: 'たいいんれき',
            mean: 'メソポタミア文明で生まれた一カ月を30日とする暦',
          },
          {
            moji: 'エジプト文明',
            yomi: 'えじぷとぶんめい',
            mean: 'ナイル川流域で発展した文明',
          },
          {
            moji: '象形文字',
            yomi: 'しょうけいもじ',
            mean: 'エジプト文明で使用された、物の形をもとにした古代文字',
          },
          {
            moji: 'インダス文明',
            yomi: 'いんだすぶんめい',
            mean: 'インダス川流域で発展した文明',
          },
          {
            moji: '中国文明',
            yomi: 'ちゅうごくぶんめい',
            mean: '黄河・長江流域で発展した文明',
          },
          {
            moji: '殷',
            yomi: 'いん',
            mean: '黄河流域に生まれた、中国最初の王朝',
          },
          {
            moji: '甲骨文字',
            yomi: 'こうこつもじ',
            mean: '中国文明で生まれた、漢字の元となった古代文字',
          },
          {
            moji: '秦',
            yomi: 'しん',
            mean: '紀元前221年ごろに中国を統一した王朝',
          },
          {
            moji: '孔子',
            yomi: 'こうし',
            mean: '儒教を説いた人物',
          },
          {
            moji: '儒教',
            yomi: 'じゅきょう',
            mean: '孔子が説いた道徳を重視した教え',
          },
          {
            moji: '始皇帝',
            yomi: 'しこうてい',
            mean: '秦の最初の皇帝',
          },
        ],
        science: [
          {
            moji: '物質',
            yomi: 'ぶっしつ',
            mean: '物が何からできているかの材料',
          },
          {
            moji: '物体',
            yomi: 'ぶっしつ',
            mean: '物を形や大きさで区別したときのもの',
          },
          {
            moji: '有機物',
            yomi: 'ゆうきぶつ',
            mean: '炭素を含む物質',
          },
          {
            moji: '無機物',
            yomi: 'むきぶつ',
            mean: '炭素を含まない物質',
          },
          {
            moji: '空気調節ねじ',
            yomi: 'くうきちょうせつねじ',
            mean: 'ガスバーナーの上側にある、取り入れる空気の量を調節するねじ',
          },
          {
            moji: 'ガス調節ねじ',
            yomi: 'がすちょうせつねじ',
            mean: 'ガスバーナーの下側にある、ガスの量を調節するねじ',
          },
          {
            moji: '金属光沢',
            yomi: 'きんぞくこうたく',
            mean: '金属特有の輝き',
          },
          {
            moji: '展性',
            yomi: 'てんせい',
            mean: '金属の、叩くと薄く広がる性質',
          },
          {
            moji: '延性',
            yomi: 'えんせい',
            mean: '金属の、引っ張ると伸びる性質',
          },
          {
            moji: '非金属',
            yomi: 'ひきんぞく',
            mean: '金属以外の物質',
          },
          {
            moji: '密度',
            yomi: 'みつど',
            mean: '物質の一定体積当たりの質量',
          },

          {
            moji: 'メスシリンダー',
            yomi: 'めすしりんだー',
            mean: '目盛りのついた、液体の体積を量る容器',
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
