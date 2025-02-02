import type { Route } from './+types/my-redirect-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Redirecting... | wemake' },
    { name: 'description', content: 'Redirecting to dashboard' },
  ];
};

export default function MyRedirectPage({}: Route.ComponentProps) {
  return <div></div>;
}
