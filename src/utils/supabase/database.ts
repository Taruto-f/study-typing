import { get_id, is_session } from './auth';
import { supabase } from './client';
import type { Data } from '@/types/supabase/data';

export async function get_data(): Promise<Data> {
  if (!(await is_session())) {
    throw new Error('Not logined');
  }

  const id = await get_id();
  return (await supabase.from('users').select('*').eq('id', id).single()).data!;
}
