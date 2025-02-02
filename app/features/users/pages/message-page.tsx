import type { Route } from './+types/message-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message | wemake' },
    { name: 'description', content: 'View message details' },
  ];
};

export default function MessagePage({}: Route.ComponentProps) {
  return <div></div>;
}
