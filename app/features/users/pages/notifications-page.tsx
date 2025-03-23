import type { Route } from './+types/notifications-page';
import { NotificationCard } from '../components/notification-card';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId, getNotifications } from '../queries';
import { DateTime } from 'luxon';
import type { NotificationType } from '../constant';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications | wemake' },
    { name: 'description', content: 'View your notifications' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const notifications = await getNotifications(client, { userId });
  return { notifications };
};

export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  const { notifications } = loaderData;
  console.log(notifications);
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold'>Notifications</h1>
      <div className='flex flex-col items-start gap-5'>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            avatarSrc={notification.source?.avatar ?? ''}
            avatarFallback={notification.source?.name[0] ?? ''}
            username={notification.source?.name ?? ''}
            type={notification.type as NotificationType}
            productName={notification.product?.name ?? ''}
            postTitle={notification.post?.title ?? ''}
            payloadId={
              notification.product?.product_id ?? notification.post?.post_id
            }
            timestamp={DateTime.fromISO(notification.created_at).toRelative()!}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  );
}
