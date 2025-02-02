import type { Route } from './+types/notifications-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Notifications | wemake' },
    { name: 'description', content: 'View your notifications' },
  ];
};

export default function NotificationsPage({}: Route.ComponentProps) {
  return <div></div>;
}
