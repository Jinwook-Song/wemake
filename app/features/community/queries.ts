import client from '~/supa-client';
import type { PeriodOption, SortOption } from './constants';
import { DateTime } from 'luxon';

export const getTopics = async () => {
  const { data, error } = await client.from('topics').select('name, slug');
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async ({
  limit,
  sorting,
  period = 'all',
}: {
  limit: number;
  sorting: SortOption;
  period?: PeriodOption;
}) => {
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

  const { data, error } = await baseQuery;
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
