import type { Route } from './+types/post-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post | wemake' },
    { name: 'description', content: 'View community post' },
  ];
};

export default function PostPage({}: Route.ComponentProps) {
  return <div></div>;
}
