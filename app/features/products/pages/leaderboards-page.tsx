import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Leaderboards | Product Hunt Clone' },
    {
      name: 'description',
      content: 'Top products across different time periods',
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    topProducts: [],
  };
}

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const { topProducts } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Leaderboards</h1>
      {/* Leaderboard navigation and content will be rendered here */}
    </main>
  );
}
