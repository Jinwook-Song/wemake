import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Weekly Leaderboard | Product Hunt Clone' },
    { name: 'description', content: 'Best products of the week' },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    week: params.week,
    products: [],
  };
}

export default function WeeklyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, week, products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>
        Top Products of Week {week}, {year}
      </h1>
      {/* Weekly leaderboard content will be rendered here */}
    </main>
  );
}
