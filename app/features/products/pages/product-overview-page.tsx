import { useOutletContext } from 'react-router';

export default function ProductOverviewPage() {
  const { description, howItWorks } = useOutletContext<{
    productId: string;
    description: string;
    howItWorks: string;
  }>();
  return (
    <div className='space-y-10'>
      <div className='space-y-1'>
        <h3 className='text-lg font-bold'>What is this product?</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <div className='space-y-1'>
        <h3 className='text-lg font-bold'>How does it work?</h3>
        <p className='text-muted-foreground'>{howItWorks}</p>
      </div>
    </div>
  );
}
