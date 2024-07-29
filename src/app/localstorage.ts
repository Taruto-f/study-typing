export const default_storage: Record<string, string> = {
  theme: 'system',
  select_season: '',
  select_subject: '',
  enable_type: 'true',
  enable_miss: 'true',
  show_roman: 'true',
  show_word: 'true',
  time: '60s',
  show_help: 'true',
};

export function reset_storage() {
  const keys = Object.keys(default_storage);
  keys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(localStorage, key)) {
      localStorage.setItem(key, default_storage[key]);
    }
  });
}
