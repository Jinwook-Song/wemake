import { Hero } from '~/common/components/hero';
import type { Route } from './+types/categories-page';
import { CategoryCard } from '../components/category-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Categories | wemake' },
    { name: 'description', content: 'Browse products by category' },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className='space-y-10'>
      <Hero title='Categories' description='Browse products by category' />
      <div className='grid grid-cols-4 gap-10'>
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`category-${index}`}
            name={`Category ${index}`}
            description={`Category ${index} Description`}
          />
        ))}
      </div>
    </div>
  );
}
