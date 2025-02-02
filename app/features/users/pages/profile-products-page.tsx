import type { Route } from './+types/profile-products-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Products | wemake' },
    { name: 'description', content: 'View user products' },
  ];
};

export default function ProfileProductsPage({}: Route.ComponentProps) {
  return <div className='grid grid-cols-4 gap-4'></div>;
}
