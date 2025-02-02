import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/common/components/ui/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from 'recharts';
import type { Route } from './+types/dashboard-product-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Dashboard | wemake' },
    { name: 'description', content: 'Manage your product' },
  ];
};

const chartData = [
  { month: 'January', views: 186, visitors: 100 },
  { month: 'February', views: 305, visitors: 34 },
  { month: 'March', views: 237, visitors: 65 },
  { month: 'April', views: 73, visitors: 27 },
  { month: 'May', views: 209, visitors: 120 },
  { month: 'June', views: 214, visitors: 230 },
];
const chartConfig = {
  views: {
    label: 'Page views',
    color: 'hsl(var(--chart-1))',
  },
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function DashboardProductPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-bold mb-6'>Analytics</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{
                  minWidth: '160px',
                }}
                content={<ChartTooltipContent indicator={'line'} />}
              />
              <Area
                dataKey='views'
                type='natural'
                fill='var(--color-views)'
                stroke='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey='visitors'
                type='natural'
                fill='var(--color-visitors)'
                stroke='var(--color-visitors)'
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
