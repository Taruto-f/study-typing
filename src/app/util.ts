type RecordKey = string | number | symbol;

export function filter_keys<K extends RecordKey, T>(
  map: Record<K, T>,
  val: T
): K[] {
  const ans: K[] = [];
  const keys = Object.keys(map) as K[];
  keys.forEach((key) => {
    if (map[key] === val) {
      ans.push(key);
    }
  });

  return ans;
}

export function only_enable<K extends RecordKey>(
  dat: Set<K>,
  enable: Record<K, boolean>
): Set<K> {
  const ans = new Set<K>(dat);

  dat.forEach((key) => {
    if (!enable[key]) ans.delete(key);
  });

  return ans;
}

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
