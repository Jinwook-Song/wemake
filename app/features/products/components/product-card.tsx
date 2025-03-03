import { Link } from 'react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  reviewsCount: string;
  viewsCount: string;
  upvotesCount: string;
}

export function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewsCount,
  upvotesCount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`}>
      <Card className='w-full flex items-center justify-between bg-transparent hover:bg-card/50'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold leading-none tracking-tight'>
            {name}
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            {description}
          </CardDescription>
          <div className='flex items-center gap-4 mt-2'>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <MessageCircleIcon className='size-4' />
              <span>{reviewsCount}</span>
            </div>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <EyeIcon className='size-4' />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className='py-0'>
          <Button variant={'outline'} className='flex flex-col h-14'>
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>{upvotesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
