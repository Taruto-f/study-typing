export function set_to_str<K>(dat: Set<K>) {
  return [...dat].join(',');
}

export function str_to_set<K>(str: string | undefined) {
  if (str === '' || str == undefined) {
    return new Set<K>();
  } else {
    return new Set<K>(str.split(',') as K[]);
  }
}

export function to_bool(str: string) {
  return str === 'true';
}

export function btos(bool: boolean) {
  return bool ? 'true' : 'false';
}
