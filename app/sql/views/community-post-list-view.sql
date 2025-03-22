CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
    p.post_id,
    p.title,
    p.created_at,
    t.name AS topic,
    t.slug,
    pr.name AS author,
    pr.avatar AS avatar,
    pr.username AS username,
    p.upvotes,
    (
        SELECT EXISTS (
            SELECT 1 
            FROM public.post_upvotes pu 
            WHERE pu.post_id = p.post_id 
            AND pu.profile_id = auth.uid()
        )
    ) AS is_upvoted
FROM
    posts p
INNER JOIN
    topics t USING (topic_id)
INNER JOIN
    profiles pr USING (profile_id);

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
