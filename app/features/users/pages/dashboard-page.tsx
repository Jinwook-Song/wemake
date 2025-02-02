import { Card, CardHeader, CardTitle } from '~/common/components/ui/card';
import type { Route } from './+types/dashboard-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard | wemake' },
    { name: 'description', content: 'View your dashboard' },
  ];
};

export default function DashboardPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
