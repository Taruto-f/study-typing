import { supabase } from './client';

export async function is_session() {
  const session = await supabase.auth.getSession();
  return session.data.session !== null;
}

export async function get_id() {
  if (!(await is_session())) {
    throw new Error('Not logined');
  }

  const session = await supabase.auth.getSession();
  return session.data.session!.user.id;
}
