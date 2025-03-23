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

export const seeNotification = async (
  client: SupaClient,
  { userId, notificationId }: { userId: string; notificationId: number },
) => {
  const { error } = await client
    .from('notifications')
    .update({ seen: true })
    .eq('notification_id', notificationId)
    .eq('target_id', userId);

  if (error) throw new Error(error.message);
};

export const sendMessage = async (
  client: SupaClient,
  {
    fromUserId,
    toUserId,
    content,
  }: { fromUserId: string; toUserId: string; content: string },
) => {
  const { data, error } = await client
    .rpc('get_room', {
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data?.message_room_id) {
    await client.from('messages').insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return data.message_room_id;
  } else {
    const { data: newRoomData, error: newRoomError } = await client
      .from('message_rooms')
      .insert({})
      .select('message_room_id')
      .single();

    if (newRoomError) throw new Error(newRoomError.message);
    await client.from('message_room_members').insert([
      {
        message_room_id: newRoomData.message_room_id,
        profile_id: fromUserId,
      },
      {
        message_room_id: newRoomData.message_room_id,
        profile_id: toUserId,
      },
    ]);
    await client.from('messages').insert({
      message_room_id: newRoomData.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return newRoomData.message_room_id;
  }
};
