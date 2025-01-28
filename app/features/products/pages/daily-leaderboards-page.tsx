import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Daily Leaderboard | Product Hunt Clone' },
    { name: 'description', content: 'Best products of the day' },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
    products: [],
  };
}

export default function DailyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month, day, products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>
        Top Products of {month}/{day}/{year}
      </h1>
      {/* Daily leaderboard content will be rendered here */}
    </main>
  );
}
