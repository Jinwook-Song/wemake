import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/leaderboards-page';
import { Hero } from '~/common/components/hero';
import { Link } from 'react-router';
import { ProductCard } from '../components/product-card';
import { getProductsByDateRnage } from '../queries';
import { DateTime } from 'luxon';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Leaderboards | wemake' },
    {
      name: 'description',
      content: 'Top products leaderboards',
    },
  ];
};

export const loader = async () => {
  const dailyProductsPromise = getProductsByDateRnage({
    startDate: DateTime.now().startOf('day'),
    endDate: DateTime.now().endOf('day'),
    limit: 7,
  });

  const weeklyProductsPromise = getProductsByDateRnage({
    startDate: DateTime.now().startOf('week'),
    endDate: DateTime.now().endOf('week'),
    limit: 7,
  });

  const monthlyProductsPromise = getProductsByDateRnage({
    startDate: DateTime.now().startOf('month'),
    endDate: DateTime.now().endOf('month'),
    limit: 7,
  });

  const yearlyProductsPromise = getProductsByDateRnage({
    startDate: DateTime.now().startOf('year'),
    endDate: DateTime.now().endOf('year'),
    limit: 7,
  });

  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      dailyProductsPromise,
      weeklyProductsPromise,
      monthlyProductsPromise,
      yearlyProductsPromise,
    ]);

  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
  };
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts } =
    loaderData;
  return (
    <div className='space-y-20'>
      <Hero
        title='Leaderboards'
        description='The most popular products on wemake'
      />
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Daily Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by our community today.
          </p>
        </div>
        {dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={`productId-${product.product_id}`}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
        <Button variant={'link'} asChild className='text-lg self-center'>
          <Link to={'/products/leaderboards/daily'}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Weekly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by our community this week.
          </p>
        </div>
        {weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={`productId-${product.product_id}`}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
        <Button variant={'link'} asChild className='text-lg self-center'>
          <Link to={'/products/leaderboards/weekly'}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Monthly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by our community this month.
          </p>
        </div>
        {monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={`productId-${product.product_id}`}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            upvotesCount={product.upvotes}
          />
        ))}
        <Button variant={'link'} asChild className='text-lg self-center'>
          <Link to={'/products/leaderboards/monthly'}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Yearly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by our community this year.
          </p>
        </div>
        {yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={`productId-${product.product_id}`}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={'12'}
            upvotesCount={'120'}
          />
        ))}
        <Button variant={'link'} asChild className='text-lg self-center'>
          <Link to={'/products/leaderboards/yearly'}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
