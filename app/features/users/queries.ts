import type { SupaClient } from '~/supa-client';
import { productListSelect } from '../products/queries';

export const getUserByUsername = async (
  client: SupaClient,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('profiles')
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
      `,
    )
    .eq('username', username)
    .single();
  if (error) throw error;

  return data;
};

export const getUserById = async (
  client: SupaClient,
  { profileId }: { profileId: string },
) => {
  const { data, error } = await client
    .from('profiles')
    .select(
      `
        profile_id,
        name,
        username,
        avatar
      `,
    )
    .eq('profile_id', profileId)
    .single();
  if (error) throw error;

  return data;
};

export const getUserProducts = async (
  client: SupaClient,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('products')
    .select(
      `
        ${productListSelect},
        profiles!products_to_profiles_fk!inner (
          profile_id
          )
        `,
    )
    .eq('profiles.username', username);
  if (error) throw error;

  return data;
};

export const getUserPosts = async (
  client: SupaClient,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('community_post_list_view')
    .select('*')
    .eq('username', username);
  if (error) throw error;
  return data;
};
