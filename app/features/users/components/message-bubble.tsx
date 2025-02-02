import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { cn } from '~/lib/utils';

interface MessageBubbleProps {
  avatarUrl: string;
  username: string;
  message: string;
  isCurrentUser: boolean;
  className?: string;
}

export function MessageBubble({
  avatarUrl,
  username,
  message,
  isCurrentUser,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4',
        isCurrentUser && 'flex-row-reverse',
        className,
      )}
    >
      <Avatar className='size-14'>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          'rounded-lg p-4 text-sm max-w-[33%]': true,
          'bg-primary text-primary-foreground rounded-br-none': isCurrentUser,
          'bg-accent rounded-bl-none': !isCurrentUser,
        })}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
