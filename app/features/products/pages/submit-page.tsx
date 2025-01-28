import type { Route } from '~/types';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Submit Product | Product Hunt Clone' },
    { name: 'description', content: 'Submit your product' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Submit Your Product</h1>
      {/* Product submission form will be rendered here */}
    </main>
  );
}
