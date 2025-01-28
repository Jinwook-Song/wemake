import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Category | Product Hunt Clone' },
    { name: 'description', content: 'Products in this category' },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    category: params.category,
    products: [],
  };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>{category}</h1>
      {/* Category products will be rendered here */}
    </main>
  );
}
