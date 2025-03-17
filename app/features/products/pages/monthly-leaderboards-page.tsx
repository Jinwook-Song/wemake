import { DateTime } from 'luxon';
import type { Route } from './+types/monthly-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { Button } from '~/common/components/ui/button';
import { ProductPagination } from '~/common/components/product-pagination';
import { getProductsByDateRnage } from '../queries';
import { PRODUCTS_PER_PAGE } from '../constants';
import { makeSSRClient } from '~/supa-client';
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko-KR');
  return [
    {
      title: `Best of ${date.toLocaleString({
        year: '2-digit',
        month: 'long',
      })} | wemake`,
    },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data(
      { message: 'Invalid params', error_code: 'INVALID_PARAMS' },
      { status: 400 },
    );
  }

  const date = DateTime.fromObject(parsedData).setZone('Asia/Seoul');

  if (!date.isValid) {
    throw data(
      { message: 'Invalid date', error_code: 'INVALID_DATE' },
      { status: 400 },
    );
  }

  const today = DateTime.now().setZone('Asia/Seoul').startOf('day');
  if (date > today) {
    throw data(
      { message: 'Future date', error_code: 'FUTURE_DATE' },
      { status: 400 },
    );
  }

  const url = new URL(request.url);
  const { client } = makeSSRClient(request);
  const products = await getProductsByDateRnage(client, {
    startDate: date.startOf('month'),
    endDate: date.endOf('month'),
    limit: PRODUCTS_PER_PAGE,
    page: Number(url.searchParams.get('page')) || 1,
  });

  return { ...parsedData, products };
}

export default function MonthlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month } = loaderData;
  const urlDate = DateTime.fromObject({
    year,
    month,
  });

  const prevDate = urlDate.minus({ month: 1 });

  const nextDate = urlDate.plus({ month: 1 });

  const isToday = urlDate.hasSame(DateTime.now().startOf('month'), 'month');

  const products = loaderData.products;

  return (
    <div className='space-y-10'>
      <Hero
        title={`Best of ${urlDate.toLocaleString({
          year: '2-digit',
          month: 'long',
        })}`}
        description='Check out the top performers of the day!'
      />
      <div className='flex justify-center items-center gap-2 select-none'>
        <Button variant={'secondary'}>
          <Link
            to={`/products/leaderboards/monthly/${prevDate.year}/${prevDate.month}`}
          >
            {prevDate.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        <Button disabled={isToday} variant={'secondary'}>
          <Link
            to={`/products/leaderboards/monthly/${nextDate.year}/${nextDate.month}`}
          >
            {nextDate.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
      </div>
      <div className='flex flex-col gap-y-5 w-full max-w-screen-md mx-auto'>
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // loader/action에서 발생한 (4xx, 5xx) 에러
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Unknwon error</div>;
}
