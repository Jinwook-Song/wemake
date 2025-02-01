import type { Route } from './+types/join-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Join | wemake' },
    { name: 'description', content: 'Join wemake community' },
  ];
};

export default function JoinPage({}: Route.ComponentProps) {
  return <div></div>;
}
