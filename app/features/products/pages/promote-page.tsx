import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Promote Product | Product Hunt Clone' },
    { name: 'description', content: 'Promote your product' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    promotionOptions: [],
  };
}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  const { promotionOptions } = loaderData;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Promote Your Product</h1>
      {/* Promotion options and form will be rendered here */}
    </main>
  );
}
