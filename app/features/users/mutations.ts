import type { SupaClient } from '~/supa-client';
import type { formSchema } from './pages/settings-page';
import type { z } from 'zod';

export const updateUser = async (
  client: SupaClient,
  data: z.infer<typeof formSchema>,
  profileId: string,
) => {
  const { name, role, headline, bio } = data;
  const { error } = await client
    .from('profiles')
    .update({
      name,
      role,
      headline,
      bio,
    })
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);
};

export const updateUserAvatar = async (
  client: SupaClient,
  avatarUrl: string,
  profileId: string,
) => {
  const { error } = await client
    .from('profiles')
    .update({ avatar: avatarUrl })
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);
};
