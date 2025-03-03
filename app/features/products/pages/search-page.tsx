import { z } from 'zod';
import type { Route } from './+types/search-page';
import { Form } from 'react-router';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { ProductPagination } from '~/common/components/product-pagination';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Search Products | wemake' },
    { name: 'description', content: 'Search for products' },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );

  if (!success) throw new Error('Invalid params');

  console.log(parsedData);
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Hero
        title='Search'
        description='Search for products by title or description'
      />
      <Form className='flex justify-center items-center max-w-screen-sm mx-auto gap-2'>
        <Input
          name='query'
          placeholder='Search for products'
          className='text-lg'
        />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='flex flex-col gap-y-5 w-full max-w-screen-md mx-auto'>
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
      <ProductPagination totalPages={10} />
    </div>
  );
}
