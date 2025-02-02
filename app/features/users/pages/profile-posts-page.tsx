import type { Route } from './+types/profile-posts-page';
import { PostCard } from '~/features/community/components/post-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Posts | wemake' },
    { name: 'description', content: 'View user posts' },
  ];
};

export default function ProfilePostsPage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <PostCard
          key={index}
          id='postId'
          title='What is the best productivity tool?'
          author='Jinwook'
          authorAvatarUrl='https://github.com/google.png'
          category='Productivity'
          createdAt='12 hours ago'
          expanded
        />
      ))}
    </div>
  );
}
