import type { Route } from './+types/dashboard-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard | wemake' },
    { name: 'description', content: 'View your dashboard' },
  ];
};

export default function DashboardPage({}: Route.ComponentProps) {
  return <div></div>;
}
