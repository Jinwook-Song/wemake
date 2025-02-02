import type { Route } from './+types/profile-posts-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Posts | wemake' },
    { name: 'description', content: 'View user posts' },
  ];
};

export default function ProfilePostsPage({}: Route.ComponentProps) {
  return <div className='flex flex-col gap-10'></div>;
}
