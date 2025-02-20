import { Link } from 'react-router';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { DateTime } from 'luxon';

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatarUrl: string | null;
  category: string;
  createdAt: string;
  expanded?: boolean;
  votesCount?: number;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  createdAt,
  expanded = false,
  votesCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`}>
      <Card
        className={cn(
          'bg-transparent hover:bg-card/50 transition-colors',
          expanded && 'flex flex-row justify-between items-center',
        )}
      >
        <CardHeader className='flex flex-row items-center gap-2'>
          <Avatar className='size-14'>
            <AvatarFallback>{author[0]}</AvatarFallback>
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
          </Avatar>
          <div className='space-y-2'>
            <CardTitle>{title}</CardTitle>
            <div className='flex gap-2 text-sm leading-tight text-muted-foreground'>
              <span>
                {author} on {category}
              </span>
              <DotIcon className='size-4' />
              <span>{DateTime.fromISO(createdAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className='flex justify-end'>
            <Button variant={'link'}>Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className='flex justify-end py-0'>
            <Button variant={'outline'} className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
