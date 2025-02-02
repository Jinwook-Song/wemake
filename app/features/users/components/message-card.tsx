import { Link, useLocation } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '~/common/components/ui/sidebar';
import { cn } from '~/lib/utils';

interface MessageCardProps {
  id: string;
  avatarUrl: string;
  username: string;
  lastMessage: string;
  className?: string;
}

export function MessageCard({
  id,
  avatarUrl,
  username,
  lastMessage,
  className,
}: MessageCardProps) {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn('h-16', className)}
        asChild
        isActive={location.pathname === `/my/messages/${id}`}
      >
        <Link to={`/my/messages/${id}`}>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-sm font-medium'>{username}</span>
              <span className='text-xs text-muted-foreground'>
                {lastMessage}
              </span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
