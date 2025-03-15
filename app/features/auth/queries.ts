import type { SupaClient } from '~/supa-client';

export const checkUsernameExists = async (
  client: SupaClient,
  { username }: { username: string },
) => {
  const { error } = await client
    .from('profiles')
    .select('profile_id')
    .eq('username', username)
    .single();

  if (error) return false;

  return true;
};
