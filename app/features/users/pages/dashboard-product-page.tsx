import type { Route } from './+types/dashboard-product-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Dashboard | wemake' },
    { name: 'description', content: 'Manage your product' },
  ];
};

export default function DashboardProductPage({}: Route.ComponentProps) {
  return <div></div>;
}
