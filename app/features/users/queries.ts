import type { SupaClient } from '~/supa-client';
import { productListSelect } from '../products/queries';
import { redirect } from 'react-router';

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
        avatar,
        headline,
        bio,
        role
      `,
    )
    .eq('profile_id', profileId)
    .single();
  if (error) throw error;

  return data;
};

export const getProductsByUsername = async (
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

export const getProductsByUserId = async (
  client: SupaClient,
  { profileId }: { profileId: string },
) => {
  const { data, error } = await client
    .from('products')
    .select('name, product_id')
    .eq('profile_id', profileId);
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

export const getCurrentUserId = async (client: SupaClient) => {
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) {
    throw redirect('/auth/login');
  }
  return data.user.id;
};

export const getNotifications = async (
  client: SupaClient,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from('notifications')
    .select(
      `
      notification_id,
      type,
      source:profiles!source_id(
        profile_id,
        name,
        avatar
      ),
      product:products!product_id(
        product_id,
        name
      ),
      post:posts!post_id(
        post_id,
        title
      ),
      seen,
      created_at
    `,
    )
    .eq('target_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getNotificationsCount = async (
  client: SupaClient,
  { userId }: { userId: string },
) => {
  const { count, error } = await client
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('target_id', userId)
    .eq('seen', false);

  if (error) throw new Error(error.message);

  return count ?? 0;
};

export const getMessages = async (
  client: SupaClient,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from('messages_view')
    .select('*')
    .eq('profile_id', userId)
    .neq('other_profile_id', userId);
  if (error) throw error;
  return data;
};

export const getMessagesByMessageRoomId = async (
  client: SupaClient,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  const { count, error } = await client
    .from('message_room_members')
    .select('*', { count: 'exact', head: true })
    .eq('message_room_id', messageRoomId)
    .eq('profile_id', userId);
  if (error) throw error;

  if (count === 0) throw new Error('Message room not found');

  const { data, error: messagesError } = await client
    .from('messages')
    .select('*')
    .eq('message_room_id', messageRoomId)
    .order('created_at', { ascending: true });

  if (messagesError) throw messagesError;
  return data;
};

export const getRoomsParticipant = async (
  client: SupaClient,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  const { count, error } = await client
    .from('message_room_members')
    .select('*', { count: 'exact', head: true })
    .eq('message_room_id', messageRoomId)
    .eq('profile_id', userId);
  if (error) throw error;

  if (count === 0) throw new Error('Message room not found');

  const { data, error: participantsError } = await client
    .from('message_room_members')
    .select(
      `
      profile:profiles!profile_id!inner(
        profile_id,
        name,
        avatar
      )
      `,
    )
    .eq('message_room_id', messageRoomId)
    .neq('profile_id', userId)
    .single();
  if (participantsError) throw participantsError;
  return data;
};
