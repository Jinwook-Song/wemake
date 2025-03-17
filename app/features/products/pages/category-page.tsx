import { Hero } from '~/common/components/hero';
import type { Route } from './+types/category-page';
import { ProductPagination } from '~/common/components/product-pagination';
import { ProductCard } from '../components/product-card';
import {
  getCategoryById,
  getCategoryPageCount,
  getProductsByCategoryId,
} from '../queries';
import { z } from 'zod';
import { data } from 'react-router';
import { PRODUCTS_PER_PAGE } from '../constants';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Developer Tools | wemake' },
    {
      name: 'description',
      content: 'Tools for developers to build products faster',
    },
  ];
};

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

const paramsSchema = z.object({
  category: z.coerce.number(),
});

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success: successSearchParams, data: parsedDataSearchParams } =
    searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));

  const { success: successParams, data: parsedDataParams } =
    paramsSchema.safeParse(params);

  if (!successSearchParams || !successParams) {
    throw data(
      { message: 'Invalid params', error_code: 'INVALID_PARAMS' },
      { status: 400 },
    );
  }

  const { client } = makeSSRClient(request);

  const [category, products, pageCount] = await Promise.all([
    getCategoryById(client, { categoryId: parsedDataParams.category }),
    getProductsByCategoryId(client, {
      categoryId: parsedDataParams.category,
      page: parsedDataSearchParams.page,
      limit: PRODUCTS_PER_PAGE,
    }),
    getCategoryPageCount(client, { categoryId: parsedDataParams.category }),
  ]);

  return { category, products, pageCount };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products, pageCount } = loaderData;

  return (
    <div className='space-y-10'>
      <Hero title={category.name} description={category.description} />

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
