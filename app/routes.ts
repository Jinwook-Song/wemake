import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('common/pages/home-page.tsx'),
  ...prefix('products', [
    index('features/products/pages/products-page.tsx'),
    ...prefix('leaderboards', [
      index('features/products/pages/leaderboards-page.tsx'),
      route(
        '/yearly/:year',
        'features/products/pages/yearly-leaderboards-page.tsx',
      ),
      route(
        '/monthly/:year/:month',
        'features/products/pages/monthly-leaderboards-page.tsx',
      ),
      route(
        '/weekly/:year/:week',
        'features/products/pages/weekly-leaderboards-page.tsx',
      ),
      route(
        '/daily/:year/:month/:day',
        'features/products/pages/daily-leaderboards-page.tsx',
      ),
      route(
        '/:period',
        'features/products/pages/leaderboards-redirection-page.tsx',
      ),
    ]),
    ...prefix('categories', [
      index('features/products/pages/categories-page.tsx'),
      route('/:category', 'features/products/pages/category-page.tsx'),
    ]),
    route('/search', 'features/products/pages/search-page.tsx'),
    route('/submit', 'features/products/pages/submit-page.tsx'),
    route('/promote', 'features/products/pages/promote-page.tsx'),
    ...prefix('/:productId', [
      index('features/products/pages/product-redirect-page.tsx'),
      layout('features/products/layouts/product-overview-layout.tsx', [
        route('/overview', 'features/products/pages/product-overview-page.tsx'),
        route('/reviews', 'features/products/pages/product-reviews-page.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
