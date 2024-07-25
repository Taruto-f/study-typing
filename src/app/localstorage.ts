export const default_storage: Record<string, string> = {
  theme: 'system',
  select_season: '',
  select_subject: '',
};

export function reset_storage() {
  const keys = Object.keys(default_storage);
  keys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(localStorage, key)) {
      localStorage.setItem(key, default_storage[key]);
    }
  });
}
