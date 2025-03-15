import { z } from 'zod';
import type { Route } from './+types/search-page';
import { Form } from 'react-router';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { ProductPagination } from '~/common/components/product-pagination';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';
import { getProductsBySearch, getSearchPageCount } from '../queries';
import { PRODUCTS_PER_PAGE } from '../constants';
import { makeSSRClient } from '~/supa-client';

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

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );

  if (!success) throw new Error('Invalid params');

  if (!parsedData.query) {
    return { products: [], pageCount: 1 };
  }

  const [products, pageCount] = await Promise.all([
    getProductsBySearch(client, {
      query: parsedData.query,
      page: parsedData.page,
      limit: PRODUCTS_PER_PAGE,
    }),
    getSearchPageCount(client, { query: parsedData.query }),
  ]);

  return { products, pageCount };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { products, pageCount } = loaderData;
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
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={pageCount} />
    </div>
  );
}
