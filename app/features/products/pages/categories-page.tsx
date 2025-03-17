import { Hero } from '~/common/components/hero';
import type { Route } from './+types/categories-page';
import { CategoryCard } from '../components/category-card';
import { getCategories } from '../queries';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Categories | wemake' },
    { name: 'description', content: 'Browse products by category' },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const categories = await getCategories(client);

  return { categories };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className='space-y-10'>
      <Hero title='Categories' description='Browse products by category' />
      <div className='grid grid-cols-4 gap-10'>
        {categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
