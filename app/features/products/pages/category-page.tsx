import { Hero } from '~/common/components/hero';
import type { Route } from './+types/category-page';
import { ProductPagination } from '~/common/components/product-pagination';
import { ProductCard } from '../components/product-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Developer Tools | wemake' },
    {
      name: 'description',
      content: 'Tools for developers to build products faster',
    },
  ];
};

export default function CategoryPage() {
  return (
    <div className='space-y-10'>
      <Hero
        title='Developer Tools'
        description='Tools for developers to build products faster'
      />

      <div className='flex flex-col gap-y-5 w-full max-w-screen-md mx-auto'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id='productId'
            name='Product Name'
            description='Product Description'
            commentsCount={12}
            viewsCount={12}
            upvotesCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
