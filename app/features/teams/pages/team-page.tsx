import type { Route } from './+types/team-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Team Details | wemake' },
    { name: 'description', content: 'View team details and members' },
  ];
};

export default function TeamPage({}: Route.ComponentProps) {
  return <div></div>;
}
