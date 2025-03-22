import { getUserPosts } from '../queries';
import type { Route } from './+types/profile-posts-page';
import { PostCard } from '~/features/community/components/post-card';
import { makeSSRClient } from '~/supa-client';
export const loader = async ({
  params: { username },
  request,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const posts = await getUserPosts(client, { username });
  return { posts };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  return (
    <div className='flex flex-col gap-5'>
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.author}
          authorAvatarUrl={post.avatar}
          category={post.topic}
          createdAt={post.created_at}
          expanded
          isUpvoted={post.is_upvoted}
        />
      ))}
    </div>
  );
}
