import { Button } from '~/common/components/ui/button';
import { ReviewCard } from '../components/review-card';
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog';
import CreateReviewDialog from '../components/create-review-dialog';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import type { Route } from './+types/product-reviews-page';
import { getProductReviews } from '../queries';
import { makeSSRClient } from '~/supa-client';

export function meta() {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'Check out user reviews for this product' },
  ];
}

export const loader = async ({
  params: { productId },
  request,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const reviews = await getProductReviews(client, { productId });
  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { reviewCount } = useOutletContext<{ reviewCount: number }>();
  const { reviews } = loaderData;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='space-y-10 max-w-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>
            {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
          </h2>
          <DialogTrigger>
            <Button variant={'secondary'}>Write a Review</Button>
          </DialogTrigger>
          <CreateReviewDialog open={open} />
        </div>
        <div className='space-y-20'>
          {reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              avatarUrl={review.user.avatar}
              username={review.user.name}
              handle={review.user.username}
              rating={review.rating}
              content={review.review}
              createdAt={review.created_at}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
