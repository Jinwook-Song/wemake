import { Button } from '~/common/components/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
} from '~/common/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { EyeIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import type { NotificationType } from '../constant';
import { Link, useFetcher } from 'react-router';

interface NotificationCardProps {
  notificationId: number;
  avatarSrc: string;
  avatarFallback: string;
  username: string;
  type: NotificationType;
  timestamp: string;
  seen: boolean;
  productName: string;
  postTitle: string;
  payloadId?: number;
}

const getMessage = (type: NotificationType) => {
  switch (type) {
    case 'follow':
      return 'followed you.';
    case 'review':
      return 'reviewed your product: ';
    case 'reply':
      return 'replied to your post: ';
    case 'mention':
      return 'mentioned you in a post: ';
  }
};

export function NotificationCard({
  notificationId,
  avatarSrc,
  avatarFallback,
  username,
  type,
  timestamp,
  seen,
  productName,
  postTitle,
  payloadId,
}: NotificationCardProps) {
  const fetcher = useFetcher();
  const optimisticSeen = fetcher.state === 'idle' ? seen : true;

  return (
    <Card
      className={cn('min-w-[450px]', optimisticSeen ? '' : 'bg-chart-3/10')}
    >
      <CardHeader className='flex flex-row items-start gap-5 space-y-0'>
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
          <AvatarImage src={avatarSrc} />
        </Avatar>
        <div>
          <CardTitle className='text-lg font-bold space-y-0'>
            <span>{username} </span>
            <span>{getMessage(type)}</span>
            {productName && (
              <Button variant='ghost' className='text-lg' asChild>
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant='ghost' className='text-lg' asChild>
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        {!optimisticSeen && (
          <fetcher.Form
            method='post'
            action={`/my/notifications/${notificationId}/see`}
          >
            <Button variant='outline' size='icon'>
              <EyeIcon className='size-4' />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
