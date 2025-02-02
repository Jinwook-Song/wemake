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

interface NotificationCardProps {
  avatarSrc: string;
  avatarFallback: string;
  actorName: string;
  action: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  avatarSrc,
  avatarFallback,
  actorName,
  action,
  timestamp,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn('min-w-[450px]', seen ? '' : 'bg-chart-3/10')}>
      <CardHeader className='flex flex-row items-start gap-5 space-y-0'>
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
          <AvatarImage src={avatarSrc} />
        </Avatar>
        <div>
          <CardTitle className='text-lg font-bold'>
            <span>{actorName}</span>
            <span>{action}</span>
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        {!seen && (
          <Button variant='outline' size='icon'>
            <EyeIcon className='size-4' />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
