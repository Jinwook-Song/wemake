import { Link } from 'react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { DateTime } from 'luxon';

interface IdeaCardProps {
  id: number;
  title: string;
  viewCount: number;
  createdAt: string;
  likesCount: number;
  claimed: boolean;
}

export function IdeaCard({
  id,
  title,
  viewCount,
  createdAt,
  likesCount,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className='bg-transparent hover:bg-card/50 transition-colors'>
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className='text-xl'>
            <span
              className={cn(
                claimed
                  ? 'bg-muted-foreground text-muted-foreground select-none'
                  : '',
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className='flex items-center text-sm'>
        <div className='flex items-center gap-2'>
          <EyeIcon className='size-4' />
          <span>{viewCount}</span>
        </div>
        <DotIcon className='size-4' />
        <span>{DateTime.fromISO(createdAt).toRelative()}</span>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant={'outline'}>
          <HeartIcon className='size-4' />
          <span>{likesCount}</span>
        </Button>

        {claimed ? (
          <Button variant={'outline'} disabled className='cursor-not-allowed'>
            <LockIcon className='size-4'></LockIcon>
            <span>Claimed</span>
          </Button>
        ) : (
          <Button variant={'default'} asChild>
            <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
