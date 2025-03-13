import { ChevronUpIcon, StarIcon } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';
import { Button, buttonVariants } from '~/common/components/ui/button';
import { cn } from '~/lib/utils';
import type { Route } from './+types/product-overview-layout';
import { getProductById } from '../queries';

export function meta({ data: { product } }: Route.MetaArgs) {
  return [
    { title: `${product.name} Overview | wemake` },
    { name: 'description', content: product.description },
  ];
}

export const loader = async ({
  params,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const product = await getProductById(params.productId);
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className='space-y-10'>
      <div className='flex justify-between'>
        <div className='flex gap-8'>
          <div className='size-40 rounded-xl shadow-xl bg-primary/50 shrink-0'></div>
          <div>
            <h1 className='text-5xl font-semibold'>{product.name}</h1>
            <p className='text-2xl font-light'>{product.tagline}</p>
            <div className='flex items-center gap-2 mt-5'>
              <div className='flex text-yellow-400'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    className='size-4'
                    fill={
                      index < Math.floor(product.average_rating)
                        ? 'currentColor'
                        : 'none'
                    }
                  />
                ))}
              </div>
              <span className='text-muted-foreground'>
                {product.reviews} Reviews
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-5'>
          <Button
            variant={'secondary'}
            size={'lg'}
            className='text-lg h-14 px-10'
          >
            Visit Website
          </Button>
          <Button size={'lg'} className='text-lg h-14 px-10'>
            <ChevronUpIcon className='size-4' /> Upvote ({product.upvotes})
          </Button>
        </div>
      </div>

      <div className='flex gap-2.5'>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: isActive ? 'default' : 'outline' }),
              'h-9',
            )
          }
          to={`/products/${product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: isActive ? 'default' : 'outline' }),
              'h-9',
            )
          }
          to={`/products/${product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            productId: product.product_id,
            description: product.description,
            howItWorks: product.how_it_works,
          }}
        />
      </div>
    </div>
  );
}
