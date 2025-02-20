import db from '~/db';
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
