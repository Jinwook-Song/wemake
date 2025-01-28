import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Search Products | Product Hunt Clone' },
    { name: 'description', content: 'Search for products' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    searchResults: [],
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { searchResults } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Search Products</h1>
      {/* Search form and results will be rendered here */}
    </main>
  );
}
