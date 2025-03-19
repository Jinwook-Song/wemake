import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/profile-products-page';
import { getProductsByUsername } from '../queries';
import { makeSSRClient } from '~/supa-client';
export const loader = async ({
  params: { username },
  request,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsByUsername(client, { username });
  return { products };
};

export default function ProfileProductsPage({
  loaderData,
}: Route.ComponentProps) {
  const { products } = loaderData;
  return (
    <div className='flex flex-col gap-5'>
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
  );
}
