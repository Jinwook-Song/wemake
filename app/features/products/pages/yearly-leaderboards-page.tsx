import { DateTime } from 'luxon';
import type { Route } from './+types/yearly-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { Button } from '~/common/components/ui/button';
import { ProductPagination } from '~/common/components/product-pagination';

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko-KR');
  return [
    {
      title: `Best of ${date.toLocaleString({ year: 'numeric' })} | wemake`,
    },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
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

  return { ...parsedData };
}

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year } = loaderData;
  const urlDate = DateTime.fromObject({ year });

  const prevDate = urlDate.minus({ year: 1 });

  const nextDate = urlDate.plus({ year: 1 });

  const isToday = urlDate.hasSame(DateTime.now().startOf('year'), 'year');

  return (
    <div className='space-y-10'>
      <Hero
        title={`Best of ${urlDate.toLocaleString({ year: 'numeric' })}`}
        description='Check out the top performers of the day!'
      />
      <div className='flex justify-center items-center gap-2 select-none'>
        <Button variant={'secondary'}>
          <Link to={`/products/leaderboards/yearly/${prevDate.year}`}>
            {prevDate.toLocaleString({ year: 'numeric' })}
          </Link>
        </Button>
        <Button disabled={isToday} variant={'secondary'}>
          <Link to={`/products/leaderboards/yearly/${nextDate.year}`}>
            {nextDate.toLocaleString({ year: 'numeric' })}
          </Link>
        </Button>
      </div>
      <div className='flex flex-col gap-y-5 w-full max-w-screen-md mx-auto'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id='productId'
            name='Product Name'
            description='Product Description'
            commentsCount={12}
            viewsCount={12}
            upvotesCount={120}
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
