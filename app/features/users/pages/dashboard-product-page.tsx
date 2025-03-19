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
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '../queries';
import { productOwnerCheck } from '~/features/products/queries';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Dashboard | wemake' },
    { name: 'description', content: 'Manage your product' },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  await productOwnerCheck(client, {
    productId: Number(params.productId),
    userId,
  });

  const { data: chartData, error } = await client.rpc('get_product_stats', {
    product_id: params.productId,
  });

  if (error) throw error;

  return { chartData };
};

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

export default function DashboardProductPage({
  loaderData,
}: Route.ComponentProps) {
  const { chartData } = loaderData;
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
                padding={{ left: 12, right: 12 }}
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
                dataKey='visits'
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
