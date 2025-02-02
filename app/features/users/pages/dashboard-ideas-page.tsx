import type { Route } from './+types/dashboard-ideas-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'My Ideas | wemake' },
    { name: 'description', content: 'Manage your ideas' },
  ];
};

export default function DashboardIdeasPage({}: Route.ComponentProps) {
  return <div>Dashboard Ideas</div>;
}
