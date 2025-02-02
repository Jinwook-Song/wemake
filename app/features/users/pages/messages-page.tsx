import { MessageCircleIcon } from 'lucide-react';
import type { Route } from './+types/messages-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Messages | wemake' },
    { name: 'description', content: 'View your messages' },
  ];
};

export default function MessagesPage({}: Route.ComponentProps) {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-4 text-muted-foreground'>
      <MessageCircleIcon className='size-12' />
      <h1 className='text-lg font-medium'>
        Click on a message in the sidebar to view it
      </h1>
    </div>
  );
}
