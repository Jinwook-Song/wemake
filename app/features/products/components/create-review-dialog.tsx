import { StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form, useActionData } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/common/components/ui/dialog';
import { Label } from '~/common/components/ui/label';
import type { action } from '../pages/product-reviews-page';

const INITIAL_RATING = 0;

export default function CreateReviewDialog({ open }: { open: boolean }) {
  const [rating, setRating] = useState(INITIAL_RATING);
  const [hoveredStar, setHoveredStar] = useState(INITIAL_RATING);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (!open) {
      setRating(INITIAL_RATING);
      setHoveredStar(INITIAL_RATING);
    }
  }, [open]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl'>
          What do you think about this product?
        </DialogTitle>
        <DialogDescription>
          Share your thoughts and help others make better purchase decisions.
        </DialogDescription>
      </DialogHeader>
      <Form method='post' className='space-y-10'>
        <div className='flex flex-col gap-5'>
          <Label className='flex flex-col gap-1'>
            Rating
            <small className='text-muted-foreground'>
              What would you rate this product?
            </small>
          </Label>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(INITIAL_RATING)}
              >
                <StarIcon
                  className={'size-5 text-yellow-400'}
                  fill={
                    rating >= star || hoveredStar >= star
                      ? 'currentColor'
                      : 'none'
                  }
                />
                <input
                  type='radio'
                  name='rating'
                  value={star}
                  required
                  className='sr-only'
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData?.fieldErrors?.rating && (
            <p className='text-red-500'>
              {actionData.fieldErrors.rating.join(', ')}
            </p>
          )}
        </div>
        <InputPair
          textArea
          name='review'
          label='Review'
          description='Maximum 1000 characters'
          placeholder='Tell us what you think about this product.'
          required
        />
        {actionData?.fieldErrors?.review && (
          <p className='text-red-500'>
            {actionData.fieldErrors.review.join(', ')}
          </p>
        )}
        <DialogFooter>
          <Button type='submit'>Submit</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
