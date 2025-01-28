import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Categories | Product Hunt Clone' },
    { name: 'description', content: 'Browse products by category' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Categories</h1>
      {/* Categories grid will be rendered here */}
    </main>
  );
}
