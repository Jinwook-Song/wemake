import { Button } from '~/common/components/ui/button';
import { ReviewCard } from '../components/review-card';

export function meta() {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'Check out user reviews for this product' },
  ];
}

export default function ProductReviewsPage() {
  return (
    <div className='space-y-10 max-w-lg'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>10 Reviews</h2>
        <Button variant={'secondary'}>Write a Review</Button>
      </div>
      <div className='space-y-20'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ReviewCard
            key={index}
            avatarUrl='https://github.com/openai.png'
            username='John Doe'
            handle='username'
            rating={((index * 3) % 5) + 1}
            content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatibus quibusdam
            voluptatem quas quidem quos? Quisquam, voluptates. Quisquam
            voluptates, quod, quia, voluptate quae voluptatibus quibusdam
            voluptatem quas quidem quos? Quisquam, voluptates. Lorem ipsum dolor
            sit amet consectetur adipisicing elit.'
            createdAt='10 days ago'
          />
        ))}
      </div>
    </div>
  );
}
