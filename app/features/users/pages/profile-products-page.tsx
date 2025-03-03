import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/profile-products-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Products | wemake' },
    { name: 'description', content: 'View user products' },
  ];
};

export default function ProfileProductsPage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard
          key={index}
          id='productId'
          name='Product Name'
          description='Product Description'
          reviewsCount={'12'}
          viewsCount={'12'}
          upvotesCount={'120'}
        />
      ))}
    </div>
  );
}
