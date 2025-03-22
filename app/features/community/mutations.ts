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
  {
    reply,
    postId,
    userId,
    topLevelId,
  }: { reply: string; postId: number; userId: string; topLevelId?: number },
) => {
  const { error } = await client.from('post_replies').insert({
    reply,
    profile_id: userId,
    ...(topLevelId ? { parent_id: topLevelId } : { post_id: postId }),
  });

  if (error) throw new Error(error.message);
};

export const toggleUpvote = async (
  client: SupaClient,
  { postId, userId }: { postId: number; userId: string },
) => {
  const { count } = await client
    .from('post_upvotes')
    .select('count', { count: 'exact', head: true })
    .eq('post_id', postId)
    .eq('profile_id', userId);

  if (count === 0) {
    await client
      .from('post_upvotes')
      .insert({ post_id: postId, profile_id: userId });
  } else {
    await client
      .from('post_upvotes')
      .delete()
      .eq('post_id', postId)
      .eq('profile_id', userId);
  }
};
