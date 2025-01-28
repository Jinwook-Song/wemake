import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Yearly Leaderboard | Product Hunt Clone' },
    { name: 'description', content: 'Best products of the year' },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    products: [],
  };
}

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Top Products of {year}</h1>
      {/* Yearly leaderboard content will be rendered here */}
    </main>
  );
}
