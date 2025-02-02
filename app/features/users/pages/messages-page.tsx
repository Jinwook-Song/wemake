import type { Route } from './+types/messages-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Messages | wemake' },
    { name: 'description', content: 'View your messages' },
  ];
};

export default function MessagesPage({}: Route.ComponentProps) {
  return <div></div>;
}
