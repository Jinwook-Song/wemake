import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/dashboard-page';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/common/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '../queries';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard | wemake' },
    { name: 'description', content: 'View your dashboard' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const { data: chartData, error } = await client.rpc('get_dashboard_stats', {
    user_id: userId,
  });
  if (error) throw error;
  return { chartData };
};

// const chartData = [
//   { month: 'January', views: 186 },
//   { month: 'February', views: 305 },
//   { month: 'March', views: 237 },
//   { month: 'April', views: 73 },
//   { month: 'May', views: 209 },
//   { month: 'June', views: 214 },
// ];
const chartConfig = {
  views: {
    label: '📊',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { chartData } = loaderData;
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 12, right: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='views'
                type='natural'
                stroke='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
