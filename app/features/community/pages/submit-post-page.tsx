import type { Route } from './+types/submit-post-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Post | wemake' },
    { name: 'description', content: 'Create a new community post' },
  ];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return <div></div>;
}
