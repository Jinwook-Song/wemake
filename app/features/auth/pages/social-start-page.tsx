import type { Route } from './+types/social-start-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Social Login | wemake' },
    { name: 'description', content: 'Start social login process' },
  ];
};

export default function SocialStartPage({}: Route.ComponentProps) {
  return <div></div>;
}
