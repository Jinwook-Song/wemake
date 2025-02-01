import type { Route } from './+types/social-complete-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Complete Social Login | wemake' },
    { name: 'description', content: 'Complete social login process' },
  ];
};

export default function SocialCompletePage({}: Route.ComponentProps) {
  return <div></div>;
}
