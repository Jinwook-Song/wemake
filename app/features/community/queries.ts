import type { SupaClient } from '~/supa-client';
import type { PeriodOption, SortOption } from './constants';
import { DateTime } from 'luxon';

export const getTopics = async (client: SupaClient) => {
  const { data, error } = await client.from('topics').select('name, slug');
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async (
  client: SupaClient,
  {
    limit,
    sorting,
    period = 'all',
    keyword,
    topic,
  }: {
    limit: number;
    sorting: SortOption;
    period?: PeriodOption;
    keyword?: string;
    topic?: string;
  },
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const baseQuery = client
    .from('community_post_list_view')
    .select('*')
    .limit(limit);

  if (sorting === 'newest') {
    baseQuery.order('created_at', { ascending: false });
  } else if (sorting === 'popular') {
    if (period === 'all') {
      baseQuery.order('upvotes', { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === 'today') {
        baseQuery.gte('created_at', today.startOf('day').toISO());
      } else if (period === 'week') {
        baseQuery.gte('created_at', today.startOf('week').toISO());
      } else if (period === 'month') {
        baseQuery.gte('created_at', today.startOf('month').toISO());
      } else if (period === 'year') {
        baseQuery.gte('created_at', today.startOf('year').toISO());
      }

      baseQuery.order('upvotes', { ascending: false });
    }
  }

  if (keyword) baseQuery.ilike('title', `%${keyword}`);
  if (topic) baseQuery.eq('slug', topic);

  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (
  client: SupaClient,
  { postId }: { postId: string },
) => {
  const { data, error } = await client
    .from('community_post_detail_view')
    .select('*')
    .eq('post_id', postId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

/**
 * 재귀적으로 댓글을 가져오는 쿼리
 */
export const getPostReplies = async (
  client: SupaClient,
  { postId }: { postId: string },
) => {
  const replyQuery = `
    post_reply_id,
    reply,
    created_at,
    user:profiles!inner (
        name,
        avatar,
        username
      )
  `;

  const { data, error } = await client
    .from('post_replies')
    .select(
      `
      ${replyQuery},
      children:post_replies(
        ${replyQuery}
      )
    `,
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

// export const getPosts = async () => {
//   const { data, error } = await client.from('posts').select(`
//       post_id,
//       title,
//       created_at,
//       topic:topics!inner (
//       name
//       ),
//       author:profiles!posts_profile_id_profiles_profile_id_fk!inner (
//       name,
//       avatar,
//       username
//       ),
//       upvotes: post_upvotes (count)
//       `);
//   console.log(error);
//   if (error) throw new Error(error.message);
//   return data;
// };

/** Community Queries with Drizzle
 * 
 * import db from '~/db';
import { count, desc, eq } from 'drizzle-orm';
import { posts, postUpvotes, topics } from './schema';
import { profiles } from '../users/schema';

export const getTopics = async () => {
  return await db
    .select({
      name: topics.name,
      slug: topics.slug,
    })
    .from(topics);
};

export const getPosts = async () => {
  return await db
    .select({
      id: posts.post_id,
      title: posts.title,
      createdAt: posts.created_at,
      topic: topics.name,
      author: profiles.name,
      authorAvatarUrl: profiles.avatar,
      username: profiles.username,
      upvotes: count(postUpvotes.post_id),
    })
    .from(posts)
    .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
    .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
    .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
    .groupBy(
      posts.post_id,
      topics.name,
      profiles.name,
      profiles.avatar,
      profiles.username,
    )
    .orderBy(desc(posts.post_id));
};

 */
