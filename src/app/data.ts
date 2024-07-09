export interface TypeData {
  moji: string; // 気候帯
  yomi: string; // きこうたい
}

export interface SeasonData {
  name: string; // 中学一年 一学期
  jp: Array<TypeData>; // 国語
  math: Array<TypeData>; // 数学・算数
  social: Array<TypeData>; // 社会
  science: Array<TypeData>; // 理科
  english: Array<TypeData>; // 英語
  pe: Array<TypeData>; // 保健体育
  music: Array<TypeData>; // 音楽
}
