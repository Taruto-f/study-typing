import { btos } from './util';

export function gen_url(
  season: string,
  subject: string,
  roman: boolean,
  word: boolean,
  time: number
): string {
  return encodeURIComponent(
    `https://study-typing.vercel.app/share?season=${season}` +
      `&subject=${subject}` +
      `&roman=${btos(roman)}&word=${btos(word)}` +
      `&time=${time}`
  );
}

export function share_text(point: number) {
  return encodeURIComponent(
    `Study Typingで${point}点を獲得しました!\n\n同じ条件でプレイする: `
  );
}

export function x(text: string, url: string) {
  return `https://x.com/intent/post?text=${text}&url=${url}`;
}

export function line(text: string, url: string) {
  return `https://social-plugins.line.me/lineit/share?text=${text}&url=${url}`;
}
