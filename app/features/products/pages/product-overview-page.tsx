import type { Route } from './+types/product-overview-page';

export function meta() {
  return [
    { title: `Product Overview | wemake` },
    { name: 'description', content: 'View product details' },
  ];
}

export default function ProductOverviewPage({ params }: Route.ComponentProps) {
  const { productId } = params;
  return (
    <div className='space-y-10'>
      <div className='space-y-1'>
        <h3 className='text-lg font-bold'>What is this product?</h3>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
      <div className='space-y-1'>
        <h3 className='text-lg font-bold'>How does it work?</h3>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    </div>
  );
}
