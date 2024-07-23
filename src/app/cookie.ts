import { hasCookie, setCookie } from 'cookies-next';

export const default_cookie: Record<string, string> = {
  theme: 'system',
  select_season: '',
  select_subject: '',
};

export const expires_date = new Date('2099/12/31');

export function reset_cookie() {
  const keys = Object.keys(default_cookie);
  keys.forEach((key) => {
    if (!hasCookie(key)) {
      setCookie(key, default_cookie[key], { expires: expires_date });
    }
  });
}
