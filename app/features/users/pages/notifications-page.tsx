import type { Route } from './+types/notifications-page';
import { NotificationCard } from '../components/notification-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications | wemake' },
    { name: 'description', content: 'View your notifications' },
  ];
};

export default function NotificationsPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold'>Notifications</h1>
      <div className='flex flex-col items-start gap-5'>
        <NotificationCard
          avatarSrc='https://github.com/deepseek-ai.png'
          avatarFallback='D'
          actorName='DeepSeek'
          action=' followed you.'
          timestamp='2 days ago'
          seen={true}
        />
        <NotificationCard
          avatarSrc='https://github.com/deepseek-ai.png'
          avatarFallback='D'
          actorName='DeepSeek'
          action=' followed you.'
          timestamp='2 days ago'
          seen={false}
        />
      </div>
    </div>
  );
}
