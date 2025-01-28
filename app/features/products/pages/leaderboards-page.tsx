import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/leaderboards-page';
import { Hero } from '~/common/components/hero';
import { Link } from 'react-router';
import { ProductCard } from '../components/product-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Leaderboards | wemake' },
    {
      name: 'description',
      content: 'Top products leaderboards',
    },
  ];
};

export default function LeaderboardsPage() {
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant={'link'} asChild className='text-lg self-center'>
          <Link to={'/products/leaderboards/yearly'}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
