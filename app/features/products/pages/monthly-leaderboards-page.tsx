import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Monthly Leaderboard | Product Hunt Clone' },
    { name: 'description', content: 'Best products of the month' },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    products: [],
  };
}

export default function MonthlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month, products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>
        Top Products of {month}/{year}
      </h1>
      {/* Monthly leaderboard content will be rendered here */}
    </main>
  );
}
