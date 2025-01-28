import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Products | Product Hunt Clone' },
    { name: 'description', content: 'Browse all products' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
  };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>All Products</h1>
      {/* Products grid will be rendered here */}
    </main>
  );
}
