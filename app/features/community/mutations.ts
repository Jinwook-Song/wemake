import type { SupaClient } from '~/supa-client';

export const createPost = async (
  client: SupaClient,
  {
    title,
    category,
    content,
    userId,
  }: { title: string; category: string; content: string; userId: string },
) => {
  const { data: topic, error: topicError } = await client
    .from('topics')
    .select('topic_id')
    .eq('slug', category)
    .single();
  if (topicError) throw new Error(topicError.message);

  const { data, error } = await client
    .from('posts')
    .insert({
      title,
      content,
      topic_id: topic.topic_id,
      profile_id: userId,
    })
    .select('post_id')
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const createReply = async (
  client: SupaClient,
  { reply, postId, userId }: { reply: string; postId: number; userId: string },
) => {
  const { error } = await client.from('post_replies').insert({
    reply,
    post_id: postId,
    profile_id: userId,
  });

  if (error) throw new Error(error.message);
};
